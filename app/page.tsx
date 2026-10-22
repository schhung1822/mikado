import { CatalogueViewer } from "@/components/catalogue/catalogue-viewer";
import { entries } from "@/components/catalogue/entries";

export default function Home() {
  return <CatalogueViewer entries={entries} />;
}
