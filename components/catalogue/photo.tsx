import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PhotoRef } from "@/lib/catalogue/types";

/**
 * Ảnh phủ khung cha (cha cần `relative` và có kích thước).
 * `fit="cover"` (mặc định) crop theo `focal`; `fit="contain"` giữ nguyên toàn bộ ảnh, không cắt.
 * `unoptimized`: ảnh demo đã được thu nhỏ sẵn; bỏ prop này nếu muốn Next tối ưu ảnh thật lớn.
 */
export function Photo({
  photo,
  sizes = "400px",
  preload,
  fit,
  className,
}: {
  photo: PhotoRef;
  sizes?: string;
  preload?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      preload={preload}
      loading="eager"
      unoptimized
      className={cn((fit ?? photo.fit ?? "cover") === "contain" ? "object-contain" : "object-cover", className)}
      style={{ objectPosition: photo.focal ?? "50% 50%" }}
    />
  );
}
