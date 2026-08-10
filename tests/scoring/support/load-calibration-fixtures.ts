import englishDataset from "../../../evals/scoring/calibration.en.json";
import koreanDataset from "../../../evals/scoring/calibration.ko.json";

import { calibrationDatasetSchema } from "./calibration-dataset.schema";

const datasets = [englishDataset, koreanDataset].map((dataset) => calibrationDatasetSchema.parse(dataset));

export const scoringFixtures = datasets.flatMap(({ challenges, language }) =>
  challenges.map((challenge) => ({ ...challenge, language })),
);
