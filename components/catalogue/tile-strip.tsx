import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

/**
 * Mảng gạch nhỏ trang trí (cùng họa tiết với bìa): lưới 5 × 2 ô vuông, mạch 6 px.
 * `unit` là cạnh một ô (px thiết kế); `mirror` lật ngang để đặt ở góc trái. Chỉ là họa tiết, không mang nội dung.
 */
const GAP = 6;
const TILES: { c: number; r: number; w: number; h: number; className: string }[] = [
  { c: 0, r: 0, w: 2, h: 2, className: "bg-brand-tint" },
  { c: 2, r: 0, w: 1, h: 2, className: "bg-brand" },
  { c: 3, r: 0, w: 2, h: 1, className: "bg-brand-light" },
  { c: 3, r: 1, w: 1, h: 1, className: "bg-brand-deep" },
  { c: 4, r: 1, w: 1, h: 1, className: "bg-brand-tint" },
];

export function TileStrip({
  unit = 45,
  mirror,
  delay = 0.4,
  className,
  style,
}: {
  unit?: number;
  mirror?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const span = (n: number) => n * unit + (n - 1) * GAP;
  const offset = (n: number) => n * (unit + GAP);
  return (
    <Reveal delay={delay} y={0} className={cn("absolute", className)} style={{ width: span(5), height: span(2), ...style }}>
      <div aria-hidden className="relative size-full">
        {TILES.map((t) => (
          <span
            key={`${t.c}-${t.r}`}
            className={cn("absolute", t.className)}
            style={{ left: offset(mirror ? 5 - t.c - t.w : t.c), top: offset(t.r), width: span(t.w), height: span(t.h) }}
          />
        ))}
      </div>
    </Reveal>
  );
}
