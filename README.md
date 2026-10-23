# Catalogue / Hồ sơ năng lực MIKADO-MT — bản demo duyệt hướng thiết kế

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Motion (`motion/react`).

Bản demo này có **8 mục**, theo đúng thứ tự trong `components/catalogue/entries.tsx`:

| Mục | Loại | Nội dung | Số trang |
| --- | --- | --- | --- |
| `cover` | trang đơn | Bìa đầu: logo MIKADO-MT, "HỒ SƠ NĂNG LỰC", "CATALOGUE GẠCH ỐP LÁT" | — |
| `contents` | trang đôi (trái nền xanh, phải nền trắng) | Trái: logo MIKADO-MT + 12 thương hiệu kèm thông tin liên hệ **demo**; phải: **mục lục** 15 trang đôi nội dung (giới thiệu công ty + tổng hợp thương hiệu + 12 thương hiệu + lời cảm ơn), trang 04–33 | 02–03 |
| `company` | trang đôi (trái nền trắng, phải nền xanh) | **Giới thiệu công ty** (tiêu đề, logo MIKADO-MT, câu dẫn, đoạn giới thiệu, tầm nhìn/sứ mệnh/giá trị) và **Ban lãnh đạo** (3 khung chân dung 3:4 + tên/chức danh + thông điệp) — toàn bộ là nội dung demo | 04–05 |
| `brands` | trang đôi | Tổng hợp 12 thương hiệu (bức tường logo, hàng cao theo tỷ lệ thật của logo) | 06–07 |
| `mikado` | trang đôi (nền trắng) | **Trang sản phẩm MIKADO** — trái: giới thiệu thương hiệu (nội dung tạm); phải: 4 nhóm kích thước 300×600, 400×800, 600×600, 800×800, mỗi nhóm vài mẫu (ảnh tạm) | 08–09 |
| `alaska` | trang đôi (nền xanh thương hiệu) | Trang sản phẩm demo thứ hai (logo Alaska thật; nội dung/ảnh tạm), cùng template | 10–11 |
| `thanks` | trang đôi (cả hai trang nền xanh) | **Lời cảm ơn**: trái — khung ảnh lớn phủ lớp xanh tối, tiêu đề và lời cảm ơn (nội dung/ảnh tạm); phải — logo MIKADO-MT, đường kẻ, tên công ty, cột trụ sở/showroom (liên hệ demo) | 32–33 |
| `back-cover` | trang đơn | Bìa cuối: logo MIKADO-MT, liên hệ (ẩn nếu chưa có dữ liệu) | — |

Chưa làm (theo phạm vi duyệt): trang sản phẩm cho 10 thương hiệu còn lại, giới thiệu công ty, nhà máy, chứng nhận.
Bìa đầu/bìa cuối là trang đơn, hiển thị độc lập và căn giữa; mỗi thương hiệu là một trang đôi (một trang đơn là một trang của catalogue, không phải route).

> **Tham khảo PDF:** `mikado-profile-vie-2025.pdf` có 19 trang PDF; trang 1 là A4 đơn, các trang 2–19 mỗi trang là một trang đôi.
> Trang in "Page 16–17" (PDF trang 9) là bố cục gạch men theo nhóm kích thước. Tỷ lệ trang A4: 595.276 × 841.89 pt (1 : 1.4142).

## Chạy

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

- `/` — trình xem: thanh menu trái có thumbnail (mở/thu gọn bằng nút góc trái trên), trước/sau (nút, phím ← →, **lăn chuột trên trang** — chỉ khi chưa phóng to), phóng to (nút, `+`/`-`/`0`, pinch, Ctrl+cuộn), nút **Tải PDF**. Có thể mở thẳng `/#products`.
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

## Chỗ cần sửa (đều trong `lib/catalogue/`)

| Muốn đổi | Sửa ở |
| --- | --- |
| **Màu** (xanh chính, đậm/nhạt, nền, chữ, đỏ nhấn), khổ trang, lề | `identity.ts` → `theme` |
| **Logo MIKADO-MT**, tên công ty, **thông tin liên hệ** bìa cuối | `company.ts` |
| Chữ trên bìa đầu ("HỒ SƠ NĂNG LỰC", phụ đề) | `company.ts` → `coverCopy` |
| **Logo / tên thương hiệu MIKADO**, tiêu đề phần sản phẩm, **ảnh mẫu gạch**, quy cách | `products.ts` → `mikadoProducts` |
| Logo 12 thương hiệu (tên, cắt lề, nền), bố cục bức tường logo | `brands.ts` |
| Font | `fonts.ts` |

### Màu
Bảng màu lấy mẫu từ logo MIKADO-MT (tấm gạch xanh lá viền vát, chữ đỏ): `brand #4c824a` (chính), `brandDeep #2e5b34`,
`brandLight #669c52`, `brandTint #dfeadb`, `brandNight #1b3622` (xanh rất đậm, nền trang sản phẩm xanh: gradient từ `brandDeep` sang `brandNight`), `signal #e74038` (đỏ, chỉ nhấn nhỏ), nền `paper #f8f9f5`, chữ `ink #1d2620`.
Tất cả là biến CSS `--cat-*` gắn trên `<html>` và dùng qua class Tailwind (`bg-brand`, `text-brand-deep`…). Màu logo từng thương hiệu giữ nguyên gốc.

### Hai loại logo — không dùng thay thế nhau
- **MIKADO-MT** (công ty chủ quản): `public/images/logo/mikado-mt.jpg` (3534 × 728), chỉ dùng ở bìa đầu/bìa cuối.
- **MIKADO** (thương hiệu sản phẩm): `public/images/logo/mikado.jpg` (5906 × 1629), một trong 12 logo thương hiệu; hiện ở bức tường logo và đầu trang sản phẩm MIKADO.
- `public/images/logo/mikado-mt.png` (bản nền trong suốt của logo công ty) hiện chưa được dùng; bìa đang dùng `mikado-mt.jpg`.

### Thông tin liên hệ bìa cuối
Điền `company.contact` (`address`, `hotline`, `email`, `website`) trong `company.ts`. Trường để trống thì dòng tương ứng tự ẩn; không có QR/thông tin giả.
`company.fullName` để trống → bìa dùng "MIKADO-MT" làm tên công ty.

### Trang MIKADO: nội dung và ảnh mẫu gạch
- **Trang trái** (06): `mikadoProducts.about` — đoạn giới thiệu, 3 ý nổi bật và ảnh tràn lề đều là **nội dung/ảnh tạm**, thay bằng nội dung thật. Bỏ `about.image` thì ảnh ẩn.
- **Trang phải** (07, 09…): `products.groups` — mỗi nhóm kích thước có `samples` (danh sách ô mẫu), `application` ("Lát sàn"/"Ốp tường") và `finish` ("Bóng, Matt"). Bố cục theo trang 16–17 tài liệu tham khảo: **lưới 5 cột**, ô nhãn (dấu ngoặc, kích thước lớn, ứng dụng/bề mặt) chiếm 2 cột đầu ở hàng đầu cùng **3 mẫu đầu**, các hàng sau **5 mẫu mỗi hàng**. Thêm/bớt `samples` thì số hàng tự đổi (trang đủ chỗ cho 4 nhóm với 5/5/8/8 mẫu; thêm nhiều hơn thì cần bớt mẫu hoặc caption sẽ làm hàng cao hơn).
- **Ảnh mẫu gạch**: ảnh tạm là texture CC0 trong `public/images/products/` (`demoSamples` trong `products.ts`). Thay bằng ảnh thật: thả file vào thư mục đó rồi đổi `src` của từng mẫu (và có thể thêm `code` — mã mẫu hiện dưới ô, như "CP18.306" trong tài liệu tham khảo). Ô có tỷ lệ đúng viên gạch: vuông 1:1, chữ nhật 1:2 xoay ngang (300×600, 400×800).
  Ảnh thật nên đúng tỷ lệ viên gạch; bỏ `fit: "cover"` để ảnh hiển thị nguyên vẹn bằng `contain`, không bị cắt. Ô không có `image` thì hiện khung trống đúng tỷ lệ.
- `application` và `finish` hiện là giá trị **minh họa** theo tài liệu tham khảo, cần xác nhận cho từng thương hiệu (để trống thì dòng tương ứng ẩn). Các ô mẫu cùng cột rộng nên kích thước tương đối giữa các quy cách không còn vẽ theo tỷ lệ thật (giống tài liệu tham khảo).

### Mục lục, số trang và liên hệ (trang đôi 02–03)
- **Số trang** do `lib/catalogue/contents.ts` quyết định (một nguồn duy nhất): bìa đầu là trang 1, mục lục & liên hệ 02–03, các trang đôi nội dung bắt đầu từ 04, mỗi trang đôi hai số liên tiếp. Thứ tự trang sản phẩm theo thương hiệu là `productOrder` (MIKADO trước, còn lại theo chữ cái); đổi thứ tự hoặc thêm trang thì số trang ở trang sản phẩm và mục lục tự tính lại.
- **Mục lục** liệt kê 15 trang đôi nội dung đã xác định (giới thiệu công ty + 1 tổng hợp + 12 thương hiệu + lời cảm ơn); mới có trang thật cho Mikado và Alaska, còn lại là danh mục kế hoạch. Muốn thêm mục khác (ví dụ nhóm trang mới) thì sửa `tocSections` trong `contents.ts`.
- **Thông tin liên hệ 12 thương hiệu** (`lib/catalogue/contacts.ts`) là **dữ liệu demo** (địa chỉ ghi "demo", hotline 0900 000 xxx, email @example.com). Thay bằng dữ liệu thật; trường để trống thì dòng tương ứng tự ẩn.

### Trang đôi Giới thiệu công ty & Ban lãnh đạo (04–05)
Nội dung ở `lib/catalogue/company-profile.ts` — **toàn bộ là demo** (đoạn văn tạm, tên Nguyễn Văn A/B/C và chức danh giữ chỗ; không có năm thành lập, số liệu hay chứng nhận). Ảnh chân dung: điền `photo` của từng người (cắt kiểu cover theo `focal`), chưa có thì hiện khung trống 3:4. Đặt `message.quote` = "" để ẩn khối thông điệp.

### Trang đôi Lời cảm ơn (32–33)
Nội dung ở `lib/catalogue/thanks.ts`: `title`, `paragraphs` (lời cảm ơn — **tạm**), `image` (ảnh trang trái — **ảnh tạm**, thay bằng ảnh thật rồi giữ `fit: "cover"`), `offices` (trụ sở/showroom — **liên hệ demo**; dòng để trống tự ẩn, hết dòng thì ẩn cả khối). Tên công ty dùng `company.fullName` nếu đã điền, nếu chưa thì "MIKADO-MT". Số trang tự tính ở `contents.ts` (`thanksFolio`).

### Nền xen kẽ trắng / xanh
Các trang đôi sản phẩm thương hiệu tự xen kẽ nền theo thứ tự trong `brandProductPages` (`lib/catalogue/products.ts`): thương hiệu thứ 1 nền trắng (`tone="light"`), thứ 2 nền xanh thương hiệu (`tone="brand"`), thứ 3 trắng… Đổi thứ tự trong mảng đó là đổi nền. Màu nền xanh là gradient từ `brand` sang `brandDeep` (`BRAND_BACKGROUND` trong `page-frame.tsx`).

### Menu bên trái
Chỉ hiện thumbnail và tên mục (không có số trang); với trang thương hiệu là tên thương hiệu. Thanh điều khiển phía dưới vẫn hiện số trang.

### Thêm trang sản phẩm thương hiệu khác (sau khi khách duyệt)
Tạo thêm một object `BrandProductPage` trong `products.ts` (cùng cấu trúc `mikadoProducts`, logo lấy từ `brands.ts` như `alaskaProducts`) và thêm vào mảng `brandProductPages` — `entries.tsx` tự sinh mục và gán nền xen kẽ.

## Cấu trúc

```
app/page.tsx, app/print/page.tsx     trang xem / bản tĩnh
components/catalogue/
  catalogue-viewer.tsx   trình xem: trang đôi / từng trang, zoom, điều hướng, nút tải PDF
  viewer-sidebar.tsx     thanh menu trái (thumbnail; ngăn kéo trên mobile)
  viewer-controls.tsx    thanh điều khiển dưới
  unit-view.tsx          hiển thị cả trang đôi hoặc một nửa (dùng cho xem từng trang và thumbnail)
  page-frame.tsx     Page, SinglePage, Spread, RunningHead, PageFooter
  brands-spread.tsx      trang đôi thương hiệu
  brand-product-page.tsx template trang đôi sản phẩm của một thương hiệu (trái: giới thiệu, phải: mẫu theo kích thước)
  covers.tsx, mosaic.tsx bìa đầu / bìa cuối + họa tiết ốp gạch
  entries.tsx        thứ tự các mục — thêm bìa (single) / trang đôi mới tại đây
  motion.tsx         Reveal + AnimationProvider (animation chỉ chạy trong trình xem)
  static-catalogue.tsx   bản tĩnh cho in/PDF
lib/catalogue/       dữ liệu + cấu hình nhận diện
```

Nội dung trang là kích thước cố định (px thiết kế = pt) và được scale cho vừa khung nhìn, nên bố cục không đổi giữa các màn hình.
Animation tôn trọng `prefers-reduced-motion`; khi in (`@media print`) thanh điều khiển ẩn, hiệu ứng tắt.

## Ghi chú tài nguyên

- **Ảnh mẫu gạch và ảnh trang trái MIKADO là ảnh tạm** (Wikimedia Commons, CC0 — Sisters.seamless, Ambadyanands; không cần ghi nguồn). Chưa có giá, mã sản phẩm, xuất xứ hay thông số kỹ thuật.
- `nebbia.jpg` cũng dùng ở trang tổng hợp thương hiệu; thay bằng ảnh thật khi có.
- 12 logo thương hiệu: dùng nguyên các file trong `public/images/logo/` (chỉ cắt viền thừa bằng `crop`: dải đen của Claza/Lexxa, nền trắng của CV Group/Lustile/Như Phát). Tên lấy theo nội dung logo (Claza, Mostile). Các file nặng 0.3–2.4 MB nên PDF xuất ra khoảng 10 MB; nếu cần nhẹ hơn, đưa vào bản logo đã nén.
- Văn bản trang thương hiệu giữ trung tính, không nêu quan hệ đối tác/phân phối.

## Giới hạn hiện tại

- Thumbnail menu trái dựng từ chính nội dung trang (thu nhỏ) nên khi catalogue có hàng chục trang cần cân nhắc dựng ảnh thumbnail riêng.
- Đổi ngưỡng chuyển sang xem từng trang ở `SINGLE_PAGE_BELOW` trong `catalogue-viewer.tsx`.
- PDF xuất bằng `npm run pdf` dùng khổ hỗn hợp (trang đôi + trang đơn A4 qua named page `single` trong `app/globals.css`); chưa phải chức năng xuất PDF mới.
- Chưa có hiệu ứng lật sách 3D.
