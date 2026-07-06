import LeadershipPageClient from "./leadership-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function LeadershipPage() {
  return <LeadershipPageClient />;
}
