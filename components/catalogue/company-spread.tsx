import { companyFolio } from "@/lib/catalogue/contents";
import { companyProfile, leadership, type Leader } from "@/lib/catalogue/company-profile";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./company-logo";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

/** Trang trái — câu chuyện khởi nguồn, hình ảnh sản xuất và các cột mốc chính. */
function CompanyPage() {
  const { eyebrow, title, lead, story, image, journey } = companyProfile;
  return (
    <Page side="left">
      <div aria-hidden className="absolute right-0 top-0 h-[225px] w-[168px] bg-gradient-to-b from-brand-light/85 via-brand-tint/45 to-transparent" />
      <RunningHead side="left" label="Giới thiệu" />

      <PageBody side="left">
        <Reveal className="flex items-end justify-between gap-6 pt-3">
          <div>
            <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-deep">{eyebrow}</p>
            <h2 className="mt-3 max-w-[330px] font-display text-[38px] font-bold uppercase leading-[0.96] tracking-[0.015em] text-ink">{title}</h2>
          </div>
          <div className="mb-0.5 shrink-0">
            <CompanyLogo width={132} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <div className="relative h-[300px] overflow-hidden border border-hairline bg-stone">
            <Photo photo={image} sizes="760px" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-night/90 via-brand-night/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white">
              <div>
                <p className="text-[5.5px] font-medium uppercase tracking-[0.22em] text-brand-tint">Dấu mốc hình thành</p>
                <p className="mt-1 font-display font-lining text-[36px] font-semibold leading-none">2002</p>
              </div>
              <p className="max-w-[250px] border-l border-white/35 pl-4 text-[7px] leading-[1.55] text-white/75">Từ nhà máy gạch đầu tiên tại Khu công nghiệp Tiền Hải.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-5 grid grid-cols-[0.95fr_1.05fr] gap-6">
          <p className="border-l-2 border-brand pl-4 text-[10px] font-medium leading-[2.0] text-ink">{lead}</p>
          <p className="text-[9px] text-justify leading-[1.75] text-ink-soft">{story}</p>
        </Reveal>

        <Reveal delay={0.32} className="mt-12">
          <div className="flex items-center gap-3">
            <p className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.18em] text-brand-deep">Hành trình phát triển</p>
            <span className="h-px flex-1 bg-hairline" />
          </div>
          <ol className="mt-5 grid grid-cols-3 gap-4">
            {journey.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[18px_1fr] gap-2">
                <span className="font-lining text-[12px] font-semibold text-brand-deep">0{index + 1}</span>
                <div>
                  <p className="text-[10px] font-semibold leading-tight text-ink">{item.title}</p>
                  <p className="mt-1 text-[8px] leading-[1.5] text-ink-soft">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </PageBody>

      <PageFooter side="left" folio={companyFolio[0]} label="Giới thiệu" />
    </Page>
  );
}

/** Một thẻ lãnh đạo: ảnh chân dung 3 : 4 (khung trống nếu chưa có ảnh), tên và chức danh. */
function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const { photo } = leader;
  return (
    <figure className={cn("m-0 min-w-0", index === 1 && "mt-5", index === 2 && "mt-10")}>
      <div
        role="img"
        aria-label={photo ? photo.alt : `Khung ảnh trống, chân dung ${leader.name}`}
        className={cn("relative w-full overflow-hidden border", photo ? "border-white/40 bg-tile" : "border-white/25 bg-white/[0.07]")}
        style={{ aspectRatio: "3 / 4" }}
      >
        {photo ? (
          <Photo photo={photo} fit={photo.fit ?? "cover"} sizes="320px" />
        ) : (
          <>
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(255,255,255,0.045)_48%,rgba(255,255,255,0.045)_52%,transparent_52%,transparent_100%)] bg-[length:22px_22px]" />
            <span className="absolute left-4 top-4 font-display font-lining text-[34px] font-semibold leading-none text-white/15">0{index + 1}</span>
            <div className="absolute inset-x-4 bottom-4 border-t border-white/25 pt-2">
              <p className="text-[5px] font-medium uppercase tracking-[0.18em] text-white/45">Ảnh chân dung</p>
            </div>
          </>
        )}
      </div>
      <figcaption className="mt-3 border-t border-brand-light/70 pt-2.5">
        <p className="text-[13px] font-bold leading-tight">{leader.name}</p>
        <p className="mt-1.5 text-[6.5px] font-medium uppercase leading-[1.6] tracking-[0.16em] text-white/75">{leader.role}</p>
      </figcaption>
    </figure>
  );
}

/** Trang phải (nền xanh) — ban lãnh đạo: tiêu đề, câu dẫn, ba thẻ chân dung và thông điệp. */
function LeadershipPage() {
  const { eyebrow, title, lead, leaders, message, priorities } = leadership;
  return (
    <Page side="right" tone="brand">
      <div aria-hidden className="absolute -right-8 top-8 font-display font-lining text-[205px] font-bold leading-none text-white/[0.035]">05</div>
      <RunningHead side="right" label="Ban lãnh đạo" tone="brand" />

      <PageBody side="right">
        <Reveal className="pt-3">
          <div className="grid grid-cols-[0.72fr_1.28fr] items-end gap-6">
            <div>
              <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-tint">{eyebrow}</p>
              <h2 className="mt-3 font-display text-[38px] font-bold uppercase leading-[0.94] tracking-[0.015em]">{title}</h2>
            </div>
            <p className="border-l border-white/30 pl-4 text-[10px] text-justify leading-[1.65] text-white/72">{lead}</p>
          </div>
          <div className="mt-5 h-px bg-white/35" />
        </Reveal>

        <Reveal delay={0.16} className="mt-6">
          <div className="grid grid-cols-3 items-start gap-4">
            {leaders.map((leader, index) => (
              <LeaderCard key={leader.name} leader={leader} index={index} />
            ))}
          </div>
        </Reveal>

        {message.quote.trim() ? (
          <Reveal delay={0.28} className="mt-6">
            <figure className="m-0 grid grid-cols-[28px_1fr_auto] items-start gap-3 border-y border-white/20 bg-white/[0.035] px-4 py-4">
              <span aria-hidden className="font-display text-[38px] font-bold leading-[0.8] text-brand-light">“</span>
              <blockquote className="m-0">
                <p className="text-[12px] font-medium italic leading-[1.55] text-white/90">{message.quote}</p>
              </blockquote>
              {message.by ? (
                <figcaption className="pt-1 text-[5.5px] font-medium uppercase tracking-[0.18em] text-brand-tint">{message.by}</figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}

        <Reveal delay={0.34} className="mt-4">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-brand-tint">Trọng tâm điều hành</p>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {priorities.map((priority) => (
              <div key={priority.title} className="border-l border-white/30 pl-3">
                <p className="text-[10px] font-medium uppercase leading-tight text-white">{priority.title}</p>
                <p className="mt-1.5 text-[8px] leading-[1.5] text-white/58">{priority.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </PageBody>

      <PageFooter side="right" folio={companyFolio[1]} label="Ban lãnh đạo" tone="brand" />
    </Page>
  );
}

/** Trang đôi giới thiệu công ty (trái, nền trắng) và ban lãnh đạo (phải, nền xanh). */
export function CompanySpread() {
  return (
    <Spread>
      <CompanyPage />
      <LeadershipPage />
    </Spread>
  );
}
