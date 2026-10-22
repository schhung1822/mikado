import type { CSSProperties } from "react";

/**
 * Cấu hình nhận diện của catalogue — đổi màu, tỷ lệ trang, lề và thông tin tài liệu tại đây.
 * Chưa xác định thương hiệu chủ quản nên bảng màu đang là trung tính (đá, giấy ngà, đồng).
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
  /** Ghi chú cuối trang, hiển thị trên trang sản phẩm. */
  illustrativeNote: "Hình ảnh và thông số mang tính minh họa.",
  /**
   * File PDF cho nút "Tải PDF". Tạo bằng `npm run pdf` (xem scripts/export-pdf.mjs),
   * lưu ở public/ — đổi tên ở đây thì đổi cả trong script.
   */
  pdf: { url: "/ho-so-nang-luc.pdf", filename: "ho-so-nang-luc.pdf", label: "Tải PDF" },
} as const;

/** Màu. Khóa camelCase → biến CSS `--cat-kebab-case`, ánh xạ sang Tailwind trong app/globals.css. */
export const theme = {
  paper: "#f6f3ee", // nền trang
  stone: "#ebe6dd", // mảng nền phụ
  grout: "#d8d2c6", // mạch vữa giữa các ô
  tile: "#ffffff", // nền ô logo / ô mẫu
  ink: "#1f1e1b", // chữ chính
  inkSoft: "#6c675d", // chữ phụ
  hairline: "#cbc4b6", // đường kẻ mảnh
  bronze: "#8b6b4a", // điểm nhấn (số thứ tự, nhãn nhỏ)
  chrome: "#161513", // nền trình xem (ngoài trang)
  chromeFg: "#ebe7df",
  chromeMuted: "#8f897d",
} as const;

export type ThemeKey = keyof typeof theme;

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Style inline gắn vào <html> để toàn bộ ứng dụng dùng chung một bảng màu. */
export const themeVars = Object.fromEntries(
  Object.entries(theme).map(([key, value]) => [`--cat-${kebab(key)}`, value]),
) as CSSProperties;
