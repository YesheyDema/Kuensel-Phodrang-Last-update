import type { Metadata } from "next";
import VisitPageClient from "./visit-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Plan Your Visit | Buddha Dordenma, Thimphu",
  description:
    "Everything you need to visit the Buddha Dordenma in Thimphu, Bhutan — opening hours, getting there, and what to expect at Kuenselphodrang Nature Park.",
};

export default function VisitPage() {
  return <VisitPageClient />;
}
