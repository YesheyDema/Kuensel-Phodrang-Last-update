"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Scroll, Eye, Crown, Hammer, Sparkles, Heart } from "lucide-react"

const timelineData = [
  {
    year: "Ancient Times",
    title: "A Prophecy Foretold",
    image: "",
    icon: Scroll,
    description:
      "The great masters Terton Dorje Lingpa and Drubwang Lama Sonam Zangpo foretold of a magnificent Buddha statue to be built at Wangpar Tsam (the boundary between Wang and Paro). This sacred image, they prophesied, would transcend mere stone and bronze—it would become a beacon of peace, averting conflict and ushering in an era of compassion and harmony for the Kingdom of Bhutan and the world beyond.",
    sponsors: "Spiritual Lineage & Ancient Wisdom",
    quote:
      '"If a statue of the Buddha is built at Wangpar Tsam, it will avert war and bring lasting peace to all beings." - Terton Dorje Lingpa',
  },
  {
    year: "~1990s",
    title: "The Vision Takes Root",
    image: "",
    icon: Eye,
    description:
      "His Eminence Thrizin Rinpoche Tshering Wangdi, the visionary Chairman of Menjong Choethuen Tshogpa, recognized the prophecy's time had come. He envisioned the creation of a monumental Buddha Dordenma—a statue so powerful that mere sight of it would liberate souls from suffering. More than a structure, it would embody the infinite compassion of the Buddha, becoming a sanctuary for devotion and spiritual transformation.",
    sponsors: "Thrizin Rinpoche, Early Patrons & Spiritual Leadership",
    quote:
      '"True compassion is the root of all dharma. This statue will be a living embodiment of that truth." - Thrizin Rinpoche',
  },
  {
    year: "2005",
    title: "Royal Blessing & The Groundbreaking",
    image: "",
    icon: Crown,
    description:
      "The sacred vision received divine sanction. His Holiness the 70th Je Khenpo Truelku Jigme Choeda and His Majesty the Fourth Druk Gyalpo bestowed their royal approval upon the project. On the 8th day of the 10th lunar month, as monks chanted in unison, the groundbreaking ceremony commenced—and in that auspicious moment, a rainbow encircled the sun, blessing the earth below.",
    sponsors: "Royal Patronage, Bhutanese Government & Spiritual Leadership",
    quote:
      '"This vision serves not just Bhutan, but all of humanity in its quest for peace." - Royal Vision',
  },
  {
    year: "2006–2014",
    title: "Forged in Bronze & Gold",
    image: "/images/2construction.jpg",
    icon: Hammer,
    description:
      "Master artisans Mr. Mi and Mr. Li in Nanjing, China undertook the monumental task of bringing the vision to life. Over years of meticulous craftsmanship, 900 tonnes of bronze and precious metals were transformed into the world's tallest sitting Buddha statue—169 feet of pure spiritual artistry. Crowning this magnificent form: 12 kilograms of pure gold, gleaming as a symbol of enlightenment itself.",
    sponsors: "Mr. Peter Teo (Principal Visionary), International Donors & Artisans",
    quote:
      '"Every hammer strike, every golden touch brings this dream closer to reality." - Master Artisans',
  },
  {
    year: "2015",
    title: "The Grand Awakening",
    image: "/images/4.jpg",
    icon: Sparkles,
    description:
      "On September 25, 2015, the Buddha Dordenma opened its eyes to the world. Within its sacred chambers lies a meditation hall containing 100,000 eight-inch Buddha statues and 25,000 twelve-inch golden-gilded Buddha statues—125,000 souls of bronze and gold, each a whisper of infinite compassion. The prophecy, at last, stood complete.",
    sponsors: "All International Donors & Global Community of Believers",
    quote:
      '"Today, the Buddha stands eternal—a testament to faith, vision, and collective human goodness." - Official Inauguration',
  },
  {
    year: "Present Day",
    title: "A Living Testament",
    image: "/images/present.png",
    icon: Heart,
    description:
      "Kuensel Phodrang has become a sanctuary where thousands gather in meditation, pilgrimage, and prayer. The 169 feet tall statue continues its silent mission—radiating peace, inspiring spiritual awakening, and creating an unbreakable connection between heaven and earth. Annual ceremonies celebrate the dharma, while the site remains a source of boundless merit for the nation and all sentient beings.",
    sponsors: "Monastic Community, Pilgrims & Global Devotees",
    quote: '"The Buddha stands eternal—a beacon of hope, peace, and enlightenment for generations to come."',
  },
]

interface ModalData {
  title: string
  image: string
  description: string
  sponsors: string
  quote: string
}

export function HistorySection() {
  const [modal, setModal] = useState<ModalData | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("visible")
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [modal])

  const handleTimelineClick = (item: (typeof timelineData)[0]) => {
    setModal({
      title: item.title,
      image: item.image,
      description: item.description,
      sponsors: item.sponsors,
      quote: item.quote,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="history"
      className="section-padding bg-background"
    >
      <div className="mx-auto max-w-5xl">
        <div className="reveal text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            A Sacred Journey
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            History & Prophecy
          </h2>
          <div className="ornament-divider mt-5">
            <span className="text-xs text-primary" aria-hidden="true">{"\u2638"}</span>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From ancient prophecy to modern reality, the Buddha Dordenma stands as a 169 feet tall monument to faith, vision, and the timeless pursuit of peace. Witness the extraordinary journey that brought an ancient prophecy to life.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-20">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 h-full w-px md:left-1/2 md:-translate-x-px">
            <div className="h-full w-full bg-linear-to-b from-primary/20 via-primary/50 to-primary/20" />
          </div>

          <div className="flex flex-col gap-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0
              const Icon = item.icon
              return (
                <div
                  key={item.year}
                  className="reveal relative"
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  {/* Timeline dot with icon */}
                  <button
                    onClick={() => handleTimelineClick(item)}
                    className="absolute left-6 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary/40 bg-card shadow-md transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group/dot md:left-1/2"
                    aria-label={`View details for ${item.title}`}
                  >
                    <Icon className="h-4 w-4 text-primary transition-colors group-hover/dot:text-primary-foreground" />
                  </button>

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                    }`}
                  >
                    <button
                      onClick={() => handleTimelineClick(item)}
                      className="group w-full text-left rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl sm:p-8"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-7 items-center rounded-full bg-primary/10 px-3 text-xs font-bold uppercase tracking-widest text-primary">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl text-balance">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                      {item.image && (
                        <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 45vw"
                          />
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-all group-hover:gap-2.5">
                        Read more
                        <span aria-hidden="true">{"\u2192"}</span>
                      </span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Terminal dot */}
          <div className="absolute -bottom-2 left-6 h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2" />
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="animate-fade-in-up max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 w-full bg-primary" />
            <div className="p-6 sm:p-8">
              <button
                onClick={() => setModal(null)}
                className="float-right flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <span className="text-xl leading-none">{"\u00d7"}</span>
              </button>
              <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
                {modal.title}
              </h3>
              {modal.image && (
                <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={modal.image}
                    alt={modal.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 540px"
                  />
                </div>
              )}
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {modal.description}
              </p>
              <div className="mt-5 rounded-xl bg-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Key Sponsors & Contributors
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {modal.sponsors}
                </p>
              </div>
              <blockquote className="mt-5 border-l-2 border-primary pl-4 text-base italic leading-relaxed text-muted-foreground">
                {modal.quote}
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
