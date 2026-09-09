import React, { useState, useEffect, useCallback } from 'react';
import { Search, FileText, Database, Lightbulb, ArrowRight, X } from 'lucide-react';

// Sample searchable items structure (Replace or connect with your actual data)
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

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CommandPalette({ isOpen: externalIsOpen, onClose }: CommandPaletteProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync internal state with props if controlled externally
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    setInternalIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, [onClose]);

  // Handle Keyboard Shortcuts (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (externalIsOpen === undefined) {
          setInternalIsOpen((prev) => !prev);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, externalIsOpen, handleClose]);

  // Filter items based on search query
  const filteredItems = SAMPLE_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Group items by category
  const categories = ['Papers', 'Datasets', 'Thoughts'] as const;
  const groupedItems = categories.map((cat) => ({
    category: cat,
    items: filteredItems.filter((item) => item.category === cat),
  }));

  // Flattened array for arrow key navigation calculations
  const flatFilteredItems = groupedItems.flatMap((g) => g.items);

  // Handle Keyboard Navigation within Modal
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
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'Datasets':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'Thoughts':
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
    }
  };

  if (!isOpen) return null;

  let globalIndexCounter = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-zinc-900/60 backdrop-blur-sm p-4">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10"
        onKeyDown={handleNavigation}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search papers, datasets, thoughts... (Use Arrow keys to navigate)"
            className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none text-base"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2">
          {flatFilteredItems.length === 0 ? (
            /* Empty State */
            <div className="py-12 text-center">
              <Search className="w-10 h-10 mx-auto text-zinc-300 dark:text-zinc-600 mb-3" />
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">No results found</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Try searching for keywords like &quot;Neural&quot;, &quot;Dataset&quot;, or &quot;Linking&quot;.
              </p>
            </div>
          ) : (
            /* Categorized Results */
            groupedItems.map((group) => {
              if (group.items.length === 0) return null;

              return (
                <div key={group.category} className="mb-3">
                  <div className="px-3 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
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
                            ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getCategoryIcon(item.category)}</div>
                          <div>
                            <p className="text-sm font-medium leading-none">{item.title}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0 ml-2" />}
                      </a>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300 font-mono">
                ↑↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300 font-mono">
                ↵
              </kbd>{' '}
              Select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300 font-mono">
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