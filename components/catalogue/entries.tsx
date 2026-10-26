import {
  CONTENTS_FOLIO,
  companyFolio,
  factoryFolio,
  folioText,
  marketsFolio,
  partnershipsFolio,
  qualityFolio,
  thanksFolio,
} from "@/lib/catalogue/contents";
import { brandProductPages } from "@/lib/catalogue/products";
import type { CatalogueEntry } from "@/lib/catalogue/types";
import { BRANDS_FOLIO, BrandsSpread } from "./brands-spread";
import { BrandProductSpread } from "./brand-product-page";
import { FactorySpread, MarketsSpread, PartnershipsSpread, QualitySpread } from "./capabilities-spreads";
import { BackCover, FrontCover } from "./covers";
import { CompanySpread } from "./company-spread";
import { ContentsSpread } from "./contents-spread";
import { ThanksSpread } from "./thanks-spread";

/**
 * Thứ tự các mục của catalogue (chỉ gồm những trang đã làm — điều hướng đọc từ đây).
 * - Trang đôi mục lục & liên hệ (02–03) ngay sau bìa đầu: trái nền xanh, phải nền trắng. Số trang xem lib/catalogue/contents.ts.
 * - Trang đôi giới thiệu công ty (trái, nền trắng) và ban lãnh đạo (phải, nền xanh), ngay sau mục lục: 04–05.
 * - Ba trang đôi năng lực tiếp theo: nhà máy, thị trường và chất lượng.
 * - Bìa đầu / bìa cuối: trang đơn, hiển thị độc lập và căn giữa.
 * - Nội dung: trang đơn ghép thành trang đôi khi xem desktop (mobile xem từng trang).
 * - Trang đôi sản phẩm của từng thương hiệu (lib/catalogue/products.ts → brandProductPages) xen kẽ nền
 *   trắng / xanh thương hiệu theo thứ tự. Thêm thương hiệu mới = thêm vào `brandProductPages`.
 * - Trang đôi "Đối tác & dự án" nằm sau toàn bộ sản phẩm, ngay trước "Lời cảm ơn".
 * - Trang đôi "Lời cảm ơn" (cuối nội dung, ngay trước bìa cuối): cả hai trang nền xanh.
 * Menu bên trái chỉ hiện `label`; với trang thương hiệu `label` là tên thương hiệu.
 */
export const entries: CatalogueEntry[] = [
  { id: "cover", kind: "single", label: "Bìa đầu", folio: "", node: <FrontCover /> },
  { id: "contents", kind: "spread", label: "Mục lục", folio: folioText(CONTENTS_FOLIO), node: <ContentsSpread /> },
  { id: "company", kind: "spread", label: "Giới thiệu", folio: folioText(companyFolio), node: <CompanySpread /> },
  { id: "factory-network", kind: "spread", label: "Hệ thống nhà máy", folio: folioText(factoryFolio), node: <FactorySpread /> },
  { id: "markets", kind: "spread", label: "Thị trường", folio: folioText(marketsFolio), node: <MarketsSpread /> },
  { id: "quality", kind: "spread", label: "Chứng chỉ & chất lượng", folio: folioText(qualityFolio), node: <QualitySpread /> },
  { id: "brands", kind: "spread", label: "Thương hiệu", folio: folioText(BRANDS_FOLIO), node: <BrandsSpread /> },
  ...brandProductPages.map(
    (page, i): CatalogueEntry => ({
      id: page.id,
      kind: "spread",
      label: page.brand.name,
      folio: folioText(page.folio),
      node: <BrandProductSpread page={page} tone={i % 2 === 0 ? "light" : "brand"} />,
    }),
  ),
  { id: "partnerships", kind: "spread", label: "Đối tác & dự án", folio: folioText(partnershipsFolio), node: <PartnershipsSpread /> },
  { id: "thanks", kind: "spread", label: "Lời cảm ơn", folio: folioText(thanksFolio), node: <ThanksSpread /> },
  { id: "back-cover", kind: "single", label: "Bìa cuối", folio: "", node: <BackCover /> },
];
