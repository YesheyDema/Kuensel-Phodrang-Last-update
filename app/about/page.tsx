import type { Metadata } from "next";
import AboutPageClient from "./about-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About the Buddha Dordenma | History, Construction & Legacy",
  description:
    "The complete story of the Buddha Dordenma: its ancient prophecy, royal and spiritual patronage, construction from 2006 to 2015, and the 125,000 statues enshrined within.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
