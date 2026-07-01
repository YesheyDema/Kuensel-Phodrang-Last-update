import AboutPageClient from "./about-page-client";

export const revalidate = 86400;
export const dynamic = "force-static";

export default function AboutPage() {
  return <AboutPageClient />;
}
