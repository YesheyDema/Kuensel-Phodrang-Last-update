/** @format */

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionNav } from "@/components/section-nav";
import { BackToTop } from "@/components/back-to-top";

const sectionLinks = [
  { href: "#his-majesty", label: "His Majesty The King" },
  { href: "#je-khenpo", label: "The Je Khenpo" },
];

export default function LeadershipPageClient() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealTargets = Array.from(page.querySelectorAll("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.remove("translate-y-6", "opacity-0");
          element.classList.add("translate-y-0", "opacity-100");
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealTargets.forEach((element, index) => {
      const target = element as HTMLElement;
      target.classList.add("translate-y-6", "opacity-0");
      target.style.transitionDelay = `${(index % 4) * 90}ms`;
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content" ref={pageRef} className="bg-background">
      <ScrollProgress />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-[0.06] sm:h-96 sm:w-96"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full animate-[spin_70s_linear_infinite] text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="50" cy="50" r="46" />
            <circle cx="50" cy="50" r="34" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * Math.PI) / 4;
              const x2 = 50 + 46 * Math.cos(angle);
              const y2 = 50 + 46 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={x2}
                  y2={y2}
                />
              );
            })}
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div data-reveal className="max-w-3xl transition-all duration-700">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Leadership &amp; Patronage
            </p>
            <h1 className="mt-4 font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
              Guided by Throne and Dharma
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Bhutan has long been sustained by chhoe-sid-nyi, the dual system
              of spiritual and temporal governance. The Buddha Dordenma stands
              today as living proof of this union &mdash; raised under royal
              command and consecrated under religious authority. This page
              honours the two pillars of leadership behind Kuenselphodrang.
            </p>
          </div>
        </div>
      </section>

      <SectionNav links={sectionLinks} />

      {/* His Majesty the King Section — ranked first */}
      <section
        id="his-majesty"
        className="relative overflow-hidden bg-secondary py-20 text-[#fff7f0] md:py-28 scroll-mt-36"
      >
        <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 border-l-2 border-t-2 border-primary/35 sm:h-40 sm:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 border-b-2 border-r-2 border-primary/35 sm:h-40 sm:w-40" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div data-reveal className="mb-14 text-center transition-all duration-700">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-primary">
              Royal Patronage
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-white! text-balance md:text-5xl">
              His Majesty The Fifth King
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/30" aria-hidden="true" />
              <span className="text-xs text-primary" aria-hidden="true">
                {"\u2638"}
              </span>
              <span className="h-px w-8 bg-primary/30" aria-hidden="true" />
            </div>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
            <div data-reveal className="transition-all duration-700">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#fff9f2] shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                <div className="p-4 sm:p-5">
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-neutral-200">
                    <Image
                      src="/images/king-jigme-khesar.png"
                      alt="His Majesty King Jigme Khesar Namgyel Wangchuck, the Fifth Druk Gyalpo of Bhutan"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                  </div>

                  <div className="px-2 pb-2 pt-6 text-center text-[#2f1d14]">
                    <h3 className="font-serif text-xl font-bold sm:text-[1.4rem]">
                      Jigme Khesar Namgyel Wangchuck
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[#7f5f4e]">
                      The Fifth Druk Gyalpo
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-[#eadfcf] bg-[#f4ebdc] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#8d6a2c]">
                        Reigning since 2006
                      </span>
                      <span className="rounded-full border border-[#eadfcf] bg-[#f4ebdc] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#8d6a2c]">
                        Crowned 2008
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal className="transition-all duration-700">
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-[#fff7f0] sm:text-[1.02rem]">
                <p>
                  His Majesty King Jigme Khesar Namgyel Wangchuck, the Fifth
                  Druk Gyalpo of Bhutan, carries forward the royal patronage
                  that first blessed the Buddha Dordenma at its groundbreaking
                  under His Majesty the Fourth Druk Gyalpo in 2005. His
                  leadership continues to embody the vision of peace and
                  spiritual prosperity that the monument represents.
                </p>
                <p>
                  Reigning since December 2006 and formally crowned in
                  November 2008, His Majesty is warmly regarded by the
                  Bhutanese people as the &quot;People&apos;s King.&quot; His
                  reign has been marked by compassion, humility, and a deep
                  commitment to the welfare of the nation, strengthening the
                  bond between the Golden Throne and the people.
                </p>
                <p>
                  The devotion of the Royal Family to Kuenselphodrang is woven
                  into the site itself. The surrounding Kuenselphodrang Nature
                  Park was formally opened in 2011 in celebration of the Royal
                  Wedding of His Majesty the Fifth King and Her Majesty The
                  Gyaltsuen Jetsun Pema Wangchuck &mdash; forever linking the
                  sanctuary to the joy and blessings of the Golden Throne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chhoe-sid-nyi connecting note */}
      <section className="border-y border-border bg-muted/40 py-14">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p
            data-reveal
            className="text-sm italic leading-relaxed text-muted-foreground transition-all duration-700 sm:text-base"
          >
            In the Bhutanese tradition of chhoe-sid-nyi, the throne and the
            monastic body govern in tandem &mdash; one upholding the temporal
            welfare of the nation, the other its spiritual wellbeing. Together,
            they have carried the Buddha Dordenma from prophecy to permanence.
          </p>
        </div>
      </section>

      {/* His Holiness the Je Khenpo Section */}
      <section id="je-khenpo" className="py-20 md:py-28 scroll-mt-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
            <div data-reveal className="transition-all duration-700">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_45px_rgba(47,29,20,0.08)]">
                <div className="p-4 sm:p-5">
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src="/images/je-khenpo.png"
                      alt="His Holiness the 70th Je Khenpo, Chabje Trulku Jigme Chhoeda"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                  </div>

                  <div className="px-2 pb-2 pt-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      His Holiness the Je Khenpo
                    </h3>
                    <p className="mt-2 text-sm font-medium text-primary">
                      Chabje Trulku Jigme Chhoeda
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground">
                        70th Je Khenpo
                      </span>
                      <span className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground">
                        Enthroned 1996
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal className="transition-all duration-700">
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                Spiritual Guardian
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light md:text-4xl">
                His Holiness the Je Khenpo
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  Respectfully addressed in Bhutan as Chapjey, the Je Khenpo is
                  the Chief Abbot of the Central Monastic Body and the senior
                  religious hierarch of the Kingdom. His role embodies the
                  spiritual heart of Bhutan, guiding the nation&apos;s
                  monastic community and safeguarding its Dharma traditions.
                </p>
                <p>
                  Alongside His Majesty the King, the Je Khenpo is the only
                  figure in Bhutan entitled to wear the saffron-coloured
                  kabney, a mark of his position as the nation&apos;s foremost
                  spiritual authority.
                </p>
                <p>
                  The Buddha Dordenma stands today with the sanction of His
                  Holiness the 70th Je Khenpo, Chabje Trulku Jigme Chhoeda,
                  whose blessing, together with royal approval, allowed the
                  ancient prophecy of Wangpar Tsam to move from vision to
                  groundbreaking in 2005.
                </p>
                <p>
                  Through his continued guidance, Kuenselphodrang remains
                  first and foremost a living centre of Dharma and devotion
                  &mdash; a sanctuary where spiritual practice thrives under
                  the highest religious authority of Bhutan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue the Journey CTA */}
      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p
            data-reveal
            className="text-xs uppercase tracking-[0.4em] text-primary transition-all duration-700"
          >
            Continue the Journey
          </p>
          <h2
            data-reveal
            className="mt-4 font-serif text-3xl font-light transition-all duration-700 md:text-4xl"
          >
            Explore the Monument or Make an Offering
          </h2>
          <p
            data-reveal
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground transition-all duration-700 sm:text-base"
          >
            Discover the full story of the Buddha Dordenma, or dedicate a
            small act of devotion &mdash; a lamp, a khadar, a prayer &mdash;
            in honour of their long life and continued guidance.
          </p>
          <div
            data-reveal
            className="mt-8 flex flex-col items-center justify-center gap-4 transition-all duration-700 sm:flex-row"
          >
            <Link
              href="/about"
              className="border border-border bg-background px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-all hover:bg-card"
            >
              The Monument&apos;s Story
            </Link>
            <Link
              href="/significance#rituals"
              className="bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Offer a Prayer of Long Life
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
