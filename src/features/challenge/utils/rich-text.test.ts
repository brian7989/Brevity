import { describe, expect, it } from "vitest";

import { richTextToPlainText, sanitizeRichText } from "@/features/challenge";

describe("richTextToPlainText", () => {
  it("preserves rendered words while removing formatting markup", () => {
    expect(richTextToPlainText("<h2>Revenue update</h2><ul><li>Sales rose <strong>12%</strong>.</li></ul>")).toBe(
      "Revenue update Sales rose 12%.",
    );
  });
});

describe("sanitizeRichText", () => {
  it("preserves safe structure on the server while removing attributes and unsafe tags", () => {
    expect(
      sanitizeRichText(
        '<h2 class="loud">Update</h2><script>alert(1)</script><ul><li><strong style="color:red">Act now</strong></li></ul>',
      ),
    ).toBe("<h2>Update</h2><ul><li><strong>Act now</strong></li></ul>");
  });
});
