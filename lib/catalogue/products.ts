import { brands, type Brand } from "./brands";
import { productFolio, type Folio } from "./contents";
import type { PhotoRef } from "./types";

/**
 * DỮ LIỆU TRANG SẢN PHẨM THEO THƯƠNG HIỆU.
 *
 * Mỗi thương hiệu là MỘT TRANG ĐÔI của catalogue (không phải route), dựng từ cùng một template
 * (components/catalogue/brand-product-page.tsx): trang trái giới thiệu thương hiệu, trang phải trưng bày
 * mẫu gạch theo nhóm kích thước. Bản demo này chỉ có MIKADO để khách duyệt; thêm thương hiệu khác =
 * thêm một object `BrandProductPage` rồi khai báo trong components/catalogue/entries.tsx.
 *
 * DỮ LIỆU DEMO: nội dung giới thiệu và toàn bộ ảnh mẫu gạch bên dưới là TẠM (ảnh texture CC0 trong
 * public/images/products). Chưa có giá, mã sản phẩm, xuất xứ hay thông số kỹ thuật.
 * Khi có ảnh thật: đổi `src` của từng mẫu — khung giữ nguyên vị trí và tỷ lệ.
 */

/** Một ô mẫu gạch. Chưa có `image` thì hiện khung trống. */
export interface Sample {
  image?: PhotoRef;
  /** Mã mẫu hiển thị dưới ô (ví dụ "CP18.306"). Chưa có thì không hiện caption. */
  code?: string;
}

/** Một nhóm kích thước = một khu vực trưng bày gồm vài mẫu cùng quy cách. */
export interface SizeGroup {
  id: string;
  /** Chiều ngang × chiều dọc của viên gạch (mm), theo hướng nằm thẳng đứng. */
  width: number;
  height: number;
  /** Chỉ cho gạch chữ nhật: "landscape" xoay ngang khung. Mặc định "portrait". Gạch vuông bỏ qua. */
  orientation?: "portrait" | "landscape";
  /** Ứng dụng, ví dụ "Lát sàn" / "Ốp tường". Bỏ trống thì dòng ẩn. */
  application?: string;
  /** Bề mặt, ví dụ "Bóng, Matt". Bỏ trống thì dòng ẩn. */
  finish?: string;
  /**
   * Các mẫu của nhóm. Bố cục theo lưới 5 cột: ô nhãn chiếm 2 cột đầu của hàng đầu cùng 3 mẫu đầu tiên,
   * các mẫu tiếp theo xếp 5 mẫu mỗi hàng — thêm/bớt mẫu thì số hàng tự đổi.
   */
  samples: Sample[];
}

export interface BrandProductPage {
  /** Id mục trong trình xem và liên kết sâu (#id). */
  id: string;
  brand: {
    name: string;
    /** Logo thương hiệu (giữ nguyên tỷ lệ, màu gốc). Chưa có file chính xác thì để undefined — chỉ hiện tên. */
    logo?: Brand["logo"] & { fill?: boolean };
  };
  /** Số trang in của trang trái và trang phải. */
  folio: Folio;
  /** Trang trái — giới thiệu thương hiệu. */
  about: {
    eyebrow: string;
    /** Nhãn nhỏ phía trên câu dẫn. */
    title: string;
    /** Câu dẫn nổi bật (chữ lớn, nghiêng). */
    lead: string;
    paragraphs: string[];
    highlights: { title: string; text: string }[];
    /** Ảnh tràn lề trái ở cuối trang. Bỏ trống thì không hiện. */
    image?: PhotoRef;
  };
  /** Trang phải — trưng bày sản phẩm. */
  products: {
    title: string;
    groups: SizeGroup[];
  };
}

/** Ảnh texture tạm để duyệt bố cục. `fit: "cover"` vì ảnh demo không đúng tỷ lệ viên gạch. */
const TEXTURES = ["travertino", "nebbia-slab", "alba", "sabbia", "tortora", "nebbia"];
const FOCALS = ["50% 50%", "30% 40%", "70% 60%", "40% 70%", "60% 30%", "20% 25%", "80% 55%"];
const demoSamples = (count: number, start: number): Sample[] =>
  Array.from({ length: count }, (_, i) => ({
    image: {
      src: `/images/products/${TEXTURES[(start + i) % TEXTURES.length]}.jpg`,
      alt: "Mẫu gạch minh họa (ảnh tạm)",
      focal: FOCALS[(start + i * 2) % FOCALS.length],
      fit: "cover",
    },
  }));

/**
 * Bốn nhóm kích thước (từ nhỏ đến lớn) với số mẫu DEMO: 3 + 2 mẫu cho gạch chữ nhật (2 hàng), 3 + 5 mẫu cho gạch vuông.
 * `application`/`finish` là giá trị MINH HỌA lấy theo mẫu bố cục — cần xác nhận với từng thương hiệu.
 */
const sizeGroups = (offset: number): SizeGroup[] => [
  { id: "300x600", width: 300, height: 600, orientation: "landscape", application: "Ốp tường", finish: "Bóng, Matt", samples: demoSamples(5, offset) },
  { id: "400x800", width: 400, height: 800, orientation: "landscape", application: "Ốp tường", finish: "Bóng, Matt", samples: demoSamples(5, offset + 2) },
  { id: "600x600", width: 600, height: 600, application: "Lát sàn", finish: "Bóng, Matt", samples: demoSamples(8, offset + 1) },
  { id: "800x800", width: 800, height: 800, application: "Lát sàn", finish: "Bóng, Matt", samples: demoSamples(8, offset + 4) },
];

/** Nội dung giới thiệu TẠM dùng chung cho các trang demo — thay bằng nội dung thật của từng thương hiệu. */
const placeholderAbout = (name: string, image: PhotoRef): BrandProductPage["about"] => ({
  eyebrow: "Thương hiệu",
  title: "Giới thiệu",
  lead: `Nội dung tạm: một câu dẫn ngắn về định vị của thương hiệu ${name}, sẽ được thay bằng thông điệp chính thức.`,
  paragraphs: [
    `Đây là đoạn giới thiệu tạm để duyệt bố cục trang. Nội dung chính thức về thương hiệu ${name} — định vị, câu chuyện và giá trị — sẽ được cập nhật theo tài liệu do khách hàng cung cấp.`,
    "Phần này dành cho hai đến ba đoạn văn ngắn, đủ để người đọc hiểu thương hiệu trước khi xem các quy cách và mẫu gạch ở trang bên.",
  ],
  highlights: [
    { title: "Định vị", text: "Nội dung tạm: mô tả ngắn về định vị và phong cách của thương hiệu." },
    { title: "Đặc điểm nổi bật", text: "Nội dung tạm: những điểm khác biệt của dòng sản phẩm sẽ được bổ sung." },
    { title: "Phạm vi sản phẩm", text: "Gạch ốp lát với bốn quy cách: 300 × 600, 400 × 800, 600 × 600 và 800 × 800 mm." },
  ],
  image,
});

const sampleImage = (file: string, focal = "50% 50%"): PhotoRef => ({
  src: `/images/products/${file}.jpg`,
  alt: "Ảnh minh họa (ảnh tạm)",
  focal,
  fit: "cover",
});

/** Thương hiệu lấy từ danh sách logo (lib/catalogue/brands.ts) — logo và tên luôn khớp trang tổng hợp thương hiệu. */
const brandOf = (id: string) => {
  const brand = brands.find((b) => b.id === id);
  if (!brand) throw new Error(`Không có thương hiệu "${id}" trong brands.ts`);
  return { name: brand.name, logo: { ...brand.logo, fill: brand.fill } };
};

/**
 * MIKADO — thương hiệu sản phẩm (logo mikado.jpg; KHÁC logo công ty MIKADO-MT ở bìa).
 */
const mikado = brandOf("mikado");
export const mikadoProducts: BrandProductPage = {
  id: "mikado",
  brand: mikado,
  folio: productFolio("mikado"),
  about: placeholderAbout(mikado.name, sampleImage("sabbia", "50% 40%")),
  products: {
    title: "Sản phẩm gạch ốp lát",
    groups: sizeGroups(0),
  },
};

/**
 * Alaska — trang demo thứ hai Nội dung giới thiệu và ảnh mẫu là TẠM.
 * Số mẫu mỗi nhóm khác MIKADO để thấy template co giãn theo dữ liệu.
 */
const alaska = brandOf("alaska");
export const alaskaProducts: BrandProductPage = {
  id: "alaska",
  brand: alaska,
  folio: productFolio("alaska"),
  about: placeholderAbout(alaska.name, sampleImage("nebbia", "60% 50%")),
  products: {
    title: "Sản phẩm gạch ốp lát",
    groups: sizeGroups(3),
  },
};

/** Các thương hiệu có trang đôi sản phẩm, theo thứ tự trong catalogue. */
export const brandProductPages: BrandProductPage[] = [mikadoProducts, alaskaProducts];
