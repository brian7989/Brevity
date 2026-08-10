import { describe, expect, it } from "vitest";

import { richTextToPlainText } from "@/features/challenge";

describe("richTextToPlainText", () => {
  it("preserves rendered words while removing formatting markup", () => {
    expect(richTextToPlainText("<h2>Revenue update</h2><ul><li>Sales rose <strong>12%</strong>.</li></ul>")).toBe(
      "Revenue update Sales rose 12%.",
    );
  });
});
