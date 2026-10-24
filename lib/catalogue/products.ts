import { brands, type Brand } from "./brands";
import { productFolio, productOrder, type Folio } from "./contents";
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
  /** Nhiều mã, mỗi mã một dòng (ví dụ bộ 3 viên xếp chồng, từ trên xuống). Ưu tiên hơn `code`. */
  codes?: string[];
}

/** Một nhóm kích thước = một khu vực trưng bày gồm vài mẫu cùng quy cách. */
export interface SizeGroup {
  id: string;
  /** Chiều ngang × chiều dọc của viên gạch (mm), theo hướng nằm thẳng đứng. */
  width: number;
  height: number;
  /** Chỉ cho gạch chữ nhật: "landscape" xoay ngang khung. Mặc định "portrait". Gạch vuông bỏ qua. */
  orientation?: "portrait" | "landscape";
  /**
   * Mỗi mẫu là MỘT ẢNH GHÉP 3 viên cùng bộ xếp chồng dọc (khung 2 : 3 với gạch 1 : 2). Các nhóm `stacked` liền nhau
   * được trình bày thành từng cặp cạnh nhau (mỗi nhóm 3 mẫu) thay vì lưới 5 cột.
   */
  stacked?: boolean;
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

/**
 * Nội dung giới thiệu MẪU dùng chung cho các thương hiệu chưa có tài liệu riêng — trung tính, không nêu số liệu hay quan hệ
 * với tập đoàn. Thay bằng nội dung chính thức của từng thương hiệu khi có.
 */
const placeholderAbout = (name: string, image: PhotoRef): BrandProductPage["about"] => ({
  eyebrow: "Thương hiệu",
  title: "Giới thiệu",
  lead: `${name} — lựa chọn gạch ốp lát cho không gian sống và công trình, với đủ quy cách cho cả tường lẫn sàn.`,
  paragraphs: [
    `Thương hiệu ${name} phát triển các dòng gạch ốp lát cho phòng khách, phòng ngủ, nhà bếp và phòng tắm, từ nhà ở đến công trình thương mại.`,
    "Danh mục gồm gạch ốp tường 300 × 600 và 400 × 800 mm cùng gạch lát nền 600 × 600 và 800 × 800 mm, với bề mặt bóng và matt để lựa chọn theo từng không gian.",
  ],
  highlights: [
    { title: "Định vị", text: `${name} hướng tới những không gian cần sự đồng bộ giữa gạch lát nền và gạch ốp tường.` },
    { title: "Đặc điểm nổi bật", text: "Bề mặt bóng và matt, nhiều tông màu để phối cùng các phong cách nội thất khác nhau." },
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

/**
 * Gạch vuông lát nền MIKADO — ẢNH THẬT. Ảnh gốc ở public/images/products/mikado/square (tên file = mã gạch);
 * bản web nhẹ ở .../square-web, tạo bằng `node scripts/optimize-images.mjs <gốc> <đích>`.
 * Mã MP 96.xxx = quy cách 600 × 600, MP 18.xxx = quy cách 800 × 800; ảnh ghi cả hai mã dùng cho cả hai quy cách.
 * `file` là tên file trong square-web (không phần mở rộng), `code` hiển thị dưới ô mẫu.
 */
const mikadoTile = (file: string, code: string): Sample => ({
  image: { src: `/images/products/mikado/square-web/${file}.jpg`, alt: `Gạch ${code}`, focal: "50% 50%", fit: "cover" },
  code,
});

const mikado600: Sample[] = [
  mikadoTile("mp-96-101-mp-18-101", "MP 96.101"),
  mikadoTile("mp-96-102-mp-18-102", "MP 96.102"),
  mikadoTile("mp-96-104", "MP 96.104"),
  mikadoTile("mp-96-105-mp-18-105", "MP 96.105"),
  mikadoTile("mp-96-106-mp-18-106", "MP 96.106"),
  mikadoTile("mp-96-117-mp-18-117", "MP 96.117"),
  mikadoTile("mp-96-119-mp-18-119", "MP 96.119"),
  mikadoTile("mp-96-201-mp-18-201", "MP 96.201"),
];

const mikado800: Sample[] = [
  mikadoTile("mp-96-102-mp-18-102", "MP 18.102"),
  mikadoTile("mp-96-117-mp-18-117", "MP 18.117"),
  mikadoTile("mp-18-118", "MP 18.118"),
  mikadoTile("mp-96-119-mp-18-119", "MP 18.119"),
  mikadoTile("mp-18-161", "MP 18.161"),
  mikadoTile("mp-96-201-mp-18-201", "MP 18.201"),
  mikadoTile("mp18-209", "MP 18.209"),
  mikadoTile("mp18-210", "MP 18.210"),
];

/**
 * Gạch ốp tường MIKADO — ẢNH THẬT. Ảnh gốc ở .../mikado/rectangle, bản web ở .../rectangle-web (cùng script như trên).
 * Mã MP936 = quy cách 300 × 600, MP948 = 400 × 800. Mỗi ảnh là một bộ 3 viên xếp chồng; tên file ghi mã của 3 viên
 * theo thứ tự trên → giữa → dưới (ví dụ MP936.200A-MPD936.200A-MP936.200).
 */
const mikadoSet = (file: string, codes: [string, string, string]): Sample => ({
  image: { src: `/images/products/mikado/rectangle-web/${file}.jpg`, alt: `Bộ gạch ốp ${codes.join(", ")}`, focal: "50% 50%", fit: "cover" },
  codes,
});

const mikado300x600: Sample[] = [
  mikadoSet("mp936-106-mpd936-106-mp936-107", ["MP936.106", "MPD936.106", "MP936.107"]),
  mikadoSet("mp936-200a-mpd936-200a-mp936-200", ["MP936.200A", "MPD936.200A", "MP936.200"]),
  mikadoSet("mp936-200b-mpd936-200b-mp936-200", ["MP936.200B", "MPD936.200B", "MP936.200"]),
];

const mikado400x800: Sample[] = [
  mikadoSet("mp948-112-mpd948-112-mp948-113", ["MP948.112", "MPD948.112", "MP948.113"]),
  mikadoSet("mp948-201v-mpd948-201-mp948-201", ["MP948.201V", "MPD948.201", "MP948.201"]),
  mikadoSet("mp948-211v-mpd948-211-mp948-211", ["MP948.211V", "MPD948.211", "MP948.211"]),
];

const mikadoSamples: Record<string, Sample[]> = {
  "300x600": mikado300x600,
  "400x800": mikado400x800,
  "600x600": mikado600,
  "800x800": mikado800,
};
const mikadoGroups = sizeGroups(0).map((group) => ({
  ...group,
  samples: mikadoSamples[group.id] ?? group.samples,
  stacked: group.id === "300x600" || group.id === "400x800",
}));

/**
 * Giới thiệu MIKADO — NỘI DUNG MẪU (chưa được xác nhận), viết dựa trên các dòng sản phẩm có ở trang bên:
 * gạch lát nền 600 × 600 / 800 × 800 và gạch ốp tường 300 × 600 / 400 × 800 (bộ 3 viên: chính, điểm nhấn, viền).
 * Thay bằng nội dung chính thức của thương hiệu khi có.
 */
const mikadoAbout: BrandProductPage["about"] = {
  eyebrow: "Thương hiệu",
  title: "Giới thiệu",
  lead: "Thương hiệu mang tên MIKADO Group, nổi bật với các dòng gạch lát nền và gạch ốp tường cho không gian sống hiện đại.",
  paragraphs: [
    "MIKADO cung cấp gạch lát nền khổ vuông 600 × 600 và 800 × 800 mm với các vân đá sáng, trung tính, dễ phối cùng nhiều phong cách nội thất, từ phòng khách, phòng ngủ đến không gian thương mại.",
    "Bên cạnh đó là các bộ gạch ốp tường 300 × 600 và 400 × 800 mm, đi kèm viên điểm nhấn hoa văn và viên viền, giúp hoàn thiện đồng bộ cho phòng tắm, nhà bếp và những mảng tường trang trí.",
  ],
  highlights: [
    { title: "Gạch lát nền", text: "Khổ 600 × 600 và 800 × 800 mm, vân đá tự nhiên với các tông trắng, xám, be và xanh nhạt." },
    { title: "Gạch ốp tường", text: "Khổ 300 × 600 và 400 × 800 mm, mỗi bộ gồm viên chính, viên điểm nhấn hoa văn và viên viền." },
    { title: "Đồng bộ không gian", text: "Các mã cùng bộ đi cùng nhau, giúp phối nền và tường hài hòa." },
  ],
  image: {
    src: "/images/products/mikado/bg-mikado.png",
    alt: "Phòng tắm ốp gạch trắng với dải gạch viền và gạch điểm nhấn hoa văn",
    focal: "50% 50%",
    fit: "cover",
  },
};

export const mikadoProducts: BrandProductPage = {
  id: "mikado",
  brand: mikado,
  folio: productFolio("mikado"),
  about: mikadoAbout,
  products: {
    title: "Sản phẩm gạch ốp lát",
    groups: mikadoGroups,
  },
};

/**
 * Các thương hiệu còn lại — trang MẪU dựng từ cùng template với MIKADO. Nội dung giới thiệu, ảnh (texture CC0 trong
 * public/images/products) và toàn bộ mẫu gạch là TẠM. Khi có tài liệu riêng: thêm một object `BrandProductPage` đầy đủ
 * (như `mikadoProducts`) rồi khai báo trong `customPages` để thay trang mẫu của thương hiệu đó.
 */
const DEMO_IMAGES: { file: string; focal: string }[] = [
  { file: "alba", focal: "50% 50%" },
  { file: "sabbia", focal: "40% 55%" },
  { file: "tortora", focal: "60% 45%" },
  { file: "travertino", focal: "50% 40%" },
  { file: "nebbia", focal: "60% 50%" },
  { file: "ardesia", focal: "50% 60%" },
  { file: "nebbia-slab", focal: "45% 50%" },
];

const demoPage = (id: string, index: number): BrandProductPage => {
  const brand = brandOf(id);
  const img = DEMO_IMAGES[index % DEMO_IMAGES.length];
  return {
    id,
    brand,
    folio: productFolio(id),
    about: placeholderAbout(brand.name, sampleImage(img.file, img.focal)),
    products: {
      title: "Sản phẩm gạch ốp lát",
      groups: sizeGroups(index),
    },
  };
};

/** Trang đã có nội dung/ảnh thật riêng (ghi đè trang mẫu cùng id). */
const customPages: Record<string, BrandProductPage> = { mikado: mikadoProducts };

/** Mọi thương hiệu đều có một trang đôi sản phẩm, đúng thứ tự `productOrder` (số trang khớp mục lục). */
export const brandProductPages: BrandProductPage[] = productOrder.map((id, i) => customPages[id] ?? demoPage(id, i));
