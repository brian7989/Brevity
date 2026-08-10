import { describe, expect, it } from "vitest";

import english from "../../messages/en.json";
import korean from "../../messages/ko.json";

describe("translation messages", () => {
  it("keeps English and Korean message contracts identical", () => {
    expect(messageKeys(korean)).toEqual(messageKeys(english));
  });
});

function messageKeys(value: object, prefix = ""): string[] {
  return Object.entries(value)
    .flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof child === "object" && child !== null ? messageKeys(child, path) : [path];
    })
    .sort();
}
