import { useState, useCallback, useEffect } from "react";
import type { GetStaticProps } from "next";
import type { Champion } from "@/types/champion";
import type { Item, ItemsData, Component } from "@/types/item";
import PageShell from "@/components/layout/PageShell";
import QuizSetup from "@/components/quiz/QuizSetup";
import QuizQuestionCard from "@/components/quiz/QuizQuestion";
import QuizResult from "@/components/quiz/QuizResult";
import { buildQuiz } from "@/utils/quiz";
import { buildChampionQuiz } from "@/utils/championQuiz";
import { buildItemQuiz } from "@/utils/itemQuiz";
import { buildItemKnowledgeQuiz } from "@/utils/itemKnowledgeQuiz";
import { buildTraitQuiz } from "@/utils/traitQuiz";
import { buildEmblemQuiz } from "@/utils/emblemQuiz";
import type { QuizCategory, QuestionCount, QuizQuestion, QuizResult as QResult } from "@/utils/quiz";
import type { Trait } from "@/types/trait";
import { loadProficiency, saveProficiency, recordAnswer, getTopicKey, DEFAULT_STORE } from "@/utils/proficiency";
import type { ProficiencyStore } from "@/utils/proficiency";
import championsData from "../../data/champions.json";
import itemsData from "../../data/items.json";
import traitsData from "../../data/traits.json";

interface Props {
  champions: Champion[];
  items: Item[];
  itemMap: Record<string, Item>;
  components: Component[];
  traits: Trait[];
}

type Screen = "setup" | "question" | "result";

export default function QuizPage({ champions, items, itemMap, components, traits }: Props) {
  const [screen, setScreen]         = useState<Screen>("setup");
  const [questions, setQuestions]   = useState<QuizQuestion[]>([]);
  const [current, setCurrent]       = useState(0);
  const [results, setResults]       = useState<QResult[]>([]);
  const [streak, setStreak]         = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [profStore, setProfStore]   = useState<ProficiencyStore>(DEFAULT_STORE);

  const [lastConfig, setLastConfig] = useState<{
    category: QuizCategory;
    count: QuestionCount;
  } | null>(null);

  useEffect(() => {
    setProfStore(loadProficiency());
  }, []);

  const handleResetProficiency = useCallback(() => {
    saveProficiency(DEFAULT_STORE);
    setProfStore(DEFAULT_STORE);
  }, []);

  const startQuiz = useCallback(
    (category: QuizCategory, count: QuestionCount) => {
      let qs: QuizQuestion[];
      if (category === "champions") {
        const n = count === "all" ? champions.length : Math.min(count as number, champions.length);
        qs = buildChampionQuiz(champions, n);
      } else if (category === "item_quiz") {
        const n = count === "all" ? champions.length : (count as number);
        qs = buildItemQuiz(champions, items, itemMap, n);
      } else if (category === "items") {
        const n = count === "all" ? items.length : Math.min(count as number, items.length);
        qs = buildItemKnowledgeQuiz(items, components, n);
      } else if (category === "trait_quiz") {
        const n = count === "all" ? traits.length : Math.min(count as number, traits.length);
        qs = buildTraitQuiz(traits, champions, n);
      } else if (category === "emblem_quiz") {
        const emblemTraits = traits.filter((t) => !t.isUnique);
        const n = count === "all" ? emblemTraits.length : Math.min(count as number, emblemTraits.length);
        qs = buildEmblemQuiz(traits, n);
      } else {
        qs = buildQuiz(category, count);
      }
      setLastConfig({ category, count });
      setQuestions(qs);
      setCurrent(0);
      setResults([]);
      setStreak(0);
      setBestStreak(0);
      setScreen("question");
    },
    [champions, items, itemMap, components, traits]
  );

  const handleAnswer = useCallback(
    (chosen: string) => {
      const question = questions[current];
      const correct  = chosen === question.correctAnswer;

      const newStreak = correct ? streak + 1 : 0;
      setStreak(newStreak);
      const sessionBestStreak = Math.max(bestStreak, newStreak);
      setBestStreak(sessionBestStreak);

      // Update proficiency per-topic answer
      const topicKey = getTopicKey(question.term.category, question.term.term);
      const newResults: QResult[] = [...results, { question, chosen, correct }];
      setResults(newResults);

      const isLastQuestion = current + 1 >= questions.length;

      setProfStore((prev) => {
        // Record per-topic score update
        let updated = recordAnswer(prev, topicKey, correct);
        // Only count the quiz and update longestStreak when all questions are answered
        if (isLastQuestion) {
          updated = {
            ...updated,
            overall: {
              ...updated.overall,
              quizzesTaken: updated.overall.quizzesTaken + 1,
              longestStreak: Math.max(updated.overall.longestStreak, sessionBestStreak),
            },
          };
        }
        saveProficiency(updated);
        return updated;
      });

      if (isLastQuestion) {
        setScreen("result");
      } else {
        setCurrent((c) => c + 1);
      }
    },
    [questions, current, streak, results]
  );

  const playAgain = useCallback(() => {
    if (!lastConfig) return;
    startQuiz(lastConfig.category, lastConfig.count);
  }, [lastConfig, startQuiz]);

  const newQuiz = useCallback(() => {
    setScreen("setup");
  }, []);

  return (
    <PageShell
      title="Quiz"
      subtitle={
        screen === "question"
          ? `Question ${current + 1} of ${questions.length}`
          : screen === "result"
          ? "Results"
          : "Test your TFT knowledge"
      }
    >
      {screen === "setup" && (
        <QuizSetup
          onStart={startQuiz}
          championsCount={champions.length}
          itemsCount={items.length}
          traitsCount={traits.length}
          emblemCount={traits.filter((t) => !t.isUnique).length}
          profStore={profStore}
          onResetProficiency={handleResetProficiency}
        />
      )}

      {screen === "question" && questions[current] && (
        <QuizQuestionCard
          key={questions[current].id}
          question={questions[current]}
          index={current}
          total={questions.length}
          streak={streak}
          onAnswer={handleAnswer}
        />
      )}

      {screen === "result" && (
        <QuizResult
          results={results}
          bestStreak={bestStreak}
          onPlayAgain={playAgain}
          onNewQuiz={newQuiz}
          profStore={profStore}
        />
      )}
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = itemsData as ItemsData;
  const itemMap = Object.fromEntries(data.items.map((item) => [item.id, item]));
  return {
    props: {
      champions: championsData as Champion[],
      items: data.items,
      itemMap,
      components: data.components,
      traits: traitsData as Trait[],
    },
  };
};
