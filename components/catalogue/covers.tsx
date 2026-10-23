import { company, contactLines, coverCopy } from "@/lib/catalogue/company";
import { PAGE } from "@/lib/catalogue/identity";
import { Reveal } from "./motion";
import { CompanyLogo } from "./company-logo";
import { Mosaic, MOSAIC_HEIGHT, backMosaic, frontMosaic } from "./mosaic";
import { SinglePage } from "./page-frame";

const COVER_X = 48;
const companyLabel = company.fullName.trim() || company.name;

/** Bìa đầu — trang đơn: mảng gạch, logo MIKADO-MT, tiêu đề "HỒ SƠ NĂNG LỰC", phụ đề catalogue gạch ốp lát. */
export function FrontCover() {
  return (
    <SinglePage>
      <Mosaic tiles={frontMosaic} className="top-0" />

      <Reveal delay={0.25} className="absolute" style={{ left: COVER_X, top: MOSAIC_HEIGHT + 38 }}>
        <CompanyLogo width={292} preload />
      </Reveal>

      <Reveal delay={0.35} className="absolute" style={{ left: COVER_X, right: COVER_X, top: MOSAIC_HEIGHT + 112 }}>
        <h1 className="font-display text-[76px] font-bold uppercase leading-[1.06] tracking-[0.005em] text-ink">
          {coverCopy.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Reveal>

      <Reveal delay={0.45} className="absolute" style={{ left: COVER_X, right: COVER_X, top: MOSAIC_HEIGHT + 296 }}>
        <div className="h-[2px] w-9 bg-signal" />
        <p className="mt-3.5 text-[9.5px] font-medium tracking-[0.32em] text-brand-deep">{coverCopy.subtitle}</p>
      </Reveal>

      <div
        className="absolute flex items-center border-t border-hairline pt-3"
        style={{ left: COVER_X, right: COVER_X, bottom: 40 }}
      >
        <span className="text-[7px] font-medium uppercase tracking-[0.26em] text-ink-soft">{companyLabel}</span>
      </div>
    </SinglePage>
  );
}

/**
 * Bìa cuối — trang đơn, đối xứng bìa đầu. Chỉ hiện dòng liên hệ có dữ liệu thật (lib/catalogue/company.ts);
 * chưa có dữ liệu thì chỉ còn logo + họa tiết.
 */
export function BackCover() {
  const lines = contactLines();
  const free = PAGE.height - MOSAIC_HEIGHT;
  return (
    <SinglePage>
      <Mosaic tiles={backMosaic} className="bottom-0" />

      <Reveal
        delay={0.15}
        className="absolute inset-x-0 top-0 flex flex-col items-center justify-center px-12 text-center"
        style={{ height: free }}
      >
        <CompanyLogo width={300} />
        <p className="mt-5 text-[7px] font-medium uppercase tracking-[0.28em] text-ink-soft">{companyLabel}</p>

        {lines.length > 0 ? (
          <dl className="mt-8 flex w-full max-w-[360px] flex-col gap-3 border-t border-hairline pt-6">
            {lines.map((line) => (
              <div key={line.label}>
                <dt className="text-[6.5px] font-medium uppercase tracking-[0.24em] text-brand-deep">{line.label}</dt>
                <dd className="mt-1 text-[9.5px] leading-[1.6] text-ink">{line.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Reveal>
    </SinglePage>
  );
}
