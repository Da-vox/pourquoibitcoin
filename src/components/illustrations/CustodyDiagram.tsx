/**
 * Custody Diagram — SVG illustration
 * Compares custodial (exchange) vs self-custody (hardware wallet).
 * Illustrates the "Not your keys, not your coins" principle.
 */

const ORANGE = "hsl(30,72%,52%)";
const RED = "hsl(0,65%,52%)";
const GREEN = "hsl(142,60%,42%)";
const MUTED = "hsl(220,10%,48%)";
const BORDER_DARK = "hsl(222,18%,15%)";

const CustodyDiagram = () => {
  return (
    <div
      className="w-full mt-6 rounded-xl border overflow-hidden"
      style={{ borderColor: BORDER_DARK }}
      role="img"
      aria-label="Comparaison custody exchange vs hardware wallet"
    >
      {/* Header */}
      <div
        className="text-center py-2 text-xs font-mono font-semibold tracking-widest uppercase"
        style={{ background: "hsl(222,24%,10%)", color: MUTED, borderBottom: `1px solid ${BORDER_DARK}` }}
      >
        Not your keys · Not your coins
      </div>

      <div className="grid grid-cols-2" style={{ background: "hsl(222,24%,8%)" }}>
        {/* LEFT — Exchange (BAD) */}
        <div
          className="p-5 flex flex-col items-center gap-3 border-r"
          style={{ borderColor: BORDER_DARK }}
        >
          {/* Exchange Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center relative"
            style={{ background: "hsl(0,40%,12%)", border: `1.5px solid hsl(0,50%,30%)` }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              {/* Building */}
              <rect x="3" y="10" width="22" height="15" rx="1" stroke={RED} strokeWidth="1.5" fill="none" />
              <rect x="6" y="14" width="4" height="4" rx="0.5" fill={RED} opacity="0.5" />
              <rect x="12" y="14" width="4" height="4" rx="0.5" fill={RED} opacity="0.5" />
              <rect x="18" y="14" width="4" height="4" rx="0.5" fill={RED} opacity="0.5" />
              <rect x="10" y="18" width="8" height="7" rx="0.5" fill={RED} opacity="0.4" />
              <path d="M1 10 L14 3 L27 10" stroke={RED} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            </svg>
            {/* X badge */}
            <div
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: RED }}
            >
              ✕
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: RED }}>Exchange</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Coinbase · Binance…</p>
          </div>

          {/* Flow */}
          <div className="w-full space-y-2">
            <div
              className="rounded-lg p-2.5 text-center text-xs border"
              style={{ background: "hsl(0,30%,10%)", borderColor: "hsl(0,40%,22%)", color: "hsl(0,60%,65%)" }}
            >
              🔑 Clés privées :<br />
              <span className="font-bold">ELLES</span>
            </div>
            <div
              className="rounded-lg p-2.5 text-center text-xs border"
              style={{ background: "hsl(0,20%,9%)", borderColor: "hsl(0,30%,18%)", color: "hsl(0,50%,55%)" }}
            >
              ₿ Vos BTC :<br />
              <span className="font-bold">En dépôt</span>
            </div>
            <div
              className="rounded-lg p-2.5 text-center text-xs border"
              style={{ background: "hsl(0,30%,10%)", borderColor: "hsl(0,40%,22%)", color: "hsl(0,60%,65%)" }}
            >
              ⚠️ Si faillite (FTX…)<br />
              <span className="font-bold text-red-400">Fonds perdus</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Hardware Wallet (GOOD) */}
        <div className="p-5 flex flex-col items-center gap-3">
          {/* HW Wallet Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center relative"
            style={{ background: "hsl(30,30%,10%)", border: `1.5px solid hsl(30,50%,30%)` }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              {/* USB device */}
              <rect x="5" y="8" width="18" height="13" rx="2.5" stroke={ORANGE} strokeWidth="1.5" fill="none" />
              <rect x="8" y="11" width="12" height="7" rx="1" fill={ORANGE} opacity="0.15" />
              {/* Screen */}
              <rect x="9" y="12" width="6" height="4" rx="0.5" fill={ORANGE} opacity="0.5" />
              {/* Button */}
              <circle cx="20" cy="14" r="1.5" fill={ORANGE} opacity="0.7" />
              {/* USB connector */}
              <rect x="11" y="21" width="6" height="3" rx="0.5" fill={ORANGE} opacity="0.5" />
              <rect x="13" y="24" width="2" height="2" fill={ORANGE} opacity="0.3" />
            </svg>
            {/* Check badge */}
            <div
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: GREEN }}
            >
              ✓
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: ORANGE }}>Hardware Wallet</p>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>Ledger · Trezor…</p>
          </div>

          {/* Flow */}
          <div className="w-full space-y-2">
            <div
              className="rounded-lg p-2.5 text-center text-xs border"
              style={{ background: "hsl(30,30%,9%)", borderColor: "hsl(30,45%,22%)", color: "hsl(30,72%,72%)" }}
            >
              🔑 Clés privées :<br />
              <span className="font-bold">VOUS</span>
            </div>
            <div
              className="rounded-lg p-2.5 text-center text-xs border"
              style={{ background: "hsl(30,20%,9%)", borderColor: "hsl(30,35%,18%)", color: "hsl(30,60%,60%)" }}
            >
              ₿ Vos BTC :<br />
              <span className="font-bold">Sur la blockchain</span>
            </div>
            <div
              className="rounded-lg p-2.5 text-center text-xs border"
              style={{ background: "hsl(142,20%,8%)", borderColor: "hsl(142,30%,18%)", color: "hsl(142,60%,52%)" }}
            >
              ✅ Souveraineté totale<br />
              <span className="font-bold">Personne ne peut geler</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center py-2 text-xs"
        style={{
          background: "hsl(222,24%,10%)",
          color: MUTED,
          borderTop: `1px solid ${BORDER_DARK}`,
        }}
      >
        <span style={{ color: RED }}>Exchange</span>
        <span className="mx-2">→ custody délégué</span>
        <span className="mx-2">·</span>
        <span style={{ color: ORANGE }}>Hardware Wallet</span>
        <span className="ml-2">→ self-custody</span>
      </div>
    </div>
  );
};

export default CustodyDiagram;
