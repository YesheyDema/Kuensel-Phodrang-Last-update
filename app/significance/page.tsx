import type { Metadata } from "next";
import SignificancePageClient from "./significance-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Significance & Rituals | Buddha Dordenma",
  description:
    "Discover the spiritual significance of the Buddha Dordenma, from the annual Global Peace Prayer to the rituals and offerings visitors can take part in today.",
};

export default function SignificancePage() {
  return <SignificancePageClient />;
}
