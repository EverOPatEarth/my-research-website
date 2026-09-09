'use client';

import * as React from 'react';
import { ArrowUpRight, CalendarDays, Clock3, Download, Database, ExternalLink } from 'lucide-react';
import { thoughts } from '@/lib/data';

export function Thoughts() {
  return (
    <section id="thoughts" className="border-t border-border bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Notes & essays
            </p>
            <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Recent thoughts
            </h2>
          </div>
          <a
            href="#thoughts"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            Read all thoughts
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {thoughts.map((thought, index) => (
            <article
              key={thought.id}
              className="group grid gap-4 py-7 transition-colors sm:grid-cols-[140px_1fr_auto] sm:items-start sm:gap-8"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                <time dateTime={thought.date}>
                  {new Date(thought.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {thought.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  <a href={`#${thought.id}`}>{thought.title}</a>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {thought.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:pt-1">
                <Clock3 className="h-3.5 w-3.5" />
                {thought.readingTime} read
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResearchData() {
  return (
    <section id="data" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Open science
            </p>
            <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Research data
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Reproducible research starts with accessible data. Browse the datasets and analysis tools behind my work, available for the research community to explore and build upon.
            </p>
            <a
              href="#data"
              className="mt-7 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
            >
              Explore all datasets
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: 'Neural Decision-Making', type: 'Dataset · 2.4 GB', updated: 'Updated 2 weeks ago', icon: Database },
              { name: 'Sparse Coding Benchmarks', type: 'Code + data · 840 MB', updated: 'Updated 1 month ago', icon: Download },
              { name: 'Cortical Dynamics', type: 'Dataset · 1.1 GB', updated: 'Updated 2 months ago', icon: Database },
              { name: 'Uncertainty in AI', type: 'Code + data · 320 MB', updated: 'Updated 3 months ago', icon: Download },
            ].map((dataset) => {
              const Icon = dataset.icon;
              return (
                <a
                  key={dataset.name}
                  href="#data"
                  className="group rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold group-hover:text-accent">{dataset.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{dataset.type}</p>
                  <p className="mt-3 text-[10px] text-muted-foreground/70">{dataset.updated}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
