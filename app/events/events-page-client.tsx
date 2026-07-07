"use client";

import { Globe, Sun } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

const ceremonies = [
  {
    title: "Grand Annual Prayer Ceremony",
    duration: "7 Days",
    description:
      "Led by Je Khen Rinpoche and the Zhung Dratshang (Central Monastic Body), this grand ceremony invokes blessings for peace, prosperity, and the welfare of all sentient beings worldwide.",
  },
  {
    title: "Tshogkhor & Tshe-wang Offerings",
    duration: "10 Days",
    description:
      "Ten-day ceremonial offerings dedicated to long life, merit accumulation, and the flourishing of the Dharma. Visitors may join in these sacred observances throughout the year.",
  },
  {
    title: "Inauguration Anniversary",
    duration: "September 25th",
    description:
      "Commemorating the grand inauguration of Buddha Dordenma with 100,000 eight-inch and 25,000 twelve-inch gold-gilded Buddha statues. This celebration honors the vision realized and the blessings bestowed.",
  },
];

const foundations = [
  {
    title: "Flower Foundation",
    description:
      "Seasonal flower displays grace the temple grounds with natural beauty. Volunteer garden days invite visitors to participate in maintaining these sacred gardens. Special flower ceremonies honor the role of nature in spiritual practice.",
  },
  {
    title: "Plant Foundation",
    description:
      "Comprehensive tree planting and reforestation efforts protect the surrounding watershed and forest ecosystem. Environmental stewardship programs ensure the sacred site flourishes within its natural environment for generations to come.",
  },
];

const aspirations = [
  {
    number: "02",
    title: "Perpetual Flourishing of Dharma",
    icon: Sun,
    status: "Aspiration",
    description:
      "The statue is dedicated to ensuring that, even if the Dharma fades or becomes obscured in other parts of the world, it continues to flourish in Bhutan. It stands as a beacon of Dharma, radiating the light of the teachings across the world, and marks a highly auspicious offering linked to Bhutan's three historic milestones: the centenary of the monarchy, the coronation of the Fifth Druk Gyalpo, and the introduction of parliamentary democracy.",
  },
  {
    number: "03",
    title: "Vision for Global Harmony",
    icon: Globe,
    status: "Vision",
    description:
      "The overarching purpose is a call for close cooperation and harmony, where all beings act with sincere purity of heart rather than harming one another. It aspires to pacify the calamities of troubled times, including earthquakes, fires, floods, storms, epidemics, famine, and warfare, so that people may live in peace and security under the protection of the Buddha's blessings.",
  },
];

export default function EventsPageClient() {
  return (
    <main id="main-content" className="bg-background">
      <Header />

      <section className="border-b border-border/60 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Sacred Calendar</p>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight md:text-6xl lg:text-7xl">
            Events & Ceremonies
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A clean guide to the guiding aspirations, sacred observances, and foundation projects
            connected to Buddha Dordenma.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Guiding Purpose</p>
            <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">Aspirations</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {aspirations.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="border border-border bg-background p-7 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {item.status}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl font-light">{item.title}</h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {item.number}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/40 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Events & Ceremonies</p>
            <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">Sacred Observances</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {ceremonies.map((ceremony, index) => (
              <article
                key={ceremony.title}
                className={
                  index === 2
                    ? "border border-border bg-background p-7 shadow-sm md:col-span-2"
                    : "border border-border bg-background p-7 shadow-sm"
                }
              >
                <h3 className="font-serif text-xl">{ceremony.title}</h3>
                <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  {ceremony.duration}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {ceremony.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Environmental Stewardship</p>
            <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">Foundation Projects</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {foundations.map((foundation) => (
              <article key={foundation.title} className="border border-border bg-background p-7 shadow-sm">
                <h3 className="font-serif text-xl">{foundation.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {foundation.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 border border-primary/30 bg-primary/5 p-7">
            <p className="text-sm leading-relaxed text-muted-foreground">
              These foundation projects embody the principle that honoring the Buddha means honoring
              all of creation and protecting the natural world that sustains us.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
