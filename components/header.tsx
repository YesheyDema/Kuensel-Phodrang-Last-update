/** @format */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/significance", label: "Significance" },
  { href: "/visit", label: "Visit" },
  { href: "/events", label: "Events" },
  { href: "/donate", label: "Donate" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? "bg-secondary/95 backdrop-blur-md border-b border-accent/30 shadow-[0_8px_24px_rgba(56,19,13,0.35)]"
            : "bg-secondary/82 backdrop-blur-sm border-b border-accent/20"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Buddha Dordenma logo"
                className="h-12 w-auto object-contain"
              />
              <div className="hidden flex-col transition-transform duration-200 group-hover:scale-[1.02] md:flex">
                <span className="font-serif text-xl font-semibold tracking-wide text-secondary-foreground transition-colors">
                  Buddha Dordenma
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-secondary-foreground/70 transition-colors">
                  Thimphu, Bhutan
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm tracking-wide transition-colors ${
                      pathname === link.href
                        ? "text-accent"
                        : "text-secondary-foreground/90 hover:text-accent"
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`h-px w-6 bg-secondary-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-secondary-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-px w-6 bg-secondary-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-secondary pt-24 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col items-center gap-8 p-8">
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              className="transition-all duration-300"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : "0ms",
              }}
            >
              <Link
                href={link.href}
                className={`font-serif text-2xl transition-colors ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-secondary-foreground hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
