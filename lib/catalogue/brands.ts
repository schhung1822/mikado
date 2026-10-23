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
  /** Màu số thứ tự trên ô: "light" khi nền ô tối/đậm màu. */
  numeralTone?: "dark" | "light";
}

export const brands: Brand[] = [
  { id: "alaska", name: "Alaska", fill: true, numeralTone: "light", logo: { src: "/images/logo/alaska.png", width: 4120, height: 912 } },
  { id: "cerinco", name: "Cerinco", fill: true, numeralTone: "light", logo: { src: "/images/logo/cerinco.png", width: 1582, height: 432 } },
  // Cắt dải đen trên/dưới của file nguồn (75 px và 77 px), chỉ lấy tấm logo.
  { id: "claza", name: "Claza", fill: true, numeralTone: "light", logo: { src: "/images/logo/claza.png", width: 2167, height: 726, crop: [0, 0.1033, 1, 0.7906] } },
  { id: "cvgroup", name: "CV Group", pad: 18, logo: { src: "/images/logo/CVGroup.jpg", width: 1658, height: 937, crop: [0.0386, 0.0694, 0.9089, 0.8453] } },
  { id: "feraza", name: "Feraza", fill: true, numeralTone: "light", logo: { src: "/images/logo/feraza.png", width: 2852, height: 718 } },
  { id: "goldentile", name: "Golden Tile", fill: true, numeralTone: "light", logo: { src: "/images/logo/goldentile.png", width: 1714, height: 474 } },
  // Cắt dải đen trên/dưới của file nguồn (82 px và 84 px).
  { id: "lexxa", name: "Lexxa", fill: true, numeralTone: "light", logo: { src: "/images/logo/lexxa.png", width: 2170, height: 725, crop: [0, 0.1131, 1, 0.771] } },
  { id: "lustile", name: "Lustile", pad: 16, bg: "#fdfefd", logo: { src: "/images/logo/lustile.png", width: 2169, height: 725, crop: [0.0941, 0.2193, 0.8119, 0.5876] } },
  { id: "mikado", name: "Mikado", fill: true, numeralTone: "light", logo: { src: "/images/logo/mikado.jpg", width: 5906, height: 1629 } },
  { id: "mostile", name: "Mostile", fill: true, numeralTone: "light", logo: { src: "/images/logo/mostile.png", width: 1716, height: 648 } },
  { id: "nhuphat", name: "Như Phát", pad: 14, logo: { src: "/images/logo/nhuphat.png", width: 1518, height: 1348, crop: [0.0889, 0.0675, 0.8109, 0.8939] } },
  { id: "videcor", name: "Videcor", fill: true, numeralTone: "light", logo: { src: "/images/logo/videcor.png", width: 3226, height: 878 } },
];

/** Tỷ lệ rộng : cao của vùng logo hiển thị (sau khi `crop`). */
export const logoRatio = (brand: Pick<Brand, "logo">) => {
  const { width, height, crop } = brand.logo;
  const [, , cw, ch] = crop ?? [0, 0, 1, 1];
  return (width * cw) / (height * ch);
};

/**
 * Bố cục bức tường logo: lưới 6 cột, mỗi hàng là một dãy ô nối tiếp nhau, tổng `span` mỗi hàng = 6.
 * Chiều cao hàng KHÔNG nhập tay: tính từ ô `anchor` (rộng theo `span`, cao theo đúng tỷ lệ logo của nó) nên logo
 * dạng tấm gạch phủ kín ô mà gần như không bị cắt. Các ô khác trong hàng có nền trắng nên không cần cùng tỷ lệ.
 * Đổi thứ tự/`span`/`anchor` để sắp lại bố cục.
 */
export const brandWall: { anchor: string; cells: { brand: string; span: 2 | 3 | 4 | 6 }[] }[] = [
  { anchor: "mikado", cells: [{ brand: "mikado", span: 6 }] },
  { anchor: "cerinco", cells: [{ brand: "cerinco", span: 3 }, { brand: "goldentile", span: 3 }] },
  { anchor: "videcor", cells: [{ brand: "videcor", span: 4 }, { brand: "cvgroup", span: 2 }] },
  { anchor: "claza", cells: [{ brand: "claza", span: 3 }, { brand: "lexxa", span: 3 }] },
  { anchor: "mostile", cells: [{ brand: "mostile", span: 3 }, { brand: "nhuphat", span: 3 }] },
  { anchor: "alaska", cells: [{ brand: "alaska", span: 4 }, { brand: "lustile", span: 2 }] },
  { anchor: "feraza", cells: [{ brand: "feraza", span: 6 }] },
];

/** Văn bản trang trái. Giữ trung tính — không nêu quan hệ phân phối/đối tác. */
export const brandsCopy = {
  eyebrow: "Hệ thống thương hiệu",
  /** Nhãn phía trên bức tường logo ở trang phải. */
  wallLabel: "Danh mục thương hiệu",
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
