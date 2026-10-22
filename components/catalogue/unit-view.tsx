import { PAGE, SPREAD } from "@/lib/catalogue/identity";
import type { CatalogueEntry } from "@/lib/catalogue/types";
import { cn } from "@/lib/utils";

/**
 * "Đơn vị xem": cả mục (`full`: trang đôi hoặc trang đơn) hoặc một nửa trang đôi (`left` / `right`).
 * Desktop xem theo trang đôi; mobile xem từng trang — cùng một nội dung, chỉ khác khung cắt.
 */
export type UnitPart = "full" | "left" | "right";

export function unitSize(kind: CatalogueEntry["kind"], part: UnitPart) {
  return {
    width: kind === "spread" && part === "full" ? SPREAD.width : PAGE.width,
    height: PAGE.height,
  };
}

interface UnitViewProps {
  entry: CatalogueEntry;
  part: UnitPart;
  scale: number;
  className?: string;
}

/** Hiển thị một đơn vị xem ở tỷ lệ `scale`, cắt đúng nửa trang cần xem. */
export function UnitView({ entry, part, scale, className }: UnitViewProps) {
  const { width, height } = unitSize(entry.kind, part);
  const sourceWidth = entry.kind === "spread" ? SPREAD.width : PAGE.width;
  const offset = part === "right" ? PAGE.width : 0;
  return (
    <div
      data-view={part === "full" ? "spread" : "page"}
      className={cn("relative overflow-hidden bg-paper", className)}
      style={{ width: width * scale, height: height * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: sourceWidth,
          height,
          transform: `translateX(${-offset * scale}px) scale(${scale})`,
        }}
      >
        {entry.node}
      </div>
    </div>
  );
}
