import { brandIndex, brandNo, brands, brandsCopy, brandWall, logoRatio } from "@/lib/catalogue/brands";
import { overviewFolio } from "@/lib/catalogue/contents";
import { MARGIN, PAGE } from "@/lib/catalogue/identity";
import { cn } from "@/lib/utils";
import { LogoImage } from "./logo-image";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

const GROUT = 5;
const COLS = 6;
const WALL_WIDTH = PAGE.width - MARGIN.inner - MARGIN.outer;
const COL = (WALL_WIDTH - GROUT * (COLS - 1)) / COLS;
const spanWidth = (span: number) => span * COL + (span - 1) * GROUT;

const byId = Object.fromEntries(brands.map((b) => [b.id, b]));

/** Chiều cao hàng = chiều rộng ô `anchor` chia tỷ lệ logo của nó (xem `brandWall` trong brands.ts). */
const rowHeight = (row: (typeof brandWall)[number]) => {
  const cell = row.cells.find((c) => c.brand === row.anchor) ?? row.cells[0];
  return spanWidth(cell.span) / logoRatio(byId[row.anchor]);
};

export const BRANDS_FOLIO = overviewFolio;

/** Trang trái: tiêu đề + số lượng thương hiệu, câu dẫn, danh mục hai cột (cùng số thứ tự với bức tường logo), ảnh tràn lề. */
function BrandsLeftPage() {
  return (
    <Page side="left">
      <RunningHead side="left" label="Thương hiệu" />

      <PageBody side="left">
        <Reveal className="pt-4">
          <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-deep">{brandsCopy.eyebrow}</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="font-display text-[76px] font-bold uppercase leading-[0.98] tracking-[0.015em] text-ink">
              {brandsCopy.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <span className="pr-1 font-display font-lining text-[84px] font-normal italic leading-[0.9] text-brand-light">
              {String(brands.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-5">
          <div className="h-0.5 bg-brand" />
        </Reveal>

        <Reveal delay={0.16} className="mt-6">
          <p className="max-w-[400px] font-display text-[17px] font-medium italic leading-[1.4] text-ink">{brandsCopy.intro}</p>
        </Reveal>

        <Reveal delay={0.24} className="mt-6">
          <ol className="grid grid-flow-col grid-cols-2 gap-x-7" style={{ gridTemplateRows: `repeat(${Math.ceil(brandIndex.length / 2)}, auto)` }}>
            {brandIndex.map((b) => (
              <li key={b.id} className="flex items-baseline gap-3 border-t border-hairline py-2">
                <span className="w-5 shrink-0 text-[7px] font-medium tracking-[0.14em] text-brand-deep">{b.no}</span>
                <span className="font-display text-[14px] font-semibold uppercase leading-none tracking-[0.06em] text-ink">{b.name}</span>
              </li>
            ))}
          </ol>
          <div className="border-t border-hairline" />
          <p className="mt-3 text-[7px] leading-[1.7] text-ink-soft">{brandsCopy.indexNote}</p>
        </Reveal>
      </PageBody>

      <Reveal delay={0.3} className="absolute" style={{ left: 0, bottom: 64, width: 410, height: 168 }}>
        <div className="relative size-full bg-stone">
          <Photo photo={brandsCopy.image} sizes="820px" />
        </div>
      </Reveal>

      <PageFooter side="left" folio={BRANDS_FOLIO[0]} label="Thương hiệu" />
    </Page>
  );
}

function BrandsRightPage() {
  return (
    <Page side="right">
      <RunningHead side="right" label="Danh mục thương hiệu" />

      <Reveal className="absolute" style={{ left: MARGIN.inner, top: MARGIN.top + 8, width: WALL_WIDTH }}>
        <div className="flex items-baseline justify-between text-[6.5px] font-medium uppercase tracking-[0.28em]">
          <span className="text-brand-deep">{brandsCopy.wallLabel}</span>
          <span className="text-ink-soft">{String(brands.length).padStart(2, "0")} thương hiệu</span>
        </div>
        <div className="mt-2.5 h-0.5 bg-brand" />
      </Reveal>

      <div
        className="absolute flex flex-col bg-grout"
        style={{ left: MARGIN.inner, top: MARGIN.top + 38, width: WALL_WIDTH, gap: GROUT }}
      >
        {brandWall.map((row, r) => (
          <Reveal key={r} delay={0.08 + r * 0.07} y={6}>
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gap: GROUT, height: rowHeight(row) }}
            >
              {row.cells.map(({ brand: id, span }) => {
                const brand = byId[id];
                return (
                  <div
                    key={id}
                    className="group relative overflow-hidden bg-tile"
                    style={{ gridColumn: `span ${span}`, backgroundColor: brand.bg }}
                  >
                    <div
                      className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
                      style={{ padding: brand.fill ? 0 : (brand.pad ?? 18) }}
                    >
                      <LogoImage brand={brand} className="block size-full" />
                    </div>
                    <span
                      className={cn(
                        "absolute bottom-[5px] right-[7px] text-[6.5px] font-medium tracking-[0.14em]",
                        brand.numeralTone === "light" ? "text-white/90" : "text-brand-deep",
                      )}
                    >
                      {brandNo(id)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>

      <PageFooter side="right" folio={BRANDS_FOLIO[1]} label="Thương hiệu" />
    </Page>
  );
}

/** Trang đôi A — Giới thiệu các thương hiệu (tham khảo trang in 4–5 của PDF). */
export function BrandsSpread() {
  return (
    <Spread>
      <BrandsLeftPage />
      <BrandsRightPage />
    </Spread>
  );
}
