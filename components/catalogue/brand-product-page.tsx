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
/** Ba mẫu 800 × 800 đầu tiên được giới thiệu cỡ lớn ở trang trái và không lặp lại trong dải trang phải. */
const SHOWCASE_PALETTE_COUNT = 3;
/** Các trang có nội dung giới thiệu dài cần nhịp dọc gọn hơn để giữ khoảng an toàn với media cuối trang. */
const COMPACT_ABOUT_PAGE_IDS = new Set([
  "cerinco",
  "videcor",
  "goldentile",
  "feraza",
  "claza",
  "lexxa",
  "mostile",
  "cvgroup",
  "alaska",
  "nhuphat",
]);
/** Nhóm có nội dung dài nhất cần đồng thời giảm nhẹ cỡ chữ và line-height. */
const DENSE_ABOUT_PAGE_IDS = new Set(["videcor", "mostile", "cvgroup", "alaska", "nhuphat"]);

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
}: {
  sample: Sample;
  aspect: string;
  label: string;
  tone: PageTone;
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
        <figcaption className={cn("mt-1.5 font-lining text-[6.5px] leading-[1.4] tracking-[0.04em]", t.soft)}>
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
function StackedSection({
  group,
  tone,
  wide = false,
  relaxed = false,
  fill = false,
}: {
  group: SizeGroup;
  tone: PageTone;
  wide?: boolean;
  relaxed?: boolean;
  fill?: boolean;
}) {
  const t = TONES[tone];
  const aspect = tileAspect(group);
  const label = `${group.width} × ${group.height}`;
  const details = [group.application, group.finish].filter(Boolean).join(" · ");
  const dense = group.samples.length > 3;
  const centeredSparse = !fill && relaxed && wide && group.samples.length < 4;
  const maxColumns = relaxed && wide ? 4 : wide ? 6 : 4;
  const minColumns = wide ? (relaxed ? 3 : 5) : 3;
  const columns = fill
    ? Math.max(1, group.samples.length)
    : centeredSparse
      ? group.samples.length
      : Math.min(maxColumns, Math.max(minColumns, group.samples.length));
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
      <div
        className={cn("mt-2.5 grid", dense ? "gap-1.5" : "gap-2")}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          width: centeredSparse ? `${(group.samples.length / 4) * 100}%` : undefined,
          marginInline: centeredSparse ? "auto" : undefined,
        }}
      >
        {group.samples.map((sample, i) => (
          <SampleTile key={i} sample={sample} aspect={aspect} label={label} tone={tone} />
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
      <div
        className="mt-2 grid gap-2"
        style={{ gridTemplateColumns: `repeat(${Math.min(6, Math.max(1, group.samples.length))}, minmax(0, 1fr))` }}
      >
        {group.samples.map((sample, i) => (
          <SampleTile key={i} sample={sample} aspect={aspect} label={label} tone={tone} />
        ))}
      </div>
    </section>
  );
}

/** Bảng vật liệu cỡ lớn ở trang giới thiệu của Alaska/Như Phát, thay ảnh phong cảnh chung bằng chính bề mặt gạch. */
function AboutProductPalette({ group, tone }: { group: SizeGroup; tone: PageTone }) {
  const t = TONES[tone];
  const label = `${group.width} × ${group.height}`;
  const samples = group.samples.slice(0, SHOWCASE_PALETTE_COUNT);
  return (
    <section aria-label={`Bảng vật liệu gạch ${label} mm`} className={cn("border-t pt-3", t.hair)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={cn("text-[6px] font-medium uppercase tracking-[0.24em]", t.accent)}>Bảng vật liệu</p>
          <p className="mt-1 font-display text-[17px] font-semibold leading-none">Bề mặt lát nền tuyển chọn</p>
        </div>
        <div className="text-right">
          <p className="font-display font-lining text-[16px] font-bold leading-none">{label} mm</p>
          <p className={cn("mt-1 text-[6.5px] leading-none", t.soft)}>Phối cảnh từ bộ sưu tập</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {samples.map((sample, i) => (
          <SampleTile key={i} sample={sample} aspect={tileAspect(group)} label={label} tone={tone} />
        ))}
      </div>
    </section>
  );
}

/**
 * Một nhóm kích thước theo lưới 5 cột: ô nhãn chiếm 2 cột đầu của hàng đầu, 3 mẫu đầu nằm cạnh nhãn.
 * Nhóm trên 8 mẫu dùng thêm cột để tránh phát sinh hàng thứ ba vượt chiều cao trang.
 */
function SizeSection({
  group,
  tone,
  dense = false,
  relaxed = false,
  solo = false,
  panel = false,
  featuredFive = false,
  compactPair = false,
}: {
  group: SizeGroup;
  tone: PageTone;
  dense?: boolean;
  relaxed?: boolean;
  solo?: boolean;
  panel?: boolean;
  featuredFive?: boolean;
  compactPair?: boolean;
}) {
  const t = TONES[tone];
  const aspect = tileAspect(group);
  const label = `${group.width} × ${group.height}`;
  const prominentSingles = !group.stacked && group.width !== group.height && group.samples.length <= 3;
  const columns = compactPair
    ? 6
    : featuredFive
    ? 8
    : panel
    ? Math.min(2, Math.max(1, group.samples.length))
    : prominentSingles
    ? Math.max(1, group.samples.length)
    : solo
    ? Math.min(3, Math.max(1, group.samples.length))
    : relaxed
    ? group.samples.length > 5
      ? 5
      : Math.max(3, group.samples.length)
    : group.samples.length > 12
      ? 8
      : group.samples.length > 8 || (dense && group.samples.length > 6)
        ? 6
        : GRID_COLUMNS;
  const labelColumns = compactPair ? LABEL_COLUMNS : relaxed || prominentSingles || panel || featuredFive ? columns : LABEL_COLUMNS;
  const details = [
    group.application ? { name: "Ứng dụng", value: group.application } : null,
    group.finish ? { name: "Bề mặt", value: group.finish } : null,
  ].filter((d): d is { name: string; value: string } => d !== null);
  return (
    <section aria-label={`Gạch ${label} mm`} className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      <div
        className="flex min-w-0 gap-3"
        style={{
          gridColumn: featuredFive ? "1 / span 3" : `span ${labelColumns}`,
          gridRow: featuredFive ? "1" : undefined,
        }}
      >
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
      {group.samples.map((sample, i) =>
        featuredFive ? (
          <div
            key={i}
            style={{
              gridColumn: i < 2 ? `${4 + i * 2} / span 2` : `${3 + (i - 2) * 2} / span 2`,
              gridRow: i < 2 ? "1" : "2",
              width: "92%",
              justifySelf: "center",
            }}
          >
            <SampleTile sample={sample} aspect={aspect} label={label} tone={tone} />
          </div>
        ) : (
          <SampleTile key={i} sample={sample} aspect={aspect} label={label} tone={tone} />
        ),
      )}
    </section>
  );
}

/** Cụm 400 × 800 dạng editorial: một bộ chủ đạo lớn và các bộ còn lại tạo thành mosaic cân trang. */
function ShowcaseWallSection({ group, tone }: { group: SizeGroup; tone: PageTone }) {
  const t = TONES[tone];
  const label = `${group.width} × ${group.height}`;
  const details = [group.application, group.finish].filter(Boolean).join(" · ");
  const columns = group.samples.length <= 5 ? 4 : 5;

  return (
    <section aria-label={`Bộ sưu tập gạch ${label} mm`}>
      <div className="flex items-end justify-between gap-5">
        <div className="flex min-w-0 gap-3">
          <span aria-hidden className={cn("w-3.5 shrink-0 self-stretch border-y-2 border-l-2", t.glyph)} />
          <div>
            <p className="font-display font-lining text-[22px] font-bold leading-none">
              {label}
              <span className="ml-1 text-[9px] font-semibold">mm</span>
            </p>
            <p className={cn("mt-1.5 text-[7px] leading-none", t.soft)}>{details}</p>
          </div>
        </div>
        <div className="max-w-[190px] text-right">
          <p className={cn("text-[6px] font-medium uppercase tracking-[0.22em]", t.accent)}>Bộ sưu tập chủ đạo</p>
          <p className={cn("mt-1 text-[6.5px] leading-[1.45]", t.soft)}>Khổ đứng tạo nhịp bề mặt rõ nét cho không gian nội thất.</p>
        </div>
      </div>

      <div
        className="mt-3 grid items-start gap-2.5"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {group.samples.map((sample, i) => {
          if (i === 0) {
            return (
              <div key={i} style={{ gridColumn: "1 / span 2", gridRow: "1 / span 2" }}>
                <SampleTile sample={sample} aspect={tileAspect(group)} label={label} tone={tone} />
              </div>
            );
          }

          const offset = i - 1;
          const availableColumns = columns - 2;
          return (
            <div
              key={i}
              style={{
                gridColumn: `${3 + (offset % availableColumns)}`,
                gridRow: `${1 + Math.floor(offset / availableColumns)}`,
              }}
            >
              <SampleTile sample={sample} aspect={tileAspect(group)} label={label} tone={tone} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Dải mẫu 800 × 800 thấp ở cuối trang, giữ đủ mã nhưng không cạnh tranh với bộ 400 × 800 chủ đạo. */
function ShowcaseFloorStrip({ group, tone }: { group: SizeGroup; tone: PageTone }) {
  const t = TONES[tone];
  const label = `${group.width} × ${group.height}`;
  const samples = group.samples.slice(SHOWCASE_PALETTE_COUNT);
  return (
    <section aria-label={`Dải gạch lát nền ${label} mm`} className={cn("border-t pt-3", t.hair)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={cn("text-[6px] font-medium uppercase tracking-[0.22em]", t.accent)}>Gạch lát nền</p>
          <p className="mt-1 font-display font-lining text-[17px] font-bold leading-none">{label} mm</p>
        </div>
        <p className={cn("max-w-[230px] text-right text-[6.5px] leading-[1.45]", t.soft)}>
          {group.application} · {group.finish}
        </p>
      </div>
      <div
        className="mt-3 grid gap-2.5"
        style={{ gridTemplateColumns: `repeat(${samples.length}, minmax(0, 1fr))` }}
      >
        {samples.map((sample, i) => (
          <SampleTile key={i} sample={sample} aspect={tileAspect(group)} label={label} tone={tone} />
        ))}
      </div>
    </section>
  );
}

const LOGO_HEIGHT = 48;
const LOGO_MAX_WIDTH = 190;

/** Tên thương hiệu; logo (nếu có) đặt bên phải, đúng tỷ lệ gốc, trên mảng trắng để giữ nguyên màu ở cả hai tông nền. */
function BrandHeading({ page, tone }: { page: BrandProductPage; tone: PageTone }) {
  const { brand, about } = page;
  const t = TONES[tone];
  const compactName = brand.name.length > 10;
  const fill = brand.logo?.fill;
  const ratio = brand.logo ? logoRatio({ logo: brand.logo }) : 1;
  const logoWidth = Math.min(LOGO_MAX_WIDTH, LOGO_HEIGHT * ratio);
  const logoHeight = logoWidth / ratio; // đúng tỷ lệ logo nên logo phủ kín ô mà không bị cắt
  const pad = fill ? 0 : 8;
  return (
    <div className="flex items-end justify-between gap-6 pt-4">
      <div>
        <p className={cn("text-[6.5px] font-medium uppercase tracking-[0.28em]", t.accent)}>{about.eyebrow}</p>
        <h2
          className={cn(
            "mt-3 whitespace-nowrap font-display font-bold uppercase leading-[0.98] tracking-[0.02em]",
            compactName ? "text-[52px]" : "text-[68px]",
          )}
        >
          {brand.name}
        </h2>
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
  const compactAboutLayout = COMPACT_ABOUT_PAGE_IDS.has(page.id);
  const denseAboutLayout = DENSE_ABOUT_PAGE_IDS.has(page.id);
  const compactImageLayout = page.id === "mikado" && Boolean(about.image);
  const featuredGroup = page.products.groups.find((group) => group.placement === "about");
  const compactContentLayout = compactImageLayout || compactAboutLayout;
  const showcaseGroup =
    page.products.layout === "showcase" ? page.products.groups.find((group) => group.id === "800x800") : undefined;
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

        <Reveal delay={0.16} className={compactAboutLayout ? "mt-4" : "mt-6"}>
          <p className={cn("text-[6.5px] font-medium uppercase tracking-[0.28em]", t.accent)}>{about.title}</p>
          <p
            className={cn(
              "max-w-[520px] font-medium italic",
              denseAboutLayout ? "mt-2 text-[14px] leading-[1.3]" : "mt-3 text-[15px] leading-[1.38]",
            )}
          >
            {about.lead}
          </p>
        </Reveal>

        <Reveal delay={0.22} className={denseAboutLayout ? "mt-4" : compactContentLayout ? "mt-5" : "mt-6"}>
          <div
            className={cn(denseAboutLayout ? "text-[8px] leading-[1.68]" : "text-[8.5px] leading-[1.9]", t.body)}
            style={{ columnCount: 2, columnGap: 22, maxWidth: 470 }}
          >
            {about.paragraphs.map((p, i) => (
              <p key={p} className={cn("break-inside-avoid", i > 0 && "mt-3")}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.28} className={denseAboutLayout ? "mt-4" : compactContentLayout ? "mt-6" : "mt-8"}>
          <ol className="grid grid-cols-3 gap-5">
            {about.highlights.map((h, i) => (
              <li key={h.title} className={cn("border-t", denseAboutLayout ? "pt-2" : "pt-2.5", t.hair)}>
                <span className={cn("text-[7px] font-medium tracking-[0.16em]", t.accent)}>{String(i + 1).padStart(2, "0")}</span>
                <p className={cn("font-display font-semibold leading-tight", denseAboutLayout ? "mt-1.5 text-[13.5px]" : "mt-2 text-[14.5px]")}>{h.title}</p>
                <p className={cn(denseAboutLayout ? "mt-1 text-[7px] leading-[1.55]" : "mt-1.5 text-[7.5px] leading-[1.75]", t.soft)}>{h.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </PageBody>

      {featuredGroup ? (
        <Reveal
          delay={0.34}
          className="absolute"
          style={{ left: insets.left, right: insets.right, bottom: compactAboutLayout ? 52 : 64 }}
        >
          <AboutStackedSection group={featuredGroup} tone={tone} />
        </Reveal>
      ) : showcaseGroup ? (
        <Reveal
          delay={0.34}
          className="absolute"
          style={{ left: insets.left, right: insets.right, bottom: compactAboutLayout ? 52 : 64 }}
        >
          <AboutProductPalette group={showcaseGroup} tone={tone} />
        </Reveal>
      ) : about.image ? (
        <Reveal
          delay={0.34}
          className="absolute"
          style={{ left: 0, bottom: compactAboutLayout ? 52 : 64, width: 410, height: compactImageLayout ? 180 : 196 }}
        >
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
  const sampleCount = visibleGroups.reduce((total, group) => total + group.samples.length, 0);
  const relaxed = sampleCount <= 16;
  const verySparse = sampleCount <= 11;
  const solo = visibleGroups.length === 1;
  const sparseMosaic =
    visibleGroups.length === 3 &&
    visibleGroups[0].stacked === true &&
    visibleGroups[0].samples.length <= 2 &&
    visibleGroups.slice(1).every((group) => !group.stacked);
  const wallFloorPair =
    visibleGroups.length === 2 &&
    visibleGroups[0].stacked === true &&
    visibleGroups[1].stacked !== true &&
    sampleCount <= 14;
  const showcaseWall = products.layout === "showcase" ? visibleGroups.find((group) => group.id === "400x800") : undefined;
  const showcaseFloor = products.layout === "showcase" ? visibleGroups.find((group) => group.id === "800x800") : undefined;
  return (
    <Page side="right" tone={tone}>
      <RunningHead side="right" label={products.title} tone={tone} />

      <PageBody side="right">
        <Reveal className="pt-4">
          <h3 className="font-display text-[30px] font-bold uppercase leading-none tracking-[0.02em]">{products.title}</h3>
          <div className={cn("mt-3.5 h-0.5", t.rule)} />
        </Reveal>

        <div
          className={cn(
            "flex flex-col",
            showcaseWall && showcaseFloor
              ? "mt-5 gap-5"
              : wallFloorPair
                ? "mt-4 gap-3"
                : verySparse
                  ? "mt-5 gap-3.5"
                  : relaxed
                    ? "mt-7 gap-6"
                    : compact
                      ? "mt-4 gap-2.5"
                      : "mt-6 gap-3.5",
          )}
        >
          {showcaseWall && showcaseFloor ? (
            <>
              <Reveal delay={0.12} y={6}>
                <ShowcaseWallSection group={showcaseWall} tone={tone} />
              </Reveal>
              <Reveal delay={0.22} y={6}>
                <ShowcaseFloorStrip group={showcaseFloor} tone={tone} />
              </Reveal>
            </>
          ) : wallFloorPair ? (
            <>
              <Reveal delay={0.12} y={6}>
                <StackedSection group={visibleGroups[0]} tone={tone} wide relaxed />
              </Reveal>
              <Reveal delay={0.22} y={6}>
                <SizeSection group={visibleGroups[1]} tone={tone} compactPair />
              </Reveal>
            </>
          ) : sparseMosaic ? (
            <>
              <Reveal delay={0.12} y={6}>
                <div className="grid grid-cols-2 items-start gap-5">
                  <StackedSection group={visibleGroups[0]} tone={tone} fill />
                  <SizeSection group={visibleGroups[1]} tone={tone} panel />
                </div>
              </Reveal>
              <Reveal delay={0.22} y={6}>
                <SizeSection group={visibleGroups[2]} tone={tone} relaxed featuredFive />
              </Reveal>
            </>
          ) : (
            rows.map((row, i) => (
              <Reveal key={row[0].id} delay={0.12 + i * 0.1} y={6}>
                {row[0].stacked && row.length > 1 ? (
                  <div className="grid grid-cols-2 gap-5">
                    {row.map((group) => (
                      <StackedSection key={group.id} group={group} tone={tone} relaxed={relaxed} />
                    ))}
                  </div>
                ) : row[0].stacked ? (
                  <StackedSection group={row[0]} tone={tone} wide relaxed={relaxed} />
                ) : (
                  <SizeSection group={row[0]} tone={tone} dense={dense} relaxed={relaxed} solo={solo} />
                )}
              </Reveal>
            ))
          )}
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
