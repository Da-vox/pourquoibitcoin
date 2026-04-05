import { Twitter, Linkedin, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://pourquoibitcoin.lovable.app");
  const shareTitle = title || "Pourquoi Bitcoin ? La réponse simple et honnête.";

  const twitterUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareTitle, url: shareUrl });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-btc-orange/30 transition-colors text-sm"
        aria-label="Partager sur X / Twitter"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">Partager</span>
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-btc-orange/30 transition-colors text-sm"
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
        <span className="hidden sm:inline">LinkedIn</span>
      </a>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-btc-orange/30 transition-colors text-sm"
          aria-label="Partager"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ShareButtons;
