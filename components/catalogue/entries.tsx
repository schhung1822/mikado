import type { CatalogueEntry } from "@/lib/catalogue/types";
import { BRANDS_FOLIO, BrandsSpread } from "./brands-spread";
import { PRODUCTS_FOLIO, ProductsSpread } from "./products-spread";

/**
 * Thứ tự các mục của catalogue. Sau này thêm bìa đầu / bìa cuối bằng
 * { kind: "single", node: <SinglePage>…</SinglePage> } ở đầu / cuối mảng, và các trang đôi khác ở giữa.
 */
export const entries: CatalogueEntry[] = [
  { id: "brands", kind: "spread", label: "Thương hiệu", folio: BRANDS_FOLIO.join("–"), node: <BrandsSpread /> },
  { id: "products", kind: "spread", label: "Gạch ốp lát", folio: PRODUCTS_FOLIO.join("–"), node: <ProductsSpread /> },
];
