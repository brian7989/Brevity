# Challenge content

English and Korean challenges are repository-backed, version-controlled content. Each challenge is an independently reviewable JSON document loaded through `ChallengeRepository` and validated with Zod at module initialization.

The Korean collection begins with ten native workplace-writing challenges. The UI presents whitespace-delimited counts as 단어 for readability; Korean content and grading should still be calibrated independently from English.

## TODO: move publishing to a CMS or database

Replace `LocalContentRepository` when non-developers need publishing access, scheduling must happen without deployments, personalization requires querying content, or the library grows beyond roughly 100–200 challenges. Preserve the `ChallengeRepository` interface so application features do not depend on the future storage provider.
