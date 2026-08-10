import { describe, expect, it } from "vitest";

import { localContentRepository } from "@/features/challenge/repository";

describe("localContentRepository", () => {
  it("loads and finds validated English content", () => {
    expect(localContentRepository.list("en")).toHaveLength(30);
    expect(localContentRepository.find("en", "challenge-01")?.difficulty).toBe("easy");
  });

  it("loads native Korean content independently", () => {
    expect(localContentRepository.list("ko")).toHaveLength(10);
    expect(localContentRepository.find("ko", "ko-challenge-01")?.language).toBe("ko");
  });
});
