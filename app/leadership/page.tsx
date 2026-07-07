import type { Metadata } from "next";
import LeadershipPageClient from "./leadership-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Leadership & Patronage | Buddha Dordenma",
  description:
    "The royal and spiritual leadership behind the Buddha Dordenma — His Majesty The Fifth King and His Holiness the Je Khenpo, guardians of Bhutan's chhoe-sid-nyi tradition.",
};

export default function LeadershipPage() {
  return <LeadershipPageClient />;
}
