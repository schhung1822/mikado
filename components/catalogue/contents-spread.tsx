import { brandIndex } from "@/lib/catalogue/brands";
import { CONTACT_NOTE, contactRows } from "@/lib/catalogue/contacts";
import { CONTENTS_FOLIO, folioText, tocSections, tocSummary } from "@/lib/catalogue/contents";
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
                  <span className="text-[7px] font-medium tracking-[0.14em] text-brand-tint">{brand.no}</span>
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

        <p className="mt-4 text-[6.5px] tracking-[0.04em] text-white/60">{CONTACT_NOTE}</p>
      </PageBody>

      <PageFooter side="left" folio={CONTENTS_FOLIO[0]} label="Liên hệ" tone="brand" />
    </Page>
  );
}

/** Trang phải — nền trắng: mục lục các trang đôi nội dung, số trang tự tính từ lib/catalogue/contents.ts. */
function ContentsPage() {
  return (
    <Page side="right">
      <RunningHead side="right" label="Mục lục" />

      <PageBody side="right">
        <Reveal className="pt-6">
          <h2 className="font-display text-[58px] font-bold uppercase leading-none tracking-[0.02em] text-ink">Mục lục</h2>
          <div className="mt-4 h-0.5 bg-brand" />
        </Reveal>

        <div className="mt-8 flex flex-col gap-7">
          {tocSections.map((section, i) => (
            <Reveal key={section.title} delay={0.12 + i * 0.1} y={6}>
              <section className="flex gap-4">
                <span aria-hidden className="w-[3px] shrink-0 bg-brand" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[17px] font-bold uppercase leading-none tracking-[0.03em] text-ink">{section.title}</h3>
                  <ul className="mt-3">
                    {section.items.map((item) => (
                      <li key={item.label} className="flex items-baseline justify-between gap-4 border-b border-hairline py-[5px] text-[8.5px] text-ink">
                        <span>{item.label}</span>
                        <span className="font-lining text-[7.5px] tracking-[0.06em] text-ink-soft">Trang {folioText(item.folio)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-6">
          <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-ink-soft">
            {tocSummary.spreads} trang đôi nội dung · trang {tocSummary.from}–{tocSummary.to}
          </p>
        </Reveal>
      </PageBody>

      {/* Họa tiết gạch nhỏ ở góc trên phải, cạnh tiêu đề "Mục lục" */}
      <TileStrip unit={40} className="right-0" style={{ top: 46 }} />

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
