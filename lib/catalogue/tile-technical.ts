import type { PhotoRef } from "./types";

export const tileTechnical = {
  structure: {
    eyebrow: "Sản phẩm gạch men",
    title: "Thông tin kỹ thuật",
    sectionTitle: "Cấu trúc công nghệ cao",
    introduction:
      "Mikado áp dụng công nghệ sản xuất gạch tiên tiến với phần xương gạch có độ đặc cao, in kỹ thuật số và tráng men cao cấp, bảo đảm độ bền, tính thẩm mỹ và hiệu suất vượt trội, phù hợp với nhiều ứng dụng và điều kiện môi trường khác nhau.",
    image: {
      src: "/images/gach-3d.png",
      alt: "Sơ đồ sáu lớp cấu tạo của sản phẩm gạch men Mikado",
      fit: "contain",
    } satisfies PhotoRef,
    layers: [
      {
        name: "Xương gạch",
        text: "Kết cấu chính là đất sét nung tới mức độ bán sứ, có độ đặc cao và độ bền vượt trội.",
      },
      {
        name: "Lớp men lót",
        text: "Lớp phủ trắng được áp dụng trước khi trang trí, giúp làm phẳng bề mặt và tăng độ trung thực của màu sắc.",
      },
      {
        name: "Lớp men in",
        text: "Hoạt động như lớp men lót và mực in, hạn chế các lỗi lem màu hoặc biến dạng hình ảnh.",
      },
      {
        name: "Lớp in họa tiết",
        text: "Hoa văn được tạo bằng công nghệ in kỹ thuật số, mang lại độ chi tiết và tính thẩm mỹ cao.",
      },
      {
        name: "Lớp men bề mặt",
        text: "Lớp men chính quyết định độ nhám, độ mịn hoặc độ bóng sáng của viên gạch.",
      },
      {
        name: "Lớp men bảo vệ",
        text: "Tăng khả năng kháng khuẩn, chống xước, hỗ trợ chống trơn trượt và tăng độ bền.",
      },
    ],
    specifications: {
      columns: ["Loại xương / men", "Độ cứng", "Độ bóng", "Độ uốn tối đa", "Kháng nước"],
      rows: [
        ["Gạch Porcelain", "7-10 Mohs", "Không", "Max 45 N/mm²", "0,5-3%"],
        ["Gạch Semi Porcelain", "6-8 Mohs", "Không", "Max 25 N/mm²", "3-6%"],
        ["Gạch Ceramic", "5-6 Mohs", "Không", "Max 20 N/mm²", "< 10%"],
        ["Men bóng hắt sáng", "-", "70-100 GU", "-", "-"],
        ["Men mờ", "-", "0-5 GU", "-", "-"],
        ["Men nhám", "-", "0-15 GU", "-", "-"],
        ["Men bóng", "-", "70-100 GU", "-", "-"],
      ],
    },
  },
  categories: {
    eyebrow: "Sản phẩm gạch men",
    title: "Các dòng sản phẩm",
    floor: {
      title: "Gạch lát sàn",
      image: {
        src: "/images/gach-lat-san.png",
        alt: "Ba mẫu gạch lát sàn Mikado xếp lớp",
        fit: "contain",
      } satisfies PhotoRef,
      rows: [
        ["Kích thước (cm)", "60 × 60 | 80 × 80 "],
        ["Xương gạch", "Porcelain | Ceramic"],
        ["Men bề mặt", "Sugar | Matt | Glossy"],
        ["Họa tiết", "In kỹ thuật số và dập vân 3D bề mặt"],
      ],
    },
    wall: {
      title: "Gạch ốp tường",
      image: {
        src: "/images/gach-op-tuong.png",
        alt: "Bộ gạch ốp tường trang trí Mikado",
        fit: "contain",
      } satisfies PhotoRef,
      rows: [
        ["Kích thước (cm)", "30 × 60 | 40 × 80"],
        ["Xương gạch", "Porcelain | Ceramic"],
        ["Men bề mặt", "Lumina | Sugar | Matt | Glossy"],
        ["Họa tiết", "In kỹ thuật số và dập vân 3D bề mặt"],
      ],
    },
    surfaceCopy:
      "Mikado-MT kết hợp công nghệ in, mài và tráng men tiên tiến để tạo nên hơn 20 loại bề mặt độc đáo. Từ lớp men bóng mịn đến hiệu ứng vân đá tự nhiên, mỗi bề mặt đều được thiết kế nhằm tôn vinh không gian sống với phong cách hiện đại, ứng dụng linh hoạt, đáp ứng đa dạng nhu cầu của kiến trúc và nội thất đương đại.",
    printingCopy:
      "Để các sản phẩm gạch của Mikado-MT sở hữu thiết kế thời thượng, phản ánh xu hướng thẩm mỹ toàn cầu, nhà máy của chúng tôi ứng dụng công nghệ quét bề mặt hiện đại để tạo ra những bộ sưu tập độc quyền hoặc tái tạo hoa văn theo yêu cầu riêng của khách hàng. Công nghệ in tiên tiến bậc nhất thế giới bảo đảm độ chính xác, chiều sâu và chất lượng hình ảnh vượt trội trên từng viên gạch.",
    popularFloor: {
      eyebrow: "Dòng sản phẩm phổ biến",
      title: "Gạch bóng đen trắng",
      description:
        "Dòng gạch lát sàn đen và trắng với bề mặt men bóng, tạo hiệu ứng phản chiếu rõ nét và phù hợp nhiều phong cách không gian từ tối giản đến tương phản hiện đại.",
      blackTile: {
        src: "/images/den-600-800...png",
        alt: "Bề mặt gạch lát sàn men bóng màu đen",
        fit: "cover",
      } satisfies PhotoRef,
      whiteTile: {
        src: "/images/trang-600-800.png",
        alt: "Bề mặt gạch lát sàn men bóng màu trắng",
        fit: "cover",
      } satisfies PhotoRef,
      facts: [
        ["Quy cách", "600 × 600 mm · 800 × 800 mm"],
        ["Phạm vi", "Tất cả thương hiệu"],
        
      ],
    },
  },
} as const;
