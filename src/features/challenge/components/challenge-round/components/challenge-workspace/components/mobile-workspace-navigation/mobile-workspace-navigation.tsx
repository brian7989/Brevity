import { ArrowLeft, PenLine } from "lucide-react";

import { Button } from "@/components";

import type { WorkspacePhase } from "../../hooks";

type MobileWorkspaceNavigationProps = {
  backLabel: string;
  onShowReading: () => void;
  onShowWriting: () => void;
  phase: WorkspacePhase;
  writeLabel: string;
};

export function MobileWorkspaceNavigation({
  backLabel,
  onShowReading,
  onShowWriting,
  phase,
  writeLabel,
}: MobileWorkspaceNavigationProps) {
  return (
    <nav className="mobile-workspace-navigation" aria-label={phase === "reading" ? writeLabel : backLabel}>
      {phase === "reading" ? (
        <Button className="mobile-workspace-navigation__write" type="button" onClick={onShowWriting}>
          <PenLine aria-hidden="true" size={16} />
          {writeLabel}
        </Button>
      ) : (
        <Button className="mobile-workspace-navigation__back" type="button" variant="quiet" onClick={onShowReading}>
          <ArrowLeft aria-hidden="true" size={15} />
          {backLabel}
        </Button>
      )}
    </nav>
  );
}
