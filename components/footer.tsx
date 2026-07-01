import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/significance", label: "Significance" },
  { href: "/visit", label: "Visit" },
  { href: "/donate", label: "Donate" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3
              className="font-serif text-2xl font-semibold"
              style={{ color: "#d9ad3a" }}
            >
              Buddha Dordenma
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-secondary-foreground/60">
              Kuenselphodrang, Thimphu
            </p>
            <p className="mt-6 text-sm leading-relaxed text-secondary-foreground/70">
              A sacred sanctuary of peace and enlightenment, fulfilling ancient
              prophecies to bestow blessings upon the world.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#d9ad3a" }}
            >
              Explore
            </h4>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#d9ad3a" }}
            >
              Contact
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-secondary-foreground/70">
              <li>Central Monastic Body of Bhutan</li>
              <li>Kuenselphodrang Nature Park</li>
              <li>Thimphu, Bhutan</li>
              <li className="pt-2">
                <a
                  href="mailto:payladrukpa@yahoo.com"
                  className="transition-colors hover:text-primary"
                >
                  payladrukpa@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Buddha-Dordenma/100079523533386/?rdid=ewSjoJtF3Jxm2ctP&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DNwHHXQyi%2F"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-secondary-foreground/10 pt-8">
          <p className="text-center text-xs text-secondary-foreground/50">
            Under the stewardship of the Central Monastic Body of Bhutan since
            June 26, 2019
          </p>
        </div>
      </div>
    </footer>
  );
}
