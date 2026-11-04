import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont } from "@/lib/catalogue/fonts";
import { themeVars } from "@/lib/catalogue/identity";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIKADO-MT - Hồ sơ năng lực",
  description: "THE COMPANY PROFILE - MIKADO-MT",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      style={themeVars}
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-chrome font-body text-chrome-fg">{children}</body>
    </html>
  );
}
