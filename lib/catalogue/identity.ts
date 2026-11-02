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
 * Bảng màu catalogue lấy từ bìa hồ sơ năng lực: giấy ivory, beige, taupe và
 * charcoal ấm. Logo MIKADO-MT giữ nguyên màu gốc; đỏ chỉ dùng làm điểm nhấn nhỏ.
 * Đổi nhận diện thì chỉ cần sửa các giá trị dưới đây.
 */
export const theme = {
  // Trung tính ấm lấy cảm hứng từ các mảng gạch trên bìa tham chiếu
  brand: "#9a876f", // taupe chính — mảng màu, đường kẻ, nút
  brandDeep: "#5b544b", // xám nâu đậm — chữ nhấn, trạng thái active
  brandLight: "#c1b094", // beige — mảng phụ
  brandTint: "#e3dbcf", // ivory-beige — nền mảng, ô nhấn
  brandNight: "#292723", // charcoal ấm — điểm cuối gradient nền trang đậm
  signal: "#e74038", // đỏ của chữ MIKADO-MT — chỉ dùng điểm nhấn nhỏ
  // Nền & chữ trung tính
  paper: "#f7f3eb", // nền giấy ivory
  stone: "#ece6dc", // mảng nền phụ, khung ảnh trống
  grout: "#d9d0c3", // mạch vữa giữa các ô
  tile: "#fffcf7", // nền ô logo / ô mẫu
  ink: "#25231f", // chữ chính charcoal
  inkSoft: "#69625a", // chữ phụ xám nâu
  hairline: "#ccc2b5", // đường kẻ mảnh
  // Khung trình xem (ngoài trang)
  chrome: "#191714",
  chromeFg: "#f3eee6",
  chromeMuted: "#aaa095",
} as const;

export type ThemeKey = keyof typeof theme;

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Style inline gắn vào <html> để toàn bộ ứng dụng dùng chung một bảng màu. */
export const themeVars = Object.fromEntries(
  Object.entries(theme).map(([key, value]) => [`--cat-${kebab(key)}`, value]),
) as CSSProperties;
