'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowLeft,
  Clock,
  CalendarDays,
  Link2,
  X,
  FileText,
  Sprout,
  Leaf,
  TreePine,
} from 'lucide-react';
import {
  notes,
  noteStatusConfig,
  type Note,
  type NoteStatus,
} from '@/lib/data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

const statusFilters: { value: NoteStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Notes' },
  { value: 'seedling', label: '🌱 Seedling' },
  { value: 'growing', label: '🌿 Growing' },
  { value: 'evergreen', label: '🌳 Evergreen' },
];

const statusIcon: Record<NoteStatus, typeof Sprout> = {
  seedling: Sprout,
  growing: Leaf,
  evergreen: TreePine,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getBacklinkNotes(backlinkIds: string[]): Note[] {
  return backlinkIds
    .map((id) => notes.find((n) => n.id === id))
    .filter((n): n is Note => n !== undefined);
}

function NoteCard({ note, onClick, index }: { note: Note; onClick: () => void; index: number }) {
  const status = noteStatusConfig[note.status];
  const StatusIcon = statusIcon[note.status];

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      {/* Status badge + reading time */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
            status.className
          )}
        >
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {note.readingTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 font-serif text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
        {note.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {note.excerpt}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Updated date */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-border/70 pt-3 text-[10px] text-muted-foreground">
        <CalendarDays className="h-3 w-3" />
        Updated {formatDate(note.updated)}
      </div>
    </motion.button>
  );
}

function ReadingView({ note, onBack }: { note: Note; onBack: () => void }) {
  const backlinkNotes = getBacklinkNotes(note.backlinks);
  const [activeSection, setActiveSection] = React.useState(note.content[0]?.id || '');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    note.content.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [note]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to garden
        </button>

        <div className="flex gap-12">
          {/* Main content */}
          <article className="min-w-0 flex-1 max-w-3xl">
            {/* Status + metadata */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                  noteStatusConfig[note.status].className
                )}
              >
                {noteStatusConfig[note.status].emoji} {noteStatusConfig[note.status].label}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {note.readingTime} read
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                Updated {formatDate(note.updated)}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {note.title}
            </h1>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Excerpt as intro */}
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              {note.excerpt}
            </p>

            <div className="mt-10 h-px bg-border" />

            {/* Content sections */}
            <div className="mt-10 space-y-12">
              {note.content.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-base leading-[1.75] text-foreground/80"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Backlinks */}
            {backlinkNotes.length > 0 && (
              <div className="mt-16 border-t border-border pt-8">
                <div className="flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Linked notes
                  </h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Other notes that reference this piece.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {backlinkNotes.map((bl) => {
                    const blStatus = noteStatusConfig[bl.status];
                    return (
                      <div
                        key={bl.id}
                        className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/30"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide',
                              blStatus.className
                            )}
                          >
                            {blStatus.emoji} {blStatus.label}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" />
                            {bl.readingTime}
                          </span>
                        </div>
                        <h4 className="mt-2.5 font-serif text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                          {bl.title}
                        </h4>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {bl.excerpt}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </article>

          {/* Floating TOC */}
          {note.content.length > 1 && (
            <aside className="sticky top-24 hidden h-fit w-56 shrink-0 xl:block">
              <div className="border-l border-border pl-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contents
                </p>
                <nav className="space-y-1">
                  {note.content.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(section.id)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={cn(
                        'block border-l-2 py-1 pl-3 -ml-4 text-sm transition-colors',
                        activeSection === section.id
                          ? 'border-accent font-medium text-accent'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ThoughtsPage() {
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<NoteStatus | 'all'>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [activeNote, setActiveNote] = React.useState<Note | null>(null);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    notes.forEach((n) => n.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredNotes = React.useMemo(() => {
    const query = search.toLowerCase().trim();
    return notes
      .filter((n) => statusFilter === 'all' || n.status === statusFilter)
      .filter(
        (n) =>
          selectedTags.length === 0 ||
          selectedTags.every((tag) => n.tags.includes(tag))
      )
      .filter((n) => {
        if (!query) return true;
        return (
          n.title.toLowerCase().includes(query) ||
          n.excerpt.toLowerCase().includes(query) ||
          n.tags.some((t) => t.toLowerCase().includes(query))
        );
      })
      .sort(
        (a, b) =>
          new Date(b.updated).getTime() - new Date(a.updated).getTime()
      );
  }, [search, statusFilter, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setSelectedTags([]);
  };

  const hasFilters =
    search.trim() !== '' || statusFilter !== 'all' || selectedTags.length > 0;

  // Garden stats
  const statusCounts = React.useMemo(
    () => ({
      seedling: notes.filter((n) => n.status === 'seedling').length,
      growing: notes.filter((n) => n.status === 'growing').length,
      evergreen: notes.filter((n) => n.status === 'evergreen').length,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <AnimatePresence mode="wait">
          {activeNote ? (
            <ReadingView
              key={activeNote.id}
              note={activeNote}
              onBack={() => setActiveNote(null)}
            />
          ) : (
            <motion.div
              key="garden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Page header */}
              <section className="border-b border-border bg-muted/20">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Notes & essays
                    </p>
                    <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                      Thoughts &amp; Digital Garden
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      A living collection of notes, essays, and half-formed ideas.
                      Some are seedlings just planted, others are growing works in
                      progress, and a few have grown into evergreen essays.
                    </p>

                    {/* Garden status summary */}
                    <div className="mt-8 flex flex-wrap gap-4">
                      {(Object.keys(statusCounts) as NoteStatus[]).map((status) => {
                        const config = noteStatusConfig[status];
                        const Icon = statusIcon[status];
                        return (
                          <div
                            key={status}
                            className={cn(
                              'inline-flex items-center gap-2 rounded-lg border px-3 py-2',
                              config.className
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-semibold tabular-nums">
                              {statusCounts[status]}
                            </span>
                            <span className="text-xs font-medium">
                              {config.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Search + filter controls */}
              <section className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                  {/* Search bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search notes by title, content, or tag..."
                      className="h-11 w-full rounded-lg border border-border bg-background pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Status filters + result count */}
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {statusFilters.map((filter) => (
                        <button
                          key={filter.value}
                          onClick={() => setStatusFilter(filter.value)}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                            statusFilter === filter.value
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
                          )}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Showing{' '}
                      <span className="font-semibold text-foreground">
                        {filteredNotes.length}
                      </span>{' '}
                      of {notes.length} notes
                    </div>
                  </div>

                  {/* Tag filters */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Tags:
                    </span>
                    {allTags.map((tag) => {
                      const active = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-all',
                            active
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border text-muted-foreground hover:border-accent/30 hover:text-foreground'
                          )}
                        >
                          {active && <X className="h-2.5 w-2.5" />}
                          #{tag}
                        </button>
                      );
                    })}
                    {hasFilters && (
                      <button
                        onClick={clearFilters}
                        className="ml-1 text-[11px] font-medium text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-accent"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* Notes grid */}
              <section className="py-10 sm:py-14">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <AnimatePresence mode="popLayout">
                    {filteredNotes.length > 0 ? (
                      <motion.div
                        layout
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {filteredNotes.map((note, index) => (
                          <NoteCard
                            key={note.id}
                            note={note}
                            onClick={() => {
                              setActiveNote(note);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            index={index}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 font-serif text-lg font-semibold">
                          No notes match your filters
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Try different keywords or clear the filters.
                        </p>
                        <button
                          onClick={clearFilters}
                          className="mt-4 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          Clear filters
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
