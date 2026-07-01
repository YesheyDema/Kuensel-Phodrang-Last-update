"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const floors = [
  {
    name: "Ground Floor",
    title: "Primary Meditation Hall",
    features: [
      "9-foot-tall Shakyamuni Buddha seated on throne with Assistant Sariputra and Mangalyana",
      "Eighteen sitting Arahats (5 feet tall) with four directional kings",
      "12-inch-tall Buddha statues lining the walls",
      "34 major Mandalas and 33 minor Mandalas on the ceilings",
      "72 minor golden dragon pillars",
    ],
  },
  {
    name: "First Floor",
    title: "Vairochana Buddha",
    features: [
      "16-foot-tall four-faced sitting Vairochana Buddha at center",
      "Eight standing Bodhisattvas (16 feet each): Avalokiteshvara, Manjushri, Vajrapani, Maitreya, Ksitigarbha, Akashagarbha, Sarvanivaranavishkambim, and Samantabhadra",
      "12-inch-tall Buddha Dordenma Statues along walls",
      "28 major Mandalas on ceilings",
      "8 major and 22 minor golden dragon pillars",
    ],
  },
  {
    name: "Second Floor",
    title: "Medicine Buddhas",
    features: [
      "Eight sitting Medicine Buddhas (5 feet tall) encircling the central pillar",
      "Tshenleng Medicine, Serzang, Drimed Nangwatai, Nyangenmed, Choedrag Gyatso, Ngoenkhen Gyalpo, Drayang Gyalpo, and Shakyamuni Buddha",
      "12-inch-tall Buddha statues along walls",
      "34 major Mandalas on ceilings",
      "22 minor golden dragon pillars",
    ],
  },
  {
    name: "Third Floor",
    title: "Five Sacred Chambers",
    features: [
      "Five chambers completely surrounded by 8-inch-tall Buddha statues",
      "Chamber 1: Presentation of sutras with miniature Buddhas",
      "Chambers 2 & 4: Twelve depictions of Shakyamuni Buddha's enlightening deeds",
      "Chamber 3: Seven Reunion Buddhas and Wrathful Buddha Families including Guru Padmasambhava",
      "Chamber 5: Media room with 3D projector",
    ],
  },
  {
    name: "Fourth Floor",
    title: "Peaceful Buddha Families",
    features: [
      "Encircling paintings of 12 main life events of Buddha Shakyamuni",
      "Peaceful Buddha Families: Samanthabadra, Vairochana & Ingchuma, Vajrasattva & Nyema Karmo",
      "Ratnasambhava & Mamaki, Amitabha & Gyekarmo, Amogasiddhi & Tara",
      "Red Lokeshvara Family - Galwa Jamtsho",
      "Vajradhara & Ingchuma",
    ],
  },
];

const twelveDeeds = [
  "Descending from Tushita to the Human Realm",
  "Entering the mother's womb",
  "Taking birth",
  "Engaging in arts, crafts, and sciences",
  "Marrying Princess Yashodhara",
  "Renouncing royal life",
  "Enduring ascetic practices",
  "Vowing to achieve enlightenment",
  "Overcoming demonic forces",
  "Attaining enlightenment",
  "Teaching the Dharma",
  "Entering Parinirvana",
];

const ritualSchedule = [
  {
    title: "Morning Rituals",
    symbol: "☀",
    description:
      "Daily recitation of sutras and mantras, followed by smoke puja for purification and a quiet start to the day.",
  },
  {
    title: "Evening Ceremonies",
    symbol: "✦",
    description:
      "Sagho (land protection prayers) and Mahakala puja are performed to safeguard the land and dispel obstacles.",
  },
  {
    title: "Teachings & Empowerments",
    symbol: "▣",
    description:
      "Regular sessions on Buddhist philosophy, meditation, and long-life empowerment practices strengthen spiritual well-being.",
  },
  {
    title: "Lighting Offerings",
    symbol: "◌",
    description:
      "During auspicious days, devotees offer butter lamps as a gesture of wisdom, compassion, and merit.",
    note:"Butter lamp offering: Nu. 100.",
  },
];

const participationActions = [
  {
    id: "lamp",
    title: "Light a Butter Lamp",
    description:
      "Wisdom rises as a soft flame, dissolving darkness and settling the space.",
    label: "Light",
  },
  {
    id: "khadar",
    title: "Offer a Khadar",
    description:
      "A white scarf unfurls with a quiet sweep, honoring purity and respect.",
    label: "Offer",
  },
  {
    id: "prayer",
    title: "Send a Prayer",
    description:
      "A whispered blessing floats upward, then fades into the sky.",
    label: "Send",
  },
] as const;

type ParticipationMode = (typeof participationActions)[number]["id"];

type FloatingPrayer = {
  id: number;
  text: string;
  x: number;
};

export default function SignificancePage() {
  const [activeMode, setActiveMode] = useState<ParticipationMode>("lamp");
  const [floatingPrayers, setFloatingPrayers] = useState<FloatingPrayer[]>([]);
  const [sparkCount, setSparkCount] = useState(0);

  const handleParticipation = (mode: ParticipationMode) => {
    setActiveMode(mode);

    if (mode === "lamp") {
      setSparkCount((value) => value + 1);
      return;
    }

    if (mode === "khadar") {
      return;
    }

    const prayers = [
      "May peace settle here.",
      "May all beings be free from suffering.",
      "May compassion move through every home.",
    ];

    const prayerId = Date.now() + Math.random();
    const prayer = prayers[Math.floor(Math.random() * prayers.length)];

    setFloatingPrayers((current) => [
      ...current,
      {
        id: prayerId,
        text: prayer,
        x: Math.round(Math.random() * 36 - 18),
      },
    ]);
  };

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
              Spiritual Significance
            </p>
            <h1
              className="mt-4 font-serif text-5xl font-light leading-tight md:text-6xl lg:text-7xl"
            >
              The Sacred Structure
            </h1>
            <p
              className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              A living sanctuary housing 125,000 Buddha statues, fulfilling 
              ancient prophecies and embodying the deepest teachings of Buddhism.
            </p>
          </div>
        </div>
      </section>

       {/* The Sacred Mudra Section */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div
              className="relative aspect-square overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="/images/Big%20Buddha%20from%20Northside%20%20DOT%20AA%20Original%20Bhutan%20Travels.jpg"
                alt="Buddha Dordenma in Bhumisparsha Mudra"
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
              <p className="text-xs uppercase tracking-[0.4em] text-primary">
                The Sacred Gesture
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light md:text-4xl">
                Bhumisparsha Mudra
              </h2>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  The Great Buddha Dordenma is depicted in the Bhumisparsha
                  Mudra, meaning &quot;earth-touching gesture.&quot; The left palm faces
                  upward in meditation, while the right hand points downward
                  toward the earth.
                </p>
                <p>
                  This sacred gesture symbolizes the moment of Buddha Shakyamuni's 
                  enlightenment, when he summoned the earth goddess to witness 
                  his achievement after overcoming the demon Mara.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Events & Rituals Section */}
      <section className="relative overflow-hidden border-y border-border py-24 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-primary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-12 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary backdrop-blur">
              <span aria-hidden="true">✦</span>
              Sacred Schedule
            </span>
            <h2 className="mt-6 font-serif text-4xl font-light md:text-5xl lg:text-6xl">
              Events &amp; Rituals
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Experience the sacred traditions and spiritual practices that take place at Kuensel Phodrang throughout the year.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="border border-border bg-background p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-lg text-primary shadow-sm">
                    ◎
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary/90">
                      Annual Highlight
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-light md:text-3xl">
                      Global Peace Prayer
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      Conducted annually, this gathering unites communities in prayer for world harmony, shared merit, and collective compassion.
                    </p>
                  </div>
                </div>

                <div className="rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary">
                  Annual Gathering
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-muted/35 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-primary">Focus</p>
                  <p className="mt-3 text-sm text-muted-foreground">Peace, compassion, and shared merit</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/35 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-primary">Practice</p>
                  <p className="mt-3 text-sm text-muted-foreground">Prayers led with the monastic body</p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/35 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-primary">Season</p>
                  <p className="mt-3 text-sm text-muted-foreground">Held on auspicious annual dates</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {ritualSchedule.map((ritual) => (
                <article key={ritual.title} className="border border-border bg-background p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-sm text-primary shadow-sm">
                      {ritual.symbol}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-light leading-tight">
                        {ritual.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {ritual.description}
                      </p>
                      {ritual.note ? (
                        <div className="mt-4 inline-flex items-start gap-2 rounded-2xl border border-primary/15 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-primary">
                          <span className="mt-0.5 font-semibold">i</span>
                          <span>{ritual.note}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* The Prophecies Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Fulfillment of Prophecy
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Ancient Prophecies Fulfilled
            </h2>
          </div>

          <div
            className="grid gap-8 md:grid-cols-2"
          >
            <div
              className="border border-border bg-background p-8"
            >
              <h3 className="font-serif text-xl">Guru Rinpoche (8th Century)</h3>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Ancient terma texts prophesied: <em>&quot;A Shakyamuni statue would
                be built between Wong and Paro, to bestow blessings of peace and 
                harmony.&quot;</em> Rediscovered by Terton Pema Lingpa (1450-1521), 
                revealing the sacred destiny of this site.
              </p>
            </div>

            <div
              className="border border-border bg-background p-8"
            >
              <h3 className="font-serif text-xl">Yogi Sonam Zangpo (20th Century)</h3>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Prophesied a great statue would be built to impart blessings, 
                peace, and happiness to the entire world. Buddha Dordenma 
                fulfilled both ancient prophecies simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rituals & Spiritual Participation Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Sacred Participation
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Rituals & Spiritual Participation
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
            <div className="border border-border bg-background p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/90">
                Touch the offering
              </p>
              <h3 className="mt-3 font-serif text-3xl font-light">
                A quiet interaction with motion
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Tap an offering to light a lamp, present a khadar, or release a
                prayer into the air. The animations stay soft and restrained so
                the ritual still feels calm.
              </p>

              <div className="mt-8 grid gap-4">
                {participationActions.map((action) => {
                  const isActive = activeMode === action.id;

                  return (
                    <motion.button
                      key={action.id}
                      type="button"
                      onClick={() => handleParticipation(action.id)}
                      whileTap={{ scale: 0.985 }}
                      className={`group flex items-start gap-4 border px-4 py-4 text-left transition-colors ${
                        isActive
                          ? "border-primary/30 bg-primary/5"
                          : "border-border bg-background hover:border-primary/20 hover:bg-muted/30"
                      }`}
                    >
                      <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-sm text-primary">
                        {action.label === "Light" ? "◌" : action.label === "Offer" ? "▭" : "✦"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-lg font-light text-foreground">
                          {action.title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {action.description}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden border border-border bg-[#f7f1e7] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,173,58,0.12),transparent_42%),radial-gradient(circle_at_bottom,rgba(94,68,41,0.08),transparent_55%)]" />

              <div className="relative flex h-full min-h-105 flex-col items-center justify-between rounded-4xl border border-white/60 bg-white/45 px-5 py-8 backdrop-blur-sm sm:px-8">
                <div className="text-center">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-primary">
                    Interactive Offering
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {participationActions.find((action) => action.id === activeMode)?.description}
                  </p>
                </div>

                <div className="relative flex w-full flex-1 items-center justify-center py-6">
                  <AnimatePresence mode="wait">
                    {activeMode === "lamp" && (
                      <motion.div
                        key={`lamp-${sparkCount}`}
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative flex flex-col items-center"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.06, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(217,173,58,0.08)",
                              "0 0 0 28px rgba(217,173,58,0)",
                              "0 0 0 0 rgba(217,173,58,0)",
                            ],
                          }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                          className="flex h-32 w-32 items-center justify-center rounded-full border border-primary/15 bg-primary/5"
                        >
                          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#b5762b]/12">
                            <motion.div
                              animate={{ scale: [0.92, 1, 0.94], opacity: [0.75, 1, 0.82] }}
                              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                              className="h-9 w-9 rounded-[60%_60%_48%_48%/70%_70%_30%_30%] bg-linear-to-b from-[#ffd884] via-[#f6b93b] to-[#b96a14] shadow-[0_0_20px_rgba(246,185,59,0.35)]"
                            />
                          </div>
                        </motion.div>

                        <div className="mt-6 h-px w-24 bg-primary/20" />
                        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-primary/80">
                          Flame of wisdom
                        </p>
                      </motion.div>
                    )}

                    {activeMode === "khadar" && (
                      <motion.div
                        key="khadar"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative flex w-full items-center justify-center"
                      >
                        <motion.div
                          animate={{ x: [0, 5, 0], y: [0, -3, 0], rotate: [0, 1, 0] }}
                          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                          className="relative h-40 w-[84%] max-w-lg"
                        >
                          <div className="absolute inset-x-8 top-1/2 h-px bg-primary/10" />
                          <motion.div
                            initial={{ opacity: 0.55, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45 }}
                            className="absolute inset-x-6 top-6 bottom-2"
                          >
                            <Image
                              src="/images/khadhar.svg"
                              alt="White khadar scarf"
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.08)]"
                            />
                          </motion.div>
                        </motion.div>

                        {/* <p className="absolute bottom-6 text-xs uppercase tracking-[0.35em] text-primary/80">
                          A flowing khadar
                        </p> */}
                      </motion.div>
                    )}

                    {activeMode === "prayer" && (
                      <motion.div
                        key="prayer"
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative flex h-full w-full items-center justify-center"
                      >
                        <div className="absolute inset-x-10 bottom-10 h-px bg-primary/10" />
                        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden">
                          <AnimatePresence>
                            {floatingPrayers.map((prayer) => (
                              <motion.p
                                key={prayer.id}
                                initial={{ opacity: 0, y: 30, x: prayer.x, scale: 0.98 }}
                                animate={{ opacity: [0, 1, 1, 0], y: -150, x: prayer.x, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2.8, ease: "easeOut" }}
                                onAnimationComplete={() => {
                                  setFloatingPrayers((current) =>
                                    current.filter((item) => item.id !== prayer.id)
                                  );
                                }}
                                className="absolute left-1/2 bottom-12 max-w-60 -translate-x-1/2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-center text-sm text-foreground shadow-[0_10px_28px_rgba(0,0,0,0.08)] backdrop-blur"
                              >
                                {prayer.text}
                              </motion.p>
                            ))}
                          </AnimatePresence>
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                          <motion.div
                            animate={{ scale: [1, 1.03, 1], opacity: [0.72, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/15 bg-primary/5"
                          >
                            <span className="text-2xl text-primary">✦</span>
                          </motion.div>
                          <p className="text-xs uppercase tracking-[0.35em] text-primary/80">
                            Prayer released
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">
                  {/* <span className="rounded-full border border-border bg-white/70 px-3 py-1.5">
                    Minimal motion
                  </span> */}
                  {/* <span className="rounded-full border border-border bg-white/70 px-3 py-1.5">
                    Tap to offer
                  </span> */}
                  {/* <span className="rounded-full border border-border bg-white/70 px-3 py-1.5">
                    Quiet animation
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monastic Body & Spiritual Guardianship Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Spiritual Custodianship
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Monastic Body & Guardianship
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-border bg-background p-8">
              <h3 className="font-serif text-xl">The Zhung Dratshang</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The Monastic Body (Zhung Dratshang) plays a crucial role in 
                daily rituals, annual ceremonies, and the perpetual preservation 
                of this sacred site. They are the spiritual guardians ensuring 
                the Buddha's blessings flow continuously to all beings.
              </p>
            </div>

            <div className="border border-border bg-background p-8">
              <h3 className="font-serif text-xl">The Inner Sanctum</h3>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p>
                  Five stories of temple rooms include the Kunrig Lhakhang and 
                  Medicine Buddha Temple, housing:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>125,000 golden Buddha statues</li>
                  <li>Sacred relics of enlightened masters</li>
                  <li>Eight Great Bodhisattvas</li>
                  <li>Kangyur and Tengyur scriptures</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border border-border bg-background p-8">
            <h3 className="font-serif text-xl">Dedication of Merit</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              All rituals at Buddha Dordenma are dedicated to the enlightenment 
              of all sentient beings, the long life of the Royal Family, and 
              the flourishing of the dual system of Dharma and democratic governance 
              in Bhutan.
            </p>
          </div>
        </div>
      </section>

      {/* Interior Structure Section */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              The Five-Story Sanctuary
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Sacred Interior Levels
            </h2>
          </div>

          <div className="space-y-8">
            {floors.map((floor, index) => (
              <div
                key={floor.name}
                className="border border-border p-8"
              >
                <div className="flex items-start gap-6">
                  <span className="font-serif text-3xl font-light text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg">{floor.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {floor.features.slice(0, 3).map((feature) => (
                        <li
                          key={feature}
                          className="text-xs leading-relaxed text-muted-foreground"
                        >
                          - {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Twelve Deeds Section */}
      <section className="bg-muted py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              The Life of Buddha
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">
              Twelve Enlightening Deeds
            </h2>
          </div>

          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {twelveDeeds.map((deed, index) => (
              <div
                key={deed}
                className="border border-border bg-background p-6"
              >
                <p className="font-serif text-lg text-primary">{index + 1}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {deed}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}