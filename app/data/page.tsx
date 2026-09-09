'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Download,
  Github,
  Database,
  Code2,
  Box,
  FileText,
  ExternalLink,
  HardDrive,
  BadgeCheck,
  CalendarDays,
  X,
  Filter,
} from 'lucide-react';
import { datasets, publications, type Dataset, type DatasetType } from '@/lib/data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

type TypeFilter = 'all' | DatasetType;

const typeFilters: { value: TypeFilter; label: string; icon: typeof Database }[] = [
  { value: 'all', label: 'All', icon: Filter },
  { value: 'dataset', label: 'Datasets', icon: Database },
  { value: 'code', label: 'Code', icon: Code2 },
  { value: 'model', label: 'Models', icon: Box },
];

const typeConfig: Record<
  DatasetType,
  { label: string; icon: typeof Database; color: string }
> = {
  dataset: {
    label: 'Dataset',
    icon: Database,
    color: 'border-accent/30 bg-accent/10 text-accent',
  },
  code: {
    label: 'Code',
    icon: Code2,
    color:
      'border-blue-500/30 bg-blue-500/10 text-blue-500 dark:text-blue-400',
  },
  model: {
    label: 'Model',
    icon: Box,
    color:
      'border-purple-500/30 bg-purple-500/10 text-purple-500 dark:text-purple-400',
  },
};

function getPaperTitle(paperId?: string) {
  if (!paperId) return null;
  const pub = publications.find((p) => p.id === paperId);
  return pub ? pub.title : null;
}

function formatBadge(format: string) {
  return (
    <span
      key={format}
      className="inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
    >
      {format}
    </span>
  );
}

function licenseBadge(license: string) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      <BadgeCheck className="h-3 w-3 text-accent" />
      {license}
    </span>
  );
}

function DatasetRow({
  dataset,
  index,
}: {
  dataset: Dataset;
  index: number;
}) {
  const type = typeConfig[dataset.type];
  const TypeIcon = type.icon;
  const paperTitle = getPaperTitle(dataset.paperId);

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group border-b border-border transition-colors hover:bg-muted/30"
    >
      {/* Type + Title + Description */}
      <td className="py-5 pl-6 pr-4 align-top">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
              type.color
            )}
          >
            <TypeIcon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
              {dataset.title}
            </h3>
            <p className="mt-1 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {dataset.description}
            </p>
            {paperTitle && (
              <a
                href="/papers"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80"
              >
                <FileText className="h-3 w-3" />
                <span className="line-clamp-1 max-w-md">Associated paper: {paperTitle}</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </td>

      {/* Metadata badges */}
      <td className="hidden py-5 px-4 align-top lg:table-cell">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HardDrive className="h-3.5 w-3.5" />
            {dataset.size}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(dataset.updated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </td>

      {/* Formats */}
      <td className="hidden py-5 px-4 align-top lg:table-cell">
        <div className="flex flex-wrap gap-1">{dataset.formats.map(formatBadge)}</div>
      </td>

      {/* License */}
      <td className="hidden py-5 px-4 align-top lg:table-cell">
        {licenseBadge(dataset.license)}
      </td>

      {/* Tags */}
      <td className="hidden py-5 px-4 align-top xl:table-cell">
        <div className="flex flex-wrap gap-1">
          {dataset.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>

      {/* Actions */}
      <td className="py-5 pl-4 pr-6 align-top">
        <div className="flex items-center gap-2">
          <a
            href={dataset.downloadUrl}
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
          {dataset.repoUrl && (
            <a
              href={dataset.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View on ${dataset.repoPlatform}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              {dataset.repoPlatform === 'github' ? (
                <Github className="h-3.5 w-3.5" />
              ) : (
                <Box className="h-3.5 w-3.5" />
              )}
            </a>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

function DatasetCard({ dataset, index }: { dataset: Dataset; index: number }) {
  const type = typeConfig[dataset.type];
  const TypeIcon = type.icon;
  const paperTitle = getPaperTitle(dataset.paperId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/25"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
            type.color
          )}
        >
          <TypeIcon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base font-semibold leading-snug tracking-tight text-foreground">
            {dataset.title}
          </h3>
          <span
            className={cn(
              'mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              type.color
            )}
          >
            {type.label}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {dataset.description}
      </p>

      {/* Associated paper */}
      {paperTitle && (
        <a
          href="/papers"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80"
        >
          <FileText className="h-3 w-3" />
          <span className="line-clamp-1">Associated paper</span>
          <ExternalLink className="h-3 w-3 shrink-0" />
        </a>
      )}

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <HardDrive className="h-3.5 w-3.5" />
          {dataset.size}
        </span>
        <span className="text-border">·</span>
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {new Date(dataset.updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Format + License badges */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {dataset.formats.map(formatBadge)}
        {licenseBadge(dataset.license)}
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1">
        {dataset.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-4">
        <a
          href={dataset.downloadUrl}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-foreground px-3 py-2 text-xs font-medium text-background transition-all hover:bg-accent hover:text-accent-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
        {dataset.repoUrl && (
          <a
            href={dataset.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View on ${dataset.repoPlatform}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            {dataset.repoPlatform === 'github' ? (
              <Github className="h-3.5 w-3.5" />
            ) : (
              <Box className="h-3.5 w-3.5" />
            )}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function DataPage() {
  const [search, setSearch] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>('all');
  const [selectedFormats, setSelectedFormats] = React.useState<string[]>([]);

  const allFormats = React.useMemo(() => {
    const formats = new Set<string>();
    datasets.forEach((d) => d.formats.forEach((f) => formats.add(f)));
    return Array.from(formats).sort();
  }, []);

  const filteredDatasets = React.useMemo(() => {
    const query = search.toLowerCase().trim();
    return datasets
      .filter((d) => typeFilter === 'all' || d.type === typeFilter)
      .filter((d) =>
        selectedFormats.length === 0 ||
        selectedFormats.some((f) => d.formats.includes(f))
      )
      .filter((d) => {
        if (!query) return true;
        return (
          d.title.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query) ||
          d.tags.some((t) => t.toLowerCase().includes(query)) ||
          d.formats.some((f) => f.toLowerCase().includes(query)) ||
          d.license.toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.updated).getTime() - new Date(a.updated).getTime()
      );
  }, [search, typeFilter, selectedFormats]);

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setSelectedFormats([]);
  };

  const hasFilters =
    search.trim() !== '' || typeFilter !== 'all' || selectedFormats.length > 0;

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
                Open science
              </p>
              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Research Data &amp; Code
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Datasets, code repositories, and pretrained models from my research.
                All resources are openly shared to support reproducibility and
                further exploration by the community.
              </p>
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
                placeholder="Search by keyword, format, license, or topic..."
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

            {/* Type filters + result count */}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-1.5">
                {typeFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.value}
                      onClick={() => setTypeFilter(filter.value)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                        typeFilter === filter.value
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
                      )}
                    >
                      <Icon className="h-3 w-3" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-muted-foreground">
                Showing{' '}
                <span className="font-semibold text-foreground">
                  {filteredDatasets.length}
                </span>{' '}
                of {datasets.length} resources
              </div>
            </div>

            {/* Format filter chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                Format:
              </span>
              {allFormats.map((format) => {
                const active = selectedFormats.includes(format);
                return (
                  <button
                    key={format}
                    onClick={() => toggleFormat(format)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px] font-medium transition-all',
                      active
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-muted-foreground hover:border-accent/30 hover:text-foreground'
                    )}
                  >
                    {active && <X className="h-2.5 w-2.5" />}
                    {format}
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

        {/* Results */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="popLayout">
              {filteredDatasets.length > 0 ? (
                <>
                  {/* Desktop table */}
                  <motion.div
                    layout
                    className="hidden overflow-hidden rounded-xl border border-border lg:block"
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30 text-left">
                          <th className="py-3.5 pl-6 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Resource
                          </th>
                          <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Size / Date
                          </th>
                          <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Formats
                          </th>
                          <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            License
                          </th>
                          <th className="hidden py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground xl:table-cell">
                            Tags
                          </th>
                          <th className="py-3.5 pl-4 pr-6 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDatasets.map((dataset, index) => (
                          <DatasetRow
                            key={dataset.id}
                            dataset={dataset}
                            index={index}
                          />
                        ))}
                      </tbody>
                    </table>
                  </motion.div>

                  {/* Mobile cards */}
                  <motion.div
                    layout
                    className="grid gap-4 lg:hidden sm:grid-cols-2"
                  >
                    {filteredDatasets.map((dataset, index) => (
                      <DatasetCard
                        key={dataset.id}
                        dataset={dataset}
                        index={index}
                      />
                    ))}
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <Database className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">
                    No resources match your search
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
      </div>
      <Footer />
    </div>
  );
}
