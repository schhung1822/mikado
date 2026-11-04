import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DOCUMENT, MARGIN, PAGE, SPREAD } from "@/lib/catalogue/identity";

export type PageSide = "left" | "right" | "single";

/**
 * Tông nền của trang: "light" = giấy trắng (mặc định), "brand" = nền xanh thương hiệu.
 * Trang sản phẩm thương hiệu xen kẽ hai tông này (xem components/catalogue/entries.tsx).
 */
export type PageTone = "light" | "brand";

/** Nền của tông xanh: xanh đậm của logo MIKADO-MT chuyển dần sang xanh rất đậm (chữ trắng đạt tương phản AAA). */
const BRAND_BACKGROUND = "linear-gradient(165deg, var(--cat-brand-deep) 0%, var(--cat-brand-night) 100%)";

/** Lề trái/phải theo vị trí trang: trang trái có gáy ở bên phải, trang phải có gáy ở bên trái. */
export function pageInsets(side: PageSide) {
  return {
    left: side === "right" ? MARGIN.inner : MARGIN.outer,
    right: side === "left" ? MARGIN.inner : MARGIN.outer,
  };
}

interface PageProps {
  side?: PageSide;
  tone?: PageTone;
  className?: string;
  children: ReactNode;
}

/** Một trang A4 cố định kích thước (px thiết kế). Nội dung đặt tuyệt đối hoặc trong <PageBody>. */
export function Page({ side = "single", tone = "light", className, children }: PageProps) {
  return (
    <section
      data-page={side}
      data-tone={tone}
      className={cn(
        "catalogue-page relative shrink-0 overflow-hidden",
        tone === "brand" ? "text-white" : "bg-paper text-ink",
        className,
      )}
      style={{ width: PAGE.width, height: PAGE.height, background: tone === "brand" ? BRAND_BACKGROUND : undefined }}
    >
      {children}
    </section>
  );
}

/** Vùng nội dung bên trong lề của trang. */
export function PageBody({
  side = "single",
  className,
  style,
  children,
}: PageProps & { style?: CSSProperties }) {
  const { left, right } = pageInsets(side);
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{ paddingTop: MARGIN.top, paddingBottom: MARGIN.bottom, paddingLeft: left, paddingRight: right, ...style }}
    >
      {children}
    </div>
  );
}

/** Đầu trang: tên tài liệu (running head). */
export function RunningHead({ side = "single", label, tone = "light" }: { side?: PageSide; label: string; tone?: PageTone }) {
  const { left, right } = pageInsets(side);
  return (
    <div
      className={cn(
        "absolute flex items-center gap-3 text-[7px] font-medium uppercase tracking-[0.24em]",
        tone === "brand" ? "text-white/75" : "text-ink-soft",
        side === "right" && "flex-row-reverse",
      )}
      style={{ top: 26, left, right }}
    >
      <span>{DOCUMENT.title}</span>
      <span className={cn("h-px w-6", tone === "brand" ? "bg-white/35" : "bg-hairline")} aria-hidden />
      <span>{label}</span>
    </div>
  );
}

/** Chân trang: số trang ở phía lề ngoài. */
export function PageFooter({
  side = "single",
  folio,
  label,
  tone = "light",
}: {
  side?: PageSide;
  folio: string;
  label?: string;
  tone?: PageTone;
}) {
  const { left, right } = pageInsets(side);
  return (
    <div
      className={cn("absolute flex items-baseline gap-2.5", side === "right" ? "flex-row-reverse" : "")}
      style={{ bottom: 24, left, right }}
    >
      <span className={cn("font-display font-lining text-[15px] font-medium leading-none", tone === "brand" ? "text-white" : "text-ink")}>
        {folio}
      </span>
      {label ? (
        <span className={cn("text-[6.5px] font-medium uppercase tracking-[0.24em]", tone === "brand" ? "text-white/75" : "text-ink-soft")}>
          {label}
        </span>
      ) : null}
    </div>
  );
}

/** Khung trang đôi: hai trang A4 sát nhau, có bóng gáy rất nhẹ để tạo cảm giác sách. */
export function Spread({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-spread
      className={cn("relative flex shrink-0", className)}
      style={{ width: SPREAD.width, height: SPREAD.height }}
    >
      {children}
      <div
        aria-hidden
        className="spine-shade pointer-events-none absolute inset-y-0 left-1/2 w-14 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/[0.055] to-transparent print:hidden"
      />
      <div aria-hidden className="spine-shade pointer-events-none absolute inset-y-0 left-1/2 w-px bg-black/[0.07] print:hidden" />
    </div>
  );
}

/** Dành cho bìa đầu / bìa cuối sau này: một trang đơn đứng riêng. */
export function SinglePage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Page side="single" className={className}>
      {children}
    </Page>
  );
}
