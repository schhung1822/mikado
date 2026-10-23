import Image from "next/image";
import { company } from "@/lib/catalogue/company";

/** Logo MIKADO-MT đặt đúng tỷ lệ gốc (chỉ truyền chiều rộng; chiều cao tự tính). Không phải logo thương hiệu MIKADO. */
export function CompanyLogo({ width, preload }: { width: number; preload?: boolean }) {
  const { src, width: w, height: h, alt } = company.logo;
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      preload={preload}
      unoptimized
      className="block"
      style={{ width, height: "auto" }}
    />
  );
}
