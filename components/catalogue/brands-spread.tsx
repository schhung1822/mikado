import { overviewFolio } from "@/lib/catalogue/contents";
import { tileTechnical } from "@/lib/catalogue/tile-technical";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

export const BRANDS_FOLIO = overviewFolio;

function SpecificationTable() {
  const { columns, rows } = tileTechnical.structure.specifications;

  return (
    <div className="overflow-hidden bg-white text-ink">
      <div className="grid grid-cols-[1.35fr_0.92fr_0.82fr_1.08fr_0.9fr] bg-brand-light px-3 py-2 text-[7px] font-bold uppercase tracking-[0.04em] text-white">
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="divide-y divide-white">
        {rows.map((row, rowIndex) => (
          <div
            key={row[0]}
            className={cn(
              "grid grid-cols-[1.35fr_0.92fr_0.82fr_1.08fr_0.9fr] px-3 py-[6px] text-[8px] leading-none",
              rowIndex % 2 === 0 ? "bg-[#f1f2ef]" : "bg-[#dfe2dd]",
            )}
          >
            {row.map((cell, cellIndex) => (
              <span key={`${row[0]}-${cellIndex}`} className={cellIndex === 0 ? "font-semibold" : "text-ink-soft"}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Trang 12 - cấu trúc các lớp vật liệu và bảng thông số kỹ thuật. */
function TechnicalStructurePage() {
  const { eyebrow, title, sectionTitle, introduction, image, layers } = tileTechnical.structure;

  return (
    <Page side="left" tone="brand">
      <div aria-hidden className="absolute inset-y-0 right-0 w-[58px] bg-gradient-to-b from-brand-light/95 via-brand-deep/45 to-transparent" />
      <RunningHead side="left" label="Thông tin kỹ thuật" tone="brand" />

      <PageBody side="left" style={{ paddingRight: 76 }}>
        <Reveal className="pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-tint">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[20px] font-bold uppercase leading-none">{title}</h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-7">
          <h3 className="text-[15px] font-semibold uppercase leading-none">{sectionTitle}</h3>
          <p className="mt-3 max-w-[480px] text-[10px] text-justify leading-[1.75] text-white/82">{introduction}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-2 overflow-hidden px-3 py-2">
          <div className="relative h-[168px] w-full">
            <Photo photo={image} sizes="900px" fit="contain" />
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
          {layers.map((layer) => (
            <article key={layer.name} className="border-l border-brand-light/70 pl-3">
              <h4 className="text-[10px] font-bold leading-tight text-white">{layer.name}</h4>
              <p className="mt-1 text-[8px] leading-[1.5] text-white/68">{layer.text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal delay={0.28} className="mt-8">
          <SpecificationTable />
        </Reveal>
      </PageBody>

      <PageFooter side="left" folio={BRANDS_FOLIO[0]} label="Thông tin kỹ thuật" tone="brand" />
    </Page>
  );
}

function InformationTable({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <div className="overflow-hidden">
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className={cn(
            "grid grid-cols-[105px_1fr] items-center px-3 py-[7px] text-[8px] leading-[1.25]",
            index % 2 === 0 ? "bg-[#f2f3f0]" : "bg-[#dde0dc]",
          )}
        >
          <span className="font-semibold text-ink">{label}</span>
          <span className="text-ink-soft">{value}</span>
        </div>
      ))}
    </div>
  );
}

function CheckerboardTiles({
  blackTile,
  whiteTile,
}: {
  blackTile: (typeof tileTechnical.categories.popularFloor)["blackTile"];
  whiteTile: (typeof tileTechnical.categories.popularFloor)["whiteTile"];
}) {
  const tiles = [blackTile, whiteTile, whiteTile, blackTile];

  return (
    <div className="grid size-[118px] grid-cols-2 gap-[3px] bg-grout p-[2px]">
      {tiles.map((tile, index) => (
        <div key={`${tile.src}-${index}`} className="relative overflow-hidden bg-white">
          <Photo photo={tile} sizes="142px" fit="cover" />
        </div>
      ))}
    </div>
  );
}

/** Trang 13 - hai nhóm sản phẩm chính và nội dung công nghệ bề mặt, in họa tiết. */
function ProductCategoriesPage() {
  const { title, floor, wall, surfaceCopy, printingCopy, popularFloor } = tileTechnical.categories;

  return (
    <Page side="right" className="bg-white">
      <div aria-hidden className="absolute inset-y-0 right-0 w-[46px] bg-gradient-to-b from-brand-light via-brand-tint/60 to-transparent" />
      <RunningHead side="right" label="Các dòng sản phẩm" />

      <PageBody side="right" style={{ paddingRight: 78 }}>
        <Reveal className="pt-3">
          <h2 className="font-display text-[26px] font-bold uppercase leading-none text-ink">{title}</h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-2 grid grid-cols-[178px_1fr] items-center gap-6">
          <div>
            <div className="relative mt-3 h-[175px] w-[175px]">
              <Photo photo={floor.image} sizes="350px" fit="contain" />
            </div>
          </div>
          <div>
            <h3 className="text-[18px] mb-3 font-semibold uppercase leading-none text-ink">{floor.title}</h3>
            <InformationTable rows={floor.rows} />
          </div>
        </Reveal>

        <Reveal delay={0.16} className="py-3">
          <p className="text-[9px] text-justify leading-[1.65] text-ink-soft">{surfaceCopy}</p>
        </Reveal>

        <Reveal delay={0.22} className="mt-2 grid grid-cols-[1fr_180px] items-center gap-6">
          <div>
            <h3 className="text-[18px] mb-3 font-semibold uppercase leading-none text-ink">{wall.title}</h3>
            <InformationTable rows={wall.rows} />
          </div>
          <div className="relative h-[190px] w-[180px]">
            <Photo photo={wall.image} sizes="360px" fit="contain" />
          </div>
        </Reveal>

        <Reveal delay={0.3} className="py-3">
          <p className="text-[9px] text-justify leading-[1.65] text-ink-soft">{printingCopy}</p>
        </Reveal>

        <Reveal delay={0.36} className="mt-2 pt-3">
          <div className="grid grid-cols-[134px_1fr] items-center gap-4">
            <CheckerboardTiles blackTile={popularFloor.blackTile} whiteTile={popularFloor.whiteTile} />

            <div>
              <p className="text-[6.5px] font-semibold uppercase tracking-[0.22em] text-brand-deep">{popularFloor.eyebrow}</p>
              <h3 className="mt-1.5 text-[16px] font-semibold uppercase leading-none text-ink">{popularFloor.title}</h3>
              <p className="mt-2 text-[9px] text-justify leading-[1.45] text-ink-soft">{popularFloor.description}</p>

              <dl className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1.5">
                {popularFloor.facts.map(([label, value]) => (
                  <div key={label} className="pt-1.5">
                    <dt className="text-[7px] font-semibold uppercase tracking-[0.14em] text-brand-deep">{label}</dt>
                    <dd className="mt-1 text-[8px] leading-[1.35] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </PageBody>

      <PageFooter side="right" folio={BRANDS_FOLIO[1]} label="Các dòng sản phẩm" />
    </Page>
  );
}

/** Trang đôi 12-13 - thông tin kỹ thuật và các dòng sản phẩm gạch men. */
export function BrandsSpread() {
  return (
    <Spread>
      <TechnicalStructurePage />
      <ProductCategoriesPage />
    </Spread>
  );
}
