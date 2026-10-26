import { brandIndex, brands } from "./brands";

/**
 * MỤC LỤC & SỐ TRANG — nguồn duy nhất cho số trang của các trang đôi nội dung.
 *
 * Bìa đầu là trang 1 (không đánh số), trang đôi mục lục & liên hệ là 02–03, các trang đôi nội dung bắt đầu từ 04.
 * Mỗi trang đôi chiếm 2 số trang liên tiếp. Thêm/đổi thứ tự thì sửa `productOrder`: số trang của trang sản phẩm
 * và mục lục tự tính lại.
 */
export type Folio = readonly [left: string, right: string];

export const CONTENTS_FOLIO: Folio = ["02", "03"];
/** Số trang in của trang đôi nội dung đầu tiên (giới thiệu công ty). */
export const CONTENT_START = 4;

const pad = (n: number) => String(n).padStart(2, "0");
/** Số trang của trang đôi nội dung thứ `index` (0 = giới thiệu công ty). */
export const spreadFolio = (index: number): Folio => [pad(CONTENT_START + index * 2), pad(CONTENT_START + index * 2 + 1)];

/**
 * Thứ tự các trang đôi nội dung: 0 = giới thiệu công ty & ban lãnh đạo, 1–3 = ba chủ đề
 * năng lực, 4 = tổng hợp thương hiệu, tiếp theo là mỗi thương hiệu một trang đôi (`productOrder`),
 * cuối cùng là đối tác & dự án và lời cảm ơn.
 */
export const companyFolio = spreadFolio(0);
export const factoryFolio = spreadFolio(1);
export const marketsFolio = spreadFolio(2);
export const qualityFolio = spreadFolio(3);
export const overviewFolio = spreadFolio(4);

/** Thứ tự các trang đôi sản phẩm theo thương hiệu: theo `BRAND_ORDER` (brands.ts). */
export const productOrder: string[] = brandIndex.map((b) => b.id);

export const productFolio = (brandId: string): Folio => {
  const i = productOrder.indexOf(brandId);
  if (i < 0) throw new Error(`Thương hiệu "${brandId}" chưa có trong productOrder (contents.ts)`);
  return spreadFolio(5 + i);
};

/** Trang đôi "Đối tác & dự án": sau trang sản phẩm cuối cùng, ngay trước lời cảm ơn. */
export const partnershipsFolio = spreadFolio(5 + productOrder.length);

/** Trang đôi "Lời cảm ơn": ngay sau đối tác & dự án, trước bìa cuối. */
export const thanksFolio = spreadFolio(6 + productOrder.length);

export const folioText = (folio: Folio | string) => (typeof folio === "string" ? folio : `${folio[0]}–${folio[1]}`);

const nameOf = (id: string) => brands.find((b) => b.id === id)?.name ?? id;

export interface TocSection {
  title: string;
  items: { label: string; folio: Folio | string }[];
}

/** Các mục của mục lục — gồm bốn trang năng lực bổ sung cùng các trang thương hiệu, sản phẩm và lời cảm ơn. */
export const tocSections: TocSection[] = [
  {
    title: "Giới thiệu & năng lực",
    items: [
      { label: "Giới thiệu công ty và ban lãnh đạo", folio: companyFolio },
      { label: "Hệ thống nhà máy MIKADO-MT", folio: factoryFolio },
      { label: "Thị trường trong và ngoài nước", folio: marketsFolio },
      { label: "Chứng chỉ và chất lượng", folio: qualityFolio },
    ],
  },
  { title: "Thương hiệu", items: [{ label: `Tổng hợp ${brands.length} thương hiệu`, folio: overviewFolio }] },
  { title: "Sản phẩm theo thương hiệu", items: productOrder.map((id) => ({ label: nameOf(id), folio: productFolio(id) })) },
  {
    title: "Hợp tác & kết nối",
    items: [
      { label: "Đối tác và dự án", folio: partnershipsFolio },
      { label: "Lời cảm ơn", folio: thanksFolio },
    ],
  },
];

/** Tổng số trang đôi nội dung và khoảng trang bao phủ. */
export const tocSummary = (() => {
  const spreads = 6 + productOrder.length + 1; // giới thiệu + 3 năng lực + tổng hợp + sản phẩm + đối tác + lời cảm ơn
  return { spreads, from: spreadFolio(0)[0], to: spreadFolio(spreads - 1)[1] };
})();
