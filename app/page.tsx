"use client";

import { motion, cubicBezier } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function Home() {
  return (
    <main id="main-content" className="bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen min-h-175 overflow-hidden">
        <Image
          src="/images/Buddha-Dordenma-Statue-by-Alicia-Warner-5.jpg"
          alt="Buddha Dordenma statue overlooking Thimphu Valley"
          fill
          priority
          quality={70}
          sizes="100vw"
    className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#3b2017]/65 via-[#6f3327]/35 to-[#2a150f]/75" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.4em] text-white/80"
            >
              Kuenselphodrang, Thimphu
            </motion.p>

            {/* <motion.h1
              variants={fadeUp}
              className="mt-6 font-serif text-5xl font-light leading-tight md:text-7xl lg:text-8xl"
            >
              Buddha Dordenma
            </motion.h1> */}

            {/* <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-lg text-white/80 md:text-xl"
            >
              One of the largest Buddha statues in the world, fulfilling ancient
              prophecies of peace and enlightenment
            </motion.p> */}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                href="/about"
                className="bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                Discover the Story
              </Link>
              <Link
                href="/donate"
                className="flex items-center gap-2 border border-[#f6d79a]/55 bg-[#f6d79a]/5 px-8 py-4 text-sm font-medium tracking-wide text-[#fff1d2] transition-all hover:bg-[#f6d79a]/15"
              >
                Support the Sanctuary
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Introduction Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div
              variants={fadeUp}
              className="relative aspect-4/5 w-full max-w-115 overflow-hidden rounded-2xl bg-muted lg:justify-self-center"
            >
              <Image
                src="/images/hero-image.png"
                alt="Buddha Dordenma statue"
                fill
                quality={60}
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-center text-center lg:text-left"
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                A Sacred Monument
              </p>
              <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Welcome to
                <span className="block font-bold text-primary">Buddha Dordenma</span>
              </h2>

              <div className="mt-8 flex justify-center lg:justify-start">
                <div className="h-px w-14 bg-primary/35" />
              </div>

              <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
                The Buddha Dordenma statue stands as a monumental symbol of
                compassion and spiritual awakening in the heart of Bhutan.
                Conceived to preserve the Buddha&apos;s teachings and bring peace
                to the kingdom, this sacred monument reflects devotion,
                heritage, and a shared aspiration for harmony.
              </p>

              <div className="mt-10 flex justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  Discover the history
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Significance Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Sacred Dimensions
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              The Magnificence of Buddha Dordenma
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                title: "169 Feet Tall",
                description:
                  "One of the largest sitting Buddha statues in the world, visible from across the Thimphu Valley",
              },
              {
                title: "125,000 Buddhas",
                description:
                  "The sacred interior houses 100,000 eight-inch and 25,000 twelve-inch gilded bronze Buddhas",
              },
              {
                title: "Ancient Prophecy",
                description:
                  "Fulfills prophecies from Guru Rinpoche dating back to the 8th century",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group border border-border bg-card p-8 transition-all hover:shadow-lg"
              >
                <div className="h-1 w-10 bg-primary/60" />
                <h3 className="mt-5 font-serif text-2xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Spiritual Journeys
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Sacred Experiences Within
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <Image
              src="/images/Thimphu 190723 by Amp Sripimanwat-85.jpg"
              alt="Interior meditation hall with golden Buddha statues"
              width={1200}
              height={400}
              quality={60}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 1200px"
              className="w-full h-auto object-cover rounded-sm"
            />
            <motion.div
              variants={fadeUp}
              className="mt-12 grid gap-8 lg:grid-cols-2"
            >
              <div>
                <h3 className="font-serif text-2xl font-light">
                  A Living Sanctuary of 125,000 Blessings
                </h3>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Within the throne of the Great Buddha lies a five-story
                  meditation hall featuring intricate mandalas, peaceful and
                  wrathful Buddha families, and the Twelve Deeds of Shakyamuni
                  Buddha.
                </p>
                <Link
                  href="/significance"
                  className="mt-8 inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all gap-1"
                >
                  Explore the significance
                  <span>→</span>
                </Link>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light">
                  The Sacred Interior
                </h3>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  The interior is arranged in a sacred configuration, with each
                  level representing different aspects of Buddhist teachings. 
                  Visitors may experience moments of deep contemplation and 
                  spiritual connection within this hallowed space.
                </p>
                <Link
                  href="/visit"
                  className="mt-8 inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all gap-1"
                >
                  Plan your visit
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visitor Information Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Plan Your Journey
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Visit Buddha Dordenma
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              Whether seeking spiritual solace, cultural enrichment, or simply a
              moment of peace, Buddha Dordenma welcomes all who wish to
              experience its sacred presence.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                title: "Hours & Admission",
                description:
                  "Open daily from 9 AM to 5 PM. Admission is modest and helps maintain this sacred site for future generations.",
              },
              {
                title: "Getting There",
                description:
                  "Located 14 km north of Thimphu city center, Buddha Dordenma is easily accessible by car or guided tours.",
              },
              {
                title: "What to Know",
                description:
                  "Dress respectfully, remove shoes before entering the meditation hall, and maintain mindful silence within the sanctuary.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="border border-border bg-background p-8 transition-all hover:shadow-lg"
              >
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/visit"
              className="bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/donate"
              className="border border-border px-8 py-4 text-sm font-medium tracking-wide text-foreground transition-all hover:bg-muted"
            >
              Support the Sanctuary
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="border-t border-border bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Additional Resources
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Learn & Support
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div
              variants={fadeUp}
              className="group relative bg-background p-8 border border-border transition-all hover:shadow-lg"
            >
              <h3 className="font-serif text-xl">Complete Story</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Dive deep into the historical, spiritual, and cultural significance 
                of Buddha Dordenma and its role in Bhutanese heritage.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all gap-1"
              >
                Read More
                <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="group relative bg-background p-8 border border-border transition-all hover:shadow-lg"
            >
              <h3 className="font-serif text-xl">Spiritual Significance</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Understand the religious teachings, prophecies, and spiritual practices
                connected to Buddha Dordenma.
              </p>
              <Link
                href="/significance"
                className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all gap-1"
              >
                Explore
                <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="group relative bg-background p-8 border border-border transition-all hover:shadow-lg"
            >
              <h3 className="font-serif text-xl">Make a Difference</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Your contribution helps preserve this sacred monument and support
                the community that maintains it.
              </p>
              <Link
                href="/donate"
                className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all gap-1"
              >
                Donate
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
