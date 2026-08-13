"use client";

import { useCallback, useState } from "react";

export type WorkspacePhase = "reading" | "writing";

export function useWorkspacePhase(answer: string) {
  const [phase, setPhase] = useState<WorkspacePhase>(answer ? "writing" : "reading");

  const showReading = useCallback(() => setPhase("reading"), []);
  const showWriting = useCallback(() => setPhase("writing"), []);

  return { phase, showReading, showWriting };
}
