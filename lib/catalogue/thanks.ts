import type { PhotoRef } from "./types";

/**
 * DỮ LIỆU TRANG ĐÔI "LỜI CẢM ƠN" (cuối nội dung, trước bìa cuối) — nội dung và ảnh bên dưới là TẠM.
 *
 * - Lời cảm ơn: văn bản chung để duyệt bố cục, thay bằng lời cảm ơn chính thức.
 * - Ảnh: ảnh texture demo (CC0). Thay `thanks.image.src` bằng ảnh thật (ví dụ ảnh bắt tay như tài liệu tham khảo).
 * - Văn phòng: thông tin liên hệ chính thức hiển thị ở trang 41. Giá trị để trống ("") thì dòng tự ẩn;
 *   không còn dòng nào thì cả khối văn phòng ẩn.
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
  /** Tên pháp nhân hiển thị ở trang liên hệ cuối catalogue. */
  companyName: "Công ty Cổ phần Kỹ Thương Thiên Hoàng (Mikado-MT)",
  offices: [
    {
      title: "Trụ sở chính",
      lines: [
        { label: "", value: "Tầng 6, Tòa Diamond Flower, 48 Lê Văn Lương, P. Thanh Xuân, Hà Nội, Việt Nam." },
        { label: "Điện thoại", value: "(+8424) 3755 6888" },
        { label: "Tổng đài", value: "1900 0338" },
        { label: "Phụ trách bán hàng", value: "infomikado@mikado.com.vn" },
        { label: "Phụ trách xuất khẩu", value: "+84 988 959 466" },
        { label: "Email", value: "buihanh81@mikado.com.vn" },
      ],
    },
    {
      title: "Showroom",
      lines: [
        { label: "", value: "The Matrix One Building, số 1 Lê Quang Đạo, P. Từ Liêm, Hà Nội, Việt Nam." },
        { label: "Điện thoại", value: "1900 0338" },
        { label: "", value: "171 Huỳnh Tấn Phát, P. Hòa Cường, Đà Nẵng, Việt Nam.", breakBefore: true },
        { label: "Điện thoại", value: "0903 511 995" },
        { label: "", value: "Số 100, đường số 10, KDC Vạn Phúc, P. Hiệp Bình, TP HCM, Việt Nam.", breakBefore: true },
        { label: "Điện thoại", value: "(+8428) 35 35 9398" },
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
