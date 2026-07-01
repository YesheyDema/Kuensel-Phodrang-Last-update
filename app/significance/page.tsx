import SignificancePageClient from "./significance-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function SignificancePage() {
  return <SignificancePageClient />;
}
