import { ChallengeTitleAccent, ChallengeTitlePrimary } from "./components";

type ChallengeHeadlineProps = { accent: string; primary: string };

export function ChallengeHeadline({ accent, primary }: ChallengeHeadlineProps) {
  return (
    <div className="challenge__heading">
      <h1 id="challenge-title">
        <ChallengeTitlePrimary text={primary} /> <ChallengeTitleAccent text={accent} />
      </h1>
    </div>
  );
}
