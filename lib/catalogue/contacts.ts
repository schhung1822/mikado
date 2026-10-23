import { brands } from "./brands";

/**
 * THÔNG TIN LIÊN HỆ CỦA TỪNG THƯƠNG HIỆU — DỮ LIỆU DEMO.
 *
 * Toàn bộ giá trị dưới đây là chỗ giữ chỗ để duyệt bố cục (địa chỉ ghi "demo", hotline 0900 000 xxx, email @example.com),
 * KHÔNG phải thông tin thật. Thay bằng dữ liệu thật tại đây; trường để trống ("") thì dòng tương ứng tự ẩn.
 */
export interface BrandContact {
  address: string;
  hotline: string;
  email: string;
}

const demoContact = (index: number, id: string): BrandContact => ({
  address: "Địa chỉ demo — cập nhật sau",
  hotline: `0900 000 ${String(index + 1).padStart(3, "0")}`,
  email: `${id}@example.com`,
});

export const brandContacts: Record<string, BrandContact> = Object.fromEntries(
  brands.map((b, i) => [b.id, demoContact(i, b.id)]),
);

export const CONTACT_NOTE = "Thông tin liên hệ mang tính minh họa.";

/** Các dòng liên hệ có dữ liệu, theo thứ tự hiển thị. */
export function contactRows(brandId: string) {
  const c = brandContacts[brandId];
  if (!c) return [];
  return [
    { label: "Địa chỉ", value: c.address },
    { label: "Hotline", value: c.hotline },
    { label: "Email", value: c.email },
  ].filter((row) => row.value.trim() !== "");
}
