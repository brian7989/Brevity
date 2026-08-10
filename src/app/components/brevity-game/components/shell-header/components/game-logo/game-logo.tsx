import Link from "next/link";

import { GameLogoDot } from "./components";

type GameLogoProps = { homeLabel: string };

export function GameLogo({ homeLabel }: GameLogoProps) {
  return (
    <Link className="wordmark" href="/" aria-label={homeLabel}>
      Brevity
      <GameLogoDot />
    </Link>
  );
}
