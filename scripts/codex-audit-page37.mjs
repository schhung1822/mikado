import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer";

await mkdir("tmp/pdfs", { recursive: true });
const browser = await puppeteer.launch({ headless: true });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1.5 });
  const port = process.env.PORT || 3000;
await page.goto(`http://localhost:${port}/print`, { waitUntil: "networkidle0", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);

  const spread = await page.$("#nhuphat");
  if (!spread) throw new Error("Không tìm thấy spread #nhuphat");
  await spread.screenshot({ path: "tmp/pdfs/page37-fixed.png" });

  const audit = await page.evaluate(() => {
    const spreadElement = document.querySelector("#nhuphat");
    const rightPage = spreadElement?.querySelector('[data-page="right"]');
    const strip = rightPage?.querySelector('section[aria-label="Dải gạch lát nền 800 × 800 mm"]');
    const footer = rightPage?.querySelector("div.absolute.flex.items-baseline");
    if (!rightPage || !strip || !footer) throw new Error("Thiếu phần tử audit trang 37");

    const stripRect = strip.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    return {
      stripBottom: stripRect.bottom,
      footerTop: footerRect.top,
      gap: footerRect.top - stripRect.bottom,
      pageBottom: rightPage.getBoundingClientRect().bottom,
    };
  });

  console.log(JSON.stringify(audit));
} finally {
  await browser.close();
}
