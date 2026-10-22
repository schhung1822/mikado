# Catalogue / Hồ sơ năng lực — bản demo 2 trang đôi

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Motion (`motion/react`).
Giai đoạn này chỉ có **hai trang đôi nội dung**; chưa có bìa đầu/bìa cuối.

| Trang đôi | Mục đích | Tham khảo PDF (số trang **in**) |
| --- | --- | --- |
| `brands` | Giới thiệu 11 thương hiệu | 4–5 |
| `products` | Trưng bày sản phẩm gạch ốp lát | 16–17 |

> **Cách hiểu số trang:** `mikado-profile-vie-2025.pdf` có 19 trang PDF; trang 1 là A4 đơn, các trang 2–19 mỗi trang đã là một trang đôi.
> Nội dung "thương hiệu" nằm ở PDF trang 3 (in "Page 04–05") và "gạch men" ở PDF trang 9 (in "Page 16–17"),
> nên số 4–5 và 16–17 được hiểu là **số trang in**. Tỷ lệ trang lấy từ PDF: mỗi trang A4 595.276 × 841.89 pt (1 : 1.4142).

## Chạy

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

- `/` — trình xem: thanh menu trái có thumbnail (mở/thu gọn bằng nút góc trái trên), trước/sau (nút, phím ← →), phóng to (nút, `+`/`-`/`0`, pinch, Ctrl+cuộn), nút **Tải PDF**. Có thể mở thẳng `/#products`.
  - **Desktop** (≥ 768px): mỗi lượt xem trọn một trang đôi. **Mobile** (< 768px): xem **từng trang một**; menu trái là ngăn kéo.
- `/print` — **bản tĩnh** của toàn bộ catalogue (không animation, không thanh điều khiển), nguồn để xuất PDF.

## Xuất PDF

Nút **Tải PDF** tải file tĩnh `public/ho-so-nang-luc.pdf` (khai báo ở `DOCUMENT.pdf` trong `lib/catalogue/identity.ts`).
File này được tạo từ `/print` bằng Puppeteer — **chạy lại mỗi khi đổi nội dung catalogue**:

```bash
npm run dev            # hoặc npm run build && npm start (server phải đang chạy)
npm run pdf            # mặc định http://localhost:3000/print
npm run pdf -- http://localhost:3100/print   # nếu server ở cổng khác
```

Vì là file tĩnh nên nút hoạt động trên mọi nơi deploy (kể cả Vercel), không cần Chrome trên máy chủ.
PDF giữ khổ trang đôi 1190 × 842 px như tài liệu tham khảo.

## Chỗ cần sửa nội dung (đều trong `lib/catalogue/`)

| Muốn đổi | Sửa ở |
| --- | --- |
| **Màu**, tỷ lệ/khổ trang, lề, tên tài liệu | `identity.ts` (`theme`, `PAGE`, `MARGIN`, `DOCUMENT`) |
| **Font** | `fonts.ts` (Cormorant Garamond + Be Vietnam Pro, có subset tiếng Việt) |
| **Logo, tên thương hiệu, bố cục bức tường logo**, câu chữ trang thương hiệu | `brands.ts` |
| **Ảnh sản phẩm**, tên bộ sưu tập, mã mẫu, kích thước, mô tả | `products.ts` |

### Thay logo
Thả file vào `public/images/logo/`, sửa `logo.src/width/height` trong `brands.ts`.
`crop` (tỷ lệ 0–1 của ảnh gốc) chỉ cắt nền trắng thừa, không đụng pixel logo — bỏ nếu logo đã sát lề.
`fill: true` cho logo có nền riêng (Videcor, Lustile, Feraza). Logo luôn giữ đúng tỷ lệ và màu gốc.
Muốn sắp lại: đổi thứ tự/`span` trong `brandWall` (mỗi hàng tổng `span` = 6).

### Thay ảnh sản phẩm
Thả ảnh thật vào `public/images/products/`, đổi `src` trong `products.ts`. Không phải sửa bố cục: ảnh crop kiểu *cover* vào khung cố định,
chỉnh `focal` (ví dụ `"50% 30%"`) để chọn phần giữ lại. Khung: hero ≈ 342 × 604 (dọc), slab 1 : 2 (dọc), mẫu 1 : 1 và 16 : 10.

## Cấu trúc

```
app/page.tsx, app/print/page.tsx     trang xem / bản tĩnh
components/catalogue/
  catalogue-viewer.tsx   trình xem: trang đôi / từng trang, zoom, điều hướng, nút tải PDF
  viewer-sidebar.tsx     thanh menu trái (thumbnail; ngăn kéo trên mobile)
  viewer-controls.tsx    thanh điều khiển dưới
  unit-view.tsx          hiển thị cả trang đôi hoặc một nửa (dùng cho xem từng trang và thumbnail)
  page-frame.tsx     Page, SinglePage, Spread, RunningHead, PageFooter
  brands-spread.tsx, products-spread.tsx      hai trang đôi
  entries.tsx        thứ tự các mục — thêm bìa (single) / trang đôi mới tại đây
  motion.tsx         Reveal + AnimationProvider (animation chỉ chạy trong trình xem)
  static-catalogue.tsx   bản tĩnh cho in/PDF
lib/catalogue/       dữ liệu + cấu hình nhận diện
```

Nội dung trang là kích thước cố định (px thiết kế = pt) và được scale cho vừa khung nhìn, nên bố cục không đổi giữa các màn hình.
Animation tôn trọng `prefers-reduced-motion`; khi in (`@media print`) thanh điều khiển ẩn, hiệu ứng tắt.

## Dữ liệu và ảnh tạm — cần thay trước khi dùng thật

- **Toàn bộ nội dung trang sản phẩm là dữ liệu minh họa**: tên bộ sưu tập (Nebbia, Alba…), mã mẫu, kích thước, mô tả, bề mặt.
  Trang có ghi chú "Hình ảnh và thông số mang tính minh họa".
- **Ảnh tạm** (Wikimedia Commons, đã lưu trong `public/images/products/`):
  - `hero-living.jpg` — Shixart1985, **CC BY 2.0** (đã ghi nguồn ngay trên trang; giữ lại hoặc thay bằng ảnh thật).
  - `alba.jpg` — Ambadyanands, CC0 ("Marble Top.jpg").
  - `nebbia*.jpg`, `ardesia.jpg`, `sabbia.jpg`, `tortora.jpg`, `travertino.jpg` — Sisters.seamless, CC0 (cắt một viên từ ảnh texture).
- **Logo**: dùng nguyên 11 file trong `public/images/logo/`. `mikado.jpg` là logo đơn vị trong PDF tham khảo, **không dùng**.
  `feraza.webp`, `lustile.jpg`, `videcor.png` là ảnh có nền riêng (Feraza là ảnh bìa — chỉ hiển thị dải đỏ chứa logo).
- Văn bản trang thương hiệu giữ trung tính, không nêu quan hệ đối tác/phân phối.

## Giới hạn hiện tại

- Chưa có bìa đầu/bìa cuối (đã có `SinglePage` và kiểu `single` trong `entries`).
- Thumbnail menu trái dựng từ chính nội dung trang (thu nhỏ) nên khi catalogue có hàng chục trang cần cân nhắc dựng ảnh thumbnail riêng.
- Đổi ngưỡng chuyển sang xem từng trang ở `SINGLE_PAGE_BELOW` trong `catalogue-viewer.tsx`.
- `@page` trong CSS in hiện đặt khổ trang đôi; khi thêm bìa đơn cần dùng named page để xuất PDF khổ hỗn hợp.
- Chưa có hiệu ứng lật sách 3D.
