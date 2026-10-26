import { logoRatio } from "@/lib/catalogue/brands";
import type { BrandProductPage, Sample, SizeGroup } from "@/lib/catalogue/products";
import { cn } from "@/lib/utils";
import { LogoImage } from "./logo-image";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, pageInsets, RunningHead, Spread, type PageTone } from "./page-frame";
import { Photo } from "./photo";

/**
 * Màu theo tông nền. Tông "light" = chữ đậm trên giấy trắng; tông "brand" = chữ trắng trên nền xanh thương hiệu.
 * Các trang sản phẩm thương hiệu xen kẽ hai tông (xem entries.tsx).
 */
const TONES = {
  light: {
    soft: "text-ink-soft",
    accent: "text-brand-deep",
    body: "text-ink",
    rule: "bg-brand",
    strong: "border-ink",
    hair: "border-hairline",
    frame: "border-hairline bg-stone/70",
    photoFrame: "border-hairline bg-tile",
    glyph: "border-ink",
  },
  brand: {
    soft: "text-white/75",
    accent: "text-brand-tint",
    body: "text-white",
    rule: "bg-white",
    strong: "border-white/80",
    hair: "border-white/25",
    frame: "border-white/35 bg-white/10",
    photoFrame: "border-white/40 bg-tile",
    glyph: "border-white",
  },
} satisfies Record<PageTone, Record<string, string>>;

/** Lưới mặc định: nhãn 2 cột + 3 mẫu ở hàng đầu, các hàng sau 5 mẫu. */
const GRID_COLUMNS = 5;
const LABEL_COLUMNS = 2;

/** Tỷ lệ khung của một ô mẫu — đúng tỷ lệ viên gạch: vuông thì 1:1, chữ nhật 1:2 (dọc hoặc xoay ngang). */
function tileAspect(group: SizeGroup) {
  const long = Math.max(group.width, group.height);
  const short = Math.min(group.width, group.height);
  if (group.width === group.height) return "1 / 1";
  // Ảnh ghép 3 viên chữ nhật xếp chồng: rộng = cạnh dài, cao = 3 × cạnh ngắn.
  if (group.stacked) return `${long} / ${short * 3}`;
  return group.orientation === "landscape" ? `${long} / ${short}` : `${short} / ${long}`;
}

/** Một ô mẫu. Chưa có ảnh: khung trống. Có ảnh: ảnh nằm đúng khung (mặc định hiển thị nguyên ảnh, không crop). */
function SampleTile({
  sample,
  aspect,
  label,
  tone,
  dense = false,
}: {
  sample: Sample;
  aspect: string;
  label: string;
  tone: PageTone;
  dense?: boolean;
}) {
  const { image, code, codes } = sample;
  const lines = codes ?? (code ? [code] : []);
  const t = TONES[tone];
  return (
    <figure className="m-0 min-w-0 self-start">
      <div
        role="img"
        aria-label={image ? image.alt : `Khung ảnh trống, gạch ${label} mm`}
        className={cn("relative w-full overflow-hidden border", image ? t.photoFrame : t.frame)}
        style={{ aspectRatio: aspect }}
      >
        {image ? <Photo photo={image} fit={image.fit ?? "contain"} sizes="200px" /> : null}
      </div>
      {lines.length ? (
        <figcaption
          className={cn(
            "font-lining",
            dense ? "mt-1 text-[5.5px] leading-[1.3] tracking-normal" : "mt-1.5 text-[6.5px] leading-[1.4] tracking-[0.04em]",
            t.soft,
          )}
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Nhóm gạch ốp xếp chồng: tiêu đề gọn phía trên, các bộ ảnh ghép theo lưới tối đa 4 cột. Hai nhóm liền nhau nằm cạnh nhau. */
function StackedSection({ group, tone, wide = false }: { group: SizeGroup; tone: PageTone; wide?: boolean }) {
  const t = TONES[tone];
  const aspect = tileAspect(group);
  const label = `${group.width} × ${group.height}`;
  const details = [group.application, group.finish].filter(Boolean).join(" · ");
  const dense = group.samples.length > 3;
  const columns = Math.min(wide ? 6 : 4, Math.max(3, group.samples.length));
  return (
    <section aria-label={`Gạch ${label} mm`} className="min-w-0">
      <div className="flex min-w-0 gap-2.5">
        <span aria-hidden className={cn("w-2.5 shrink-0 self-stretch border-y-2 border-l-2", t.glyph)} />
        <div className="min-w-0 py-px">
          <p className="font-display font-lining text-[21px] font-bold leading-none">
            {label}
            <span className="ml-1 text-[9px] font-semibold">mm</span>
          </p>
          {details ? <p className={cn("mt-1.5 text-[7.5px] leading-[1.45]", t.soft)}>{details}</p> : null}
        </div>
      </div>
      <div className={cn("mt-2.5 grid", dense ? "gap-1.5" : "gap-2")} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {group.samples.map((sample, i) => (
          <SampleTile key={i} sample={sample} aspect={aspect} label={label} tone={tone} dense={dense} />
        ))}
      </div>
    </section>
  );
}

/** Nhóm bộ ba đặt ở cuối trang giới thiệu, thay ảnh nền và dùng toàn bộ bề rộng vùng nội dung. */
function AboutStackedSection({ group, tone }: { group: SizeGroup; tone: PageTone }) {
  const t = TONES[tone];
  const aspect = tileAspect(group);
  const label = `${group.width} × ${group.height}`;
  const details = [group.application, group.finish].filter(Boolean).join(" · ");
  return (
    <section aria-label={`Gạch ${label} mm`} className={cn("border-t pt-2.5", t.hair)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={cn("text-[6px] font-medium uppercase tracking-[0.24em]", t.accent)}>Gạch ốp tường</p>
          <p className="mt-1 font-display font-lining text-[20px] font-bold leading-none">
            {label}
            <span className="ml-1 text-[8px] font-semibold">mm</span>
          </p>
        </div>
        {details ? <p className={cn("pb-0.5 text-[7px] leading-[1.4]", t.soft)}>{details}</p> : null}
      </div>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {group.samples.map((sample, i) => (
          <SampleTile key={i} sample={sample} aspect={aspect} label={label} tone={tone} />
        ))}
      </div>
    </section>
  );
}

/**
 * Một nhóm kích thước theo lưới 5 cột: ô nhãn chiếm 2 cột đầu của hàng đầu, 3 mẫu đầu nằm cạnh nhãn.
 * Nhóm trên 8 mẫu dùng 6 cột để tránh phát sinh hàng thứ ba vượt chiều cao trang.
 */
function SizeSection({ group, tone, dense = false }: { group: SizeGroup; tone: PageTone; dense?: boolean }) {
  const t = TONES[tone];
  const aspect = tileAspect(group);
  const label = `${group.width} × ${group.height}`;
  const columns = group.samples.length > 8 || (dense && group.samples.length > 6) ? 6 : GRID_COLUMNS;
  const details = [
    group.application ? { name: "Ứng dụng", value: group.application } : null,
    group.finish ? { name: "Bề mặt", value: group.finish } : null,
  ].filter((d): d is { name: string; value: string } => d !== null);
  return (
    <section aria-label={`Gạch ${label} mm`} className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      <div className="flex min-w-0 gap-3" style={{ gridColumn: `span ${LABEL_COLUMNS}` }}>
        {/* Dấu ngoặc vuông cao bằng hàng đầu: gợi ô quy cách trong tài liệu tham khảo */}
        <span aria-hidden className={cn("w-3.5 shrink-0 self-stretch border-y-2 border-l-2", t.glyph)} />
        <div className="min-w-0 pb-0.5">
          <p className="font-display font-lining text-[21px] font-bold leading-none">
            {label}
            <span className="ml-1 text-[9px] font-semibold">mm</span>
          </p>
          <dl className={cn("mt-2 space-y-[3px] text-[7.5px] leading-[1.45]", t.soft)}>
            {details.map((d) => (
              <div key={d.name}>
                <dt className="inline">{d.name}: </dt>
                <dd className="inline">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {group.samples.map((sample, i) => (
        <SampleTile key={i} sample={sample} aspect={aspect} label={label} tone={tone} />
      ))}
    </section>
  );
}

const LOGO_HEIGHT = 48;
const LOGO_MAX_WIDTH = 190;

/** Tên thương hiệu; logo (nếu có) đặt bên phải, đúng tỷ lệ gốc, trên mảng trắng để giữ nguyên màu ở cả hai tông nền. */
function BrandHeading({ page, tone }: { page: BrandProductPage; tone: PageTone }) {
  const { brand, about } = page;
  const t = TONES[tone];
  const fill = brand.logo?.fill;
  const ratio = brand.logo ? logoRatio({ logo: brand.logo }) : 1;
  const logoWidth = Math.min(LOGO_MAX_WIDTH, LOGO_HEIGHT * ratio);
  const logoHeight = logoWidth / ratio; // đúng tỷ lệ logo nên logo phủ kín ô mà không bị cắt
  const pad = fill ? 0 : 8;
  return (
    <div className="flex items-end justify-between gap-6 pt-4">
      <div>
        <p className={cn("text-[6.5px] font-medium uppercase tracking-[0.28em]", t.accent)}>{about.eyebrow}</p>
        <h2 className="mt-3 font-display text-[68px] font-bold uppercase leading-[0.98] tracking-[0.02em]">{brand.name}</h2>
      </div>
      {brand.logo ? (
        <div
          className={cn("mb-1 shrink-0 bg-tile", tone === "light" && !fill && "border border-hairline")}
          style={{ width: logoWidth + pad * 2, height: logoHeight + pad * 2, padding: pad }}
        >
          <LogoImage brand={{ name: brand.name, logo: brand.logo }} className="block size-full" />
        </div>
      ) : null}
    </div>
  );
}

/** Trang trái — giới thiệu thương hiệu: tên, câu dẫn, đoạn giới thiệu hai cột, ba ý nổi bật, ảnh tràn lề. */
function AboutPage({ page, tone }: { page: BrandProductPage; tone: PageTone }) {
  const { about, brand } = page;
  const t = TONES[tone];
  const featuredGroup = page.products.groups.find((group) => group.placement === "about");
  const insets = pageInsets("left");
  return (
    <Page side="left" tone={tone}>
      <RunningHead side="left" label={brand.name} tone={tone} />

      <PageBody side="left">
        <Reveal>
          <BrandHeading page={page} tone={tone} />
        </Reveal>

        <Reveal delay={0.1} className="mt-5">
          <div className={cn("h-0.5", t.rule)} />
        </Reveal>

        <Reveal delay={0.16} className="mt-6">
          <p className={cn("text-[6.5px] font-medium uppercase tracking-[0.28em]", t.accent)}>{about.title}</p>
          <p className="mt-3 max-w-[410px] font-display text-[19px] font-medium italic leading-[1.38]">{about.lead}</p>
        </Reveal>

        <Reveal delay={0.22} className="mt-6">
          <div className={cn("text-[8.5px] leading-[1.9]", t.body)} style={{ columnCount: 2, columnGap: 22, maxWidth: 470 }}>
            {about.paragraphs.map((p, i) => (
              <p key={p} className={cn("break-inside-avoid", i > 0 && "mt-3")}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.28} className="mt-8">
          <ol className="grid grid-cols-3 gap-5">
            {about.highlights.map((h, i) => (
              <li key={h.title} className={cn("border-t pt-2.5", t.hair)}>
                <span className={cn("text-[7px] font-medium tracking-[0.16em]", t.accent)}>{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-[14.5px] font-semibold leading-tight">{h.title}</p>
                <p className={cn("mt-1.5 text-[7.5px] leading-[1.75]", t.soft)}>{h.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </PageBody>

      {featuredGroup ? (
        <Reveal delay={0.34} className="absolute" style={{ left: insets.left, right: insets.right, bottom: 64 }}>
          <AboutStackedSection group={featuredGroup} tone={tone} />
        </Reveal>
      ) : about.image ? (
        <Reveal delay={0.34} className="absolute" style={{ left: 0, bottom: 64, width: 410, height: 196 }}>
          <div className="relative size-full bg-stone">
            <Photo photo={about.image} sizes="820px" />
          </div>
        </Reveal>
      ) : null}

      <PageFooter side="left" folio={page.folio[0]} label={brand.name} tone={tone} />
    </Page>
  );
}

/** Trang phải — tiêu đề và các nhóm kích thước, mỗi nhóm một lưới mẫu. */
function ProductsPage({ page, tone }: { page: BrandProductPage; tone: PageTone }) {
  const { products, brand } = page;
  const t = TONES[tone];
  const visibleGroups = products.groups.filter((group) => group.placement !== "about");
  // Các nhóm `stacked` liền nhau ghép từng cặp thành một hàng; nhóm thường chiếm trọn một hàng.
  const rows = visibleGroups.reduce<SizeGroup[][]>((acc, group) => {
    const last = acc[acc.length - 1];
    if (group.stacked && last && last[0].stacked && last.length < 2) last.push(group);
    else acc.push([group]);
    return acc;
  }, []);
  // Trang có nhóm ghép bộ cao hơn bình thường (ảnh 2 : 3 + 3 dòng mã) nên thu gọn khoảng cách dọc cho vừa trang.
  const compact = visibleGroups.some((g) => g.stacked);
  const dense = visibleGroups.some((g) => g.stacked && g.samples.length > 3);
  return (
    <Page side="right" tone={tone}>
      <RunningHead side="right" label={products.title} tone={tone} />

      <PageBody side="right">
        <Reveal className="pt-4">
          <h3 className="font-display text-[30px] font-bold uppercase leading-none tracking-[0.02em]">{products.title}</h3>
          <div className={cn("mt-3.5 h-0.5", t.rule)} />
        </Reveal>

        <div className={cn("flex flex-col", compact ? "mt-4 gap-2.5" : "mt-6 gap-3.5")}>
          {rows.map((row, i) => (
            <Reveal key={row[0].id} delay={0.12 + i * 0.1} y={6}>
              {row[0].stacked && row.length > 1 ? (
                <div className="grid grid-cols-2 gap-5">
                  {row.map((group) => (
                    <StackedSection key={group.id} group={group} tone={tone} />
                  ))}
                </div>
              ) : row[0].stacked ? (
                <StackedSection group={row[0]} tone={tone} wide />
              ) : (
                <SizeSection group={row[0]} tone={tone} dense={dense} />
              )}
            </Reveal>
          ))}
        </div>
      </PageBody>

      <PageFooter side="right" folio={page.folio[1]} label={brand.name} tone={tone} />
    </Page>
  );
}

/**
 * Template trang đôi sản phẩm của một thương hiệu: trái = giới thiệu, phải = mẫu theo nhóm kích thước (lưới 5 cột).
 * Dữ liệu ở lib/catalogue/products.ts. `tone` do entries.tsx gán xen kẽ ("light" / "brand") theo thứ tự thương hiệu.
 * Hai trang là hai trang đơn độc lập, chỉ ghép khi xem desktop.
 */
export function BrandProductSpread({ page, tone = "light" }: { page: BrandProductPage; tone?: PageTone }) {
  return (
    <Spread>
      <AboutPage page={page} tone={tone} />
      <ProductsPage page={page} tone={tone} />
    </Spread>
  );
}
