import { company } from "./company";
import type { PhotoRef } from "./types";

/**
 * DỮ LIỆU TRANG ĐÔI "LỜI CẢM ƠN" (cuối nội dung, trước bìa cuối) — nội dung và ảnh bên dưới là TẠM.
 *
 * - Lời cảm ơn: văn bản chung để duyệt bố cục, thay bằng lời cảm ơn chính thức.
 * - Ảnh: ảnh texture demo (CC0). Thay `thanks.image.src` bằng ảnh thật (ví dụ ảnh bắt tay như tài liệu tham khảo).
 * - Văn phòng: địa chỉ/hotline/email là DỮ LIỆU DEMO (xem lib/catalogue/contacts.ts). Giá trị để trống ("") thì dòng
 *   tự ẩn; không còn dòng nào thì cả khối văn phòng ẩn.
 */
export const thanks = {
  title: "Lời cảm ơn",
  paragraphs: [
    "Chúng tôi trân trọng gửi lời cảm ơn sâu sắc tới Quý khách hàng và đối tác đã quan tâm và đồng hành cùng hành trình phát triển của doanh nghiệp chúng tôi. Với sứ mệnh kiến tạo không gian sống hiện đại thông qua những sản phẩm gạch men chất lượng, thẩm mỹ và bền vững, chúng tôi luôn nỗ lực đổi mới và nâng cao giá trị trong từng công trình.",
    "Chúng tôi tin rằng, sự hợp tác dựa trên niềm tin và cùng chung tầm nhìn sẽ mở ra nhiều cơ hội để phát triển mạnh mẽ trong tương lai. Rất mong được sát cánh cùng Quý vị trong các dự án sắp tới, cùng nhau chinh phục những đỉnh cao mới.",
  ],
  image: {
    src: "/images/battay.jpg",
    alt: "Ảnh minh họa (ảnh tạm)",
    focal: "50% 60%",
    fit: "cover",
  } satisfies PhotoRef,
  /** Tên công ty hiển thị ở trang phải. Dùng tên đầy đủ khi được xác nhận (company.fullName), nếu chưa thì "MIKADO-MT". */
  companyName: company.fullName.trim() || company.name,
  offices: [
    {
      title: "Trụ sở chính",
      lines: [
        { label: "Địa chỉ", value: "Địa chỉ demo — cập nhật sau" },
        { label: "Hotline", value: "0900 000 000" },
        { label: "Email", value: "demo@example.com" },
      ],
    },
    {
      title: "Showroom",
      lines: [
        { label: "Địa chỉ", value: "Địa chỉ demo — cập nhật sau" },
        { label: "Hotline", value: "0900 000 001" },
      ],
    },
  ],
};

/** Các văn phòng còn dòng có dữ liệu (đã lọc dòng trống). */
export function officesWithData() {
  return thanks.offices
    .map((o) => ({ ...o, lines: o.lines.filter((l) => l.value.trim() !== "") }))
    .filter((o) => o.lines.length > 0);
}
