import type { CropBox } from "./types";

/**
 * DỮ LIỆU TRANG ĐÔI "THƯƠNG HIỆU" — thay logo, tên và bố cục tại đây.
 *
 * Logo lấy nguyên từ public/images/logo (11 thương hiệu; mikado.jpg là logo đơn vị trong
 * tài liệu tham khảo nên KHÔNG dùng). Logo không bị chỉnh màu hay kéo giãn:
 *  - `crop` chỉ để cắt phần nền trắng thừa quanh logo (vùng hiển thị theo tỷ lệ 0–1 của ảnh gốc),
 *    pixel logo giữ nguyên. Bỏ `crop` nếu logo mới đã sát lề.
 *  - `fill: true` dành cho file logo có nền màu riêng (Videcor, Lustile, Feraza): ảnh phủ kín ô.
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
  /** Màu số thứ tự trên ô: "light" khi nền ô tối/đậm màu. */
  numeralTone?: "dark" | "light";
}

export const brands: Brand[] = [
  { id: "alaska", name: "Alaska", pad: 28, logo: { src: "/images/logo/alaska.png", width: 750, height: 203, crop: [0.0193, 0.059, 0.9707, 0.9067] } },
  { id: "cerinco", name: "Cerinco", pad: 16, logo: { src: "/images/logo/cerinco.png", width: 554, height: 554 } },
  { id: "clara", name: "Clara", pad: 32, logo: { src: "/images/logo/clara.png", width: 320, height: 320, crop: [0.04, 0.4, 0.92, 0.2] } },
  { id: "cvgroup", name: "CV Group", pad: 18, bg: "#fefefe", logo: { src: "/images/logo/cvgroup.png", width: 1254, height: 1254, crop: [0.0251, 0.1176, 0.9419, 0.7154] } },
  // Nguồn là ảnh bìa tài liệu: chỉ lấy dải đỏ chứa logo (không chỉnh sửa pixel).
  { id: "feraza", name: "Feraza", fill: true, numeralTone: "light", logo: { src: "/images/logo/feraza.webp", width: 960, height: 1358, crop: [0.4292, 0.7224, 0.5417, 0.1878] } },
  { id: "goldentile", name: "Golden Tile", pad: 24, logo: { src: "/images/logo/goldentile.png", width: 800, height: 227, crop: [0.0175, 0.0825, 0.965, 0.835] } },
  { id: "lexxa", name: "Lexxa", pad: 14, logo: { src: "/images/logo/lexxa.png", width: 447, height: 447, crop: [0.0728, 0.0728, 0.8545, 0.8545] } },
  { id: "lustile", name: "Lustile", fill: true, logo: { src: "/images/logo/lustile.jpg", width: 768, height: 768 } },
  { id: "mosties", name: "Mosties", pad: 14, logo: { src: "/images/logo/mostile.webp", width: 360, height: 200, crop: [0.1483, 0.14, 0.7033, 0.72] } },
  { id: "nhuphat", name: "Như Phát", pad: 18, bg: "#fefefe", logo: { src: "/images/logo/nhuphat.png", width: 1254, height: 1254, crop: [0.0339, 0.0697, 0.9331, 0.8549] } },
  { id: "videcor", name: "Videcor", fill: true, numeralTone: "light", logo: { src: "/images/logo/videcor.png", width: 600, height: 200 } },
];

/**
 * Bố cục bức tường logo: lưới 6 cột, mỗi hàng là một dãy ô nối tiếp nhau.
 * `square` — hàng cao bằng ô 2 cột (ô vuông); `band` — hàng thấp theo tỷ lệ 3:1 của ô 4 cột.
 * Tổng `span` mỗi hàng phải bằng 6. Đổi thứ tự/`span` để sắp lại bố cục.
 */
export const brandWall: { height: "square" | "band"; cells: { brand: string; span: 2 | 3 | 4 }[] }[] = [
  { height: "square", cells: [{ brand: "cerinco", span: 2 }, { brand: "alaska", span: 4 }] },
  { height: "band", cells: [{ brand: "videcor", span: 4 }, { brand: "mosties", span: 2 }] },
  { height: "square", cells: [{ brand: "lexxa", span: 2 }, { brand: "lustile", span: 2 }, { brand: "cvgroup", span: 2 }] },
  { height: "band", cells: [{ brand: "goldentile", span: 3 }, { brand: "clara", span: 3 }] },
  { height: "square", cells: [{ brand: "feraza", span: 4 }, { brand: "nhuphat", span: 2 }] },
];

/** Văn bản trang trái. Giữ trung tính — không nêu quan hệ phân phối/đối tác. */
export const brandsCopy = {
  titleLines: ["THƯƠNG", "HIỆU"],
  /** Số thương hiệu lấy theo dữ liệu, không nhập tay. */
  intro:
    "Các thương hiệu có trong hồ sơ, sắp xếp theo thứ tự chữ cái. Biểu trưng được giữ nguyên màu sắc và tỷ lệ gốc.",
  indexNote: "Số thứ tự tương ứng với vị trí biểu trưng ở trang bên.",
  image: {
    src: "/images/products/nebbia.jpg",
    alt: "Bề mặt đá marble vân xám",
    focal: "50% 55%",
  },
};

/** Danh mục theo thứ tự chữ cái tiếng Việt; số thứ tự dùng chung cho danh mục và bức tường logo. */
export const brandIndex = [...brands]
  .sort((a, b) => a.name.localeCompare(b.name, "vi"))
  .map((brand, i) => ({ ...brand, no: String(i + 1).padStart(2, "0") }));

export const brandNo = (id: string) => brandIndex.find((b) => b.id === id)?.no ?? "";
