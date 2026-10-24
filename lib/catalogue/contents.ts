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
 * Thứ tự các trang đôi nội dung: 0 = giới thiệu công ty & ban lãnh đạo, 1 = tổng hợp thương hiệu,
 * tiếp theo là mỗi thương hiệu một trang đôi (`productOrder`), cuối cùng là lời cảm ơn.
 */
export const companyFolio = spreadFolio(0);
export const overviewFolio = spreadFolio(1);

/** Thứ tự các trang đôi sản phẩm theo thương hiệu: theo `BRAND_ORDER` (brands.ts). */
export const productOrder: string[] = brandIndex.map((b) => b.id);

export const productFolio = (brandId: string): Folio => {
  const i = productOrder.indexOf(brandId);
  if (i < 0) throw new Error(`Thương hiệu "${brandId}" chưa có trong productOrder (contents.ts)`);
  return spreadFolio(2 + i);
};

/** Trang đôi "Lời cảm ơn": ngay sau trang đôi sản phẩm thương hiệu cuối cùng, trước bìa cuối. */
export const thanksFolio = spreadFolio(2 + productOrder.length);

export const folioText = (folio: Folio) => `${folio[0]}–${folio[1]}`;

const nameOf = (id: string) => brands.find((b) => b.id === id)?.name ?? id;

export interface TocSection {
  title: string;
  items: { label: string; folio: Folio }[];
}

/** Các mục của mục lục — chỉ gồm trang đôi nội dung đã xác định (giới thiệu công ty, tổng hợp thương hiệu, mỗi thương hiệu một trang đôi, lời cảm ơn). */
export const tocSections: TocSection[] = [
  { title: "Giới thiệu", items: [{ label: "Giới thiệu công ty và ban lãnh đạo", folio: companyFolio }] },
  { title: "Thương hiệu", items: [{ label: `Tổng hợp ${brands.length} thương hiệu`, folio: overviewFolio }] },
  { title: "Sản phẩm theo thương hiệu", items: productOrder.map((id) => ({ label: nameOf(id), folio: productFolio(id) })) },
  { title: "Lời cảm ơn", items: [{ label: "Lời cảm ơn", folio: thanksFolio }] },
];

/** Tổng số trang đôi nội dung và khoảng trang bao phủ. */
export const tocSummary = (() => {
  const spreads = 2 + productOrder.length + 1; // giới thiệu + tổng hợp + sản phẩm theo thương hiệu + lời cảm ơn
  return { spreads, from: spreadFolio(0)[0], to: spreadFolio(spreads - 1)[1] };
})();
