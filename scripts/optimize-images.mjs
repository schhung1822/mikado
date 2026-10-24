/**
 * Tạo bản web nhẹ của ảnh sản phẩm: thu nhỏ cạnh dài còn 720px, xuất JPEG. File gốc không bị đổi.
 *
 * Trình xem hiển thị ảnh nguyên bản (Photo dùng `unoptimized`), trong khi mỗi ô mẫu gạch chỉ rộng ~80px —
 * dùng thẳng ảnh gốc 2–7 MB sẽ làm trang rất nặng. Chạy lại lệnh này mỗi khi thêm/đổi ảnh gốc.
 *
 * Cách dùng:
 *   node scripts/optimize-images.mjs public/images/products/mikado/square public/images/products/mikado/square-web
 *
 * Tên file ra = tên file gốc viết thường, ký tự lạ thành "-" (ví dụ "MP 96.101_MP 18.101.png" → "mp-96-101-mp-18-101.jpg").
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("Cách dùng: node scripts/optimize-images.mjs <thư mục ảnh gốc> <thư mục xuất>");
  process.exit(1);
}

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

await mkdir(out, { recursive: true });
for (const file of (await readdir(src)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))) {
  const dest = path.join(out, `${slug(file)}.jpg`);
  const info = await sharp(path.join(src, file))
    .resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  console.log(`${file} → ${path.basename(dest)} (${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB)`);
}
