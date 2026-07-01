"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const facts = [
  { label: "Height", value: "169 feet", detail: "about 51.5 meters" },
  { label: "Construction", value: "2006-2015", detail: "9 years" },
  { label: "Cost", value: "$100M+", detail: "Total project" },
  { label: "Smaller Buddhas", value: "125,000", detail: "Inside the statue" },
];

const timeline = [
  {
    year: "Ancient",
    title: "Prophecy of Dorje Lingpa",
    image: "",
    description:
      "The construction of the Buddha Dordenma fulfills an ancient prophecy from Terton Dorje Lingpa and Drubwang Lama Sonam Zangpo, foretelling that a great image of the Buddha built at the boundary of Wang and Paro (Wangpar Tsam) would avert war, disease, and bring peace to the Kingdom of Bhutan.",
    sponsors: "Prophecy and Spiritual Guidance",
    quote:
      '"If a statue of the Buddha is built at Wangpar Tsam, it will temporarily avert war and, ultimately, bring peace to the world." - Terton Dorje Lingpa',
  },
  {
    year: "~1990",
    title: "Vision of Thrizin Rinpoche",
    image: "",
    description:
      "The initial seed for constructing the statue was planted by His Eminence Thrizin Rinpoche Tshering Wangdi, Chairman of the Menjong Choethuen Tshogpa. His vision was to create a marvelous image of the Victorious One, an image that liberates upon seeing, to benefit all sentient beings.",
    sponsors: "Thrizin Rinpoche and Early Patrons",
    quote:
      '"The root of Dharma is the Bodhicitta mind, and the practice of love and compassion must be cultivated." - Thrizin Rinpoche',
  },
  {
    year: "2005",
    title: "Royal Approval & Groundbreaking",
    image: "",
    description:
      "Following the command of His Holiness the 70th Je Khenpo, Truelku Jigme Choeda, and a royal decree from His Majesty the Fourth Druk Gyalpo, the project received final approval. The groundbreaking ceremony was held on the 8th day of the 10th lunar month, marked by a rainbow encircling the sun.",
    sponsors: "Royal Patronage, Spiritual Leadership, Bhutanese Government",
    quote:
      '"This vision is not just for Bhutan, but for the world." - Lam Tshering Wangdi',
  },
  {
    year: "2006",
    title: "Construction Begins in Nanjing",
    image: "/images/2construction.jpg",
    description:
      "After an extensive search, the casting was entrusted to master artisans Mr. Mi and Mr. Li in Nanjing, China. The statue was constructed from over 900 tonnes of bronze and precious metals, including 12kg of pure gold for the crown ornament.",
    sponsors: "Mr. Peter Teo (Principal Sponsor), International Donors",
    quote:
      '"The statue rises as a beacon of hope for all sentient beings." - Lam Tshering Wangdi',
  },
  {
    year: "2015",
    title: "Grand Inauguration",
    image: "/images/4.jpg",
    description:
      "The Buddha Dordenma was officially inaugurated on September 25, 2015. The meditation hall beneath the statue contains 100,000 eight-inch-tall and 25,000 twelve-inch-tall gold-gilded Buddha statues, fulfilling the vision of the benefactors.",
    sponsors: "All International Donors and Contributors",
    quote:
      '"Today, we celebrate the completion of this sacred vision." - His Majesty',
  },
  {
    year: "Present",
    title: "Living Heritage & Center of Peace",
    image: "/images/present.png",
    description:
      "Today, Kuensel Phodrang continues to be a center of devotion, meditation, and cultural celebration. Annual ceremonies are held, and the site serves as a powerful source of merit, ensuring the flourishing of the Dharma and the well-being of the nation.",
    sponsors: "Local Monastic Body, Bhutanese Community",
    quote: '"The Buddha continues to inspire peace and prosperity for all."',
  },
];

export default function AboutPage() {
  const founderSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = founderSectionRef.current;
    if (!section) return;

    const revealTargets = Array.from(section.querySelectorAll("[data-reveal]"));

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((element, index) => {
      const target = element as HTMLElement;
      target.classList.add("translate-y-6", "opacity-0");
      target.style.transitionDelay = `${index * 90}ms`;
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-background">
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
              The Complete Story
            </p>
            <h1
              className="mt-4 font-serif text-5xl font-light leading-tight md:text-6xl lg:text-7xl"
            >
              Buddha Dordenma
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              A monumental achievement fulfilling centuries-old prophecies, 
              housing 125,000 Buddha statues within its sacred bronze and gold structure.
            </p>
          </div>
        </div>
      </section>

      {/* Key Figures */}
      <section className="border-y border-border py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="font-serif text-4xl font-light text-primary">
                  {fact.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider font-medium">
                  {fact.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="relative h-[50vh] min-h-100 overflow-hidden">
        <Image
          src="/images/Thimphu%20190723%20by%20Amp%20Sripimanwat-85.jpg"
          alt="Buddha Dordenma statue"
          fill
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* The Monument Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              The Monument
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              A Monument of Peace and Prophecy
            </h2>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div
              className="relative aspect-video overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="/images/Thimphu%20190723%20by%20Amp%20Sripimanwat-83.jpg"
                alt="Buddha Dordenma monument detail"
                fill
                quality={60}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div
              className="order-1 lg:order-2"
            >
              <h3 className="font-serif text-2xl font-light">
                Historical Significance
              </h3>
              <div className="mt-6 space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  The Great Buddha Dordenma is sited amidst the ruins of Kuensel
                  Phodrang, the palace of Sherab Wangchuk, the thirteenth Druk
                  Desi, overlooking the southern approach to Thimphu, the
                  capital of Bhutan.
                </p>
                <p>
                  The statue was constructed by Aerosun Corporation of Nanjing,
                  China, under the main sponsorship of Rinchen Peter Teo, a
                  Singaporean businessman, and Danny Wong, a Hong Kong based
                  Malaysian businessman.
                </p>
              </div>

              <h3 className="mt-8 font-serif text-2xl font-light">
                Construction & Materials
              </h3>
              <div className="mt-6 space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  The wisdom eye of the Buddha is made from diamonds worth 1 million US Dollars, 
                  while the entire structure is made of bronze and gilded in gold, creating a 
                  beacon visible from across the entire Thimphu Valley.
                </p>
                <p>
                  Australian architects Buro and Structural Engineers Arup HK assisted with 
                  the project, ensuring modern engineering meets ancient spiritual wisdom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Interior Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              The Interior
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              A Sanctuary of 125,000 Blessings
            </h2>
          </div>

          <div
            className="grid gap-8 md:grid-cols-2"
          >
            <div
              className="border border-border bg-background p-8"
            >
              <h3 className="font-serif text-xl">Sacred Interior Configuration</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The statue houses over 125,000 smaller Buddha statues: 100,000 eight-inch-tall 
                and 25,000 twelve-inch-tall gilded bronze Buddhas. Each are made of bronze and 
                gilded in gold.
              </p>
            </div>

            <div
              className="border border-border bg-background p-8"
            >
              <h3 className="font-serif text-xl">The Bhumisparsha Mudra</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The Buddha is depicted in the Bhumisparsha Mudra, with the left palm facing 
                upward and the right hand pointed downward toward the earth, symbolizing his 
                summoning of the earth to witness his enlightenment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id="monastic" className="sr-only" aria-hidden="true" />

      {/* Timeline Section */}
      <section id="timeline" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Through the Ages
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              From Prophecy to Presence
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              The story of Buddha Dordenma spans centuries of vision, prophecy, and devotion. From ancient foretellings to the 169 feet tall monument that now overlooks Thimphu, each milestone shaped the sacred presence that stands today.
            </p>
          </div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="grid gap-6 md:grid-cols-[150px_1fr] md:gap-12"
              >
                <div className="text-primary">
                  <p className="font-serif text-xl font-light">{item.year}</p>
                </div>
                <div className="border-l border-border pl-6 md:pl-12">
                  <h3 className="font-serif text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Founder Section */}
      <section
        ref={founderSectionRef}
        id="founder"
        className="relative overflow-hidden bg-secondary py-24 text-[#fff7f0] md:py-32 scroll-mt-24"
      >
        <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 border-l-2 border-t-2 border-primary/35 sm:h-40 sm:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 border-b-2 border-r-2 border-primary/35 sm:h-40 sm:w-40" />

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <p
              data-reveal
              className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-primary transition-all duration-700"
            >
              Spiritual Visionary
            </p>
            <h2
              data-reveal
              className="mt-4 font-serif text-4xl font-bold text-white! transition-all duration-700 text-balance md:text-5xl"
            >
              The Founding Vision
            </h2>
            <div
              data-reveal
              className="mt-5 flex items-center justify-center gap-3 transition-all duration-700"
            >
              <span className="h-px w-8 bg-primary/30" aria-hidden="true" />
              <span className="text-xs text-primary" aria-hidden="true">
                {"\u2638"}
              </span>
              <span className="h-px w-8 bg-primary/30" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
            <div data-reveal className="transition-all duration-700">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#fff9f2] shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                <div className="p-4 sm:p-5">
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-neutral-200">
                    <Image
                      src="/images/thrizinrinpoche.jpeg"
                      alt="His Eminence Thrizin Rinpoche"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                  </div>

                  <div className="px-2 pb-2 pt-6 text-center text-[#2f1d14]">
                    <h3 className="font-serif text-2xl font-bold sm:text-[1.75rem]">
                      His Eminence Thrizin Rinpoche
                    </h3>
                    <p className="mt-2 text-sm font-medium text-[#7f5f4e]">
                      Chairman of Menjong Choethuen Tshogpa
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      <span className="rounded-full border border-[#eadfcf] bg-[#f4ebdc] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#8d6a2c]">
                        Born 1954
                      </span>
                      <span className="rounded-full border border-[#eadfcf] bg-[#f4ebdc] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#8d6a2c]">
                        Saga Dawa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal className="transition-all duration-700">
              <blockquote className="relative rounded-2xl border border-[#d6c2bc] bg-[#eadfdf] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.14)] sm:p-8">
                <span
                  className="absolute -top-3 left-5 font-serif text-6xl leading-none text-[#d7b47b]/60"
                  aria-hidden="true"
                >
                  {"\u201C"}
                </span>
                <p className="relative max-w-3xl text-base italic leading-relaxed text-[#322522] sm:text-lg">
                  The sole purpose of building this statue is to pacify inauspicious
                  causes such as war and disease in all countries of the world and to
                  foster conditions of harmony and peace.
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#d8c1a0]" />
                  <cite className="text-xs font-semibold uppercase tracking-wider text-[#b78a2f] not-italic">
                    Thrizin Rinpoche
                  </cite>
                </footer>
              </blockquote>

              <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-[#fff7f0] sm:text-[1.02rem]">
                The vision for the Buddha Dordenma statue was first conceived by His
                Eminence Thrizin Rinpoche Tshering Wangdi, Chairman of the Menjong
                Choethuen Tshogpa. Entrusted by His Holiness the 70th Je Khenpo,
                Truelku Jigme Choeda, Rinpoche undertook this monumental project to
                fulfill sacred prophecies and ensure the spiritual and temporal
                well-being of the Kingdom of Bhutan.
              </p>

              <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-[#fff7f0] sm:text-[1.02rem]">
                Born in the Wood Male Horse Year in 1954 on Saga Dawa, Thrizin
                Rinpoche&apos;s life has been dedicated to the Dharma. He was formally
                included among the celibate monks by the 65th Je Khenpo Yeshey
                Singye and served the monastic community for seventeen years.
                Following a three-year, three-month retreat, he was appointed as
                Chairman of the Menjong Choethuen Tshogpa, leading numerous
                philanthropic and religious projects, including the construction of
                the Buddha Dordenma.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Nature Park Section */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#faf6ef]/80" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div
              className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/50 shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
            >
              <Image
                src="/images/Thimphu%20190723%20by%20Amp%20Sripimanwat-54.jpg"
                alt="Kuenselphodrang Nature Park"
                fill
                quality={60}
                loading="lazy"
                className="object-cover"
              />
            </div>

            <div
              className="relative"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                The Grounds
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light md:text-4xl">
                Kuenselphodrang Nature Park
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Under the eyes of the Buddha statue, the Kuenselphodrang
                  Nature Park formally opened in 2011, dedicated to the Royal
                  Wedding of His Majesty the Fifth King Jigme Khesar Namgyel
                  Wangchuck and Her Majesty the Queen Jetsun Pema Wangchuck.
                </p>
                <p>
                  The park conserves 943.4 acres of forest area that surrounds
                  the Buddha Dordenma statue and houses two public outdoor
                  gymnasiums which opened in 2015.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
