import EventsPageClient from "@/app/events/events-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function EventsPage() {
  return <EventsPageClient />;
}
