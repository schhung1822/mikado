import { Factory, Globe2, MapPin, ShieldCheck } from "lucide-react";
import { factoryNetwork, markets, partnerships, quality } from "@/lib/catalogue/capabilities";
import { factoryFolio, marketsFolio, partnershipsFolio, qualityFolio } from "@/lib/catalogue/contents";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { Page, PageBody, PageFooter, RunningHead, Spread } from "./page-frame";
import { Photo } from "./photo";

function FactoryPage() {
  const milestones = [
    { value: "10", label: "cơ sở sản xuất" },
    { value: "2002", label: "năm khởi đầu" },
    { value: "03", label: "miền vận hành" },
  ];

  return (
    <Page side="left" tone="brand">
      <div className="absolute inset-0 bg-black/20">
        <Photo photo={factoryNetwork.image} sizes="1200px" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-night/95 via-brand-night/50 to-brand-night/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-night via-brand-night/20 to-brand-night/35" />
      </div>
      <div aria-hidden className="absolute -right-20 top-20 size-[310px] rounded-full border-[58px] border-white/[0.045]" />
      <RunningHead side="left" label="Hệ thống nhà máy" tone="brand" />

      <PageBody side="left">
        <Reveal className="pt-[74px]">
          <p className="flex items-center gap-2 text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-tint">
            <Factory size={13} strokeWidth={1.6} />
            {factoryNetwork.eyebrow}
          </p>
          <h2 className="mt-4 max-w-[460px] font-display text-[51px] font-bold uppercase leading-[0.9] tracking-[0.01em]">
            Hệ thống<br />nhà máy
          </h2>
          <p className="mt-3 font-display text-[21px] font-semibold uppercase tracking-[0.12em] text-brand-tint">MIKADO-MT</p>
          <p className="mt-5 max-w-[345px] border-l-2 border-brand-light pl-4 text-[10px] leading-[1.75] text-white/78">{factoryNetwork.lead}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-[205px] border-y border-white/30 bg-brand-night/45 px-5 py-5 backdrop-blur-[2px]">
          <div className="grid grid-cols-3 divide-x divide-white/25">
            {milestones.map((item) => (
              <div key={item.label} className="px-4 first:pl-0 last:pr-0">
                <p className="font-display font-lining text-[31px] font-semibold leading-none text-white">{item.value}</p>
                <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.16em] text-brand-tint">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-5">
          <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-brand-tint">Hệ sinh thái vật liệu hoàn thiện</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[8px] font-medium text-white/80">
            {["Gạch men", "Cotto", "Gốm màu", "Sứ vệ sinh", "Tấm sàn SPC", "Tấm trần thạch cao"].map((item) => (
              <span key={item} className="border-b border-white/25 pb-1">{item}</span>
            ))}
          </div>
        </Reveal>
      </PageBody>

      <PageFooter side="left" folio={factoryFolio[0]} label="Hệ thống nhà máy" tone="brand" />
    </Page>
  );
}

function FactoryDirectoryPage() {
  return (
    <Page side="right">
      <div aria-hidden className="absolute right-0 top-0 h-[235px] w-[175px] bg-gradient-to-b from-brand-light/85 via-brand-tint/45 to-transparent" />
      <RunningHead side="right" label="Hệ thống nhà máy" />
      <PageBody side="right">
        <Reveal className="pt-3">
          <p className="text-[6.5px] font-medium uppercase tracking-[0.28em] text-brand-deep">Mạng lưới sản xuất toàn quốc</p>
          <div className="mt-3 grid grid-cols-[1.25fr_0.75fr] items-end gap-5">
            <h2 className="font-display text-[36px] font-bold uppercase leading-[0.95] text-ink">Từ Bắc vào Nam</h2>
            <p className="border-l border-hairline pl-4 text-[8px] leading-[1.6] text-ink-soft">Hệ thống được tổ chức theo vùng để rút ngắn hành trình cung ứng và tăng khả năng đáp ứng dự án.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-5 grid grid-cols-[1.16fr_0.84fr] gap-3">
          {factoryNetwork.productionImages.map((image, index) => (
            <div key={image.src} className="relative h-[128px] overflow-hidden bg-stone/70">
              <Photo photo={image} sizes={index === 0 ? "360px" : "260px"} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-night/75 via-transparent to-black/5" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-white">
                <p className="text-[10px] font-medium uppercase leading-none">{image.label}</p>
                <span className="font-lining text-[5px] tracking-[0.14em] text-white/70">0{index + 1}</span>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.18} className="mt-5">
          <div className="mb-2 flex items-end justify-between border-b border-hairline pb-2">
            <h3 className="font-display text-[17px] font-semibold uppercase text-ink">Danh mục nhà máy</h3>
            <span className="font-lining text-[6px] font-medium uppercase tracking-[0.16em] text-brand-deep">10 cơ sở · 2002—2023</span>
          </div>
          <ol className="grid grid-cols-2 gap-x-5">
            {factoryNetwork.factories.map((factory, i) => (
              <li key={factory.name} className="grid min-h-[55px] grid-cols-[22px_1fr] gap-2 border-b border-hairline py-2.5">
                <span className="font-lining text-[10px] tracking-[0.12em] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-[10px] font-semibold uppercase leading-[1.18] text-ink">{factory.name}</p>
                    <span className="shrink-0 font-lining text-[8px] font-semibold text-brand-deep">{factory.since}</span>
                  </div>
                  <p className="mt-1 flex items-start gap-1 text-[7px] leading-[1.35] text-ink-soft"><MapPin size={7} className="mt-px shrink-0" />{factory.place}</p>
                  <p className="mt-1 text-[10px] font-medium text-brand-deep">{factory.capacity}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.26} className="mt-8 grid grid-cols-[auto_1fr] items-center gap-4 border-l-2 border-brand bg-stone/60 px-4 py-3">
          <p className=" font-lining text-[25px] font-semibold leading-none text-brand-deep">65,5</p>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-ink">triệu m²/năm</p>
            <p className="mt-1 text-[8px] leading-[1.45] text-ink-soft">Tổng năng lực các nhóm vật liệu bề mặt trong hệ thống.</p>
          </div>
        </Reveal>
      </PageBody>
      <PageFooter side="right" folio={factoryFolio[1]} label="Hệ thống nhà máy" />
    </Page>
  );
}

function DomesticDistributionMap() {
  return (
    <div className="relative h-full overflow-hidden bg-stone/25">
      <div className="absolute inset-2">
        <Photo photo={markets.domesticMap} sizes="360px" fit="contain" />
      </div>
    </div>
  );
}

function WorldMarketMap() {
  return (
    <div className="relative h-[248px] overflow-hidden border border-hairline bg-paper">
      <div className="absolute inset-3">
        <Photo photo={markets.internationalMap} sizes="640px" fit="contain" />
      </div>
    </div>
  );
}

function ProductionTrend() {
  const values = markets.productionTrend;
  const max = Math.max(...values);

  return (
    <div className="border border-hairline bg-paper p-3.5">
      <div className="flex h-[118px] items-end gap-[3px] border-b border-l border-hairline px-2">
        {values.map((value, i) => (
          <div key={i} className="group relative flex h-full flex-1 items-end">
            <div
              className={cn("w-full bg-brand transition-colors", i === 18 || i === 19 ? "bg-ink-soft/55" : "group-hover:bg-brand-deep")}
              style={{ height: `${(value / max) * 100}%` }}
            />
            {(i === 0 || i === 10 || i === values.length - 1) && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-lining text-[5.5px] text-ink-soft">{2002 + i}</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-[6px] uppercase tracking-[0.14em] text-ink-soft">
        <span>Sản lượng qua các năm</span>
        <span className="font-lining text-brand-deep">2002 — 2024</span>
      </div>
    </div>
  );
}

function DomesticMarketPage() {
  return (
    <Page side="left">
      <div aria-hidden className="absolute right-0 top-0 h-[230px] w-[190px] bg-gradient-to-b from-brand-light/75 via-brand-tint/30 to-transparent" />
      <RunningHead side="left" label="Thị trường trong nước" />
      <PageBody side="left">
        <Reveal className="pt-4">
          <p className="text-[6px] font-medium uppercase tracking-[0.24em] text-brand-deep">Mạng lưới nội địa</p>
          <h2 className="mt-2 font-display text-[30px] font-bold uppercase leading-none text-ink">Thị trường trong nước</h2>
          <div className="mt-3 h-px bg-brand-deep" />
        </Reveal>

        <Reveal delay={0.12} className="mt-5 grid h-[360px] grid-cols-[0.78fr_1.22fr] border-b border-hairline">
          <div className="flex flex-col justify-between border-r border-hairline pr-5 pb-5">
            <div>
              <p className="text-[8.5px] leading-[1.75] text-ink-soft">{markets.domesticSummary}</p>
              <p className="mt-4 text-[8px] leading-[1.7] text-ink-soft">Năng lực sản xuất và phân phối rộng khắp giúp rút ngắn thời gian cung ứng, tối ưu vận chuyển và đáp ứng linh hoạt nhu cầu từng khu vực.</p>
            </div>
            <div>
              <p className="font-display font-lining text-[31px] font-semibold leading-none text-brand-deep">7–9%</p>
              <p className="mt-2 text-[6px] font-medium uppercase leading-[1.5] tracking-[0.13em] text-ink-soft">Thị phần nội địa</p>
              <div className="mt-4 space-y-2">
                {markets.domestic.map((region, i) => (
                  <div key={region} className="flex items-center gap-2 text-[6.5px] text-ink">
                    <span className="font-lining text-brand-deep">0{i + 1}</span>
                    <span className="h-px flex-1 bg-hairline" />
                    <span>{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pl-5">
            <DomesticDistributionMap />
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-5">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-brand-deep">2002 — 2024</p>
              <h3 className="mt-1 font-display text-[17px] font-semibold uppercase text-ink">Tăng trưởng sản lượng</h3>
            </div>
            <div className="text-right">
              <p className="font-display font-lining text-[24px] font-semibold leading-none text-brand-deep">45</p>
              <p className="mt-1 text-[7px] uppercase tracking-[0.12em] text-ink-soft">triệu m²</p>
            </div>
          </div>
          <ProductionTrend />
        </Reveal>
      </PageBody>
      <PageFooter side="left" folio={marketsFolio[0]} label="Thị trường trong nước" />
    </Page>
  );
}

function MarketsPage() {
  const capabilities = [
    { label: "Sản lượng sản xuất", width: "86%" },
    { label: "Chất lượng sản phẩm", width: "96%" },
    { label: "Chuỗi cung ứng", width: "90%" },
    { label: "Gia công nhãn OEM", width: "80%" },
  ];

  return (
    <Page side="right">
      <div aria-hidden className="absolute right-0 top-0 h-[220px] w-[180px] bg-gradient-to-b from-brand-light/75 via-brand-tint/30 to-transparent" />
      <RunningHead side="right" label="Thị trường quốc tế" />
      <PageBody side="right">
        <Reveal className="pt-4">
          <WorldMarketMap />
        </Reveal>

        <Reveal delay={0.1} className="mt-3">
          <ul className="grid grid-cols-3 gap-3">
            {markets.metrics.map((metric) => (
              <li key={metric.label} className="flex items-end gap-2 border-t border-brand pt-2">
                <p className="font-display font-lining text-[22px] font-semibold leading-none text-brand-deep">{metric.value}</p>
                <p className="pb-0.5 text-[5.5px] font-medium uppercase leading-[1.35] tracking-[0.1em] text-ink-soft">{metric.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-5 grid grid-cols-[0.72fr_1.28fr] gap-5 border-t border-hairline pt-5">
          <Reveal delay={0.18}>
            <section className="border-r border-hairline pr-4">
              <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-brand-deep">35 thị trường xuất khẩu</p>
              <ol className="mt-2 grid grid-cols-2 gap-x-3">
                {markets.exportMarkets.map((market, i) => (
                  <li key={market} className={cn("flex items-baseline gap-1.5 border-b border-hairline py-[2px] text-[5.8px]", i < 6 ? "font-semibold text-brand-deep" : "text-ink-soft") }>
                    <span className="font-lining text-[7px] opacity-65">{String(i + 1).padStart(2, "0")}</span>
                    {market}
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
          <Reveal delay={0.24}>
            <section>
              <p className="flex items-center gap-2 text-[6px] font-medium uppercase tracking-[0.2em] text-brand-deep"><Globe2 size={11} /> Năng lực xuất khẩu</p>
              <h2 className="mt-2 font-display text-[26px] font-bold uppercase leading-none text-ink">Vươn tới thị trường toàn cầu</h2>
              <p className="mt-3 text-[9px] text-justify leading-[1.65] text-ink-soft">{markets.exportText}</p>

              <div className="mt-4 space-y-2.5">
                {capabilities.map((item) => (
                  <div key={item.label} className="grid grid-cols-[105px_1fr] items-center gap-3">
                    <span className="text-[6.5px] text-ink-soft">{item.label}</span>
                    <div className="h-1.5 bg-brand-tint">
                      <div className="h-full bg-brand" style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-l-2 border-brand bg-stone/55 px-4 py-3.5">
                <p className="font-display text-[14px] font-semibold uppercase leading-tight text-ink">Đại diện chính thức tại Hoa Kỳ</p>
                <p className="mt-2 text-[9px] text-justify leading-[1.55] text-ink-soft">Mikado thành lập chi nhánh tại Hoa Kỳ vào năm 2006, đánh dấu
                    một bước đi chiến lược để mở rộng thị trường Bắc Mỹ và củng cố sự
                    hiện diện toàn cầu trong ngành vật liệu xây dựng.
                </p>
                <p className="mt-2 flex align-top gap-1.5 text-[7px] leading-[1.55] text-ink">
                  <MapPin size={10} className="mt-0.5 shrink-0 text-brand-deep" />
                  {markets.usOffice}
                </p>
              </div>
            </section>
          </Reveal>
        </div>
      </PageBody>
      <PageFooter side="right" folio={marketsFolio[1]} label="Thị trường quốc tế" />
    </Page>
  );
}

function QualityPage() {
  return (
    <Page side="left">
      <div aria-hidden className="absolute right-0 top-0 h-[215px] w-[168px] bg-gradient-to-b from-brand-light/90 via-brand-tint/70 to-transparent" />
      <RunningHead side="left" label="Chứng chỉ & chất lượng" />
      <PageBody side="left">
        <Reveal className="pt-3">
          <p className="font-display text-[17px] font-semibold uppercase leading-none text-ink">{quality.eyebrow}</p>
          <h2 className="mt-2 max-w-[430px] font-display text-[31px] font-bold uppercase leading-none tracking-[0.01em] text-ink">{quality.title}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-7">
          <div className="grid grid-cols-7 gap-2.5">
            {quality.badges.map((badge) => (
              <div key={badge.image.src} className="flex min-h-[68px] flex-col items-center justify-end px-1 pb-2 text-center">
                <div className="relative h-[44px] w-full">
                  <Photo
                    photo={badge.image}
                    sizes="90px"
                    fit="contain"
                    className={badge.image.src.endsWith("ISO-9001.png") ? "scale-[1.65]" : undefined}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-[490px] text-[10px] text-justify leading-[1.65] text-ink-soft">{quality.lead}</p>
        </Reveal>

        <Reveal delay={0.18} className="mt-5">
          <h3 className="border-b border-hairline pb-2 font-display text-[19px] font-semibold text-ink">Báo cáo Kiểm định &amp; Giấy chứng nhận</h3>
          <div className="mt-6 grid grid-cols-[0.9fr_1.1fr] gap-5">
            <div>
              <div className="relative mx-auto h-[165px] w-[135px] -rotate-6 border border-hairline bg-white p-3 shadow-[0_18px_28px_-20px_rgba(27,54,34,0.75)]">
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-signal to-brand-deep" />
                <div className="ml-2 text-center">
                  <p className="text-[4px] uppercase tracking-[0.14em] text-ink-soft">European conformity</p>
                  <p className="mt-4 font-display text-[14px] font-semibold uppercase text-brand-deep">Attestation</p>
                  <div className="mx-auto mt-2 h-px w-16 bg-hairline" />
                  <p className="mt-3 text-[5px] font-medium leading-[1.5] text-ink">Mikado Technology<br />&amp; Trading JSC</p>
                  <div className="mx-auto mt-4 grid size-9 place-items-center rounded-full border-2 border-brand/45 text-[5px] font-bold text-brand-deep">ECM</div>
                </div>
              </div>
              <ul className="mt-10 divide-y divide-white border border-white bg-stone">
                {quality.externalCertificates.map((certificate) => (
                  <li key={certificate} className="px-2.5 py-2 text-[7px] font-semibold leading-[1.25] text-ink">{certificate}</li>
                ))}
              </ul>
            </div>
            <ul className="overflow-hidden border border-white bg-stone">
              {quality.standards.map((standard, index) => (
                <li key={standard} className={cn("px-3 py-[5px] font-lining text-[8px] font-semibold text-ink", index % 2 === 1 && "bg-black/[0.055]")}>{standard}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.26} className="mt-4 border-l-2 border-brand pl-3">
          <p className="max-w-[480px] text-[10px] text-justify leading-[1.55] text-ink-soft">{quality.legalNote}</p>
        </Reveal>
      </PageBody>
      <PageFooter side="left" folio={qualityFolio[0]} label="Chất lượng" />
    </Page>
  );
}

function CertificateDocument({ name, period, index }: { name: string; period: string; index: number }) {
  const accents = ["bg-[#214b85]", "bg-[#264b8f]", "bg-[#235c77]", "bg-[#a5262f]", "bg-[#b39a61]", "bg-[#7f875d]"];

  return (
    <article className="relative h-[225px] overflow-hidden border border-hairline bg-white px-4 pb-3 pt-4 shadow-[0_14px_25px_-19px_rgba(27,54,34,0.75)]">
      <div className={cn("absolute inset-y-0 left-0 w-2", accents[index % accents.length])} />
      <div className="text-center">
        <p className="text-[3.8px] uppercase tracking-[0.14em] text-ink-soft">Product quality certification</p>
        <p className="mt-3 font-serif text-[12px] font-bold uppercase tracking-[0.04em] text-ink">Certificate</p>
        <div className="mx-auto mt-2 h-px w-20 bg-hairline" />
        <p className="mt-3 min-h-[27px] text-[6px] font-semibold uppercase leading-[1.45] text-brand-deep">{name}</p>
        <p className="mt-1 text-[5px] uppercase tracking-[0.12em] text-ink-soft">{period}</p>
        <div className="mx-auto mt-4 space-y-1.5">
          <div className="mx-auto h-px w-[82%] bg-hairline" />
          <div className="mx-auto h-px w-[70%] bg-hairline" />
          <div className="mx-auto h-px w-[76%] bg-hairline" />
          <div className="mx-auto h-px w-[58%] bg-hairline" />
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full border-2 border-brand/45 text-[5px] font-bold uppercase text-brand-deep">MK</div>
      <span className="absolute bottom-3 right-3 font-lining text-[4.5px] tracking-[0.12em] text-ink-soft">CERT. {String(index + 1).padStart(2, "0")}</span>
    </article>
  );
}

function CertificatePortfolioPage() {
  return (
    <Page side="right" tone="brand">
      <div aria-hidden className="absolute right-0 top-0 h-[215px] w-[172px] bg-gradient-to-b from-white/[0.09] to-transparent" />
      <RunningHead side="right" label="Hồ sơ chứng nhận" tone="brand" />
      <PageBody side="right">
        <Reveal className="pt-3">
          <p className="font-display text-[17px] font-semibold uppercase leading-none text-brand-tint">{quality.eyebrow}</p>
          <h2 className="mt-2 max-w-[430px] font-display text-[31px] font-bold uppercase leading-none tracking-[0.01em] text-white">{quality.title}</h2>
          <p className="mt-6 max-w-[485px] border-l-2 border-brand-light pl-4 text-[10px] text-justify leading-[1.7] text-white/75">{quality.internationalCommitment}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-7 grid grid-cols-3 gap-4">
          {quality.certificates.map((certificate, index) => (
            <CertificateDocument key={certificate.name} {...certificate} index={index} />
          ))}
        </Reveal>

        <Reveal delay={0.24} className="mt-5 flex items-start justify-between border-t border-white/25 pt-3">
          <p className="max-w-[380px] text-[8px] leading-[1.55] text-white/65">Hồ sơ bao gồm chứng nhận hệ thống quản lý, tiêu chuẩn sản phẩm và hợp quy cho hoạt động trong nước, quốc tế.</p>
          <div className="flex items-center gap-2 text-brand-tint">
            <ShieldCheck size={15} strokeWidth={1.5} />
            <span className="text-[5.5px] font-medium uppercase tracking-[0.16em]">Hồ sơ xác thực</span>
          </div>
        </Reveal>
      </PageBody>
      <PageFooter side="right" folio={qualityFolio[1]} label="Hồ sơ chứng nhận" tone="brand" />
    </Page>
  );
}

function PartnersPage() {
  const featured = partnerships.projects[0];
  const highlights = partnerships.projects.slice(1, 4);

  return (
    <Page side="left" tone="brand">
      <div aria-hidden className="absolute -left-14 bottom-10 size-56 rounded-full border-[42px] border-white/[0.025]" />
      <RunningHead side="left" label="Đối tác & dự án" tone="brand" />
      <PageBody side="left">
        <Reveal className="pt-4">
          <div className="mt-3 grid grid-cols-[0.8fr_1.2fr] items-end gap-5">
            <h2 className="font-display text-[43px] font-bold uppercase leading-[0.95] tracking-[0.01em]">{partnerships.title}</h2>
            <p className="border-l border-white/30 pl-4 text-[7.5px] leading-[1.65] text-white/72">{partnerships.lead}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-6">
          <article className="relative h-[340px] overflow-hidden border border-white/15">
            <Photo photo={featured.image} sizes="760px" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-night/90 via-brand-night/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 max-w-[470px] p-5">
              <div className="flex items-center gap-2 text-[6px] font-medium uppercase tracking-[0.18em] text-brand-tint">
                <span>{featured.category}</span>
                <span className="h-px w-5 bg-white/35" />
                <span>{featured.partner}</span>
              </div>
              <div className="mt-2">
                <p className="mt-2 font-display text-[22px] font-semibold uppercase leading-none">{featured.project}</p>
                <p className="mt-3 max-w-[390px] text-[9px] leading-[1.55] text-white/68">{featured.description}</p>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.2} className="mt-4">
          <div className="mb-2.5 border-b border-white/25 pb-2">
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {highlights.map((item) => (
              <li key={item.partner} className="group relative aspect-[3/4] overflow-hidden border border-white/15">
                <Photo photo={item.image} sizes="260px" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-night via-brand-night/10 to-transparent transition-colors group-hover:from-black" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-[5.5px] font-medium uppercase tracking-[0.12em] text-brand-tint">{item.category}</p>
                  <p className="mt-1 font-display text-[10px] font-semibold uppercase leading-tight">{item.project}</p>
                  <p className="mt-1 text-[5.5px] font-medium uppercase tracking-[0.1em] text-white/65">{item.partner}</p>
                  <p className="mt-1.5 line-clamp-2 text-[7px] leading-[1.4] text-white/58">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </PageBody>
      <PageFooter side="left" folio={partnershipsFolio[0]} label="Đối tác & dự án" tone="brand" />
    </Page>
  );
}

function PartnerDirectoryPage() {
  const projects = partnerships.projects.slice(4);
  const featured = projects[0];
  const gallery = projects.slice(1);

  return (
    <Page side="right">
      <RunningHead side="right" label="Dự án tiêu biểu" />
      <PageBody side="right">
        <Reveal className="pt-4">
          <div className="grid grid-cols-[1.25fr_0.75fr] gap-5">
            <div className="flex flex-col justify-between border-t-2 border-brand pt-3">
              <div>
                <p className="text-[6px] font-medium uppercase tracking-[0.24em] text-brand-deep">Danh mục công trình</p>
                <h2 className="mt-3 font-display text-[34px] font-bold uppercase leading-[0.96] text-ink">Kiến tạo giá trị<br />qua từng công trình</h2>
              </div>
              <p className="mt-5 max-w-[320px] text-[8px] leading-[1.65] text-ink-soft">{partnerships.overview}</p>
            </div>
            <div className="relative h-[170px] overflow-hidden">
              <Photo photo={partnerships.handshake} sizes="260px" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-night/45 to-transparent" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-5">
          <article className="grid h-[175px] grid-cols-[1.15fr_0.85fr] overflow-hidden bg-brand-deep text-white">
            <div className="relative">
              <Photo photo={featured.image} sizes="500px" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-deep/40" />
            </div>
            <div className="flex flex-col justify-end p-5">
              <div>
                <p className="text-[6px] font-medium uppercase tracking-[0.14em] text-brand-tint">{featured.category}</p>
                <p className="mt-2 font-display text-[17px] font-semibold uppercase leading-[1.05]">{featured.project}</p>
                <p className="mt-2 text-[6px] uppercase tracking-[0.12em] text-white/55">{featured.partner}</p>
                <p className="mt-3 text-[7px] leading-[1.5] text-white/65">{featured.description}</p>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.22} className="mt-4">
          <div className="mb-2 flex items-center justify-between border-b border-hairline pb-2">
            <p className="text-[6px] font-medium uppercase tracking-[0.2em] text-brand-deep">Danh mục công trình</p>
            <p className="text-[5.5px] uppercase tracking-[0.12em] text-ink-soft">Nhà ở · Khu đô thị · Nghỉ dưỡng · Hạ tầng</p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {gallery.map((item) => (
              <li key={item.partner} className="grid h-[133px] grid-cols-[0.76fr_1.24fr] overflow-hidden border border-hairline bg-paper">
                <div className="relative">
                  <Photo photo={item.image} sizes="210px" />
                </div>
                <div className="flex flex-col justify-between p-3">
                  <div>
                    <p className="text-[5.5px] font-medium uppercase tracking-[0.1em] text-brand-deep">{item.category}</p>
                    <p className="mt-1 font-display text-[10px] font-semibold uppercase leading-[1.1] text-ink">{item.project}</p>
                    <p className="mt-1.5 text-[5.5px] font-semibold uppercase tracking-[0.1em] text-brand-deep">{item.partner}</p>
                  </div>
                  <p className="line-clamp-3 text-[7px] leading-[1.45] text-ink-soft">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </PageBody>
      <PageFooter side="right" folio={partnershipsFolio[1]} label="Dự án tiêu biểu" />
    </Page>
  );
}

/** Trang 06–07: hệ thống nhà máy MIKADO-MT. */
export function FactorySpread() {
  return (
    <Spread>
      <FactoryPage />
      <FactoryDirectoryPage />
    </Spread>
  );
}

/** Trang 08–09: thị trường trong nước và quốc tế. */
export function MarketsSpread() {
  return (
    <Spread>
      <DomesticMarketPage />
      <MarketsPage />
    </Spread>
  );
}

/** Trang 10–11: hệ thống chất lượng và hồ sơ chứng nhận. */
export function QualitySpread() {
  return (
    <Spread>
      <QualityPage />
      <CertificatePortfolioPage />
    </Spread>
  );
}

/** Trang đôi kế cuối: đối tác và các dự án tiêu biểu. */
export function PartnershipsSpread() {
  return (
    <Spread>
      <PartnersPage />
      <PartnerDirectoryPage />
    </Spread>
  );
}
