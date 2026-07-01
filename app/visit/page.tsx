import VisitPageClient from "./visit-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function VisitPage() {
  return <VisitPageClient />;
}
