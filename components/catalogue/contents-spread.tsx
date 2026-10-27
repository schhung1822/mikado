import { brandIndex } from "@/lib/catalogue/brands";
import { contactRows } from "@/lib/catalogue/contacts";
import { CONTENTS_FOLIO, tocSections, type Folio } from "@/lib/catalogue/contents";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./company-logo";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { TileStrip } from "./tile-strip";

/** Trang trái — nền xanh: logo MIKADO-MT, bên dưới là 12 thương hiệu kèm thông tin liên hệ (demo), chia hai cột. */
function ContactsPage() {
  return (
    <Page side="left" tone="brand">
      {/* Dải xanh sáng ở mép gáy, gợi mảng màu của tài liệu tham khảo */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-[170px] w-9"
        style={{ background: "linear-gradient(180deg, var(--cat-brand-light), transparent)" }}
      />
      <RunningHead side="left" label="Liên hệ" tone="brand" />

      <PageBody side="left">
        <Reveal className="pt-6">
          <CompanyLogo width={250} />
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-tint">Thương hiệu &amp; thông tin liên hệ</p>
          <div className="mt-3 h-0.5 bg-white" />
        </Reveal>

        <Reveal delay={0.18} className="mt-5">
          <ol className="grid grid-cols-2 gap-x-7 gap-y-4">
            {brandIndex.map((brand, i) => (
              // Hai mục đầu (hàng đầu tiên) không có viền trên: ngay phía trên đã có đường kẻ trắng của tiêu đề.
              <li key={brand.id} className={cn("pt-2.5", i >= 2 && "border-t border-white/25")}>
                <p className="flex items-baseline gap-2.5">
                  <span aria-hidden className="h-px w-3 shrink-0 -translate-y-0.75 bg-brand-tint" />
                  <span className="font-display text-[15px] font-bold uppercase leading-none tracking-[0.03em]">{brand.name}</span>
                </p>
                <dl className="mt-2 space-y-[3px]">
                  {contactRows(brand.id).map((row) => (
                    <div key={row.label} className="flex gap-2 text-[7.5px] leading-[1.5]">
                      <dt className="w-[34px] shrink-0 text-[6.5px] font-medium uppercase tracking-[0.14em] leading-[1.9] text-white/60">{row.label}</dt>
                      <dd className="text-white/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        </Reveal>
      </PageBody>

      <PageFooter side="left" folio={CONTENTS_FOLIO[0]} label="Liên hệ" tone="brand" />
    </Page>
  );
}

/** Trang phải — nền trắng: mục lục các trang đôi nội dung, số trang tự tính từ lib/catalogue/contents.ts. */
function ContentsPage() {
  const [introSection, brandsSection, productsSection, connectionSection] = tocSections;
  const firstPage = (folio: Folio | string) => (typeof folio === "string" ? folio.split("–")[0] : folio[0]);
  const lastPage = (folio: Folio | string) => (typeof folio === "string" ? folio.split("–").at(-1) ?? folio : folio[1]);
  const pageRange = (first: Folio | string, last: Folio | string = first) => `${firstPage(first)}–${lastPage(last)}`;

  const menuGroups: {
    title: string;
    items: { label: string; pages?: string }[];
    pages: string;
    columns?: 1 | 2;
  }[] = [
    {
      title: "Khái quát về MIKADO-MT",
      items: introSection.items.map((item) => ({ label: item.label })),
      pages: pageRange(introSection.items[0].folio, introSection.items.at(-1)!.folio),
    },
    {
      title: "Thương hiệu & sản phẩm",
      items: [
        { label: brandsSection.items[0].label, pages: pageRange(brandsSection.items[0].folio) },
        ...productsSection.items.map((item) => ({ label: item.label, pages: pageRange(item.folio) })),
      ],
      pages: pageRange(brandsSection.items[0].folio, productsSection.items.at(-1)!.folio),
      columns: 1,
    },
    {
      title: "Đối tác và dự án",
      items: [{ label: "Đối tác chiến lược và các công trình tiêu biểu" }],
      pages: pageRange(connectionSection.items[0].folio),
    },
    {
      title: "Lời cảm ơn",
      items: [],
      pages: pageRange(connectionSection.items[1].folio),
    },
  ];

  return (
    <Page side="right">
      <RunningHead side="right" label="Mục lục" />

      <PageBody side="right">
        <Reveal className="pt-5">
          <div className="flex items-end justify-between gap-5">
            <h2 className="font-display text-[50px] font-bold uppercase leading-none tracking-[0.02em] text-ink">Mục lục</h2>
          </div>
          <div className="mt-3 h-0.5 bg-brand" />
        </Reveal>

        <div className="mt-7 flex flex-col gap-6">
          {menuGroups.map((group, i) => (
            <Reveal key={group.title} delay={0.1 + i * 0.06} y={6}>
              <section className="grid grid-cols-[5px_1fr] gap-4">
                <span aria-hidden className="bg-brand" />
                <div className="min-w-0 py-0.5">
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-[16px] font-bold uppercase leading-none tracking-[0.025em] text-ink">{group.title}</h3>
                    <span className="shrink-0 font-lining text-[8px] font-medium text-ink">Trang {group.pages}</span>
                  </div>
                  {group.items.length > 0 ? (
                    <ul className={cn("mt-3", group.columns === 2 ? "grid grid-cols-2 gap-x-5 gap-y-2" : "space-y-2")}>
                      {group.items.map((item) => (
                        <li key={item.label} className="flex items-baseline justify-between gap-2 text-[8.5px] leading-[1.4] text-ink-soft">
                          <span>{item.label}</span>
                          {item.pages ? <span className="shrink-0 font-lining text-[6.5px] text-ink-soft/80">{item.pages}</span> : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </PageBody>

      <div aria-hidden className="absolute -right-12 bottom-12 font-display text-[210px] font-bold leading-none text-brand-tint/20">03</div>
      <TileStrip unit={32} className="right-0" style={{ top: 46 }} />

      <PageFooter side="right" folio={CONTENTS_FOLIO[1]} label="Mục lục" />
    </Page>
  );
}

/** Trang đôi mục lục & liên hệ: trái = logo công ty + 12 thương hiệu và liên hệ (nền xanh), phải = mục lục (nền trắng). */
export function ContentsSpread() {
  return (
    <Spread>
      <ContactsPage />
      <ContentsPage />
    </Spread>
  );
}
