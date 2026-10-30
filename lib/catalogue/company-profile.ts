import type { PhotoRef } from "./types";

/** Nội dung trang đôi "Giới thiệu công ty & Ban lãnh đạo". */
export const companyProfile = {
  eyebrow: "Giới thiệu công ty",
  title: "Khái quát MIKADO-MT",
  lead: "Khởi nguồn từ năm 2002 tại Khu công nghiệp Tiền Hải, MIKADO-MT từng bước xây dựng nền tảng sản xuất vật liệu hoàn thiện bằng nguồn lực trong nước.",
  story: "Từ những viên gạch đầu tiên, doanh nghiệp không ngừng mở rộng năng lực và đến nay sở hữu hơn 11 nhà máy. Hành trình phát triển được dẫn dắt bởi đội ngũ lãnh đạo tâm huyết, chiến lược và khát vọng chinh phục những giới hạn mới.",
  image: {
    src: "/images/daychuyen.jpg",
    alt: "Dây chuyền sản xuất tại nhà máy MIKADO-MT",
    focal: "52% 50%",
    fit: "cover",
  } satisfies PhotoRef,
  milestones: [
    { value: "2002", label: "Năm khởi nguồn" },
    { value: "08", label: "Cổ đông sáng lập" },
    { value: "11+", label: "Nhà máy trong hệ thống" },
  ],
  journey: [
    {
      title: "Nền móng trong nước",
      text: "Khởi đầu bằng nguồn vốn trong nước và nhà máy gạch đầu tiên tại Tiền Hải.",
    },
    {
      title: "Mở rộng năng lực",
      text: "Từng bước phát triển hệ thống nhà máy và danh mục vật liệu hoàn thiện đa dạng.",
    },
    {
      title: "Vươn tới thị trường",
      text: "Tiếp tục nâng cao chất lượng, năng lực cung ứng và sự hiện diện trong, ngoài nước.",
    },
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
  lead: "MIKADO-MT sở hữu tiềm lực phát triển mạnh mẽ với 12 nhãn hiệu hoạt động ổn định, thị trường trải dài trên toàn quốc, đồng thời duy trì nguồn cung ứng cho các công trình xây dựng một cách liên tục, đồng bộ và hiệu quả.",
  /** Tên và chức danh là CHỖ GIỮ CHỖ (Nguyễn Văn A/B/C), không phải người thật. */
  leaders: [
    {
      name: "Phạm Thuần Lãm",
      role: "Chủ tịch HĐQT",
      photo: { src: "/images/bld1.png", alt: "Chân dung Chủ tịch HĐQT", focal: "50% 22%", fit: "cover" },
    },
    {
      name: "Phạm Bách Tùng",
      role: "Tổng giám đốc",
      photo: { src: "/images/bld2.png", alt: "Chân dung Tổng giám đốc", focal: "50% 20%", fit: "cover" },
    },
    {
      name: "Nguyễn Văn Hồng",
      role: "Thành viên HĐQT",
      photo: { src: "/images/bld3.png", alt: "Chân dung Thành viên HĐQT", focal: "50% 20%", fit: "cover" },
    },
  ] satisfies Leader[],
  /** Thông điệp từ ban lãnh đạo (tạm). Để "" thì khối ẩn. */
  message: {
    quote: "Nhờ không ngừng nâng cao chất lượng, các nhãn hiệu của Mikado ngày càng được thị trường trong và ngoài nước ưa chuộng và được kì vọng sẽ tiếp tục tăng trưởng mạnh mẽ, mở rộng thị trường trong các năm tiếp theo.",
    by: "Ban lãnh đạo",
  },
  priorities: [
    {
      title: "Chất lượng",
      text: "Duy trì định hướng nâng cao chất lượng sản phẩm trong toàn hệ thống.",
    },
    {
      title: "Cung ứng đồng bộ",
      text: "Bảo đảm nguồn cung liên tục và hiệu quả cho các công trình xây dựng.",
    },
    {
      title: "Mở rộng thị trường",
      text: "Củng cố thị trường trong nước và phát triển hiện diện quốc tế.",
    },
  ],
};
