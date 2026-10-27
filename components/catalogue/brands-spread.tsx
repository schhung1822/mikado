import { brandIndex, brands, brandsCopy } from "@/lib/catalogue/brands";
import { folioText, overviewFolio, productFolio } from "@/lib/catalogue/contents";
import { MARGIN, PAGE } from "@/lib/catalogue/identity";
import { LogoImage } from "./logo-image";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

const GAP = 8;
const WALL_WIDTH = PAGE.width - MARGIN.inner - MARGIN.outer;
/** Chiều cao thẻ logo (px thiết kế): mọi thẻ cùng kích thước, logo đặt vừa khung (meet) nên không bị cắt hay kéo giãn. */
const CARD_HEIGHT = 84;
const CARD_PAD_X = 14;
const CARD_PAD_Y = 12;

export const BRANDS_FOLIO = overviewFolio;

/** Trang trái: tiêu đề + số lượng thương hiệu, câu dẫn, danh mục hai cột kèm số trang, ảnh tràn lề. */
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
          <p className="max-w-[470px] text-[12.5px] text-justify font-light italic leading-[1.45] text-ink">{brandsCopy.intro}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-5">
          <ul className="grid grid-cols-3 gap-5">
            {brandsCopy.stats.map((stat) => (
              <li key={stat.label} className="border-t-2 border-brand pt-2.5">
                <p className="font-display font-lining text-[30px] font-semibold leading-none text-brand-deep">{stat.value}</p>
                <p className="mt-2 text-[6.5px] font-medium uppercase tracking-[0.2em] text-ink-soft">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.26} className="mt-6">
          <ol className="grid grid-flow-col grid-cols-2 gap-x-7" style={{ gridTemplateRows: `repeat(${Math.ceil(brandIndex.length / 2)}, auto)` }}>
            {brandIndex.map((b) => (
              <li key={b.id} className="flex items-baseline gap-3 border-t border-hairline py-[7px]">
                <span className="flex-1 font-display text-[14px] font-semibold uppercase leading-none tracking-[0.06em] text-ink">{b.name}</span>
                <span className="font-lining text-[7px] tracking-[0.06em] text-ink-soft">Trang {folioText(productFolio(b.id))}</span>
              </li>
            ))}
          </ol>
          <div className="border-t border-hairline" />
          <p className="mt-2.5 max-w-[420px] text-[7px] leading-[1.7] text-ink-soft">{brandsCopy.indexNote}</p>
        </Reveal>
      </PageBody>

      <Reveal delay={0.3} className="absolute" style={{ left: 0, bottom: 64, width: 410, height: 104 }}>
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

      <div className="absolute flex flex-col" style={{ left: MARGIN.inner, top: MARGIN.top + 38, width: WALL_WIDTH, gap: GAP }}>
        {/* Mọi thương hiệu (kể cả MIKADO) là thẻ trắng cùng kích thước; logo đặt vừa khung, không cắt, không kéo giãn */}
        <div className="grid grid-cols-2" style={{ gap: GAP }}>
          {brandIndex.map((brand, i) => (
            <Reveal key={brand.id} delay={0.08 + i * 0.04} y={6}>
              <div className="group relative border border-hairline bg-tile" style={{ height: CARD_HEIGHT }}>
                <div
                  className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
                  style={{ padding: `${CARD_PAD_Y}px ${CARD_PAD_X}px` }}
                >
                  <LogoImage brand={{ ...brand, fill: false }} className="block size-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Khung nội dung chiếm trọn hai cột, nằm dưới lưới logo */}
        <Reveal delay={0.08 + brandIndex.length * 0.04} y={6}>
          <div className="grid flex flex-col items-start gap-3 bg-brand-deep px-5 py-4 text-white">
            <p className="border-b border-white/25 pb-3 font-display text-[19px] font-semibold leading-[1.2]">{brandsCopy.wallStory.title}</p>
            <p className="text-[10px] leading-[1.75] text-white/85">{brandsCopy.wallStory.text}</p>
          </div>
        </Reveal>
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
