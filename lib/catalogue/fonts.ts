import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";

/** Font hỗ trợ đầy đủ tiếng Việt (subset "vietnamese"). Đổi font tại đây. */
export const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const bodyFont = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
