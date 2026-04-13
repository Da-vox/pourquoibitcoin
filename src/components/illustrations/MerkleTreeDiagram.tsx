/**
 * Merkle Tree Diagram — SVG illustration
 * Visualizes how Bitcoin transactions are hashed into a Merkle root.
 * Used in the whitepaper chapter 07 (Récupération d'Espace Disque).
 */

const ORANGE = "hsl(30,72%,52%)";
const ORANGE_BG = "hsl(30,40%,14%)";
const ORANGE_BORDER = "hsl(30,50%,26%)";
const MUTED = "hsl(220,10%,48%)";
const MUTED_DARK = "hsl(220,10%,35%)";
const CARD_BG = "hsl(222,24%,11%)";
const BORDER = "hsl(222,18%,20%)";
const NODE_BG = "hsl(222,24%,14%)";
const NODE_BORDER = "hsl(222,18%,24%)";

interface NodeConfig {
  x: number;
  y: number;
  label: string;
  sublabel: string;
  highlight?: boolean;
  isLeaf?: boolean;
}

// SVG dimensions
const W = 480;
const H = 210;

// Node sizes
const NODE_W = 88;
const NODE_H = 36;
const LEAF_W = 76;
const LEAF_H = 32;

// Layout positions (cx = center x, y = top)
const ROOT_CX = 240;
const ROOT_Y = 16;

const MID_LEFT_CX = 140;
const MID_RIGHT_CX = 340;
const MID_Y = 92;

const LEAF_Y = 162;
const LEAF_CX = [62, 138, 218, 294, 374, 422]; // up to 6 leaves, we'll use 4

const nodes: NodeConfig[] = [
  // Root
  {
    x: ROOT_CX - NODE_W / 2,
    y: ROOT_Y,
    label: "Racine Merkle",
    sublabel: "Hash(AB + CD)",
    highlight: true,
  },
  // Mid
  {
    x: MID_LEFT_CX - NODE_W / 2,
    y: MID_Y,
    label: "Hash AB",
    sublabel: "Hash(Tx1 + Tx2)",
  },
  {
    x: MID_RIGHT_CX - NODE_W / 2,
    y: MID_Y,
    label: "Hash CD",
    sublabel: "Hash(Tx3 + Tx4)",
  },
  // Leaves
  {
    x: 44,
    y: LEAF_Y,
    label: "Hash A",
    sublabel: "Transaction 1",
    isLeaf: true,
  },
  {
    x: 134,
    y: LEAF_Y,
    label: "Hash B",
    sublabel: "Transaction 2",
    isLeaf: true,
  },
  {
    x: 222,
    y: LEAF_Y,
    label: "Hash C",
    sublabel: "Transaction 3",
    isLeaf: true,
  },
  {
    x: 312,
    y: LEAF_Y,
    label: "Hash D",
    sublabel: "Transaction 4",
    isLeaf: true,
  },
];

// Connector lines: [from node index, to node index]
// Using center-bottom of parent → center-top of child
const connectors = [
  // Root → Mid Left
  [ROOT_CX, ROOT_Y + NODE_H, MID_LEFT_CX, MID_Y],
  // Root → Mid Right
  [ROOT_CX, ROOT_Y + NODE_H, MID_RIGHT_CX, MID_Y],
  // Mid Left → Leaf A
  [MID_LEFT_CX, MID_Y + NODE_H, 44 + LEAF_W / 2, LEAF_Y],
  // Mid Left → Leaf B
  [MID_LEFT_CX, MID_Y + NODE_H, 134 + LEAF_W / 2, LEAF_Y],
  // Mid Right → Leaf C
  [MID_RIGHT_CX, MID_Y + NODE_H, 222 + LEAF_W / 2, LEAF_Y],
  // Mid Right → Leaf D
  [MID_RIGHT_CX, MID_Y + NODE_H, 312 + LEAF_W / 2, LEAF_Y],
];

const MerkleTreeDiagram = () => {
  return (
    <div
      className="w-full mt-4 rounded-xl border overflow-hidden"
      style={{ borderColor: BORDER, background: CARD_BG }}
      role="img"
      aria-label="Arbre de Merkle — structure de hachage des transactions Bitcoin"
    >
      {/* Header */}
      <div
        className="text-center py-2 text-xs font-mono font-semibold tracking-widest uppercase border-b"
        style={{ borderColor: BORDER, color: MUTED }}
      >
        Arbre de Merkle
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full px-2"
        aria-hidden="true"
      >
        {/* Connector lines */}
        {connectors.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={MUTED_DARK}
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const w = node.isLeaf ? LEAF_W : NODE_W;
          const h = node.isLeaf ? LEAF_H : NODE_H;
          const bg = node.highlight ? ORANGE_BG : NODE_BG;
          const border = node.highlight ? ORANGE_BORDER : NODE_BORDER;
          const labelColor = node.highlight ? ORANGE : "hsl(38,20%,80%)";
          const sublabelColor = node.highlight
            ? "hsl(30,60%,60%)"
            : MUTED;

          return (
            <g key={i}>
              <rect
                x={node.x}
                y={node.y}
                width={w}
                height={h}
                rx="6"
                fill={bg}
                stroke={border}
                strokeWidth="1.2"
              />
              <text
                x={node.x + w / 2}
                y={node.y + (node.isLeaf ? 13 : 14)}
                textAnchor="middle"
                fontSize={node.isLeaf ? "8.5" : "9"}
                fontWeight="700"
                fill={labelColor}
                fontFamily="monospace"
              >
                {node.label}
              </text>
              <text
                x={node.x + w / 2}
                y={node.y + (node.isLeaf ? 24 : 26)}
                textAnchor="middle"
                fontSize="7.5"
                fill={sublabelColor}
                opacity="0.85"
              >
                {node.sublabel}
              </text>
            </g>
          );
        })}

        {/* "Seul le hash racine est conservé dans l'en-tête du bloc" annotation */}
        <text
          x={ROOT_CX + NODE_W / 2 + 6}
          y={ROOT_Y + 20}
          fontSize="7.5"
          fill={ORANGE}
          opacity="0.8"
        >
          ← conservé dans l'en-tête du bloc
        </text>

        {/* "Transactions élagage possible" annotation */}
        <text
          x={W / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="8"
          fill={MUTED}
          opacity="0.7"
        >
          Les transactions (feuilles) peuvent être élagées sans compromettre la racine
        </text>
      </svg>
    </div>
  );
};

export default MerkleTreeDiagram;
