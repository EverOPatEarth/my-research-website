'use client';

import * as React from 'react';
import {
  ChevronDown,
  Download,
  Code2,
  Quote,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Publication } from '@/lib/data';
import { profile } from '@/lib/data';
import { cn } from '@/lib/utils';

const statusConfig: Record<
  Publication['status'],
  { label: string; className: string }
> = {
  published: {
    label: 'Published',
    className: 'border-accent/30 bg-accent/10 text-accent',
  },
  preprint: {
    label: 'Preprint',
    className: 'border-blue-500/30 bg-blue-500/10 text-blue-500 dark:text-blue-400',
  },
  'in-review': {
    label: 'In Review',
    className:
      'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
};

interface PaperCardProps {
  publication: Publication;
  onCite: (pub: Publication) => void;
  index: number;
}

function highlightAuthor(authors: string[], highlightName: string) {
  return authors.map((author, i) => {
    const isMe = author === highlightName;
    return (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-muted-foreground/60">, </span>}
        <span
          className={cn(
            isMe && 'font-semibold text-foreground underline decoration-accent/40 underline-offset-2'
          )}
        >
          {author}
        </span>
      </React.Fragment>
    );
  });
}

export function PaperCard({ publication, onCite, index }: PaperCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const status = statusConfig[publication.status];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/25"
    >
      {/* Top row: status badge + year */}
      <div className="flex items-center justify-between gap-3 px-6 pt-5">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            status.className
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status.label}
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {publication.year}
        </div>
      </div>

      {/* Title */}
      <h3 className="px-6 pt-4 font-serif text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
        {publication.title}
      </h3>

      {/* Authors */}
      <p className="px-6 pt-2 text-sm text-muted-foreground">
        {highlightAuthor(publication.authors, profile.shortName)}
      </p>

      {/* Venue */}
      <div className="flex items-center gap-1.5 px-6 pt-2 text-xs text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" />
        <span className="font-medium text-foreground/80">{publication.venue}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 px-6 pt-3">
        {publication.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Abstract toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1.5 px-6 text-xs font-medium text-accent transition-colors hover:text-accent/80"
      >
        <span>{expanded ? 'Hide abstract' : 'Show abstract'}</span>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
              {publication.abstract}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="mt-auto flex items-center gap-2 border-t border-border/70 px-6 py-4">
        <a
          href={publication.pdfUrl}
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          PDF
        </a>

        {publication.codeUrl && (
          <a
            href={publication.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Code2 className="h-3.5 w-3.5" />
            Code/Data
          </a>
        )}

        <button
          onClick={() => onCite(publication)}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
        >
          <Quote className="h-3.5 w-3.5" />
          Cite
        </button>
      </div>
    </motion.article>
  );
}
