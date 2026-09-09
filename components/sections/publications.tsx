'use client';

import * as React from 'react';
import { ExternalLink, FileText, Copy, Check, ArrowUpRight } from 'lucide-react';
import { publications, type Publication } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

function BibtexDialog({ publication }: { publication: Publication }) {
  const [copied, setCopied] = React.useState(false);

  const copyBibtex = async () => {
    await navigator.clipboard.writeText(publication.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent">
          <FileText className="h-3.5 w-3.5" />
          BibTeX
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="font-serif text-xl">Citation</DialogTitle>
          <DialogDescription className="mt-1 text-xs">
            BibTeX entry for &ldquo;{publication.title}&rdquo;
          </DialogDescription>
        </DialogHeader>
        <div className="relative bg-muted/40 p-6">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground/80">
            {publication.bibtex}
          </pre>
          <button
            onClick={copyBibtex}
            className="absolute right-9 top-9 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-accent" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {publication.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
          {publication.year}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
        {publication.title}
      </h3>

      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
        {publication.abstract}
      </p>

      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground/80">{publication.venue}</span>
        <span className="text-border">·</span>
        <span>{publication.authors.slice(0, 2).join(', ')}{publication.authors.length > 2 ? ' et al.' : ''}</span>
      </div>

      <div className="mt-auto flex items-center gap-4 border-t border-border/70 pt-5">
        <a
          href={publication.pdfUrl}
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Read paper
        </a>
        <BibtexDialog publication={publication} />
        <button className="ml-auto text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-label="View publication">
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export function Publications() {
  const [showAll, setShowAll] = React.useState(false);
  const displayedPublications = showAll ? publications : publications.slice(0, 3);

  return (
    <section id="papers" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Selected work
            </p>
            <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Featured publications
            </h2>
          </div>
          <a
            href="#papers"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            View all publications
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {displayedPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            {showAll ? 'Show featured only' : 'Show more publications'}
          </button>
        </div>
      </div>
    </section>
  );
}
