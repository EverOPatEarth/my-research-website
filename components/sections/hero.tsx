'use client';

import * as React from 'react';
import { profile, researchInterests } from '@/lib/data';
import { Mail, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="about"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      {/* Accent glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Status badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for collaboration
        </div>

        {/* Name */}
        <h1 className="font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl animate-fade-in-up">
          {profile.name}
        </h1>

        {/* Title + affiliation */}
        <p className="mt-4 text-lg font-medium text-muted-foreground animate-fade-in-up [animation-delay:100ms] opacity-0">
          {profile.title} · {profile.affiliation}
        </p>

        {/* Bio */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance animate-fade-in-up [animation-delay:200ms] opacity-0">
          {profile.bio}
        </p>

        {/* Research interest tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up [animation-delay:300ms] opacity-0">
          {researchInterests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-3 animate-fade-in-up [animation-delay:400ms] opacity-0">
          {profile.socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur-sm transition-all hover:border-accent/40 hover:text-accent hover:shadow-md hover:shadow-accent/10"
              >
                <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
              </a>
            );
          })}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground backdrop-blur-sm transition-all hover:border-accent/40 hover:text-accent hover:shadow-md hover:shadow-accent/10"
          >
            <Mail className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center animate-fade-in [animation-delay:600ms] opacity-0">
          <a
            href="#stats"
            className="flex flex-col items-center gap-2 text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            <span className="text-xs font-medium tracking-widest uppercase">
              Explore
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
