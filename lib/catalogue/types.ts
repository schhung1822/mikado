/** Vùng hiển thị của ảnh, tính theo tỷ lệ 0–1 của ảnh gốc: [x, y, rộng, cao]. */
export type CropBox = readonly [x: number, y: number, w: number, h: number];

/** Ảnh dùng trong trang. Thay `src` bằng ảnh thật; `focal` quyết định phần nào được giữ khi bị crop. */
export interface PhotoRef {
  src: string;
  alt: string;
  /** CSS object-position, ví dụ "50% 30%". Mặc định "50% 50%". */
  focal?: string;
  /** "cover" phủ kín khung (có crop theo focal); "contain" giữ nguyên toàn bộ ảnh. Mặc định tùy nơi dùng. */
  fit?: "cover" | "contain";
  /** Ghi nguồn ảnh khi giấy phép yêu cầu. */
  credit?: string;
}

/** Logo: kích thước pixel gốc để giữ đúng tỷ lệ khi hiển thị. */
export interface LogoRef {
  src: string;
  /** Kích thước pixel gốc của file (dùng để tính tỷ lệ, không phải kích thước hiển thị). */
  width: number;
  height: number;
  alt: string;
}

export type CatalogueEntryKind = "single" | "spread";

/** Một mục trong trình xem: trang đơn (bìa, trang thương hiệu) hoặc trang đôi (nội dung). */
export interface CatalogueEntry {
  id: string;
  kind: CatalogueEntryKind;
  /** Tên mục hiển thị ở chỉ báo. */
  label: string;
  /** Số trang in, ví dụ "04–05". Để "" cho bìa (không đánh số). */
  folio: string;
  node: React.ReactNode;
}
