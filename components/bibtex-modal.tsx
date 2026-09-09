'use client';

import * as React from 'react';
import { Copy, Check, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Publication } from '@/lib/data';

interface BibtexModalProps {
  publication: Publication | null;
  open: boolean;
  onClose: () => void;
}

export function BibtexModal({ publication, open, onClose }: BibtexModalProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const copyBibtex = async () => {
    if (!publication) return;
    await navigator.clipboard.writeText(publication.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && publication && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold leading-tight">
                    Citation
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    BibTeX entry — {publication.year}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Paper title */}
            <div className="border-b border-border px-6 py-4">
              <p className="font-serif text-sm font-medium leading-snug text-foreground/90">
                {publication.title}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {publication.authors.join(', ')}
              </p>
            </div>

            {/* BibTeX code block */}
            <div className="relative">
              <pre className="max-h-[280px] overflow-auto bg-muted/40 p-6 font-mono text-xs leading-relaxed text-foreground/80">
                {publication.bibtex}
              </pre>

              <button
                onClick={copyBibtex}
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-all hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-accent" />
                    <span className="text-accent">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <p className="text-xs text-muted-foreground">
                Click copy to use this citation in your references.
              </p>
              <button
                onClick={onClose}
                className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
