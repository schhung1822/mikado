import { CONTACT_NOTE } from "@/lib/catalogue/contacts";
import { thanksFolio } from "@/lib/catalogue/contents";
import { officesWithData, thanks } from "@/lib/catalogue/thanks";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./company-logo";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

const PANEL = { left: 40, top: 48, width: 505, height: 742 };

/**
 * Trang trái — khung ảnh lớn phủ lớp xanh tối: lớp phủ đậm ở phần trên để chữ dễ đọc, nhạt dần xuống dưới
 * để ảnh lộ rõ (chỗ đặt ảnh chủ đạo, thay `thanks.image`).
 */
function ThanksPage() {
  return (
    <Page side="left" tone="brand">
      <RunningHead side="left" label={thanks.title} tone="brand" />

      <Reveal className="absolute" style={PANEL} y={0}>
        <div className="relative size-full overflow-hidden ring-1 ring-white/10">
          <Photo photo={thanks.image} sizes="1000px" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--cat-brand-night) 94%, transparent) 0%, color-mix(in srgb, var(--cat-brand-night) 90%, transparent) 52%, color-mix(in srgb, var(--cat-brand-night) 12%, transparent) 100%)",
            }}
          />
          {/* Mảng xanh sáng sau tiêu đề, gợi tài liệu tham khảo */}
          <div
            aria-hidden
            className="absolute"
            style={{ left: 212, top: 0, width: 46, height: 168, background: "linear-gradient(180deg, var(--cat-brand-light), color-mix(in srgb, var(--cat-brand-light) 15%, transparent))" }}
          />

          <div className="absolute inset-x-0 top-0 px-9 pt-[74px]">
            <Reveal delay={0.12}>
              <h2 className="font-display text-[40px] text-center font-black uppercase leading-none tracking-[0.02em] text-white">{thanks.title}</h2>
            </Reveal>
            <Reveal delay={0.22} className="mt-9">
              <div className="space-y-4 text-[9.5px] leading-[1.95] text-white/92 text-justify" style={{ maxWidth: 410 }}>
                {thanks.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      <PageFooter side="left" folio={thanksFolio[0]} label={thanks.title} tone="brand" />
    </Page>
  );
}

/** Mảng gạch mờ trang trí phía trên trang phải. Lưới ô 78 px, mạch 6 px; tràn mép phải. */
const GHOST_UNIT = 78;
const GHOST_GAP = 6;
const ghostTiles: { c: number; r: number; w: number; h: number; className: string }[] = [
  { c: 0, r: 1, w: 2, h: 2, className: "bg-white/[0.05]" },
  { c: 2, r: 0, w: 1, h: 2, className: "bg-brand-light/25" },
  { c: 3, r: 0, w: 2, h: 1, className: "bg-white/[0.08]" },
  { c: 3, r: 1, w: 1, h: 2, className: "bg-white/[0.05]" },
  { c: 4, r: 1, w: 1, h: 1, className: "bg-brand-light/25" },
  { c: 2, r: 2, w: 1, h: 1, className: "bg-white/[0.08]" },
];
const ghost = (n: number) => n * GHOST_UNIT + (n - 1) * GHOST_GAP;
const ghostOffset = (n: number) => n * (GHOST_UNIT + GHOST_GAP);

/** Trang phải — logo MIKADO-MT, đường kẻ, tên công ty và các văn phòng (dữ liệu demo, dòng trống tự ẩn). */
function ContactPage() {
  const offices = officesWithData();
  return (
    <Page side="right" tone="brand">
      <RunningHead side="right" label="Liên hệ" tone="brand" />

      <Reveal delay={0.1} y={0} className="absolute right-0" style={{ top: 90, width: ghost(5), height: ghost(3) }}>
        <div aria-hidden className="relative size-full">
          {ghostTiles.map((t) => (
            <span
              key={`${t.c}-${t.r}`}
              className={cn("absolute", t.className)}
              style={{ left: ghostOffset(t.c), top: ghostOffset(t.r), width: ghost(t.w), height: ghost(t.h) }}
            />
          ))}
        </div>
      </Reveal>

      <PageBody side="right" className="flex flex-col justify-end">
        <Reveal delay={0.15}>
          <CompanyLogo width={270} />
        </Reveal>

        <Reveal delay={0.22} className="mt-8">
          <div className="h-0.5 bg-brand-light" />
          <h3 className="mt-6 font-display text-[22px] font-bold leading-tight tracking-[0.01em] text-white">{thanks.companyName}</h3>
        </Reveal>

        {offices.length > 0 ? (
          <Reveal delay={0.3} className="mt-5">
            <div className="grid grid-cols-2 gap-x-8">
              {offices.map((office) => (
                <section key={office.title}>
                  <h4 className="text-[7px] font-semibold uppercase tracking-[0.2em] text-white">{office.title}</h4>
                  <dl className="mt-2.5 space-y-[5px]">
                    {office.lines.map((line) => (
                      <div key={line.label} className="flex gap-2 text-[7.5px] leading-[1.6]">
                        <dt className="w-[34px] shrink-0 text-[6.5px] font-medium uppercase leading-[1.9] tracking-[0.14em] text-white/60">{line.label}</dt>
                        <dd className="text-white/90">{line.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
            <p className="mt-5 text-[6.5px] tracking-[0.04em] text-white/60">{CONTACT_NOTE}</p>
          </Reveal>
        ) : null}
      </PageBody>

      <PageFooter side="right" folio={thanksFolio[1]} label="Liên hệ" tone="brand" />
    </Page>
  );
}

/** Trang đôi "Lời cảm ơn": trái = ảnh + lời cảm ơn, phải = logo công ty và thông tin liên hệ. Cả hai trang nền xanh. */
export function ThanksSpread() {
  return (
    <Spread>
      <ThanksPage />
      <ContactPage />
    </Spread>
  );
}
