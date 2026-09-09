'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { navLinks, profile } from '@/lib/data';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchDialog } from '@/components/search-dialog';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <span className="font-serif text-lg font-semibold leading-none">
                {profile.name.charAt(0)}
              </span>
            </div>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              {profile.name}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: search + theme toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex h-9 items-center gap-2 rounded-md border border-border bg-background/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden h-5 items-center rounded border border-border bg-muted px-1.5 font-sans text-[10px] font-medium text-muted-foreground sm:flex">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    'h-0.5 w-4 bg-current transition-all',
                    mobileOpen && 'translate-y-1.5 rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'h-0.5 w-4 bg-current transition-all',
                    mobileOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'h-0.5 w-4 bg-current transition-all',
                    mobileOpen && '-translate-y-1.5 -rotate-45'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
