import type { PhotoRef } from "./types";

/**
 * DỮ LIỆU TRANG ĐÔI "GIỚI THIỆU CÔNG TY & BAN LÃNH ĐẠO" — TOÀN BỘ NỘI DUNG LÀ DỮ LIỆU DEMO.
 *
 * Chưa có thông tin được xác nhận, nên mọi đoạn văn, tên và chức danh bên dưới chỉ là chỗ giữ chỗ để duyệt bố cục
 * (không có năm thành lập, số liệu, chứng nhận hay tên người thật). Thay bằng nội dung thật tại đây.
 * - Ảnh chân dung: điền `photo` của từng người; để trống thì hiện khung trống đúng tỷ lệ chân dung 3 : 4.
 * - Bỏ `bio`/`message` (đặt "") thì khối tương ứng tự ẩn.
 */
export const companyProfile = {
  eyebrow: "Giới thiệu công ty",
  title: "Khái quát MIKADO-MT",
  lead: 
    "Khởi nguồn từ năm 2002, bắt đầu với 100% vốn đầu tư trong nước từ 08 cổ đông sáng lập, Công ty Cổ phần Kỹ thương Thiên Hoàng – MIKADO Group đã đặt những viên gạch đầu tiên cho một chặng đường phát triển vững chắc. Từ một nhà máy sản xuất gạch tại khu công nghiệp Tiền Hải, tỉnh Thái Bình, MIKADO đã không ngừng vươn lên, khẳng định bản lĩnh và khát vọng chinh phục mọi giới hạn, đến nay đã sở hữu hơn 11 nhà máy. Nhờ sự điều hành của các cấp lãnh đạo đầy tâm huyết và chiến lược, MIKADO đã có những bước tiến dài và vững chắc, vượt qua mọi thử thách để đạt được vị thế như ngày hôm nay",
  paragraphs: [
    "Phần này dành cho hai đến ba đoạn văn ngắn, đủ để người đọc hiểu về công ty trước khi xem các thương hiệu và sản phẩm gạch ốp lát ở những trang sau.",
    "Phần này dành cho hai đến ba đoạn văn ngắn, đủ để người đọc hiểu về công ty trước khi xem các thương hiệu và sản phẩm gạch ốp lát ở những trang sau.",
  ],
  pillars: [
    { title: "Tầm nhìn", text: "Nội dung tạm: mô tả ngắn về tầm nhìn của công ty." },
    { title: "Sứ mệnh", text: "Nội dung tạm: mô tả ngắn về sứ mệnh và cam kết với khách hàng." },
    { title: "Giá trị cốt lõi", text: "Nội dung tạm: những giá trị công ty theo đuổi sẽ được bổ sung." },
  ],
};

export interface Leader {
  name: string;
  role: string;
  /** Ảnh chân dung (tỷ lệ 3 : 4, cắt theo `focal`). Chưa có thì hiện khung trống. */
  photo?: PhotoRef;
}

export const leadership = {
  eyebrow: "Ban lãnh đạo",
  title: "Ban lãnh đạo",
  lead: "MIKADO sở hữu tiềm lực phát triển mạnh mẽ với 06 nhãn hiệu hoạt động ổn định, thị trường trải dài trên toàn quốc, đồng thời duy trì nguồn cung ứng cho các công trình xây dựng một cách liên tục, đồng bộ và hiệu quả.",
  /** Tên và chức danh là CHỖ GIỮ CHỖ (Nguyễn Văn A/B/C), không phải người thật. */
  leaders: [
    { name: "Nguyễn Văn A", role: "Chủ tịch Hội đồng quản trị" },
    { name: "Nguyễn Văn B", role: "Tổng giám đốc" },
    { name: "Nguyễn Văn C", role: "Phó tổng giám đốc" },
  ] satisfies Leader[],
  /** Thông điệp từ ban lãnh đạo (tạm). Để "" thì khối ẩn. */
  message: {
    quote: "Nhờ không ngừng nâng cao chất lượng, các nhãn hiệu của Mikado ngày càng được thị trường trong và ngoài nước ưa chuộng và được kì vọng sẽ tiếp tục tăng trưởng mạnh mẽ, mở rộng thị trường trong các năm tiếp theo.",
    by: "Ban lãnh đạo",
  },
};
