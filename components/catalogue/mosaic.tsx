import { PAGE } from "@/lib/catalogue/identity";
import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

/**
 * Mảng ốp gạch trang trí cho bìa: lưới 6 cột, mạch vữa 6px, ô vuông và ô chữ nhật 1 : 2 —
 * gợi quy cách gạch ốp lát. Chỉ là họa tiết, không mang nội dung.
 */
export const MOSAIC_GROUT = 6;
export const MOSAIC_COLS = 6;
export const MOSAIC_ROWS = 4;
/** Cạnh một ô đơn vị (px thiết kế); các ô tràn hết bề rộng trang. */
const MODULE = (PAGE.width - MOSAIC_GROUT * (MOSAIC_COLS - 1)) / MOSAIC_COLS;
export const MOSAIC_HEIGHT = MODULE * MOSAIC_ROWS + MOSAIC_GROUT * (MOSAIC_ROWS - 1);

export type MosaicTone = "brand" | "deep" | "light" | "tint" | "stone" | "white";

/** Vị trí/kích thước tính theo ô đơn vị: cột `c`, hàng `r`, rộng `w`, cao `h`. */
export interface MosaicTile {
  c: number;
  r: number;
  w: number;
  h: number;
  tone: MosaicTone;
}

/** Màu từng loại ô. Gradient nhẹ ở ô xanh gợi mặt vát của logo MIKADO-MT. */
const TONE: Record<MosaicTone, { className?: string; background?: string }> = {
  brand: { background: "linear-gradient(145deg, var(--cat-brand-light), var(--cat-brand) 70%)" },
  deep: { background: "linear-gradient(145deg, var(--cat-brand), var(--cat-brand-deep) 75%)" },
  light: { className: "bg-brand-light" },
  tint: { className: "bg-brand-tint" },
  stone: { className: "bg-stone" },
  white: { className: "bg-tile ring-1 ring-inset ring-hairline" },
};

/** Bố cục bìa đầu — mảng gạch ở phần trên trang. */
export const frontMosaic: MosaicTile[] = [
  { c: 0, r: 0, w: 2, h: 2, tone: "tint" },
  { c: 2, r: 0, w: 1, h: 2, tone: "brand" },
  { c: 3, r: 0, w: 1, h: 1, tone: "white" },
  { c: 4, r: 0, w: 2, h: 1, tone: "light" },
  { c: 3, r: 1, w: 3, h: 1, tone: "deep" },
  { c: 0, r: 2, w: 1, h: 1, tone: "deep" },
  { c: 1, r: 2, w: 2, h: 2, tone: "brand" },
  { c: 3, r: 2, w: 1, h: 2, tone: "tint" },
  { c: 4, r: 2, w: 2, h: 2, tone: "stone" },
  { c: 0, r: 3, w: 1, h: 1, tone: "tint" },
];

/** Bìa cuối dùng cùng bố cục xoay 180° để hai bìa đối xứng nhau. */
export const backMosaic: MosaicTile[] = frontMosaic.map((t) => ({
  ...t,
  c: MOSAIC_COLS - t.c - t.w,
  r: MOSAIC_ROWS - t.r - t.h,
}));

const span = (n: number) => n * MODULE + (n - 1) * MOSAIC_GROUT;
const offset = (n: number) => n * (MODULE + MOSAIC_GROUT);

export function Mosaic({ tiles, className, style }: { tiles: MosaicTile[]; className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden className={cn("absolute left-0", className)} style={{ width: PAGE.width, height: MOSAIC_HEIGHT, ...style }}>
      {tiles.map((t, i) => (
        <Reveal
          key={`${t.c}-${t.r}`}
          y={0}
          delay={0.04 * i}
          className={cn("absolute", TONE[t.tone].className)}
          style={{
            left: offset(t.c),
            top: offset(t.r),
            width: span(t.w),
            height: span(t.h),
            background: TONE[t.tone].background,
          }}
        >
          {null}
        </Reveal>
      ))}
    </div>
  );
}
