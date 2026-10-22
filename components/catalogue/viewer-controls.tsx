"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const iconButton =
  "size-9 rounded-full text-chrome-fg hover:bg-white/10 hover:text-white aria-expanded:bg-white/10 aria-expanded:text-white focus-visible:ring-white/30 disabled:opacity-30";

export function IconButton({
  label,
  onClick,
  disabled,
  className,
  expanded,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  /** Khi nút đóng/mở một vùng khác (ví dụ thanh menu trái). */
  expanded?: boolean;
  children: ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn(iconButton, className)}
            aria-label={label}
            aria-expanded={expanded}
            disabled={disabled}
            onClick={onClick}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

interface ViewerControlsProps {
  /** Tên và số trang của đơn vị đang xem. */
  label: string;
  folio: string;
  index: number;
  count: number;
  /** "Trang" khi xem từng trang, "Trang đôi" khi xem trang đôi. */
  unitName: string;
  onGo: (index: number) => void;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  onZoom: (zoom: number) => void;
}

/** Thanh điều khiển của trình xem — tách hẳn khỏi nội dung trang, ẩn khi in. */
export function ViewerControls({
  label,
  folio,
  index,
  count,
  unitName,
  onGo,
  zoom,
  minZoom,
  maxZoom,
  onZoom,
}: ViewerControlsProps) {
  return (
    <nav
      data-viewer-chrome
      aria-label="Điều hướng catalogue"
      className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-1 border-t border-white/10 px-2 py-2 sm:gap-2 sm:px-6"
    >
      <p className="hidden text-[11px] tracking-[0.16em] text-chrome-muted uppercase tabular-nums sm:block">
        {unitName} {index + 1} / {count}
      </p>
      <div className="col-start-1 flex items-center justify-self-start sm:col-start-2 sm:justify-self-auto">
        <IconButton label="Trước (←)" onClick={() => onGo(index - 1)} disabled={index === 0}>
          <ChevronLeft />
        </IconButton>
        <div className="min-w-[5.75rem] text-center sm:min-w-[11rem]" aria-live="polite" aria-atomic="true">
          <p className="text-[13px] font-medium tracking-[0.06em] text-white tabular-nums">{folio}</p>
          <p className="mt-0.5 text-[10px] tracking-[0.16em] text-chrome-muted uppercase">{label}</p>
        </div>
        <IconButton label="Sau (→)" onClick={() => onGo(index + 1)} disabled={index === count - 1}>
          <ChevronRight />
        </IconButton>
      </div>

      <div className="col-start-3 flex items-center justify-self-end">
        <IconButton label="Thu nhỏ (−)" onClick={() => onZoom(zoom / 1.4)} disabled={zoom <= minZoom + 0.001}>
          <Minus />
        </IconButton>
        <span
          className="hidden w-11 text-center text-xs tabular-nums text-chrome-muted sm:inline"
          aria-label={`Phóng to ${Math.round(zoom * 100)}%`}
        >
          {Math.round(zoom * 100)}%
        </span>
        <IconButton label="Phóng to (+)" onClick={() => onZoom(zoom * 1.4)} disabled={zoom >= maxZoom - 0.001}>
          <Plus />
        </IconButton>
        <IconButton
          label="Vừa khung nhìn (0)"
          className="hidden sm:inline-flex"
          onClick={() => onZoom(minZoom)}
          disabled={zoom <= minZoom + 0.001}
        >
          <Maximize2 />
        </IconButton>
      </div>
    </nav>
  );
}
