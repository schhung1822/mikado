import {
  collection,
  sizeGuide,
  swatches,
  swatchesCopy,
  type Swatch,
} from "@/lib/catalogue/products";
import { DOCUMENT, MARGIN } from "@/lib/catalogue/identity";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { Page, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

export const PRODUCTS_FOLIO = ["16", "17"] as const;

const HERO = { width: 342, height: 604 };
const SPEC_TOP = 662;

function ProductsLeftPage() {
  const colLeft = HERO.width + 28;
  return (
    <Page side="left">
      <RunningHead side="left" label="Gạch ốp lát" />

      {/* Ảnh không gian — tràn lề trái và lề trên */}
      <Reveal
        className="absolute left-0 top-0"
        style={{ width: HERO.width, height: HERO.height }}
        y={0}
      >
        <div className="relative size-full overflow-hidden bg-stone">
          <Photo photo={collection.hero} sizes="1100px" priority />
        </div>
      </Reveal>
      <Reveal
        delay={0.35}
        className="absolute"
        style={{ left: MARGIN.outer, top: HERO.height + 10, width: 290 }}
      >
        <p className="text-[7px] leading-[1.6] text-ink-soft">
          {collection.heroCaption}
        </p>
        <p className="mt-0.5 text-[6px] leading-[1.6] tracking-[0.02em] text-ink-soft/80">
          {collection.hero.credit}
        </p>
      </Reveal>

      {/* Cột tiêu đề */}
      <div
        className="absolute"
        style={{ left: colLeft, right: MARGIN.inner, top: 58 }}
      >
        <Reveal delay={0.1}>
          <p className="text-[6.5px] font-medium uppercase leading-[1.7] tracking-[0.22em] text-bronze">
            {collection.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[54px] font-semibold leading-[0.95] tracking-[-0.005em] text-ink">
            {collection.name}
          </h2>
          <p className="mt-2.5 font-display text-[12.5px] italic leading-snug text-ink-soft">
            {collection.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-5 h-px w-8 bg-bronze" />
          <p className="mt-4 text-[8.5px] leading-[1.8] text-ink">
            {collection.description}
          </p>
        </Reveal>
      </div>

      {/* Mẫu slab 1:2 + nhãn dọc */}
      <Reveal
        delay={0.3}
        className="absolute"
        style={{ left: colLeft, top: 338 }}
      >
        <div className="flex items-end gap-3">
          <div
            className="relative overflow-hidden bg-stone"
            style={{ width: 118, height: 236 }}
          >
            <Photo photo={collection.slab} sizes="480px" />
          </div>
          <div
            className="pb-0.5 text-[6.5px] font-medium uppercase tracking-[0.22em] text-ink-soft"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {collection.slabCaption.size}
          </div>
        </div>
        <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.18em] text-ink">
          {collection.name}{" "}
          <span className="text-bronze">{collection.slabCaption.code}</span>
        </p>
      </Reveal>

      {/* Thông số */}
      <Reveal
        delay={0.4}
        className="absolute"
        style={{ left: MARGIN.outer, right: MARGIN.inner, top: SPEC_TOP }}
      >
        <div className="grid grid-cols-4 gap-5 border-t border-ink pt-3">
          {collection.specs.map((spec) => (
            <div key={spec.label}>
              <p className="text-[6.5px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                {spec.label}
              </p>
              <div className="mt-2 space-y-0.5">
                {spec.value.map((v) => (
                  <p
                    key={v}
                    className="font-display text-[12.5px] font-medium leading-tight text-ink"
                  >
                    {v}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <PageFooter side="left" folio={PRODUCTS_FOLIO[0]} label="Gạch ốp lát" />
    </Page>
  );
}

function SwatchCaption({
  swatch,
  className,
}: {
  swatch: Swatch;
  className?: string;
}) {
  return (
    <div className={cn("shrink-0 pt-[7px]", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-[13px] font-semibold leading-none text-ink">
          {swatch.name}
        </span>
        <span className="text-[6.5px] font-medium tracking-[0.14em] text-bronze">
          {swatch.code}
        </span>
      </div>
      <p className="mt-[5px] text-[7px] leading-none tracking-[0.04em] text-ink-soft">
        {swatch.size} mm · {swatch.finish}
      </p>
    </div>
  );
}

function SwatchTile({
  swatch,
  className,
  imageClassName,
  sizes,
}: {
  swatch: Swatch;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}) {
  return (
    <figure className={cn("group flex min-h-0 flex-col", className)}>
      <div
        className={cn(
          "relative min-h-0 overflow-hidden bg-stone",
          imageClassName,
        )}
      >
        <Photo
          photo={swatch.image}
          sizes={sizes}
          className="motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>
      <SwatchCaption swatch={swatch} />
    </figure>
  );
}

const GUIDE_SCALE = 58 / 1200; // px thiết kế cho mỗi mm — quy cách 1200 mm cao 58 px

function ProductsRightPage() {
  const [big, ...rest] = swatches;
  const stacked = rest.slice(0, 2);
  const row = rest.slice(2, 5);
  const gap = 8;

  return (
    <Page side="right">
      <RunningHead side="right" label="Gạch ốp lát" />

      <div
        className="absolute"
        style={{ left: MARGIN.inner, right: MARGIN.outer, top: 48 }}
      >
        <Reveal>
          <p className="text-[6.5px] font-medium uppercase tracking-[0.22em] text-bronze">
            {swatchesCopy.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-[34px] font-semibold leading-none text-ink">
            {swatchesCopy.title}
          </h2>
        </Reveal>
        <div className="mt-[12px] h-px bg-ink" />

        <Reveal delay={0.12} className="mt-[12px]">
          <div className="grid grid-cols-6" style={{ gap }}>
            <SwatchTile
              swatch={big}
              className="col-span-4"
              imageClassName="aspect-square"
              sizes="1000px"
            />
            <div className="col-span-2 flex flex-col" style={{ gap }}>
              {stacked.map((s) => (
                <SwatchTile
                  key={s.id}
                  swatch={s}
                  className="flex-1"
                  imageClassName="flex-1"
                  sizes="500px"
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22} className="mt-[12px]">
          <div className="grid grid-cols-6" style={{ gap }}>
            {row.map((s) => (
              <SwatchTile
                key={s.id}
                swatch={s}
                className="col-span-2"
                imageClassName="aspect-[16/10]"
                sizes="500px"
              />
            ))}
          </div>
        </Reveal>

        {/* Quy cách theo tỷ lệ thật */}
        <Reveal delay={0.32} className="mt-[16px]">
          <div className="flex items-end justify-between border-t border-hairline pt-3">
            <div>
              <p className="mb-2.5 text-[6.5px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                {swatchesCopy.guideLabel}
              </p>
              <div className="flex items-end gap-[18px]">
                {sizeGuide.map(({ w, h }) => (
                  <div
                    key={`${w}x${h}`}
                    className="flex flex-col items-start gap-1.5"
                  >
                    <div
                      className="border border-ink/70 bg-stone"
                      style={{
                        width: w * GUIDE_SCALE,
                        height: h * GUIDE_SCALE,
                      }}
                    />
                    <span className="text-[6.5px] leading-none tracking-[0.06em] text-ink">
                      {w}×{h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[150px] pb-0.5">
              <dl className="space-y-1.5">
                {swatchesCopy.notes.map((n) => (
                  <div
                    key={n.label}
                    className="flex items-baseline justify-between gap-3 border-b border-hairline pb-1.5"
                  >
                    <dt className="text-[6.5px] font-medium uppercase tracking-[0.18em] text-ink-soft">
                      {n.label}
                    </dt>
                    <dd className="font-display text-[11.5px] font-medium text-ink">
                      {n.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="pt-2 text-[6px] leading-[1.5] text-ink-soft/80">
                {DOCUMENT.illustrativeNote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <PageFooter side="right" folio={PRODUCTS_FOLIO[1]} label="Gạch ốp lát" />
    </Page>
  );
}

/** Trang đôi B — Trưng bày sản phẩm gạch ốp lát (tham khảo trang in 16–17 của PDF). */
export function ProductsSpread() {
  return (
    <Spread>
      <ProductsLeftPage />
      <ProductsRightPage />
    </Spread>
  );
}
