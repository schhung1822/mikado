import type { LogoRef } from "./types";

/**
 * DỮ LIỆU CÔNG TY CHỦ QUẢN — dùng cho bìa đầu và bìa cuối.
 *
 * MIKADO-MT là công ty chủ quản; logo MIKADO-MT KHÔNG phải logo thương hiệu MIKADO
 * (thương hiệu sản phẩm, xem lib/catalogue/products.ts). Hai logo không dùng thay thế nhau.
 */
export const company = {
  /** Tên hiển thị. Chưa có tên đầy đủ được xác nhận nên dùng "MIKADO-MT". */
  name: "www.mikado.com.vn",
  /** Tên pháp nhân đầy đủ. Điền khi được xác nhận — bìa sẽ tự hiện thay cho `name` ở dòng chữ. */
  fullName: "",
  logo: {
    src: "/images/logo/mikado-mt.jpg",
    width: 3534,
    height: 728,
    alt: "MIKADO-MT",
  } satisfies LogoRef,
  /** Để trống ("") nếu chưa có dữ liệu thật: dòng tương ứng ở bìa cuối sẽ tự ẩn. */
  contact: {
    address: "",
    hotline: "",
    email: "",
    website: "",
  },
};

export const coverCopy = {
  title: ["THE COMPANY", "PROFILE"],
  subtitle: "HỒ SƠ NĂNG LỰC",
};

/** Các dòng liên hệ có dữ liệu, theo thứ tự hiển thị. */
export function contactLines() {
  const { address, hotline, email, website } = company.contact;
  return [
    { label: "Địa chỉ", value: address },
    { label: "Hotline", value: hotline },
    { label: "Email", value: email },
    { label: "Website", value: website },
  ].filter((line) => line.value.trim() !== "");
}
