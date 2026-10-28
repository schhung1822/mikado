import { brands, type Brand } from "./brands";
import { productFolio, productOrder, type Folio } from "./contents";
import type { PhotoRef } from "./types";

/**
 * DỮ LIỆU TRANG SẢN PHẨM THEO THƯƠNG HIỆU.
 *
 * Mỗi thương hiệu là MỘT TRANG ĐÔI của catalogue (không phải route), dựng từ cùng một template
 * (components/catalogue/brand-product-page.tsx): trang trái giới thiệu thương hiệu, trang phải trưng bày
 * mẫu gạch theo nhóm kích thước. Các trang có ảnh thật được khai báo trong `customPages`; các thương hiệu
 * còn lại dùng dữ liệu mẫu từ `demoPage`.
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
   * được trình bày thành từng cặp cạnh nhau; số cột tự co theo số bộ để giữ tất cả trên một hàng khi có thể.
   */
  stacked?: boolean;
  /** Đưa nhóm sang vùng cuối trang giới thiệu thay cho ảnh nền, giúp bộ gạch chữ nhật có khung hiển thị lớn hơn. */
  placement?: "about";
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
    /** Biến thể trình bày riêng cho thương hiệu có bộ ốp tường chính và dải gạch lát nền bổ trợ. */
    layout?: "showcase";
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
const squareTile = (brand: string, file: string, code: string): Sample => ({
  image: { src: `/images/products/${brand}/square-web/${file}.jpg`, alt: `Gạch ${code}`, focal: "50% 50%", fit: "cover" },
  code,
});

const mikadoTile = (file: string, code: string): Sample => squareTile("mikado", file, code);

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
 * Gạch vuông CERINCO — mã CP 96.xxx thuộc khổ 600 × 600, CP 18.xxx thuộc khổ 800 × 800.
 * Ảnh có cả hai mã được dùng ở cả hai nhóm với caption tương ứng.
 */
const cerinco600: Sample[] = [
  squareTile("cerinco", "cp-96-302-cp-18-302", "CP 96.302"),
  squareTile("cerinco", "cp-96-304", "CP 96.304"),
  squareTile("cerinco", "cp-96-315", "CP 96.315"),
  squareTile("cerinco", "cp-96-401-cp-18-401", "CP 96.401"),
  squareTile("cerinco", "cp-96-403", "CP 96.403"),
  squareTile("cerinco", "cp-96-404-cp-18-404", "CP 96.404"),
  squareTile("cerinco", "cp-96-405", "CP 96.405"),
];

const cerinco800: Sample[] = [
  squareTile("cerinco", "cp-18-301", "CP 18.301"),
  squareTile("cerinco", "cp-96-302-cp-18-302", "CP 18.302"),
  squareTile("cerinco", "cp-18-308", "CP 18.308"),
  squareTile("cerinco", "cp-18-309", "CP 18.309"),
  squareTile("cerinco", "cp-96-401-cp-18-401", "CP 18.401"),
  squareTile("cerinco", "cp-18-402", "CP 18.402"),
  squareTile("cerinco", "cp-96-404-cp-18-404", "CP 18.404"),
  squareTile("cerinco", "cp-18-406", "CP 18.406"),
  squareTile("cerinco", "cp18416", "CP 18.416"),
];

/**
 * Gạch vuông VIDECOR — mã VP 96.xxx thuộc khổ 600 × 600, VP 18.xxx thuộc khổ 800 × 800.
 * Ảnh có cả hai mã được dùng ở cả hai nhóm với caption tương ứng.
 */
const videcor600: Sample[] = [
  squareTile("videcor", "vp-96-501-vp-18-501", "VP 96.501"),
  squareTile("videcor", "vp-96-502-vp-18-502", "VP 96.502"),
  squareTile("videcor", "vp-96-503-vp-18-503", "VP 96.503"),
  squareTile("videcor", "vp-96-504-vp-18-504", "VP 96.504"),
  squareTile("videcor", "vp-96-513", "VP 96.513"),
  squareTile("videcor", "vp-96-601", "VP 96.601"),
  squareTile("videcor", "vp-96-608", "VP 96.608"),
  squareTile("videcor", "vp-96-614", "VP 96.614"),
];

const videcor800: Sample[] = [
  squareTile("videcor", "vp-96-501-vp-18-501", "VP 18.501"),
  squareTile("videcor", "vp-96-502-vp-18-502", "VP 18.502"),
  squareTile("videcor", "vp-96-503-vp-18-503", "VP 18.503"),
  squareTile("videcor", "vp-96-504-vp-18-504", "VP 18.504"),
  squareTile("videcor", "vp-18-506", "VP 18.506"),
  squareTile("videcor", "vp-18-509", "VP 18.509"),
  squareTile("videcor", "vp18-620", "VP 18.620"),
  squareTile("videcor", "vp18-621", "VP 18.621"),
  squareTile("videcor", "vp-18-622", "VP 18.622"),
];

type SquareTileDefinition = {
  file: string;
  code600?: string;
  code800?: string;
};

/**
 * Tạo hai nhóm gạch vuông từ cùng một danh sách ảnh. Ảnh có cả mã 600 và 800 được dùng ở cả hai nhóm,
 * nhưng caption luôn hiển thị đúng mã của từng quy cách.
 */
const squareSamples = (brand: string, tiles: SquareTileDefinition[]): Record<"600x600" | "800x800", Sample[]> => ({
  "600x600": tiles.flatMap((tile) => (tile.code600 ? [squareTile(brand, tile.file, tile.code600)] : [])),
  "800x800": tiles.flatMap((tile) => (tile.code800 ? [squareTile(brand, tile.file, tile.code800)] : [])),
});

const goldentileSquare = squareSamples("goldentile", [
  { file: "gp18-707", code800: "GP 18.707" },
  { file: "gp18-803", code800: "GP 18.803" },
  { file: "gp96-703-gp18-703", code600: "GP 96.703", code800: "GP 18.703" },
  { file: "gp96-704", code600: "GP 96.704" },
  { file: "gp96-706-gp18-706", code600: "GP 96.706", code800: "GP 18.706" },
  { file: "gp96-807-gp18-807", code600: "GP 96.807", code800: "GP 18.807" },
  { file: "gp96-808-gp18-808", code600: "GP 96.808", code800: "GP 18.808" },
  { file: "gp96-809-gp18-809", code600: "GP 96.809", code800: "GP 18.809" },
  { file: "gp96-814", code600: "GP 96.814" },
  { file: "gp96-815-gp18-815", code600: "GP 96.815", code800: "GP 18.815" },
]);

const ferazaSquare = squareSamples("feraza", [
  { file: "fp18-608", code800: "FP 18.608" },
  { file: "fp96-601-fp18-601", code600: "FP 96.601", code800: "FP 18.601" },
  { file: "fp96-604-fp18-604", code600: "FP 96.604", code800: "FP 18.604" },
  { file: "fp96-606fp18-606", code600: "FP 96.606", code800: "FP 18.606" },
  { file: "fp96-607", code600: "FP 96.607" },
  { file: "fp96-6602", code600: "FP 96.6602" },
  { file: "fp96-6603", code600: "FP 96.6603" },
  { file: "fp96-6605", code600: "FP 96.6605" },
  { file: "fpu18-8003", code800: "FPU 18.8003" },
  { file: "fpu18-8013", code800: "FPU 18.8013" },
  { file: "fpu18-8017", code800: "FPU 18.8017" },
]);

const clazaSquare = squareSamples("claza", [
  { file: "cz18-306", code800: "CZ 18.306" },
  { file: "cz96-301-cz18-301", code600: "CZ 96.301", code800: "CZ 18.301" },
  { file: "cz96-302-cz18-302", code600: "CZ 96.302", code800: "CZ 18.302" },
  { file: "cz96-303-cz18-305", code600: "CZ 96.303", code800: "CZ 18.305" },
  { file: "cz96-303-cz18-303", code600: "CZ 96.303", code800: "CZ 18.303" },
]);

const lexxaSquare = squareSamples("lexxa", [
  { file: "lp96-101-lp18-101", code600: "LP 96.101", code800: "LP 18.101" },
  { file: "lp96-102-lp18-102", code600: "LP 96.102", code800: "LP 18.102" },
  { file: "lp96-104-lp18-104", code600: "LP 96.104", code800: "LP 18.104" },
  { file: "lp96-105-lp18-105", code600: "LP 96.105", code800: "LP 18.105" },
  { file: "lp96-107-lp18-107", code600: "LP 96.107", code800: "LP 18.107" },
  { file: "lp96-108-lp18-108", code600: "LP 96.108", code800: "LP 18.108" },
  { file: "lp96-6602", code600: "LP 96.6602" },
  { file: "lp96-6627-lp18-8027", code600: "LP 96.6627", code800: "LP 18.8027" },
  { file: "lp96106-lp18-106", code600: "LP 96.106", code800: "LP 18.106" },
]);

const mostileSquare = squareSamples("mostile", [
  { file: "sp18-908", code800: "SP 18.908" },
  { file: "sp18-909", code800: "SP 18.909" },
  { file: "sp18-910", code800: "SP 18.910" },
  { file: "sp18-911", code800: "SP 18.911" },
  { file: "sp18-912", code800: "SP 18.912" },
  { file: "sp18-913", code800: "SP 18.913" },
  { file: "sp18-914", code800: "SP 18.914" },
  { file: "sp96-901-sp18-901", code600: "SP 96.901", code800: "SP 18.901" },
  { file: "sp96-902-sp18-902", code600: "SP 96.902", code800: "SP 18.902" },
  { file: "sp96-903-sp18-903", code600: "SP 96.903", code800: "SP 18.903" },
  { file: "sp96-904-sp18-904", code600: "SP 96.904", code800: "SP 18.904" },
  { file: "sp96-905-sp18-905", code600: "SP 96.905", code800: "SP 18.905" },
  { file: "sp96-906-sp18-906", code600: "SP 96.906", code800: "SP 18.906" },
  { file: "sp96-907-sp18-907", code600: "SP 96.907", code800: "SP 18.907" },
]);

const lustileSquare = squareSamples("lustile", [
  { file: "vnmkd0600600044-vnmkd0800800029", code600: "VNMKD0600600044", code800: "VNMKD0800800029" },
  { file: "vnmkd0600600045-vnmkd0800800030", code600: "VNMKD0600600045", code800: "VNMKD0800800030" },
  { file: "vvnmkd0600600046-nmkd0800800031", code600: "VVNMKD0600600046", code800: "NMKD0800800031" },
  { file: "vnmkd0600600047-vnmkd0800800032", code600: "VNMKD0600600047", code800: "VNMKD0800800032" },
  { file: "vnmkd0600600050-vnmkd0800800033", code600: "VNMKD0600600050", code800: "VNMKD0800800033" },
  { file: "vnmkd0600600051-vnmkd0800800034", code600: "VNMKD0600600051", code800: "VNMKD0800800034" },
  { file: "vnmkd0600600052-vnmkd0800800035", code600: "VNMKD0600600052", code800: "VNMKD0800800035" },
  { file: "vnmkd0600600053-vnmkd0800800036", code600: "VNMKD0600600053", code800: "VNMKD0800800036" },
]);

const cvgroupSquare = squareSamples("cvgroup", [
  { file: "hg18-907", code800: "HG 18.907" },
  { file: "hg18-909", code800: "HG 18.909" },
  { file: "hg18-910", code800: "HG 18.910" },
  { file: "hg18-911", code800: "HG 18.911" },
  { file: "hg96-901", code600: "HG 96.901" },
  { file: "hg96-902-hg18-902", code600: "HG 96.902", code800: "HG 18.902" },
  { file: "hg96-904-hg18-904", code600: "HG 96.904", code800: "HG 18.904" },
  { file: "hg96-905", code600: "HG 96.905" },
  { file: "hg96-906-hg18-906", code600: "HG 96.906", code800: "HG 18.906" },
  { file: "hg96-907", code600: "HG 96.907" },
  { file: "hg96-908-hg18-908", code600: "HG 96.908", code800: "HG 18.908" },
]);

const alaskaSquare = squareSamples("alaska", [
  { file: "ak80005", code800: "AK80005" },
  { file: "ak80006", code800: "AK80006" },
  { file: "ak80007", code800: "AK80007" },
  { file: "ak8001", code800: "AK8001" },
  { file: "ak8002", code800: "AK8002" },
  { file: "ak8003", code800: "AK8003" },
  { file: "ak8004", code800: "AK8004" },
]);

const nhuphatSquare = squareSamples("nhuphat", [
  { file: "nph8801", code800: "NPH8801" },
  { file: "nph8802", code800: "NPH8802" },
  { file: "nph8803", code800: "NPH8803" },
  { file: "nph8805", code800: "NPH8805" },
  { file: "nph8806", code800: "NPH8806" },
  { file: "nph8808", code800: "NPH8808" },
  { file: "nph8809", code800: "NPH8809" },
  { file: "nph8810", code800: "NPH8810" },
]);

const stackedSet = (brand: string, file: string, codes: string[]): Sample => ({
  image: {
    src: `/images/products/${brand}/rectangle-web/${file}.jpg`,
    alt: `Bộ gạch ốp ${codes.join(", ")}`,
    focal: "50% 50%",
    fit: "contain",
  },
  codes,
});

/** Một viên gạch chữ nhật rời, hiển thị theo đúng tỷ lệ của nhóm thay vì tỷ lệ ảnh bộ xếp chồng. */
const rectangleTile = (brand: string, file: string, code: string): Sample => ({
  image: {
    src: `/images/products/${brand}/rectangle-web/${file}.jpg`,
    alt: `Gạch ${code}`,
    focal: "50% 50%",
    fit: "contain",
  },
  code,
});

type RectangleGroupId = "300x600" | "400x800";
type RectangleSetDefinition = {
  file: string;
  group: RectangleGroupId;
  codes: string[];
};

/** Nhóm các ảnh bộ gạch chữ nhật theo mã quy cách; mảng rỗng sẽ làm ẩn nhóm không có ảnh thật. */
const rectangleSamples = (brand: string, sets: RectangleSetDefinition[]): Record<RectangleGroupId, Sample[]> => ({
  "300x600": sets.filter((set) => set.group === "300x600").map((set) => stackedSet(brand, set.file, set.codes)),
  "400x800": sets.filter((set) => set.group === "400x800").map((set) => stackedSet(brand, set.file, set.codes)),
});

const goldentileRectangle = rectangleSamples("goldentile", [
  { file: "gp936-800v-gpd936-800-gp936-800", group: "300x600", codes: ["GP936.800V", "GPD936.800", "GP936.800"] },
  { file: "gp936-801v-gpd936-801-gp936-801", group: "300x600", codes: ["GP936.801V", "GPD936.801", "GP936.801"] },
  {
    file: "gp936-802v-gp936-802-gpd936-802-dp936-803",
    group: "300x600",
    codes: ["GP936.802V", "GP936.802", "GPD936.802", "DP936.803"],
  },
  { file: "gp936-804-gpd936-804-gp936-805", group: "300x600", codes: ["GP936.804", "GPD936.804", "GP936.805"] },
  { file: "gp936-807v-gpd936-807-gp936-807", group: "300x600", codes: ["GP936.807V", "GPD936.807", "GP936.807"] },
  { file: "gp948-708-gpd948-708-gp948-709", group: "400x800", codes: ["GP948.708", "GPD948.708", "GP948.709"] },
  { file: "gp948-801v-gpd-801-gp948-801", group: "400x800", codes: ["GP948.801V", "GPD.801", "GP948.801"] },
  { file: "gp948-810v-gp948-810-gp948-810", group: "400x800", codes: ["GP948.810V", "GP948.810", "GP948.810"] },
  { file: "gp948-812-gpd948-812-gp948-813", group: "400x800", codes: ["GP948.812", "GPD948.812", "GP948.813"] },
  { file: "gp948-814v-gpd948-814-gp948-814", group: "400x800", codes: ["GP948.814V", "GPD948.814", "GP948.814"] },
]);

const ferazaRectangle = rectangleSamples("feraza", [
  { file: "fp936-601v-fp936-601d-fp936-601", group: "300x600", codes: ["FP936.601V", "FP936.601D", "FP936.601"] },
  { file: "fp936-602v-fp936-602d-fp936-602", group: "300x600", codes: ["FP936.602V", "FP936.602D", "FP936.602"] },
  { file: "fp936-604-fp936-604d-fp936-605", group: "300x600", codes: ["FP936.604", "FP936.604D", "FP936.605"] },
  { file: "fp936-606-fp936-606d-fp936-607", group: "300x600", codes: ["FP936.606", "FP936.606D", "FP936.607"] },
  { file: "fp936-609v-fp936-609d-fp936-609", group: "300x600", codes: ["FP936.609V", "FP936.609D", "FP936.609"] },
  { file: "fp948-601v-fp948-601d-fp948-601", group: "400x800", codes: ["FP948.601V", "FP948.601D", "FP948.601"] },
  { file: "fp948-602v-fp948-602d-fp948-602", group: "400x800", codes: ["FP948.602V", "FP948.602D", "FP948.602"] },
  { file: "fp948-603v-fp948-603d-fp948-603", group: "400x800", codes: ["FP948.603V", "FP948.603D", "FP948.603"] },
  { file: "fp948-604v-fp948-604d-fp948-604", group: "400x800", codes: ["FP948.604V", "FP948.604D", "FP948.604"] },
  { file: "fp948-605-fp948-605-fp948-605", group: "400x800", codes: ["FP948.605", "FP948.605", "FP948.605"] },
]);

const clazaRectangle = rectangleSamples("claza", [
  { file: "cz948-302-cz948-302d-cz948-303", group: "400x800", codes: ["CZ948.302", "CZ948.302D", "CZ948.303"] },
  { file: "cz948-304v-cz948-304d-cz948-304", group: "400x800", codes: ["CZ948.304V", "CZ948.304D", "CZ948.304"] },
]);

const lexxaRectangle = rectangleSamples("lexxa", [
  { file: "lp948-100v-lp948-100d-lp948-100", group: "400x800", codes: ["LP948.100V", "LP948.100D", "LP948.100"] },
  { file: "lp948-104v-lp948-104d-lp948-104", group: "400x800", codes: ["LP948.104V", "LP948.104D", "LP948.104"] },
  { file: "lp948-105v-lp948-105d-lp948-105", group: "400x800", codes: ["LP948.105V", "LP948.105D", "LP948.105"] },
  { file: "lpu948-101v-lpu948-101d-lpu948-101", group: "400x800", codes: ["LPU948.101V", "LPU948.101D", "LPU948.101"] },
  { file: "lpu948-102-lpu948-102d-lpu948-103", group: "400x800", codes: ["LPU948.102", "LPU948.102D", "LPU948.103"] },
]);

const lexxa300x600: Sample[] = [
  rectangleTile("lexxa", "lp936-100v", "LP936.100V"),
  rectangleTile("lexxa", "lp936-100d", "LP936.100D"),
  rectangleTile("lexxa", "lp936-100", "LP936.100"),
];

const mostileRectangle = rectangleSamples("mostile", [
  { file: "sp936-901v-sp936-901d-sp936-901", group: "300x600", codes: ["SP936.901V", "SP936.901D", "SP936.901"] },
  { file: "sp936-904-sp936-904d-sp936-905", group: "300x600", codes: ["SP936.904", "SP936.904D", "SP936.905"] },
  { file: "sp936-906-sp936-906d-sp936-907", group: "300x600", codes: ["SP936.906", "SP936.906D", "SP936.907"] },
  { file: "sp948-901v-sp948-901d-sp948-901", group: "400x800", codes: ["SP948.901V", "SP948.901D", "SP948.901"] },
  { file: "sp948-902-sp948-902d-sp948-903", group: "400x800", codes: ["SP948.902", "SP948.902D", "SP948.903"] },
  { file: "sp948-904-sp948-904d-sp948-905", group: "400x800", codes: ["SP948.904", "SP948.904D", "SP948.905"] },
  { file: "sp948-906-sp948-906d-sp948-907", group: "400x800", codes: ["SP948.906", "SP948.906D", "SP948.907"] },
]);

const lustileRectangle = rectangleSamples("lustile", []);

const cvgroupRectangle = rectangleSamples("cvgroup", [
  { file: "hg936-901-v-hg936-901d-hg936-901", group: "300x600", codes: ["HG936.901.V", "HG936.901D", "HG936.901"] },
  { file: "hg936-902v-hg936-902d-hg936-902", group: "300x600", codes: ["HG936.902V", "HG936.902D", "HG936.902"] },
  { file: "hg936-904-hg936-904d-hg936-905", group: "300x600", codes: ["HG936.904", "HG936.904D", "HG936.905"] },
  { file: "hg936-906-hg936-906d-hg936-907", group: "300x600", codes: ["HG936.906", "HG936.906D", "HG936.907"] },
  { file: "hg936-908-hg936-908d-hg936-909", group: "300x600", codes: ["HG936.908", "HG936.908D", "HG936.909"] },
]);

const alaskaRectangle = rectangleSamples("alaska", [
  { file: "ak4085-ak4805d-ak4806", group: "400x800", codes: ["AK4085", "AK4805D", "AK4806"] },
  { file: "ak4800v-ak4800d-ak4800", group: "400x800", codes: ["AK4800V", "AK4800D", "AK4800"] },
  { file: "ak4801v-ak4801d-ak4801", group: "400x800", codes: ["AK4801V", "AK4801D", "AK4801"] },
  { file: "ak4802v-ak4802d-ak4802", group: "400x800", codes: ["AK4802V", "AK4802D", "AK4802"] },
  { file: "ak4803-ak4803d-ak4804", group: "400x800", codes: ["AK4803", "AK4803D", "AK4804"] },
  { file: "ak4807-ak4807d-ak4808", group: "400x800", codes: ["AK4807", "AK4807D", "AK4808"] },
]);

const nhuphatRectangle = rectangleSamples("nhuphat", [
  { file: "nph4800v-nph4800d-nph4800", group: "400x800", codes: ["NPH4800V", "NPH4800D", "NPH4800"] },
  { file: "nph4801v-nph4801d-nph4801", group: "400x800", codes: ["NPH4801V", "NPH4801D", "NPH4801"] },
  { file: "nph4802-nph4802d-nph4802d2", group: "400x800", codes: ["NPH4802", "NPH4802D", "NPH4802D2"] },
  { file: "nph4803-nph4803d-nph4803d2", group: "400x800", codes: ["NPH4803", "NPH4803D", "NPH4803D2"] },
  { file: "nph4805-nph4805d-nph4805d2", group: "400x800", codes: ["NPH4805", "NPH4805D", "NPH4805D2"] },
]);

/**
 * Gạch ốp tường MIKADO — ẢNH THẬT. Ảnh gốc ở .../mikado/rectangle, bản web ở .../rectangle-web (cùng script như trên).
 * Mã MP936 = quy cách 300 × 600, MP948 = 400 × 800. Mỗi ảnh là một bộ 3 viên xếp chồng; tên file ghi mã của 3 viên
 * theo thứ tự trên → giữa → dưới (ví dụ MP936.200A-MPD936.200A-MP936.200).
 */
const mikadoSet = (file: string, codes: [string, string, string]): Sample => stackedSet("mikado", file, codes);

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

/** Gạch ốp tường CERINCO — CP936 = 300 × 600, CP948 = 400 × 800; mỗi ảnh ghép 3 viên trên → giữa → dưới. */
const cerinco300x600: Sample[] = [
  stackedSet("cerinco", "cp936-400a-cpd936-400a-cp936-400", ["CP936.400A", "CPD936.400A", "CP936.400"]),
  stackedSet("cerinco", "cp936-401v-cpd936-401-cp936-401", ["CP936.401V", "CPD936.401", "CP936.401"]),
  stackedSet("cerinco", "cp936-404-cpd936-404-cp936-405", ["CP936.404", "CPD936.404", "CP936.405"]),
  stackedSet("cerinco", "cp936-408-cpd936-408-cp936-409", ["CP936.408", "CPD936.408", "CP936.409"]),
  stackedSet("cerinco", "cp936-411-cpd936-411-cp936-411", ["CP936.411", "CPD936.411", "CP936.411"]),
];

const cerinco400x800: Sample[] = [
  stackedSet("cerinco", "cp948-302-cpd948-302-cp948-303", ["CP948.302", "CPD948.302", "CP948.303"]),
  stackedSet("cerinco", "cp948-400v-cpd9480-400-cp948-400", ["CP948.400V", "CPD948.400", "CP948.400"]),
  stackedSet("cerinco", "cp948-401v-cpd948-401-cp948-401", ["CP948.401V", "CPD948.401", "CP948.401"]),
  stackedSet("cerinco", "cp948-402-cpd948-402-cp948-403", ["CP948.402", "CPD948.402", "CP948.403"]),
];

/** Gạch ốp tường VIDECOR — VP936 = 300 × 600, VP948 = 400 × 800; mỗi ảnh ghép 3 viên trên → giữa → dưới. */
const videcor300x600: Sample[] = [
  stackedSet("videcor", "vp936-600a-vpd936-600a-vp936-600", ["VP936.600A", "VPD936.600A", "VP936.600"]),
  stackedSet("videcor", "vp936-601v-vpd936-601-vp936-601", ["VP936.601V", "VPD936.601", "VP936.601"]),
  stackedSet("videcor", "vp936-602v-vpd936-602-vpd936-602", ["VP936.602V", "VPD936.602", "VP936.602"]),
  stackedSet("videcor", "vp936-603v-vpd936-603-vp936-603", ["VP936.603V", "VPD936.603", "VP936.603"]),
];

const videcor400x800: Sample[] = [
  stackedSet("videcor", "vp948-505v-vpd948-505-vp948-505", ["VP948.505V", "VPD948.505", "VP948.505"]),
  stackedSet("videcor", "vp948-506-vpd948-506-vp948-507", ["VP948.506", "VPD948.506", "VP948.507"]),
  stackedSet("videcor", "vp948-508-vpd948-508-vp948-509", ["VP948.508", "VPD948.508", "VP948.509"]),
  stackedSet("videcor", "vp948-600a-vpd948-600a-vp948-600", ["VP948.603V", "VP948.603D", "VP948.603"]),
  stackedSet("videcor", "vp948-602v-vp948-602d-vp948-602", ["VP948.602V", "VP948.602D", "VP948.602"]),
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
 * Các thương hiệu còn lại — trang MẪU dựng từ cùng template với MIKADO. Nội dung giới thiệu và các nhóm chưa có ảnh
 * thật vẫn dùng texture CC0 trong public/images/products. Khi có tài liệu riêng, khai báo dữ liệu thật trong `customPages`.
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

/**
 * Giữ trang giới thiệu mẫu, thay những nhóm sản phẩm đã có ảnh thật và bật bố cục bộ ba cho gạch chữ nhật.
 * Một nhóm được khai báo bằng mảng rỗng sẽ bị ẩn để không hiển thị ảnh demo sai quy cách.
 */
const pageWithProducts = (
  id: string,
  samplesByGroup: Partial<Record<SizeGroup["id"], Sample[]>>,
  aboutGroupId?: SizeGroup["id"],
  unstackedGroupIds: SizeGroup["id"][] = [],
): BrandProductPage => {
  const page = demoPage(id, productOrder.indexOf(id));
  return {
    ...page,
    products: {
      ...page.products,
      groups: page.products.groups.flatMap((group) => {
        const hasOverride = Object.prototype.hasOwnProperty.call(samplesByGroup, group.id);
        const samples = samplesByGroup[group.id];
        if (hasOverride && !samples?.length) return [];
        return [
          {
            ...group,
            samples: samples ?? group.samples,
            stacked: samples
              ? (group.id === "300x600" || group.id === "400x800") && !unstackedGroupIds.includes(group.id)
              : group.stacked,
            placement: group.id === aboutGroupId ? "about" : group.placement,
          },
        ];
      }),
    },
  };
};

/** Dùng bố cục trưng bày có điểm nhấn cho các trang cần ưu tiên ảnh sản phẩm hơn phần giới thiệu chung. */
const showcasePage = (page: BrandProductPage): BrandProductPage => ({
  ...page,
  products: { ...page.products, layout: "showcase" },
});

/** Trang đã có nội dung/ảnh thật riêng (ghi đè trang mẫu cùng id). */
const customPages: Record<string, BrandProductPage> = {
  mikado: mikadoProducts,
  cerinco: pageWithProducts("cerinco", {
    "300x600": cerinco300x600,
    "400x800": cerinco400x800,
    "600x600": cerinco600,
    "800x800": cerinco800,
  }, "300x600"),
  videcor: pageWithProducts("videcor", {
    "300x600": videcor300x600,
    "400x800": videcor400x800,
    "600x600": videcor600,
    "800x800": videcor800,
  }, "300x600"),
  goldentile: pageWithProducts("goldentile", { ...goldentileRectangle, ...goldentileSquare }, "300x600"),
  feraza: pageWithProducts("feraza", { ...ferazaRectangle, ...ferazaSquare }, "300x600"),
  claza: pageWithProducts("claza", { ...clazaRectangle, ...clazaSquare }),
  lexxa: pageWithProducts(
    "lexxa",
    { ...lexxaRectangle, ...lexxaSquare, "300x600": lexxa300x600 },
    "400x800",
    ["300x600"],
  ),
  mostile: pageWithProducts("mostile", { ...mostileRectangle, ...mostileSquare }, "400x800"),
  lustile: pageWithProducts("lustile", { ...lustileRectangle, ...lustileSquare }),
  cvgroup: pageWithProducts("cvgroup", { ...cvgroupRectangle, ...cvgroupSquare }, "300x600"),
  alaska: showcasePage(pageWithProducts("alaska", { ...alaskaRectangle, ...alaskaSquare })),
  nhuphat: showcasePage(pageWithProducts("nhuphat", { ...nhuphatRectangle, ...nhuphatSquare })),
};

/** Mọi thương hiệu đều có một trang đôi sản phẩm, đúng thứ tự `productOrder` (số trang khớp mục lục). */
export const brandProductPages: BrandProductPage[] = productOrder.map((id, i) => customPages[id] ?? demoPage(id, i));
