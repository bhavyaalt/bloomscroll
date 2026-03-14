"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface ShareMenuData {
  /** Text for Twitter/X share */
  twitterText: string;
  /** URL to include in Twitter share */
  url: string;
  /** Text to copy for Instagram */
  copyText: string;
  /** Generate a share image (for download/Instagram) */
  generateImage?: () => Promise<Blob>;
  /** Filename for downloaded image */
  imageFilename?: string;
}

interface ShareMenuProps {
  open: boolean;
  onClose: () => void;
  data: ShareMenuData;
  onNotify?: (message: string) => void;
}

const XIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkIcon = () => (
  <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.812a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.627" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export default function ShareMenu({ open, onClose, data, onNotify }: ShareMenuProps) {
  const handleTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.twitterText)}&url=${encodeURIComponent(data.url)}`;
    window.open(tweetUrl, "_blank", "width=550,height=420");
    onClose();
  };

  const handleInstagram = async () => {
    navigator.clipboard.writeText(data.copyText);
    if (data.generateImage) {
      try {
        const blob = await data.generateImage();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = data.imageFilename || "bloomscroll-share.png";
        a.click();
        URL.revokeObjectURL(url);
        onNotify?.("Image downloaded & text copied — paste in Instagram");
      } catch {
        onNotify?.("Text copied to clipboard");
      }
    } else {
      onNotify?.("Copied to clipboard — paste in Instagram");
    }
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(data.url);
    onNotify?.("Link copied!");
    onClose();
  };

  const handleDownload = async () => {
    if (!data.generateImage) return;
    try {
      const blob = await data.generateImage();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.imageFilename || "bloomscroll-share.png";
      a.click();
      URL.revokeObjectURL(url);
      onNotify?.("Image downloaded!");
    } catch {
      onNotify?.("Download failed");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl p-4 pb-6 sm:p-5 shadow-2xl"
          >
            {/* Handle bar (mobile) */}
            <div className="flex justify-center mb-3 sm:hidden">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>

            <h3 className="text-sm font-medium text-slate-900 mb-3 text-center">Share</h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleTwitter}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-black transition-colors"
              >
                <XIcon />
                Post on X
              </button>

              <button
                onClick={handleInstagram}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-white transition-colors"
                style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                <InstagramIcon />
                Instagram
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                <LinkIcon />
                Copy Link
              </button>

              {data.generateImage && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  <DownloadIcon />
                  Save Image
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
