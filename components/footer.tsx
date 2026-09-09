import { ArrowUpRight, Mail } from 'lucide-react';
import { profile, navLinks } from '@/lib/data';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <span className="font-serif text-base font-semibold">{profile.name.charAt(0)}</span>
              </div>
              <span className="text-sm font-semibold">{profile.name}</span>
            </a>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Researching the principles of learning and computation in biological and artificial systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </a>
            ))}
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
              <Mail className="h-3.5 w-3.5" /> Contact
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">Built with curiosity <ArrowUpRight className="h-3 w-3" /></p>
        </div>
      </div>
    </footer>
  );
}
