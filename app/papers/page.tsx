'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, FileText } from 'lucide-react';
import { publications, type Publication, type PublicationStatus } from '@/lib/data';
import { PaperCard } from '@/components/paper-card';
import { BibtexModal } from '@/components/bibtex-modal';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | PublicationStatus;

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'preprint', label: 'Preprints' },
  { value: 'in-review', label: 'In Review' },
];

export default function PublicationsPage() {
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [citePub, setCitePub] = React.useState<Publication | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    publications.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredPubs = React.useMemo(() => {
    return publications
      .filter((p) => statusFilter === 'all' || p.status === statusFilter)
      .filter(
        (p) =>
          selectedTags.length === 0 ||
          selectedTags.every((tag) => p.tags.includes(tag))
      )
      .sort((a, b) => b.year - a.year);
  }, [statusFilter, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setSelectedTags([]);
  };

  const hasFilters = statusFilter !== 'all' || selectedTags.length > 0;

  const handleCite = (pub: Publication) => {
    setCitePub(pub);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
    <div className="pt-20">
      {/* Page header */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Academic portfolio
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Publications &amp; Papers
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              A complete list of my published papers, preprints, and work currently
              under review. Filter by status or research topic, and download PDFs or
              BibTeX citations for your reference manager.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter controls */}
      <section className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Status filters */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Status:</span>
              </div>
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
            </div>

            {/* Result count */}
            <div className="text-xs text-muted-foreground">
              Showing{' '}
              <span className="font-semibold text-foreground">{filteredPubs.length}</span>{' '}
              of {publications.length} papers
            </div>
          </div>

          {/* Topic tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Topics:</span>
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
                  {tag}
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

      {/* Publications grid */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filteredPubs.length > 0 ? (
              <motion.div
                layout
                className="grid gap-5 md:grid-cols-2"
              >
                {filteredPubs.map((pub, index) => (
                  <PaperCard
                    key={pub.id}
                    publication={pub}
                    onCite={handleCite}
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
                  No papers match your filters
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting or clearing the filters to see more results.
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

      <BibtexModal
        publication={citePub}
        open={modalOpen}
        onClose={handleClose}
      />
    </div>
    <Footer />
    </div>
  );
}
