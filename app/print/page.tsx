import type { Metadata } from "next";
import { entries } from "@/components/catalogue/entries";
import { StaticCatalogue } from "@/components/catalogue/static-catalogue";

export const metadata: Metadata = {
  title: "Hồ sơ năng lực — Bản in",
  robots: { index: false },
};

/** Bản tĩnh của toàn bộ catalogue, dùng cho in / xuất PDF. */
export default function PrintPage() {
  return <StaticCatalogue entries={entries} />;
}
