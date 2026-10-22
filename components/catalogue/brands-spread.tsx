import { brandIndex, brandNo, brands, brandsCopy, brandWall } from "@/lib/catalogue/brands";
import { MARGIN, PAGE } from "@/lib/catalogue/identity";
import { cn } from "@/lib/utils";
import { LogoImage } from "./logo-image";
import { Reveal } from "./motion";
import { Page, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

const GROUT = 6;
const COLS = 6;
const WALL_WIDTH = PAGE.width - MARGIN.inner - MARGIN.outer;
const COL = (WALL_WIDTH - GROUT * (COLS - 1)) / COLS;
/** Hàng vuông cao bằng ô 2 cột; hàng band cao bằng 1/3 ô 4 cột (tỷ lệ 3:1, khớp logo Videcor). */
const ROW_HEIGHT = {
  square: COL * 2 + GROUT,
  band: (COL * 4 + GROUT * 3) / 3,
} as const;

const byId = Object.fromEntries(brands.map((b) => [b.id, b]));

export const BRANDS_FOLIO = ["04", "05"] as const;

function BrandsLeftPage() {
  return (
    <Page side="left">
      <RunningHead side="left" label="Thương hiệu" />

      <Reveal className="absolute" style={{ left: MARGIN.outer, top: 82 }}>
        <h2 className="font-display text-[92px] font-semibold uppercase leading-[1.02] tracking-[0.01em] text-ink">
          {brandsCopy.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
      </Reveal>

      <Reveal
        delay={0.15}
        className="absolute text-right"
        style={{ right: MARGIN.inner, top: 82 + 94 }}
      >
        <div className="font-display font-lining text-[92px] font-normal italic leading-[1.02] text-bronze/80">
          {String(brands.length).padStart(2, "0")}
        </div>
      </Reveal>

      <div className="absolute h-px bg-ink" style={{ left: MARGIN.outer, right: MARGIN.inner, top: 298 }} />

      <Reveal delay={0.2} className="absolute" style={{ left: MARGIN.outer, top: 318, width: 196 }}>
        <p className="text-[9px] leading-[1.75] text-ink">{brandsCopy.intro}</p>
        <p className="mt-4 text-[7.5px] leading-[1.7] text-ink-soft">{brandsCopy.indexNote}</p>
      </Reveal>

      <Reveal delay={0.25} className="absolute" style={{ left: 274, right: MARGIN.inner, top: 316 }}>
        <ol className="border-b border-hairline">
          {brandIndex.map((b) => (
            <li key={b.id} className="flex h-[22px] items-center gap-3 border-t border-hairline">
              <span className="w-5 text-[7px] font-medium tracking-[0.12em] text-bronze">{b.no}</span>
              <span className="font-display text-[13.5px] font-semibold uppercase leading-none tracking-[0.07em] text-ink">
                {b.name}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.3} className="absolute" style={{ left: 0, top: 604, width: 396, height: 172 }}>
        <div className="relative size-full">
          <Photo photo={brandsCopy.image} sizes="800px" />
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

      <div
        className="absolute flex flex-col bg-grout"
        style={{ left: MARGIN.inner, top: MARGIN.top, width: WALL_WIDTH, gap: GROUT }}
      >
        {brandWall.map((row, r) => (
          <Reveal key={r} delay={0.08 + r * 0.07} y={6}>
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gap: GROUT, height: ROW_HEIGHT[row.height] }}
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
                        "absolute left-[7px] top-[6px] text-[6.5px] font-medium tracking-[0.14em]",
                        brand.numeralTone === "light" ? "text-white/90" : "text-bronze",
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
