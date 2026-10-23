import { companyFolio } from "@/lib/catalogue/contents";
import { companyProfile, leadership, type Leader } from "@/lib/catalogue/company-profile";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./company-logo";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";
import { TileStrip } from "./tile-strip";

/** Trang trái (nền trắng) — giới thiệu công ty: tiêu đề + logo MIKADO-MT, câu dẫn, đoạn giới thiệu hai cột, ba trụ cột. */
function CompanyPage() {
  const { eyebrow, title, lead, paragraphs, pillars } = companyProfile;
  return (
    <Page side="left">
      <RunningHead side="left" label="Giới thiệu" />

      <PageBody side="left">
        <Reveal className="flex items-end justify-between gap-6 pt-4">
          <div>
            <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-deep">{eyebrow}</p>
            <h2 className="mt-3 max-w-[300px] font-display text-[44px] font-bold uppercase leading-[1.02] tracking-[0.015em] text-ink">{title}</h2>
          </div>
          <div className="mb-1 shrink-0">
            <CompanyLogo width={150} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-5">
          <div className="h-0.5 bg-brand" />
        </Reveal>

        <Reveal delay={0.16} className="mt-6">
          <p className="max-w-[480px] font-display text-[16px] font-medium italic leading-[1.38] text-ink text-justify">{lead}</p>
        </Reveal>

        <Reveal delay={0.22} className="mt-6">
          <div className="text-[8.5px] leading-[1.9] text-ink" style={{ columnCount: 2, columnGap: 22, maxWidth: 470 }}>
            {paragraphs.map((p, i) => (
              <p key={p} className={cn("break-inside-avoid", i > 0 && "mt-3")}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.28} className="mt-8">
          <ol className="grid grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <li key={p.title} className="border-t border-hairline pt-2.5">
                <span className="text-[7px] font-medium tracking-[0.16em] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-[14.5px] font-semibold leading-tight text-ink">{p.title}</p>
                <p className="mt-1.5 text-[7.5px] leading-[1.75] text-ink-soft">{p.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </PageBody>

      {/* Họa tiết gạch tràn mép trái, phía trên chân trang */}
      <TileStrip mirror className="left-0" style={{ bottom: 76 }} delay={0.34} />

      <PageFooter side="left" folio={companyFolio[0]} label="Giới thiệu" />
    </Page>
  );
}

/** Một thẻ lãnh đạo: ảnh chân dung 3 : 4 (khung trống nếu chưa có ảnh), tên và chức danh. */
function LeaderCard({ leader }: { leader: Leader }) {
  const { photo } = leader;
  return (
    <figure className="m-0 min-w-0">
      <div
        role="img"
        aria-label={photo ? photo.alt : `Khung ảnh trống, chân dung ${leader.name}`}
        className={cn("relative w-full overflow-hidden border", photo ? "border-white/40 bg-tile" : "border-white/35 bg-white/10")}
        style={{ aspectRatio: "3 / 4" }}
      >
        {photo ? <Photo photo={photo} fit={photo.fit ?? "cover"} sizes="320px" /> : null}
      </div>
      <figcaption className="mt-3 border-t border-white/60 pt-2.5">
        <p className="font-display text-[15px] font-bold leading-tight">{leader.name}</p>
        <p className="mt-1.5 text-[6.5px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-white/75">{leader.role}</p>
      </figcaption>
    </figure>
  );
}

/** Trang phải (nền xanh) — ban lãnh đạo: tiêu đề, câu dẫn, ba thẻ chân dung và thông điệp. */
function LeadershipPage() {
  const { eyebrow, title, lead, leaders, message } = leadership;
  return (
    <Page side="right" tone="brand">
      <RunningHead side="right" label="Ban lãnh đạo" tone="brand" />

      <PageBody side="right">
        <Reveal className="pt-4">
          <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-tint">{eyebrow}</p>
          <h2 className="mt-3 font-display text-[44px] font-bold uppercase leading-none tracking-[0.015em]">{title}</h2>
          <div className="mt-5 h-0.5 bg-white" />
        </Reveal>

        <Reveal delay={0.12} className="mt-6">
          <p className="max-w-[520px] font-display text-[17px] font-medium italic leading-[1.4] text-white/95 text-justify">{lead}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-7">
          <div className="grid grid-cols-3 gap-3.5">
            {leaders.map((leader) => (
              <LeaderCard key={leader.name} leader={leader} />
            ))}
          </div>
        </Reveal>

        {message.quote.trim() ? (
          <Reveal delay={0.3} className="mt-8">
            <figure className="m-0 border-t border-white/25 pt-4">
              <blockquote className="m-0 flex gap-3">
                <span aria-hidden className="font-display text-[44px] font-bold leading-[0.8] text-brand-light">“</span>
                <p className="max-w-[400px] font-display text-[15px] font-medium italic leading-[1.5]">{message.quote}</p>
              </blockquote>
              {message.by ? (
                <figcaption className="mt-3 pl-[30px] text-[6.5px] font-medium uppercase tracking-[0.22em] text-white/70">{message.by}</figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}
      </PageBody>

      <PageFooter side="right" folio={companyFolio[1]} label="Ban lãnh đạo" tone="brand" />
    </Page>
  );
}

/** Trang đôi giới thiệu công ty (trái, nền trắng) và ban lãnh đạo (phải, nền xanh). Toàn bộ nội dung là demo — xem company-profile.ts. */
export function CompanySpread() {
  return (
    <Spread>
      <CompanyPage />
      <LeadershipPage />
    </Spread>
  );
}
