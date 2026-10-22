/** Vùng hiển thị của ảnh, tính theo tỷ lệ 0–1 của ảnh gốc: [x, y, rộng, cao]. */
export type CropBox = readonly [x: number, y: number, w: number, h: number];

/** Ảnh dùng trong trang. Thay `src` bằng ảnh thật; `focal` quyết định phần nào được giữ khi bị crop. */
export interface PhotoRef {
  src: string;
  alt: string;
  /** CSS object-position, ví dụ "50% 30%". Mặc định "50% 50%". */
  focal?: string;
  /** Ghi nguồn ảnh khi giấy phép yêu cầu. */
  credit?: string;
}

export type CatalogueEntryKind = "single" | "spread";

/** Một mục trong trình xem: trang đơn (bìa) hoặc trang đôi (nội dung). */
export interface CatalogueEntry {
  id: string;
  kind: CatalogueEntryKind;
  /** Tên mục hiển thị ở chỉ báo. */
  label: string;
  /** Số trang in, ví dụ "04–05". */
  folio: string;
  node: React.ReactNode;
}
