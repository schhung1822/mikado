/**
 * Xuất catalogue thành PDF: mở trang tĩnh /print bằng Puppeteer rồi lưu vào public/.
 *
 * Cách dùng (cần một server đang chạy — `npm run dev` hoặc `npm run build && npm start`):
 *   npm run pdf                          # mặc định http://localhost:3000/print
 *   npm run pdf -- http://localhost:3100/print
 *
 * Nút "Tải PDF" trên trình xem tải file public/ho-so-nang-luc.pdf (đường dẫn khai báo ở
 * lib/catalogue/identity.ts → DOCUMENT.pdf). Chạy lại lệnh này mỗi khi đổi nội dung catalogue.
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const url = process.argv[2] ?? "http://localhost:3000/print";
const out = path.resolve("public", "ho-so-nang-luc.pdf");

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });
  } catch (error) {
    console.error(`Không mở được ${url}. Hãy chạy server trước (npm run dev hoặc npm start).\n${error.message}`);
    process.exitCode = 1;
    throw error;
  }
  await page.evaluate(() => document.fonts.ready);
  await mkdir(path.dirname(out), { recursive: true });
  // preferCSSPageSize: dùng khổ @page trong app/globals.css (trang đôi 1190.55 × 841.89 px).
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
  const { size } = await stat(out);
  console.log(`Đã xuất ${path.relative(process.cwd(), out)} (${(size / 1024 / 1024).toFixed(1)} MB)`);
} catch {
  // lỗi đã được báo ở trên
} finally {
  await browser.close();
}
