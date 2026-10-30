import type { CropBox } from "./types";

/**
 * DỮ LIỆU TRANG ĐÔI "THƯƠNG HIỆU" — thay logo, tên và bố cục tại đây.
 *
 * 12 logo thương hiệu lấy nguyên từ public/images/logo (gồm cả MIKADO). mikado-mt.png/jpg là logo công ty chủ quản
 * MIKADO-MT (dùng ở bìa, xem company.ts), KHÔNG thuộc danh sách này. Logo không bị chỉnh màu hay kéo giãn:
 *  - `crop` chỉ để cắt phần thừa quanh logo (nền trắng, dải đen của file nguồn) — vùng hiển thị theo tỷ lệ 0–1 của ảnh gốc,
 *    pixel logo giữ nguyên. Bỏ `crop` nếu logo đã sát lề.
 *  - `fill: true` dành cho logo có nền màu riêng (dạng tấm gạch): ảnh phủ kín ô.
 */
export interface Brand {
  id: string;
  /** Tên đọc từ nội dung logo; dùng cho danh mục và alt text. */
  name: string;
  logo: {
    src: string;
    /** Kích thước pixel gốc của file (dùng để tính tỷ lệ, không phải kích thước hiển thị). */
    width: number;
    height: number;
    crop?: CropBox;
  };
  /** Logo có nền riêng → phủ kín ô thay vì đặt trên nền trắng. */
  fill?: boolean;
  /** Khoảng đệm quanh logo trong ô (px thiết kế). Mặc định 18. */
  pad?: number;
  /** Nền ô khi file logo có nền gần-trắng không phải #fff (khớp để không lộ viền hộp quanh logo). */
  bg?: string;
}

export const brands: Brand[] = [
  { id: "alaska", name: "Alaska", fill: true, logo: { src: "/images/logo/alaska.png", width: 4120, height: 912 } },
  { id: "cerinco", name: "Cerinco", fill: true, logo: { src: "/images/logo/cerinco.png", width: 1582, height: 432 } },
  // Cắt dải đen trên/dưới của file nguồn (75 px và 77 px), chỉ lấy tấm logo.
  { id: "claza", name: "Claza", fill: true, logo: { src: "/images/logo/claza.png", width: 2167, height: 726, crop: [0, 0.1033, 1, 0.7906] } },
  { id: "cvgroup", name: "CV Group", pad: 18, logo: { src: "/images/logo/CVGroup.jpg", width: 1658, height: 937, crop: [0.0386, 0.0694, 0.9089, 0.8453] } },
  { id: "feraza", name: "Feraza", fill: true, logo: { src: "/images/logo/feraza.png", width: 2852, height: 718 } },
  { id: "goldentile", name: "Golden Tile", fill: true, logo: { src: "/images/logo/goldentile.png", width: 1714, height: 474 } },
  // Cắt dải đen trên/dưới của file nguồn (82 px và 84 px).
  { id: "lexxa", name: "Lexxa", fill: true, logo: { src: "/images/logo/lexxa.png", width: 2170, height: 725, crop: [0, 0.1131, 1, 0.771] } },
  { id: "lustile", name: "Lustile", pad: 16, bg: "#fdfefd", logo: { src: "/images/logo/lustile.png", width: 2169, height: 725, crop: [0.0941, 0.2193, 0.8119, 0.5876] } },
  { id: "mikado", name: "Mikado", fill: true, logo: { src: "/images/logo/mikado.jpg", width: 5906, height: 1629 } },
  { id: "mostile", name: "Mostile", fill: true, logo: { src: "/images/logo/mostile.png", width: 1716, height: 648 } },
  { id: "nhuphat", name: "Như Phát", pad: 14, logo: { src: "/images/logo/nhuphat.png", width: 1518, height: 1348, crop: [0.0889, 0.0675, 0.8109, 0.8939] } },
  { id: "videcor", name: "Videcor", fill: true, logo: { src: "/images/logo/videcor.png", width: 3226, height: 878 } },
];

/** Tỷ lệ rộng : cao của vùng logo hiển thị (sau khi `crop`). */
export const logoRatio = (brand: Pick<Brand, "logo">) => {
  const { width, height, crop } = brand.logo;
  const [, , cw, ch] = crop ?? [0, 0, 1, 1];
  return (width * cw) / (height * ch);
};

/** Văn bản trang trái. Giữ trung tính — không nêu quan hệ phân phối/đối tác. */
export const brandsCopy = {
  eyebrow: "Hệ thống thương hiệu",
  /** Nhãn phía trên lưới logo ở trang phải. */
  wallLabel: "Danh mục thương hiệu",
  titleLines: ["THƯƠNG", "HIỆU"],
  /**
   * NỘI DUNG MẪU (chưa được xác nhận) — chỉ dựa trên thông tin đã có trong company-profile.ts
   * (khởi nguồn từ nhà máy tại Tiền Hải, Thái Bình; 12 thương hiệu). Thay bằng nội dung thật khi có.
   */
  intro:
    "Từ nhà máy đầu tiên tại Tiền Hải, Thái Bình, MIKADO-MT từng bước xây dựng hệ thống thương hiệu gạch ốp lát với nhiều phong cách và tầm giá khác nhau, đồng hành cùng các công trình từ nhà ở đến không gian thương mại.",
  indexNote: "Số trang dẫn tới trang đôi giới thiệu và mẫu sản phẩm của từng thương hiệu.",
  /** Dải số liệu ở trang trái — lấy từ phần giới thiệu công ty (company-profile.ts: khởi nguồn 2002, 08 cổ đông sáng lập, hơn 11 nhà máy). */
  stats: [
    { value: "2002", label: "Năm khởi nguồn" },
    { value: "08", label: "Cổ đông sáng lập" },
    { value: "11+", label: "Nhà máy sản xuất" },
  ],
  /** Khung nội dung phía dưới lưới logo (trang phải) — nội dung mẫu, thay bằng nội dung thật khi có. */
  wallStory: {
    title: "Đa dạng lựa chọn, đồng điệu không gian",
    text: "Khám phá các bộ sưu tập gạch ốp lát theo từng thương hiệu, với nhiều mẫu mã và quy cách. Mỗi lựa chọn là một gợi ý để kết hợp màu sắc, bề mặt và tỷ lệ, tạo nên dấu ấn riêng cho từng không gian.",
  },
  image: {
    src: "/images/bg12.jpg",
    alt: "Phòng khách hiện đại lát gạch đen vân đá MIKADO",
    focal: "58% 50%",
  },
};

/**
 * Thứ tự thương hiệu trong toàn hồ sơ (danh mục, lưới logo, mục lục, trang sản phẩm).
 * Sửa tại đây để đổi thứ tự; phải liệt kê đủ mọi thương hiệu trong `brands`.
 */
export const BRAND_ORDER = [
  "mikado",
  "cerinco",
  "videcor",
  "goldentile",
  "feraza",
  "claza",
  "lexxa",
  "mostile",
  "lustile",
  "cvgroup",
  "alaska",
  "nhuphat",
];

/** Danh mục theo `BRAND_ORDER`. */
export const brandIndex = BRAND_ORDER.map((id) => {
  const brand = brands.find((b) => b.id === id);
  if (!brand) throw new Error(`Thương hiệu "${id}" trong BRAND_ORDER không có trong brands (brands.ts)`);
  return brand;
});
if (brandIndex.length !== brands.length) {
  throw new Error("BRAND_ORDER (brands.ts) phải liệt kê đủ mọi thương hiệu trong brands");
}

