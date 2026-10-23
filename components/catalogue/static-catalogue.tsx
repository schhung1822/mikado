import { PAGE, SPREAD } from "@/lib/catalogue/identity";
import type { CatalogueEntry } from "@/lib/catalogue/types";

/**
 * Toàn bộ catalogue ở trạng thái tĩnh: mọi mục xếp nối tiếp, không animation, không thanh điều khiển.
 * Đây là đầu vào cho bước xuất PDF sau này (ví dụ trang /print dùng với Puppeteer).
 */
export function StaticCatalogue({ entries }: { entries: CatalogueEntry[] }) {
  return (
    <div className="flex flex-col items-center gap-8 bg-chrome py-8 print:block print:bg-white print:py-0">
      {entries.map((entry) => {
        const size = entry.kind === "spread" ? SPREAD : PAGE;
        return (
          <div
            key={entry.id}
            id={entry.id}
            data-kind={entry.kind}
            className="catalogue-sheet shrink-0 bg-paper shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
            style={{ width: size.width, height: size.height }}
          >
            {entry.node}
          </div>
        );
      })}
    </div>
  );
}
