const rows = [
  { critere: "Offre maximale", btc: "21 millions (fixe)", fiat: "Illimitée" },
  { critere: "Contrôle", btc: "Décentralisé, règles immuables", fiat: "Banques centrales" },
  { critere: "Virements internationaux", btc: "Minutes, <1% de frais", fiat: "Jours, 3–15% de frais" },
  { critere: "Accès", btc: "✓ Smartphone suffit", fiat: "✗ Compte bancaire requis" },
  { critere: "Résistance à la censure", btc: "✓ Impossible à bloquer", fiat: "✗ Peut être gelé" },
  { critere: "Transparence", btc: "✓ 100% auditable", fiat: "✗ Opaque" },
  { critere: "Inflation", btc: "~1.7% / an → 0% en 2140", fiat: "Variable, non plafonné" },
  { critere: "Disponibilité", btc: "24h/24, 7j/7, 365j/an", fiat: "Horaires bancaires" },
  { critere: "Contrefaçon", btc: "✓ Impossible", fiat: "✗ Faux billets courants" },
];

const ComparisonTable = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Face à face
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            <span className="text-gradient-btc">₿ Bitcoin</span> vs € Monnaie fiat
          </h2>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="py-3 px-4 text-left text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Critère
                </th>
                <th className="py-3 px-4 text-center text-xs font-mono uppercase tracking-wider text-primary">
                  ₿ Bitcoin
                </th>
                <th className="py-3 px-4 text-center text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  € Euro / Dollar
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 hover:bg-card/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-foreground">
                    {row.critere}
                  </td>
                  <td className="py-4 px-4 text-center text-sm font-semibold text-primary">
                    {row.btc}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-muted-foreground">
                    {row.fiat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
