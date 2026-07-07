import type { Metadata } from "next";
import EventsPageClient from "@/app/events/events-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Events & Ceremonies | Buddha Dordenma",
  description:
    "Upcoming ceremonies, annual gatherings, and events held at the Buddha Dordenma and Kuenselphodrang Nature Park in Thimphu, Bhutan.",
};

export default function EventsPage() {
  return <EventsPageClient />;
}
