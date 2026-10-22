"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Animation chỉ chạy khi có <AnimationProvider enabled> bao ngoài (trình xem tương tác).
 * Mặc định (bản in, /print, SSR không có provider) nội dung hiển thị tĩnh, đầy đủ ngay lập tức.
 */
const AnimationContext = createContext(false);

export function AnimationProvider({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  return <AnimationContext.Provider value={enabled}>{children}</AnimationContext.Provider>;
}

interface RevealProps {
  children: ReactNode;
  /** Độ trễ (giây) — dùng để xếp lớp xuất hiện nhẹ nhàng. */
  delay?: number;
  /** Độ dịch chuyển dọc ban đầu (px thiết kế). */
  y?: number;
  className?: string;
  style?: CSSProperties;
}

/** Nội dung hiện dần khi trang đôi vào khung nhìn. Thân thiện với prefers-reduced-motion qua MotionConfig. */
export function Reveal({ children, delay = 0, y = 8, className, style }: RevealProps) {
  const animated = useContext(AnimationContext);
  if (!animated) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
