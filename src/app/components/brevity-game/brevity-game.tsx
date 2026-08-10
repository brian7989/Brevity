"use client";

import { ChallengeRound, useChallengeSession } from "@/features/challenge";
import { DevToolbar } from "@/features/dev-tools";
import { ResultView } from "@/features/results";
import type { AppLocale } from "@/i18n";

import { ShellFooter, ShellHeader } from "./components";

type BrevityGameProps = { aiConfigured: boolean; development: boolean; language: AppLocale };

export function BrevityGame({ aiConfigured, development, language }: BrevityGameProps) {
  const game = useChallengeSession(language);
  const disabled = game.status === "scoring" || game.status === "loading";

  return (
    <main className="game-shell">
      <ShellHeader language={language} streak={game.streak} />

      {game.status === "complete" && game.result ? (
        <ResultView
          challenge={game.challenge}
          result={{ ...game.result, localDate: game.result.completedAt.slice(0, 10) }}
          streak={game.streak}
        />
      ) : (
        <ChallengeRound
          aiConfigured={aiConfigured}
          answer={game.answer}
          challenge={game.challenge}
          disabled={disabled}
          onAnswerChange={game.setAnswer}
          onSubmit={() => void game.submit()}
          status={game.status}
        />
      )}

      <ShellFooter />

      {development ? (
        <DevToolbar
          challengeId={game.challenge.id}
          challenges={game.challenges}
          onNext={game.nextChallenge}
          onPrevious={game.previousChallenge}
          onReset={game.resetAttempt}
          onSelect={game.selectChallenge}
        />
      ) : null}
    </main>
  );
}
