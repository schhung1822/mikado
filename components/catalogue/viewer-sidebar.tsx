"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { CatalogueEntry } from "@/lib/catalogue/types";
import { cn } from "@/lib/utils";
import { UnitView, unitSize, type UnitPart } from "./unit-view";

export interface ViewerUnit {
  key: string;
  entry: number;
  part: UnitPart;
  /** Số trang in của đơn vị, ví dụ "04–05" hoặc "04". */
  folio: string;
  /** Vị trí trang đầu tiên của đơn vị trong danh sách phẳng các trang. */
  pagePos: number;
}

export const SIDEBAR_WIDTH = 208;

const ease = [0.22, 1, 0.36, 1] as const;

interface ViewerSidebarProps {
  entries: CatalogueEntry[];
  units: ViewerUnit[];
  current: number;
  onSelect: (unitIndex: number) => void;
  open: boolean;
  onClose: () => void;
  /** Mobile: hiển thị dạng ngăn kéo phủ lên nội dung. */
  overlay: boolean;
}

function UnitList({ entries, units, current, onSelect }: Pick<ViewerSidebarProps, "entries" | "units" | "current" | "onSelect">) {
  return (
    <ol className="flex flex-col gap-1 p-3">
      {units.map((unit, i) => {
        const entry = entries[unit.entry];
        const active = i === current;
        const { width } = unitSize(entry.kind, unit.part);
        const thumbWidth = unit.part === "full" ? 148 : 104;
        return (
          <li key={unit.key}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active ? "page" : undefined}
              aria-label={`${entry.label}, trang ${unit.folio}`}
              className={cn(
                "group flex w-full flex-col items-center gap-2 rounded-md px-2 pt-2.5 pb-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/40",
                active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none block shadow-[0_6px_16px_-6px_rgba(0,0,0,0.7)] ring-1 transition-shadow",
                  active ? "ring-2 ring-white/90" : "ring-white/15 group-hover:ring-white/40",
                )}
              >
                <UnitView entry={entry} part={unit.part} scale={thumbWidth / width} />
              </span>
              <span className="flex items-baseline gap-2 text-[10.5px] tracking-[0.14em] uppercase">
                <span className={cn("font-medium tabular-nums", active ? "text-white" : "text-chrome-fg")}>
                  {unit.folio}
                </span>
                <span className={active ? "text-chrome-fg" : "text-chrome-muted"}>{entry.label}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Thanh menu trái giống ngăn trang của trình đọc PDF: thumbnail từng mục, bấm để chuyển trang.
 * Desktop: mở rộng/thu gọn bằng chiều rộng. Mobile: ngăn kéo phủ lên, có lớp nền để đóng.
 */
export function ViewerSidebar({ overlay, open, onClose, ...list }: ViewerSidebarProps) {
  if (overlay) {
    return (
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              data-viewer-chrome
              className="absolute inset-0 z-20 bg-black/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              aria-hidden
            />
            <motion.aside
              key="drawer"
              data-viewer-chrome
              aria-label="Danh sách trang"
              className="absolute inset-y-0 left-0 z-30 flex w-[min(78vw,280px)] flex-col border-r border-white/10 bg-chrome shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease }}
            >
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 pr-2 pl-4 text-[11px] tracking-[0.2em] text-chrome-muted uppercase">
                Trang
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Đóng danh sách trang"
                  className="flex size-9 items-center justify-center rounded-full text-chrome-fg outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
                <UnitList {...list} />
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <motion.aside
      data-viewer-chrome
      aria-label="Danh sách trang"
      aria-hidden={!open}
      inert={!open}
      initial={false}
      animate={{ width: open ? SIDEBAR_WIDTH : 0 }}
      transition={{ duration: 0.26, ease }}
      className="shrink-0 overflow-hidden border-white/10 bg-black/20 data-[open=true]:border-r"
      data-open={open}
    >
      <div style={{ width: SIDEBAR_WIDTH }} className="scrollbar-thin h-full overflow-y-auto">
        <UnitList {...list} />
      </div>
    </motion.aside>
  );
}
