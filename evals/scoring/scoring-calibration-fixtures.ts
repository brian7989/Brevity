export const calibrationKinds = [
  "excellent-concise",
  "excellent-verbose",
  "short-missed-point",
  "mostly-correct-unclear",
  "missing-causal-relationship",
  "irrelevant",
] as const;

export const scoringFixtures = [
  {
    challengeId: "challenge-01",
    answers: [
      fixture(
        "excellent-concise",
        "The mobile app launch is delayed one week to fix inaccessible checkout labels; the web experience still works.",
        "A",
        "A",
      ),
      fixture(
        "excellent-verbose",
        "Final accessibility testing found that several mobile checkout buttons lacked labels that screen readers could identify, so the team is postponing Tuesday's app launch by one week to correct and retest them; customers can continue using the unaffected web experience.",
        "A",
        "A",
      ),
      fixture("short-missed-point", "Marketing paused its campaign.", "D", "A"),
      fixture(
        "mostly-correct-unclear",
        "It moves a week because those labels there do not work, though the other version does.",
        "B",
        "C",
      ),
      fixture(
        "missing-causal-relationship",
        "The mobile app launches next week, and the web experience still works.",
        "C",
        "A",
      ),
      fixture("irrelevant", "K-pop.", "D", "D"),
    ],
  },
  {
    challengeId: "challenge-06",
    answers: [
      fixture(
        "excellent-concise",
        "Stop charging Atlas kits with AT7 serial numbers and return them; replacement batteries ship within five business days.",
        "A",
        "A",
      ),
      fixture(
        "excellent-verbose",
        "A recalled battery batch has overheated, so customers whose Atlas kit serial number starts with AT7 should stop charging the kit, use today's emailed prepaid return label, and expect a replacement within five business days.",
        "A",
        "A",
      ),
      fixture("short-missed-point", "Some batteries overheated.", "C", "A"),
      fixture(
        "mostly-correct-unclear",
        "Those AT7 ones should not do it and need to go back for another in five days.",
        "B",
        "C",
      ),
      fixture("missing-causal-relationship", "Return every Atlas field kit for a replacement battery.", "C", "A"),
      fixture("irrelevant", "The weather is warm.", "D", "D"),
    ],
  },
  {
    challengeId: "challenge-22",
    answers: [
      fixture(
        "excellent-concise",
        "Billing migrated without lost transactions; 3% may receive duplicate invoices, but nobody was charged twice.",
        "A",
        "A",
      ),
      fixture(
        "excellent-verbose",
        "The overnight billing migration preserved every transaction, although a restarted notification job means roughly 3% of customers may receive duplicate invoice emails; these are messages only, not duplicate charges, and engineering is stopping the remaining sends.",
        "A",
        "A",
      ),
      fixture("short-missed-point", "The billing migration completed.", "C", "A"),
      fixture(
        "mostly-correct-unclear",
        "It moved fine, but three percent may see the same thing twice without it actually happening twice.",
        "B",
        "C",
      ),
      fixture(
        "missing-causal-relationship",
        "Three percent of customers were charged twice after the migration.",
        "D",
        "A",
      ),
      fixture("irrelevant", "K-pop is popular.", "D", "D"),
    ],
  },
] as const;

function fixture(
  kind: (typeof calibrationKinds)[number],
  answer: string,
  signal: "A" | "B" | "C" | "D",
  clarity: "A" | "B" | "C" | "D",
) {
  return { kind, answer, signal, clarity } as const;
}
