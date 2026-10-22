import type { Brand } from "@/lib/catalogue/brands";

/**
 * Hiển thị logo bằng SVG <image> + viewBox:
 *  - `crop` chỉ chọn vùng nhìn thấy (cắt nền trắng thừa), không chạm vào pixel logo;
 *  - `meet` giữ đúng tỷ lệ, không kéo giãn; `slice` (logo có nền riêng) phủ kín ô.
 */
export function LogoImage({ brand, className }: { brand: Brand; className?: string }) {
  const { src, width, height, crop } = brand.logo;
  const [cx, cy, cw, ch] = crop ?? [0, 0, 1, 1];
  return (
    <svg
      role="img"
      aria-label={brand.name}
      className={className}
      viewBox={`${cx * width} ${cy * height} ${cw * width} ${ch * height}`}
      preserveAspectRatio={brand.fill ? "xMidYMid slice" : "xMidYMid meet"}
      width="100%"
      height="100%"
    >
      <image href={src} x={0} y={0} width={width} height={height} />
    </svg>
  );
}
