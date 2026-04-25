import { useMemo, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
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
      transition: { duration: 3.6, ease: [0.16, 1, 0.3, 1] },
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

  const progressDots = (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={quizzes.length}
      aria-valuenow={answeredIds.size}
      aria-label={`Progression du quiz : ${answeredIds.size} sur ${quizzes.length} questions répondues`}
      className="flex items-center gap-1.5"
    >
      {quizzes.map((q) => {
        const answered = answeredIds.has(q.id);
        return (
          <span
            key={q.id}
            aria-hidden="true"
            className={`w-2 h-2 rounded-full transition-colors ${
              answered ? "bg-btc-orange" : "bg-border"
            }`}
          />
        );
      })}
    </div>
  );

  return (
    <section id="quiz" className="py-10 md:py-20 relative">
      <div className="container mx-auto px-6">
        {/* Compact header */}
        <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-btc-orange mb-2 md:mb-3">
            Testez vos connaissances
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-2 md:mb-3">
            La roue des fondamentaux
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Faites tourner la roue, répondez aux 6 QCM.
          </p>
        </div>

        {/* Single-stage container: wheel ↔ quiz ↔ summary (fixed min-h to avoid jumps) */}
        <div className="max-w-xl mx-auto">
          {/* Score / progress bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            {progressDots}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                {score.correct}/{quizzes.length}
              </span>
              {score.total > 0 && !allDone && (
                <button
                  onClick={handleReset}
                  className="text-xs text-muted-foreground hover:text-btc-orange transition-colors inline-flex items-center gap-1"
                  aria-label="Recommencer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {!activeQuiz && !allDone && (
                <motion.div
                  key="wheel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    {/* Pointer */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-20 pointer-events-none">
                      <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-btc-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                    </div>

                    <motion.svg
                      width={WHEEL_CENTER * 2}
                      height={WHEEL_CENTER * 2}
                      viewBox={`0 0 ${WHEEL_CENTER * 2} ${WHEEL_CENTER * 2}`}
                      animate={controls}
                      initial={{ rotate: 0 }}
                      style={{ originX: "50%", originY: "50%" }}
                      onClick={handleSpin}
                      role="button"
                      tabIndex={isSpinning ? -1 : 0}
                      aria-label="Faire tourner la roue des fondamentaux"
                      aria-disabled={isSpinning}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSpin();
                        }
                      }}
                      className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] drop-shadow-[0_10px_30px_rgba(247,147,26,0.15)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-btc-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
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
                              opacity={answered ? 0.3 : 0.92}
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
                                fontSize={14}
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
                        r={30}
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
                        fontSize={20}
                        fontWeight={800}
                      >
                        ₿
                      </text>
                    </motion.svg>
                  </div>

                  <Button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    size="lg"
                    className="mt-5 bg-btc-orange hover:bg-btc-orange/90 text-white font-semibold px-8 shadow-lg shadow-btc-orange/20"
                  >
                    {isSpinning ? "La roue tourne…" : score.total === 0 ? "Faire tourner la roue" : "Tour suivant"}
                  </Button>
                </motion.div>
              )}

              {activeQuiz && (
                <motion.div
                  key={`quiz-${activeQuiz.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 md:p-7 rounded-2xl bg-card border border-border shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-btc-orange/10 flex items-center justify-center shrink-0">
                      <activeQuiz.icon className="w-4 h-4 text-btc-orange" strokeWidth={1.5} />
                    </div>
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-btc-orange">
                      {activeQuiz.label}
                    </p>
                  </div>

                  <h3
                    id={`quiz-question-${activeQuiz.id}`}
                    className="text-lg md:text-xl font-semibold mb-4 md:mb-5 tracking-tight leading-snug"
                  >
                    {activeQuiz.question}
                  </h3>

                  <div
                    role="radiogroup"
                    aria-labelledby={`quiz-question-${activeQuiz.id}`}
                    className="space-y-2 mb-4"
                  >
                    {activeQuiz.options.map((opt, i) => {
                      const isSelected = selected === i;
                      const isCorrect = i === activeQuiz.correct;
                      const revealed = answerState !== "idle";
                      let cls =
                        "w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all duration-200";
                      if (!revealed) {
                        cls +=
                          " border-border hover:border-btc-orange/50 hover:bg-btc-orange/5 cursor-pointer active:scale-[0.99]";
                      } else if (isCorrect) {
                        cls += " border-green-500/60 bg-green-500/10 text-foreground";
                      } else if (isSelected) {
                        cls += " border-red-500/60 bg-red-500/10 text-foreground";
                      } else {
                        cls += " border-border opacity-60";
                      }
                      const revealLabel = revealed
                        ? isCorrect
                          ? " (bonne réponse)"
                          : isSelected
                            ? " (votre réponse, incorrecte)"
                            : ""
                        : "";
                      return (
                        <button
                          key={i}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          aria-label={`${opt}${revealLabel}`}
                          onClick={() => handleAnswer(i)}
                          disabled={revealed}
                          className={cls}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span>{opt}</span>
                            {revealed && isCorrect && (
                              <Check className="w-4 h-4 text-green-500 shrink-0" aria-hidden="true" />
                            )}
                            {revealed && isSelected && !isCorrect && (
                              <X className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {answerState !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        role="status"
                        aria-live="polite"
                        className={`text-sm p-3.5 rounded-lg border mb-3 ${
                          answerState === "correct"
                            ? "border-green-500/40 bg-green-500/5"
                            : "border-red-500/40 bg-red-500/5"
                        }`}
                      >
                        <p className="font-semibold mb-1">
                          {answerState === "correct" ? "Bien vu !" : "Raté."}
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-[13px]">
                          {activeQuiz.explanation}
                        </p>
                      </div>
                      <Button
                        onClick={handleNext}
                        className="bg-btc-orange hover:bg-btc-orange/90 text-white w-full"
                      >
                        {remaining.length > 0 ? "Tour suivant" : "Voir le score"}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {allDone && !activeQuiz && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 md:p-8 rounded-2xl bg-card border border-btc-orange/40 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-btc-orange/15 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-7 h-7 text-btc-orange" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-btc-orange mb-2">
                    Score final
                  </p>
                  <p className="text-5xl font-bold mb-3">
                    {score.correct}
                    <span className="text-2xl text-muted-foreground font-normal"> / {score.total}</span>
                  </p>
                  <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
                    {score.correct === score.total
                      ? "Sans-faute. Vous avez tout compris des fondamentaux de Bitcoin."
                      : score.correct >= 4
                        ? "Beau score ! Relisez les fondamentaux sur lesquels vous avez buté."
                        : "Un petit tour sur les fondamentaux plus haut, et vous y serez."}
                  </p>
                  <Button
                    onClick={handleReset}
                    className="bg-btc-orange hover:bg-btc-orange/90 text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Rejouer
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WheelQuizSection;
