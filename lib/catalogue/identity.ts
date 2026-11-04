import type { CSSProperties } from "react";

/**
 * Cấu hình nhận diện của catalogue — đổi màu, tỷ lệ trang, lề và thông tin tài liệu tại đây.
 * Nhận diện theo logo MIKADO-MT của công ty chủ quản (khác với logo thương hiệu MIKADO).
 */

/**
 * Kích thước trang lấy từ mikado-profile-vie-2025.pdf: mỗi trang đơn là A4 dọc,
 * 595.276 × 841.89 pt (tỷ lệ 1 : 1.4142); trang đôi là 1190.55 × 841.89 pt.
 * Trong thiết kế 1 CSS px = 1 pt, trình xem sẽ scale cả khổ trang cho vừa màn hình.
 */
export const PAGE = { width: 595.276, height: 841.89 } as const;
export const SPREAD = { width: PAGE.width * 2, height: PAGE.height } as const;

/** Lề trang (px thiết kế). `inner` là phía gáy sách, rộng hơn `outer` để chữ/logo không sát gáy. */
export const MARGIN = { top: 48, bottom: 54, outer: 40, inner: 50 } as const;

export const DOCUMENT = {
  /** Hiển thị ở đầu trang (running head) và thanh trình xem. */
  title: "Hồ sơ năng lực",
  /**
   * File PDF cho nút "Tải PDF". Tạo bằng `npm run pdf` (xem scripts/export-pdf.mjs),
   * lưu ở public/ — đổi tên ở đây thì đổi cả trong script.
   */
  pdf: { url: "/ho-so-nang-luc.pdf", filename: "ho-so-nang-luc.pdf", label: "Tải PDF" },
} as const;

/**
 * Màu. Khóa camelCase → biến CSS `--cat-kebab-case`, ánh xạ sang Tailwind trong app/globals.css
 * (ví dụ `brandDeep` → `--cat-brand-deep` → class `bg-brand-deep`, `text-brand-deep`).
 *
 * Bảng màu lấy mẫu trực tiếp từ logo MIKADO-MT (public/images/logo/mikado-mt.jpg):
 * tấm gạch xanh lá viền vát, chữ đỏ. Xanh là màu chủ đạo; đỏ chỉ dùng làm điểm nhấn rất nhỏ.
 * Đổi logo/nhận diện thì chỉ cần sửa các giá trị dưới đây.
 */
export const theme = {
  // Xanh nhận diện (mẫu từ logo)
  brand: "#4c824a", // xanh chính — mảng màu, đường kẻ, nút (vùng xanh phổ biến nhất của logo)
  brandDeep: "#2e5b34", // xanh đậm — chữ nhỏ màu xanh, trạng thái nhấn (đáy tấm gạch trong logo)
  brandLight: "#669c52", // xanh sáng — mảng phụ (vùng sáng của logo)
  brandTint: "#dfeadb", // xanh rất nhạt — nền mảng, ô nhấn
  brandNight: "#1b3622", // xanh rất đậm — điểm cuối gradient nền trang sản phẩm xanh
  signal: "#e74038", // đỏ của chữ MIKADO-MT — chỉ dùng điểm nhấn nhỏ
  // Nền & chữ trung tính
  paper: "#f8f9f5", // nền trang (off-white)
  stone: "#edf0e8", // mảng nền phụ, khung ảnh trống
  grout: "#d6dccf", // mạch vữa giữa các ô
  tile: "#ffffff", // nền ô logo / ô mẫu
  ink: "#1d2620", // chữ chính
  inkSoft: "#5c665e", // chữ phụ
  hairline: "#c8d0c3", // đường kẻ mảnh
  // Khung trình xem (ngoài trang)
  chrome: "#111912",
  chromeFg: "#e8eee6",
  chromeMuted: "#8a968b",
} as const;

export type ThemeKey = keyof typeof theme;

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Style inline gắn vào <html> để toàn bộ ứng dụng dùng chung một bảng màu. */
export const themeVars = Object.fromEntries(
  Object.entries(theme).map(([key, value]) => [`--cat-${kebab(key)}`, value]),
) as CSSProperties;
