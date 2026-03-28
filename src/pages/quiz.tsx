import { useState, useCallback } from "react";
import type { GetStaticProps } from "next";
import type { Champion } from "@/types/champion";
import PageShell from "@/components/layout/PageShell";
import QuizSetup from "@/components/quiz/QuizSetup";
import QuizQuestionCard from "@/components/quiz/QuizQuestion";
import QuizResult from "@/components/quiz/QuizResult";
import { buildQuiz } from "@/utils/quiz";
import { buildChampionQuiz } from "@/utils/championQuiz";
import type { QuizCategory, QuestionCount, QuizQuestion, QuizResult as QResult } from "@/utils/quiz";
import championsData from "../../data/champions.json";

interface Props {
  champions: Champion[];
}

type Screen = "setup" | "question" | "result";

export default function QuizPage({ champions }: Props) {
  const [screen, setScreen]         = useState<Screen>("setup");
  const [questions, setQuestions]   = useState<QuizQuestion[]>([]);
  const [current, setCurrent]       = useState(0);
  const [results, setResults]       = useState<QResult[]>([]);
  const [streak, setStreak]         = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [lastConfig, setLastConfig] = useState<{
    category: QuizCategory;
    count: QuestionCount;
  } | null>(null);

  const startQuiz = useCallback(
    (category: QuizCategory, count: QuestionCount) => {
      let qs: QuizQuestion[];
      if (category === "champions") {
        const n = count === "all" ? champions.length : Math.min(count as number, champions.length);
        qs = buildChampionQuiz(champions, n);
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
    [champions]
  );

  const handleAnswer = useCallback(
    (chosen: string) => {
      const question = questions[current];
      const correct  = chosen === question.correctAnswer;

      const newStreak = correct ? streak + 1 : 0;
      setStreak(newStreak);
      setBestStreak((prev) => Math.max(prev, newStreak));

      const newResults: QResult[] = [...results, { question, chosen, correct }];
      setResults(newResults);

      if (current + 1 >= questions.length) {
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
        <QuizSetup onStart={startQuiz} championsCount={champions.length} />
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
        />
      )}
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      champions: championsData as Champion[],
    },
  };
};
