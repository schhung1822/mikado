import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DOCUMENT, MARGIN, PAGE, SPREAD } from "@/lib/catalogue/identity";

export type PageSide = "left" | "right" | "single";

/** Lề trái/phải theo vị trí trang: trang trái có gáy ở bên phải, trang phải có gáy ở bên trái. */
export function pageInsets(side: PageSide) {
  return {
    left: side === "right" ? MARGIN.inner : MARGIN.outer,
    right: side === "left" ? MARGIN.inner : MARGIN.outer,
  };
}

interface PageProps {
  side?: PageSide;
  className?: string;
  children: ReactNode;
}

/** Một trang A4 cố định kích thước (px thiết kế). Nội dung đặt tuyệt đối hoặc trong <PageBody>. */
export function Page({ side = "single", className, children }: PageProps) {
  return (
    <section
      data-page={side}
      className={cn("catalogue-page relative shrink-0 overflow-hidden bg-paper text-ink", className)}
      style={{ width: PAGE.width, height: PAGE.height }}
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
export function RunningHead({ side = "single", label }: { side?: PageSide; label: string }) {
  const { left, right } = pageInsets(side);
  return (
    <div
      className={cn(
        "absolute flex items-center gap-3 text-[7px] font-medium uppercase tracking-[0.24em] text-ink-soft",
        side === "right" && "flex-row-reverse",
      )}
      style={{ top: 26, left, right }}
    >
      <span>{DOCUMENT.title}</span>
      <span className="h-px w-6 bg-hairline" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

/** Chân trang: số trang ở phía lề ngoài. */
export function PageFooter({ side = "single", folio, label }: { side?: PageSide; folio: string; label?: string }) {
  const { left, right } = pageInsets(side);
  return (
    <div
      className={cn("absolute flex items-baseline gap-2.5", side === "right" ? "flex-row-reverse" : "")}
      style={{ bottom: 24, left, right }}
    >
      <span className="font-display font-lining text-[15px] font-medium leading-none text-ink">{folio}</span>
      {label ? (
        <span className="text-[6.5px] font-medium uppercase tracking-[0.24em] text-ink-soft">{label}</span>
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
