"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import { Download, PanelLeft, PanelLeftClose } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DOCUMENT } from "@/lib/catalogue/identity";
import type { CatalogueEntry } from "@/lib/catalogue/types";
import { cn } from "@/lib/utils";
import { AnimationProvider } from "./motion";
import { UnitView, unitSize, type UnitPart } from "./unit-view";
import { IconButton, ViewerControls } from "./viewer-controls";
import { ViewerSidebar, type ViewerUnit } from "./viewer-sidebar";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
/** Dưới ngưỡng này (px, bề rộng trình xem) chuyển sang xem từng trang thay vì trang đôi. */
const SINGLE_PAGE_BELOW = 768;
const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
/** Lăn chuột chuyển trang: tổng độ lăn tối thiểu (px) để tính là một lần chuyển, và khoảng lặng (ms) để coi là cử chỉ mới. */
const WHEEL_THRESHOLD = 50;
const WHEEL_GESTURE_GAP = 160;

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28, transition: { duration: 0.16, ease: "easeIn" } }),
};

interface PageRef {
  entry: number;
  part: UnitPart;
  folio: string;
}

/**
 * Trình xem catalogue.
 * - Desktop: mỗi lượt xem trọn một trang đôi (hoặc trang đơn); mobile (< 768px): xem từng trang.
 * - Thanh menu trái có thumbnail, mở rộng/thu gọn được; mobile là ngăn kéo.
 * - Điều hướng trước/sau (nút, phím ← →, lăn chuột trên trang), phóng to bằng nút / pinch / Ctrl+cuộn.
 *   Lăn chuột chỉ chuyển trang khi chưa phóng to; đang phóng to thì lăn để xem các vùng của trang.
 *   Khi phóng to chỉ vùng xem tài liệu cuộn — toàn trang web không bị tràn ngang.
 */
export function CatalogueViewer({ entries }: { entries: CatalogueEntry[] }) {
  /** Vị trí trong danh sách phẳng các trang (trang đôi = 2 trang, trang đơn = 1). */
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rootW, setRootW] = useState<number | null>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  /** null = tự động (mở trên desktop, đóng trên mobile) cho tới khi người xem tự bấm. */
  const [sidebarPref, setSidebarPref] = useState<boolean | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(1);
  const pendingCenter = useRef<{ x: number; y: number } | null>(null);
  const hashReady = useRef(false);
  /** Trạng thái cử chỉ lăn chuột: `locked` = đã chuyển trang trong cử chỉ này, chờ cử chỉ mới (tránh quán tính touchpad lật nhiều trang). */
  const wheel = useRef({ last: 0, acc: 0, locked: false });
  const goRef = useRef<(index: number) => void>(() => {});
  const unitIndexRef = useRef(0);

  const singlePage = rootW !== null && rootW < SINGLE_PAGE_BELOW;
  const sidebarOpen = sidebarPref ?? !singlePage;

  const pages = useMemo<PageRef[]>(
    () =>
      entries.flatMap((entry, i): PageRef[] => {
        const [first, second] = entry.folio.split("–");
        return entry.kind === "spread"
          ? [
              { entry: i, part: "left", folio: first },
              { entry: i, part: "right", folio: second ?? "" },
            ]
          : [{ entry: i, part: "full", folio: entry.folio }];
      }),
    [entries],
  );

  const units = useMemo<ViewerUnit[]>(
    () =>
      singlePage
        ? pages.map((p, i) => ({ key: `${entries[p.entry].id}:${p.part}`, entry: p.entry, part: p.part, folio: p.folio, pagePos: i }))
        : entries.map((e, i) => ({
            key: `${e.id}:full`,
            entry: i,
            part: "full" as const,
            folio: e.folio,
            pagePos: pages.findIndex((p) => p.entry === i),
          })),
    [entries, pages, singlePage],
  );

  const unitIndex = singlePage ? pos : pages[pos].entry;
  const unit = units[unitIndex];
  const entry = entries[unit.entry];
  const size = unitSize(entry.kind, unit.part);

  const pad = box && box.w < 640 ? 10 : 32;
  const fit = box ? Math.floor(Math.min((box.w - pad * 2) / size.width, (box.h - pad * 2) / size.height) * 1000) / 1000 : 0;
  const scale = fit * zoom;

  // Đo toàn bộ trình xem (quyết định xem trang đôi hay từng trang) và riêng vùng xem tài liệu.
  // Vùng xem đo theo border-box để không bị lặp khi thanh cuộn xuất hiện lúc phóng to.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const el = viewportRef.current;
    if (!root || !el) return;
    const measure = () => {
      setRootW(root.offsetWidth);
      setBox({ w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const applyZoom = useCallback((next: number) => {
    const z = clampZoom(next);
    if (Math.abs(z - zoomRef.current) < 0.001) return;
    const el = viewportRef.current;
    if (el && el.scrollWidth > 0 && el.scrollHeight > 0) {
      pendingCenter.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
        y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
      };
    }
    zoomRef.current = z;
    setZoom(z);
  }, []);

  // Giữ nguyên tâm đang xem sau khi đổi mức phóng to.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    const c = pendingCenter.current;
    if (!el || !c) return;
    el.scrollLeft = c.x * el.scrollWidth - el.clientWidth / 2;
    el.scrollTop = c.y * el.scrollHeight - el.clientHeight / 2;
    pendingCenter.current = null;
  }, [zoom]);

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= units.length || next === unitIndex) return;
      setDir(next > unitIndex ? 1 : -1);
      setPos(units[next].pagePos);
      zoomRef.current = 1;
      setZoom(1);
      viewportRef.current?.scrollTo(0, 0);
    },
    [units, unitIndex],
  );

  useEffect(() => {
    goRef.current = go;
    unitIndexRef.current = unitIndex;
  }, [go, unitIndex]);

  const selectFromSidebar = useCallback(
    (next: number) => {
      go(next);
      if (singlePage) setSidebarPref(false);
    },
    [go, singlePage],
  );

  // Liên kết sâu: #brands / #products.
  const entryId = entries[pages[pos].entry].id;
  useEffect(() => {
    const syncFromHash = () => {
      const i = entries.findIndex((e) => `#${e.id}` === window.location.hash);
      if (i >= 0) setPos(pages.findIndex((p) => p.entry === i));
      hashReady.current = true;
    };
    const raf = requestAnimationFrame(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [entries, pages]);
  useEffect(() => {
    // Chờ đọc hash ban đầu xong mới ghi lại, tránh ghi đè liên kết đang mở.
    if (hashReady.current) window.history.replaceState(null, "", `#${entryId}`);
  }, [entryId]);

  // Bàn phím.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft") go(unitIndex - 1);
      else if (e.key === "ArrowRight") go(unitIndex + 1);
      else if (e.key === "+" || e.key === "=") applyZoom(zoomRef.current * 1.4);
      else if (e.key === "-" || e.key === "_") applyZoom(zoomRef.current / 1.4);
      else if (e.key === "0") applyZoom(MIN_ZOOM);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, unitIndex, applyZoom]);

  // Pinch (cảm ứng) và Ctrl/⌘ + cuộn (touchpad) chỉ tác động lên vùng xem tài liệu.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let startDist = 0;
    let startZoom = 1;
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        startDist = dist(e.touches);
        startZoom = zoomRef.current;
      }
    };
    const onMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDist) applyZoom((startZoom * dist(e.touches)) / startDist);
    };
    const onEnd = () => {
      startDist = 0;
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        applyZoom(zoomRef.current * Math.exp(-e.deltaY * 0.01));
        return;
      }
      // Đang phóng to: để trình duyệt cuộn bình thường trong vùng xem.
      if (zoomRef.current > MIN_ZOOM + 0.001) return;
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      const w = wheel.current;
      const now = performance.now();
      if (now - w.last > WHEEL_GESTURE_GAP) {
        w.locked = false;
        w.acc = 0;
      }
      w.last = now;
      if (w.locked) return;
      w.acc += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      if (Math.abs(w.acc) < WHEEL_THRESHOLD) return;
      goRef.current(unitIndexRef.current + (w.acc > 0 ? 1 : -1));
      w.locked = true;
      w.acc = 0;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, [applyZoom]);

  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delay={300}>
        <div ref={rootRef} className="flex h-dvh flex-col overflow-hidden bg-chrome text-chrome-fg">
          <header
            data-viewer-chrome
            className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-white/10 pr-3 pl-1.5 sm:pr-6 sm:pl-3"
          >
            <div className="flex min-w-0 items-center gap-1">
              <IconButton
                label={sidebarOpen ? "Ẩn danh sách trang" : "Hiện danh sách trang"}
                expanded={sidebarOpen}
                onClick={() => setSidebarPref(!sidebarOpen)}
              >
                {sidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
              </IconButton>
              <span className="truncate pl-1 text-[11px] font-medium tracking-[0.2em] text-chrome-fg uppercase">
                {DOCUMENT.title}
              </span>
            </div>
            <a
              href={DOCUMENT.pdf.url}
              download={DOCUMENT.pdf.filename}
              aria-label={`${DOCUMENT.pdf.label} — ${DOCUMENT.title}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "shrink-0 gap-1.5 border-brand bg-brand px-3 text-[12px] tracking-wide text-white hover:border-brand-light hover:bg-brand-deep hover:text-white focus-visible:ring-brand-light/60",
              )}
            >
              <Download />
              {DOCUMENT.pdf.label}
            </a>
          </header>

          <div className="relative flex min-h-0 flex-1">
            {rootW !== null ? (
              <ViewerSidebar
                entries={entries}
                units={units}
                current={unitIndex}
                onSelect={selectFromSidebar}
                open={sidebarOpen}
                onClose={() => setSidebarPref(false)}
                overlay={singlePage}
              />
            ) : null}

            <div
              ref={viewportRef}
              data-viewer-viewport
              tabIndex={0}
              aria-label="Vùng xem tài liệu"
              className="relative flex min-h-0 min-w-0 flex-1 overflow-auto outline-none viewer-scroll"
              style={{ touchAction: "pan-x pan-y" }}
            >
              {fit > 0 ? (
                <div className="m-auto shrink-0" style={{ padding: pad }}>
                  <AnimationProvider enabled>
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={unit.key}
                        custom={dir}
                        variants={slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{ width: size.width * scale, height: size.height * scale }}
                      >
                        <UnitView
                          entry={entry}
                          part={unit.part}
                          scale={scale}
                          className="shadow-[0_28px_70px_-18px_rgba(0,0,0,0.65)]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </AnimationProvider>
                </div>
              ) : null}
            </div>
          </div>

          <ViewerControls
            label={entry.label}
            folio={unit.folio}
            index={unitIndex}
            count={units.length}
            unitName={singlePage ? "Trang" : "Mục"}
            onGo={go}
            zoom={zoom}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            onZoom={applyZoom}
          />
        </div>
      </TooltipProvider>
    </MotionConfig>
  );
}
