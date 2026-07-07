"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

const visitInfo = [
  {
    title: "Opening Hours",
    details: ["Daily: 9:00 AM - 5:00 PM", "Meditation Hall: 9:00 AM - 4:30 PM"],
  },
  {
    title: "Location",
    details: [
      "Kuenselphodrang Nature Park",
      "7-8 km from Thimphu City Center",
      "Coordinates: 27.4435N, 89.6454E",
    ],
  },
  {
    title: "Best Time to Visit",
    details: [
      "Morning: Fresh air, clear views",
      "Daytime: Best for photography",
      "Evening: Beautiful lighting on statue",
      "Avoid rainy days",
    ],
  },
];

const guidelines = [
  {
    title: "Dress Modestly",
    description:
      "Cover shoulders and knees. Remove hats and shoes before entering the meditation hall.",
  },
  {
    title: "Photography",
    description:
      "Photography is allowed outside. Strictly prohibited inside the five-story meditation halls.",
  },
  {
    title: "Maintain Reverence",
    description:
      "Speak softly, walk clockwise around sacred objects, and show respect during prayers.",
  },
];

const routes = [
  {
    title: "By Vehicle",
    description:
      "Drive directly from Thimphu City (7-8 km). Parking available at the site. The most convenient option for most visitors.",
  },
  {
    title: "Buddha Point to Changangkha Trail",
    description:
      "5 km scenic trail. Approximately 45 minutes by bike or 2 hours hiking. Start from Changangkha Lhakhang for stunning views.",
  },
  {
    title: "Depsi Area Trail",
    description:
      "3.5 km trail beginning just below Buddha Dordenma, leading to Depsi through a nearby nunnery area. Beautiful natural scenery.",
  },
];

const buddhaLocation = {
  latitude: 27.4435,
  longitude: 89.6454,
  label: "Buddha Dordenma, Kuenselphodrang Nature Park",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=27.4435,89.6454&travelmode=driving",
  embedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=89.6384%2C27.4375%2C89.6524%2C27.4495&layer=mapnik&marker=27.4435%2C89.6454",
};

export default function VisitPage() {
  return (
    <main id="main-content" className="bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="max-w-3xl"
          >
            <p
              className="text-xs uppercase tracking-[0.4em] text-primary"
            >
              Plan Your Visit
            </p>
            <h1
              className="mt-4 font-serif text-5xl font-light leading-tight md:text-6xl lg:text-7xl"
            >
              Visiting Buddha Dordenma
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              A comprehensive guide to planning your sacred pilgrimage to one of 
              the world's largest Buddha statues.
            </p>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="relative h-[50vh] min-h-100 overflow-hidden">
        <Image
          src="/images/Thimphu%20190723%20by%20Amp%20Sripimanwat-54.jpg"
          alt="View of Thimphu Valley from Buddha Dordenma"
          fill
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Essential Information Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Before You Arrive
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Essential Information
            </h2>
          </div>

          <div
            className="grid gap-8 md:grid-cols-3"
          >
            {visitInfo.map((info) => (
              <div
                key={info.title}
                className="border border-border bg-background p-8"
              >
                <h3 className="font-serif text-lg">{info.title}</h3>
                <ul className="mt-4 space-y-2">
                  {info.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-xs leading-relaxed text-muted-foreground"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Details Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Sacred Geography
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Location Details
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-8">
            <div className="border border-border bg-background p-8">
              <h3 className="font-serif text-lg">Elevation</h3>
              <p className="mt-4 font-serif text-2xl text-primary">2,500m</p>
              <p className="mt-2 text-xs text-muted-foreground">above sea level</p>
            </div>

            <div className="border border-border bg-background p-8">
              <h3 className="font-serif text-lg">Coordinates</h3>
              <p className="mt-4 font-mono text-lg text-primary">
                27.46° N<br/>89.64° E
              </p>
            </div>

            <div className="border border-border bg-background p-8">
              <h3 className="font-serif text-lg">Sacred Land</h3>
              <p className="mt-4 font-serif text-2xl text-primary">140 acres</p>
              <p className="mt-2 text-xs text-muted-foreground">allotted to monastic community</p>
            </div>
          </div>

          <div className="border border-border bg-background p-8">
            <h3 className="font-serif text-xl mb-4">The Sacred Site</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nestled high above Thimphu at the boundary of Wang and Paro, Buddha 
              Dordenma overlooks the Thimphu Valley, precisely as foretold in 
              sacred prophecies. This elevation provides a natural sanctuary where 
              the statue stands as a beacon of peace and enlightenment to all who 
              visit.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
            <div className="overflow-hidden border border-border bg-background shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-primary">
                    Exact Location
                  </p>
                  <h3 className="mt-1 font-serif text-xl">Map of Buddha Dordenma</h3>
                </div>
                <div className="hidden text-right text-xs text-muted-foreground sm:block">
                  <p>{buddhaLocation.latitude.toFixed(4)}N, {buddhaLocation.longitude.toFixed(4)}E</p>
                  <p>Kuenselphodrang Nature Park</p>
                </div>
              </div>

              <div className="relative aspect-[16/10] bg-muted">
                <iframe
                  title="Exact location of Buddha Dordenma on OpenStreetMap"
                  src={buddhaLocation.embedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <aside className="border border-border bg-background p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">Navigate Here</p>
              <h3 className="mt-3 font-serif text-2xl font-light">Find the statue with precision</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The map is centered on the Buddha Dordenma monument in Kuenselphodrang Nature Park,
                giving visitors a clear visual reference before they arrive.
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-muted/60 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-primary">Coordinates</p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {buddhaLocation.latitude.toFixed(4)}° N, {buddhaLocation.longitude.toFixed(4)}° E
                </p>
              </div>

              <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>Best approached by vehicle from Thimphu City.</p>
                <p>Use the map to orient yourself before the final uphill drive.</p>
              </div>

              <Link
                href={buddhaLocation.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full border border-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Open directions
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Getting There Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Getting There
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Travel Options
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {routes.map((route) => (
              <div
                key={route.title}
                className="rounded-2xl border border-border bg-background p-8 shadow-sm transition-transform duration-150 hover:shadow-md hover:-translate-y-1"
              >
                <h3 className="font-serif text-lg">{route.title}</h3>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {route.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Seasonal Note:</strong> Avoid biking or
              hiking during summer (June-September) due to muddy trails caused by rainfall.
              Spring and autumn offer the best conditions for outdoor activities.
            </p>
          </div>
        </div>
      </section>

      {/* Visitor Guidelines Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Sacred Guidelines
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Respectful Visitation
            </h2>
          </div>

          <div
            className="grid gap-8 md:grid-cols-3"
          >
            {guidelines.map((guideline, index) => (
              <div
                key={guideline.title}
                className="border border-border bg-background p-8"
              >
                <h3 className="font-serif text-lg">{guideline.title}</h3>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {guideline.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nature Park Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div
            >
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                Explore the Grounds
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light md:text-4xl">
                Kuenselphodrang Nature Park
              </h2>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The surrounding 943.4 acres of protected forest offers
                  visitors a serene natural environment to complement their
                  spiritual journey. The park was formally opened in 2011,
                  dedicated to the Royal Wedding of Their Majesties.
                </p>
                <p>
                  Facilities include outdoor gymnasiums, walking trails with 
                  panoramic views of Thimphu City, and peaceful areas for meditation 
                  and reflection.
                </p>
              </div>
            </div>

            <div
              className="relative aspect-4/3 overflow-hidden"
            >
              <Image
                src="/images/Thimphu%20190723%20by%20Amp%20Sripimanwat-92.jpg"
                alt="Prayer flags at Buddha Dordenma"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Local Tip
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light md:text-4xl">
              Locals Call It &quot;Buddha Point&quot;
            </h2>
            <p className="mt-6 text-muted-foreground">
              If you&apos;re asking for directions in Bhutan, refer to the site as
              &quot;Buddha Point&quot; rather than &quot;Buddha Dordenma&quot; - more than 90% of
              locals know it by this name and will be happy to guide you there.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div
          >
            <h2 className="font-serif text-3xl font-light md:text-4xl">
              Support the Sacred Sanctuary
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              Your contribution helps maintain this sacred site and supports the
              monastic community that preserves its spiritual traditions.
            </p>
            <Link
              href="/donate"
              className="mt-8 inline-block bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
