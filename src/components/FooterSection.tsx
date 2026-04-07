const FooterSection = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gradient-btc text-2xl font-bold mb-4 font-display">₿</p>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          « Si vous ne croyez pas ou ne comprenez pas, je n'ai pas le temps d'essayer de vous convaincre, désolé. »
        </p>
        <p className="text-muted-foreground text-sm">
          — Satoshi Nakamoto, 29 juillet 2010
        </p>
        <div className="neon-line max-w-xs mx-auto mt-10 mb-6" />
        <p className="text-muted-foreground text-xs font-mono">
          21 000 000 BTC · Pas un de plus · Code is law
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
