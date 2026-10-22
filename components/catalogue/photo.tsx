import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PhotoRef } from "@/lib/catalogue/types";

/**
 * Ảnh phủ kín khung cha (cha cần `relative` và có kích thước). Crop kiểu cover theo `focal`.
 * `unoptimized`: ảnh demo đã được thu nhỏ sẵn; bỏ prop này nếu muốn Next tối ưu ảnh thật lớn.
 */
export function Photo({
  photo,
  sizes = "400px",
  priority,
  className,
}: {
  photo: PhotoRef;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={cn("object-cover", className)}
      style={{ objectPosition: photo.focal ?? "50% 50%" }}
    />
  );
}
