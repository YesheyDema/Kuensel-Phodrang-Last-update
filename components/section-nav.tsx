/** @format */

"use client";

type SectionLink = {
  href: string;
  label: string;
};

export function SectionNav({ links }: { links: SectionLink[] }) {
  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-20 z-30 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 lg:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 whitespace-nowrap rounded-full border border-border px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/40 hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
