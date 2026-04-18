import { useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Shield, Clock, Globe, Lock, TrendingUp, Zap, Check, X, RotateCcw, Trophy, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Quiz = {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const quizzes: Quiz[] = [
  {
    id: "rarete",
    icon: Shield,
    label: "Rareté",
    color: "#F7931A",
    question: "Combien de bitcoins existeront au maximum ?",
    options: ["100 millions", "21 millions", "1 milliard", "Illimité"],
    correct: 1,
    explanation:
      "La limite de 21 millions est inscrite dans le code de Bitcoin depuis 2009. Aucune autorité ne peut la modifier unilatéralement.",
  },
  {
    id: "decentralise",
    icon: Lock,
    label: "Décentralisé",
    color: "#D97706",
    question: "Qui contrôle le réseau Bitcoin ?",
    options: [
      "Satoshi Nakamoto",
      "La Bitcoin Foundation",
      "Personne — des milliers de nœuds répartis",
      "Les grands mineurs chinois",
    ],
    correct: 2,
    explanation:
      "Plus de 15 000 nœuds indépendants font respecter les règles. Aucune entité ne peut imposer un changement sans consensus.",
  },
  {
    id: "historique",
    icon: Clock,
    label: "Historique",
    color: "#B45309",
    question: "En quelle année le réseau Bitcoin a-t-il démarré ?",
    options: ["2001", "2009", "2013", "2017"],
    correct: 1,
    explanation:
      "Le bloc genesis a été miné le 3 janvier 2009 par Satoshi Nakamoto. Le réseau tourne sans interruption majeure depuis.",
  },
  {
    id: "sans-frontieres",
    icon: Globe,
    label: "Sans frontières",
    color: "#F7931A",
    question: "Pour envoyer du bitcoin à l'autre bout du monde, il faut…",
    options: [
      "L'accord d'une banque",
      "Attendre les jours ouvrés",
      "Juste une connexion internet",
      "Un compte vérifié KYC",
    ],
    correct: 2,
    explanation:
      "Bitcoin fonctionne 24h/24, 7j/7, sans intermédiaire. Via Lightning, c'est instantané pour quelques centimes.",
  },
  {
    id: "performance",
    icon: TrendingUp,
    label: "Performance",
    color: "#D97706",
    question: "Quel actif a eu la meilleure performance annualisée de la décennie ?",
    options: ["L'or", "Le S&P 500", "L'immobilier", "Bitcoin"],
    correct: 3,
    explanation:
      "Bitcoin surperforme toutes les classes d'actifs sur 10 ans. Volatile à court terme, mais imbattable sur le long terme.",
  },
  {
    id: "lightning",
    icon: Zap,
    label: "Lightning",
    color: "#B45309",
    question: "À quoi sert le Lightning Network ?",
    options: [
      "À miner plus vite",
      "À faire des paiements instantanés et quasi gratuits",
      "À créer de nouveaux bitcoins",
      "À remplacer la blockchain",
    ],
    correct: 1,
    explanation:
      "Lightning est la couche 2 de Bitcoin : des millions de transactions par seconde, quasi gratuites, instantanées.",
  },
];

const SLICE_ANGLE = 360 / quizzes.length;
const WHEEL_RADIUS = 160;
const WHEEL_CENTER = 180;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function slicePath(index: number) {
  const start = index * SLICE_ANGLE;
  const end = start + SLICE_ANGLE;
  const p1 = polarToCartesian(WHEEL_CENTER, WHEEL_CENTER, WHEEL_RADIUS, start);
  const p2 = polarToCartesian(WHEEL_CENTER, WHEEL_CENTER, WHEEL_RADIUS, end);
  const largeArc = SLICE_ANGLE > 180 ? 1 : 0;
  return `M ${WHEEL_CENTER} ${WHEEL_CENTER} L ${p1.x} ${p1.y} A ${WHEEL_RADIUS} ${WHEEL_RADIUS} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;
}

type AnswerState = "idle" | "correct" | "wrong";

const WheelQuizSection = () => {
  const controls = useAnimation();
  const rotationRef = useRef(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());

  const remaining = useMemo(
    () => quizzes.filter((q) => !answeredIds.has(q.id)),
    [answeredIds],
  );
  const allDone = remaining.length === 0;

  const handleSpin = async () => {
    if (isSpinning || activeQuiz || allDone) return;
    setIsSpinning(true);
    setSelected(null);
    setAnswerState("idle");

    const pool = remaining.length > 0 ? remaining : quizzes;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const pickIndex = quizzes.findIndex((q) => q.id === pick.id);

    const sliceCenter = pickIndex * SLICE_ANGLE + SLICE_ANGLE / 2;
    const turns = 5 + Math.floor(Math.random() * 3);
    const target = turns * 360 + (360 - sliceCenter);
    const nextRotation = rotationRef.current + (target - (rotationRef.current % 360));

    await controls.start({
      rotate: nextRotation,
      transition: { duration: 4.2, ease: [0.16, 1, 0.3, 1] },
    });

    rotationRef.current = nextRotation;
    setIsSpinning(false);
    setActiveQuiz(pick);
  };

  const handleAnswer = (index: number) => {
    if (!activeQuiz || answerState !== "idle") return;
    setSelected(index);
    const ok = index === activeQuiz.correct;
    setAnswerState(ok ? "correct" : "wrong");
    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    setAnsweredIds((prev) => new Set(prev).add(activeQuiz.id));
  };

  const handleNext = () => {
    setActiveQuiz(null);
    setSelected(null);
    setAnswerState("idle");
  };

  const handleReset = () => {
    setScore({ correct: 0, total: 0 });
    setAnsweredIds(new Set());
    setActiveQuiz(null);
    setSelected(null);
    setAnswerState("idle");
  };

  return (
    <section id="quiz" className="py-14 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="mb-10 md:mb-14 max-w-xl">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-btc-orange mb-4">
            Testez vos connaissances
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            La roue des fondamentaux
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[55ch]">
            Faites tourner la roue et répondez aux 6 QCM pour vérifier si vous avez bien capté l'essentiel de Bitcoin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Wheel */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Pointer */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20 pointer-events-none">
                <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[22px] border-t-btc-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              </div>

              <motion.svg
                width={WHEEL_CENTER * 2}
                height={WHEEL_CENTER * 2}
                viewBox={`0 0 ${WHEEL_CENTER * 2} ${WHEEL_CENTER * 2}`}
                animate={controls}
                initial={{ rotate: 0 }}
                style={{ originX: "50%", originY: "50%" }}
                className="max-w-full h-auto drop-shadow-[0_10px_30px_rgba(247,147,26,0.15)]"
              >
                <circle
                  cx={WHEEL_CENTER}
                  cy={WHEEL_CENTER}
                  r={WHEEL_RADIUS + 6}
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--border))"
                  strokeWidth={2}
                />
                {quizzes.map((q, i) => {
                  const Icon = q.icon;
                  const labelAngle = i * SLICE_ANGLE + SLICE_ANGLE / 2;
                  const labelPos = polarToCartesian(
                    WHEEL_CENTER,
                    WHEEL_CENTER,
                    WHEEL_RADIUS * 0.62,
                    labelAngle,
                  );
                  const iconPos = polarToCartesian(
                    WHEEL_CENTER,
                    WHEEL_CENTER,
                    WHEEL_RADIUS * 0.82,
                    labelAngle,
                  );
                  const answered = answeredIds.has(q.id);
                  return (
                    <g key={q.id}>
                      <path
                        d={slicePath(i)}
                        fill={q.color}
                        opacity={answered ? 0.35 : 0.92}
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
                      <g
                        transform={`translate(${labelPos.x}, ${labelPos.y}) rotate(${labelAngle})`}
                      >
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize={13}
                          fontWeight={700}
                          style={{ letterSpacing: "0.02em" }}
                        >
                          {q.label}
                        </text>
                      </g>
                      <g transform={`translate(${iconPos.x - 10}, ${iconPos.y - 10})`}>
                        <Icon width={20} height={20} color="#fff" strokeWidth={2} />
                      </g>
                    </g>
                  );
                })}
                <circle
                  cx={WHEEL_CENTER}
                  cy={WHEEL_CENTER}
                  r={26}
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--btc-orange))"
                  strokeWidth={2}
                />
                <text
                  x={WHEEL_CENTER}
                  y={WHEEL_CENTER + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(var(--btc-orange))"
                  fontSize={16}
                  fontWeight={800}
                >
                  ₿
                </text>
              </motion.svg>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={handleSpin}
                disabled={isSpinning || !!activeQuiz || allDone}
                size="lg"
                className="bg-btc-orange hover:bg-btc-orange/90 text-white font-semibold px-8"
              >
                {isSpinning ? "La roue tourne…" : allDone ? "Terminé !" : "Faire tourner la roue"}
              </Button>
              {score.total > 0 && (
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4" />
                  Recommencer
                </Button>
              )}
            </div>
          </div>

          {/* Panel: question / score / intro */}
          <div className="min-h-[360px]">
            {!activeQuiz && !allDone && score.total === 0 && (
              <div className="p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-btc-orange/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-btc-orange" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold">Comment ça marche</h3>
                </div>
                <ol className="space-y-2 text-muted-foreground text-sm leading-relaxed list-decimal list-inside">
                  <li>Cliquez sur « Faire tourner la roue »</li>
                  <li>La roue s'arrête sur un des 6 fondamentaux</li>
                  <li>Répondez au QCM qui s'affiche</li>
                  <li>Refaites tourner jusqu'à avoir couvert les 6 thèmes</li>
                </ol>
                <p className="mt-5 text-xs text-muted-foreground/80">
                  Les thèmes déjà répondus apparaîtront grisés sur la roue.
                </p>
              </div>
            )}

            {!activeQuiz && score.total > 0 && !allDone && (
              <div className="p-8 rounded-2xl bg-card border border-border">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-btc-orange mb-3">
                  Score
                </p>
                <p className="text-4xl font-bold mb-2">
                  {score.correct} / {score.total}
                </p>
                <p className="text-muted-foreground text-sm">
                  Encore {quizzes.length - score.total} thème
                  {quizzes.length - score.total > 1 ? "s" : ""} à découvrir. Refaites tourner la roue !
                </p>
              </div>
            )}

            {allDone && !activeQuiz && (
              <div className="p-8 rounded-2xl bg-card border border-btc-orange/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-btc-orange/15 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-btc-orange" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold">Bravo, partie terminée !</h3>
                </div>
                <p className="text-4xl font-bold mb-2">
                  {score.correct} / {score.total}
                </p>
                <p className="text-muted-foreground text-sm mb-5">
                  {score.correct === score.total
                    ? "Sans-faute. Vous avez tout compris des fondamentaux de Bitcoin."
                    : score.correct >= 4
                      ? "Beau score ! Relisez les fondamentaux sur lesquels vous avez buté."
                      : "Un petit tour sur les fondamentaux plus haut, et vous y serez."}
                </p>
                <Button onClick={handleReset} className="bg-btc-orange hover:bg-btc-orange/90 text-white">
                  <RotateCcw className="w-4 h-4" />
                  Rejouer
                </Button>
              </div>
            )}

            {activeQuiz && (
              <motion.div
                key={activeQuiz.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-btc-orange/10 flex items-center justify-center">
                    <activeQuiz.icon className="w-5 h-5 text-btc-orange" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-xs tracking-[0.3em] uppercase text-btc-orange">
                    {activeQuiz.label}
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-6 tracking-tight">
                  {activeQuiz.question}
                </h3>

                <div className="space-y-2.5 mb-5">
                  {activeQuiz.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === activeQuiz.correct;
                    const revealed = answerState !== "idle";
                    let cls =
                      "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200";
                    if (!revealed) {
                      cls += " border-border hover:border-btc-orange/50 hover:bg-btc-orange/5 cursor-pointer";
                    } else if (isCorrect) {
                      cls += " border-green-500/60 bg-green-500/10 text-foreground";
                    } else if (isSelected) {
                      cls += " border-red-500/60 bg-red-500/10 text-foreground";
                    } else {
                      cls += " border-border opacity-60";
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleAnswer(i)}
                        disabled={revealed}
                        className={cls}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span>{opt}</span>
                          {revealed && isCorrect && (
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                          )}
                          {revealed && isSelected && !isCorrect && (
                            <X className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {answerState !== "idle" && (
                  <>
                    <div
                      className={`text-sm p-4 rounded-lg border mb-5 ${
                        answerState === "correct"
                          ? "border-green-500/40 bg-green-500/5 text-foreground"
                          : "border-red-500/40 bg-red-500/5 text-foreground"
                      }`}
                    >
                      <p className="font-semibold mb-1">
                        {answerState === "correct" ? "Bien vu !" : "Raté."}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {activeQuiz.explanation}
                      </p>
                    </div>
                    <Button
                      onClick={handleNext}
                      className="bg-btc-orange hover:bg-btc-orange/90 text-white w-full sm:w-auto"
                    >
                      {remaining.length > 0 ? "Continuer" : "Voir le score final"}
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WheelQuizSection;
