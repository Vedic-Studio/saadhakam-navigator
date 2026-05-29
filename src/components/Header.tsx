"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavLinkItem = {
  label: string;
  href: string;
  description?: string;
};

type NavGroup = {
  label: string;
  items: NavLinkItem[];
};

type NavSection =
  | { type: "link"; item: NavLinkItem }
  | { type: "group"; group: NavGroup };

const navSections: NavSection[] = [
  { type: "link", item: { label: "Articles", href: "/articles" } },
  { type: "link", item: { label: "Philosophies", href: "/ancient-wisdom-philosophies" } },
  { type: "link", item: { label: "Practices", href: "/practical-spiritual-practices" } },
  { type: "link", item: { label: "Vedic Clock", href: "/vedic-clock" } },
  { type: "link", item: { label: "Jyotish", href: "/jyotish" } },
  { type: "link", item: { label: "Panchang", href: "/panchang" } },
  {
    type: "group",
    group: {
      label: "Explore",
      items: [
        { label: "Texts", href: "/sacred-texts-teachings", description: "Scriptures, teachings, and foundational sources." },
        { label: "Deities", href: "/deities", description: "Meet forms, symbolism, and devotional significance." },
        { label: "Traditions", href: "/spiritual-traditions-paths", description: "Understand lineages, sampradayas, and approaches." },
        { label: "History", href: "/sanatan-history", description: "Explore civilizational context and sacred history." },
        { label: "Greats", href: "/greats", description: "Learn from sages, teachers, and realized exemplars." },
        { label: "About Sadhaka", href: "/about", description: "Editorial standards, sourcing, and methodology." },
      ],
    },
  },
  {
    type: "group",
    group: {
      label: "Resources",
      items: [
        { label: "Mantras", href: "/mantras", description: "Browse mantra guides, meanings, and use cases." },
        { label: "Stotras", href: "/stotras/shiva-tandava-stotram", description: "Access devotional hymns and recitation texts." },
        { label: "Sanskrit Dictionary", href: "/learn/sanskrit", description: "Study key Sanskrit terms and language basics." },
        { label: "Compare Paths", href: "/compare", description: "Contrast spiritual paths to find personal fit." },
        { label: "Daily Guidance", href: "/panchang", description: "Check today’s spiritual timing and orientation." },
        { label: "AI Tutor", href: "/app", description: "Get guided help for questions, study, and practice." },
      ],
    },
  },
];

const primaryNavItems = navSections
  .filter((section): section is Extract<NavSection, { type: "link" }> => section.type === "link")
  .map((section) => section.item);

const navGroups = navSections
  .filter((section): section is Extract<NavSection, { type: "group" }> => section.type === "group")
  .map((section) => section.group);

function MobileNavGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  return (
    <Collapsible className="border-b border-border/50 pb-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-foreground transition-colors hover:text-primary">
        <span>{group.label}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pb-2 pl-3 pt-1">
        {group.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="block rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function DesktopDropdownGroup({ group }: { group: NavGroup }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground data-[active]:bg-transparent data-[state=open]:bg-transparent">
        {group.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[420px] gap-1 p-3">
          {group.items.map((item) => (
            <NavigationMenuLink key={item.href} asChild>
              <Link
                href={item.href}
                className="block rounded-lg p-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              >
                <div className="text-sm font-medium leading-none text-foreground">{item.label}</div>
                {item.description ? (
                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/favicon.svg"
              alt="Sadhaka Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full bg-primary p-1"
            />
            <span className="font-display text-xl font-semibold text-foreground">
              Sadhaka
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {primaryNavItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-9 bg-transparent px-3 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <NavigationMenu className="z-20">
              <NavigationMenuList className="gap-1 space-x-0">
                {navGroups.map((group) => (
                  <DesktopDropdownGroup key={group.label} group={group} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/faith-finder">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Start Your Path
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full pt-8">
                <nav className="flex flex-col gap-2">
                  {primaryNavItems.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 space-y-3 border-t border-border/50 pt-6">
                  {navGroups.map((group) => (
                    <MobileNavGroup
                      key={group.label}
                      group={group}
                      onNavigate={() => setIsOpen(false)}
                    />
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/faith-finder" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Start Your Path
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
