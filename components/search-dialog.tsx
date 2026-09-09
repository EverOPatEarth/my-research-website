'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, FileText, Database, Lightbulb, ArrowRight, X } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: 'Papers' | 'Datasets' | 'Thoughts';
  description: string;
  url: string;
}

const SAMPLE_ITEMS: SearchItem[] = [
  {
    id: '1',
    title: 'Neural Networks in Climate Modeling',
    category: 'Papers',
    description: 'Deep learning architectures applied to long-term weather prediction.',
    url: '/papers/climate-nn',
  },
  {
    id: '2',
    title: 'Global Surface Temperature Dataset (2020–2026)',
    category: 'Datasets',
    description: 'CSV format, clean monthly aggregated anomalies.',
    url: '/data/temperature-2026',
  },
  {
    id: '3',
    title: 'Why Bidirectional Links Matter for Research',
    category: 'Thoughts',
    description: 'Notes on building a digital garden vs traditional blogging.',
    url: '/thoughts/bidirectional-linking',
  },
  {
    id: '4',
    title: 'Quantum Computing in Drug Discovery',
    category: 'Papers',
    description: 'Review of molecular simulation algorithms.',
    url: '/papers/quantum-drug-discovery',
  },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setQuery('');
    setSelectedIndex(0);
  }, [onOpenChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleClose]);

  const filteredItems = SAMPLE_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const categories = ['Papers', 'Datasets', 'Thoughts'] as const;
  const groupedItems = categories.map((cat) => ({
    category: cat,
    items: filteredItems.filter((item) => item.category === cat),
  }));

  const flatFilteredItems = groupedItems.flatMap((g) => g.items);

  const handleNavigation = (e: React.KeyboardEvent) => {
    if (flatFilteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatFilteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatFilteredItems.length) % flatFilteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedItem = flatFilteredItems[selectedIndex];
      if (selectedItem) {
        window.location.href = selectedItem.url;
        handleClose();
      }
    }
  };

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Papers':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Datasets':
        return <Database className="h-4 w-4 text-emerald-500" />;
      case 'Thoughts':
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
    }
  };

  if (!open) return null;

  let globalIndexCounter = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4">
      <div className="fixed inset-0" onClick={handleClose} />

      <div
        className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-10"
        onKeyDown={handleNavigation}
      >
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search papers, datasets, thoughts..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="p-1 text-muted-foreground hover:text-foreground rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {flatFilteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground font-medium">No results found</p>
            </div>
          ) : (
            groupedItems.map((group) => {
              if (group.items.length === 0) return null;

              return (
                <div key={group.category} className="mb-3">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.category}
                  </div>
                  {group.items.map((item) => {
                    const currentIndex = globalIndexCounter++;
                    const isSelected = currentIndex === selectedIndex;

                    return (
                      <a
                        key={item.id}
                        href={item.url}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        onClick={handleClose}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-accent text-accent-foreground'
                            : 'text-foreground hover:bg-accent/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getCategoryIcon(item.category)}</div>
                          <div>
                            <p className="text-sm font-medium leading-none">{item.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />}
                      </a>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded font-mono text-[10px]">
                ↑↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded font-mono text-[10px]">
                ↵
              </kbd>{' '}
              Select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded font-mono text-[10px]">
                Esc
              </kbd>{' '}
              Close
            </span>
          </div>
          <span>Global Search</span>
        </div>
      </div>
    </div>
  );
}