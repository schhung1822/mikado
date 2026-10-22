import type { PhotoRef } from "./types";

/**
 * DỮ LIỆU TRANG ĐÔI "SẢN PHẨM" — ĐÂY LÀ DỮ LIỆU MINH HỌA (DEMO).
 *
 * Tên bộ sưu tập, mã mẫu, kích thước, mô tả và toàn bộ ảnh bên dưới là tạm thời.
 * Để dùng ảnh thật: thả file vào public/images/products/ và sửa `src`. Bố cục không phải sửa:
 * mọi ảnh được crop kiểu "cover" vào khung cố định, chỉnh `focal` (object-position) để chọn
 * phần giữ lại khi ảnh có tỷ lệ khác.
 *
 * Khung ảnh (px thiết kế, trang A4):  hero ≈ 342 × 604 (dọc) · slab 1 : 2 (dọc) ·
 * mẫu lớn 1 : 1 · mẫu nhỏ 1 : 1 và 4 : 3.
 *
 * Nguồn ảnh tạm (Wikimedia Commons): hero — Shixart1985, CC BY 2.0;
 * texture — Sisters.seamless (CC0), Ambadyanands (CC0). Chi tiết trong README.
 */
export const collection = {
  eyebrow: "Gạch ốp lát · Bộ sưu tập 01",
  name: "Nebbia",
  subtitle: "Gạch porcelain vân marble xám khói",
  description:
    "Vân mây xám nhạt trên nền trắng ngà, tái hiện vẻ đẹp của đá marble tự nhiên với bề mặt bóng gương. Khổ lớn ít mạch ghép, phù hợp sảnh, phòng khách và những không gian cần sự thoáng đãng.",
  hero: {
    src: "/images/products/hero-living.jpg",
    alt: "Phòng khách với cửa kính lớn nhìn ra hồ, sàn gạch bóng phản chiếu cây",
    focal: "50% 50%",
    credit: "Ảnh minh họa: Shixart1985, CC BY 2.0, Wikimedia Commons",
  } satisfies PhotoRef,
  heroCaption: "Không gian ứng dụng — sàn gạch khổ lớn, bề mặt bóng",
  slab: {
    src: "/images/products/nebbia-slab.jpg",
    alt: "Mẫu gạch Nebbia vân marble xám khói",
    focal: "50% 50%",
  } satisfies PhotoRef,
  slabCaption: { code: "NB-1201", size: "600 × 1200 mm" },
  specs: [
    { label: "Kích thước", value: ["600 × 1200 mm", "800 × 800 mm"] },
    { label: "Bề mặt", value: ["Bóng", "Matt"] },
    { label: "Ứng dụng", value: ["Lát sàn", "Ốp tường"] },
    { label: "Xương gạch", value: ["Porcelain"] },
  ],
};

export interface Swatch {
  id: string;
  name: string;
  code: string;
  size: string;
  finish: string;
  image: PhotoRef;
}

/** Thứ tự = vị trí trên trang: [0] ô lớn · [1–2] hai ô xếp dọc bên phải · [3–5] hàng dưới. */
export const swatches: Swatch[] = [
  { id: "alba", name: "Alba", code: "AL-8801", size: "800 × 800", finish: "Bóng", image: { src: "/images/products/alba.jpg", alt: "Gạch Alba vân marble kem", focal: "50% 50%" } },
  { id: "nebbia", name: "Nebbia", code: "NB-1201", size: "600 × 1200", finish: "Bóng", image: { src: "/images/products/nebbia.jpg", alt: "Gạch Nebbia vân marble xám", focal: "50% 50%" } },
  { id: "ardesia", name: "Ardesia", code: "AR-6602", size: "600 × 600", finish: "Matt", image: { src: "/images/products/ardesia.jpg", alt: "Gạch Ardesia màu đá phiến xám đậm", focal: "50% 50%" } },
  { id: "sabbia", name: "Sabbia", code: "SB-6601", size: "600 × 600", finish: "Matt", image: { src: "/images/products/sabbia.jpg", alt: "Gạch Sabbia vân travertine màu cát", focal: "50% 50%" } },
  { id: "travertino", name: "Travertino", code: "TV-3601", size: "300 × 600", finish: "Matt", image: { src: "/images/products/travertino.jpg", alt: "Gạch Travertino dạng thanh ghép so le", focal: "50% 50%" } },
  { id: "tortora", name: "Tortora", code: "TT-8802", size: "800 × 800", finish: "Matt", image: { src: "/images/products/tortora.jpg", alt: "Gạch Tortora hạt granite màu be xám", focal: "50% 50%" } },
];

export const swatchesCopy = {
  eyebrow: "Bảng mẫu · 06 bề mặt",
  title: "Bề mặt đá & marble",
  guideLabel: "Quy cách (mm) — tỷ lệ thật",
  notes: [
    { label: "Bề mặt", value: "Bóng · Matt" },
    { label: "Ứng dụng", value: "Lát sàn · Ốp tường" },
  ],
};

/** Các quy cách vẽ theo tỷ lệ ở chân trang phải (mm). */
export const sizeGuide = [
  { w: 300, h: 600 },
  { w: 600, h: 600 },
  { w: 600, h: 1200 },
  { w: 800, h: 800 },
];
