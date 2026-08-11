import englishDataset from "../../../evals/scoring/formatting.en.json";
import koreanDataset from "../../../evals/scoring/formatting.ko.json";

import { formattingDatasetSchema } from "./formatting-dataset.schema";

export const formattingFixtures = [englishDataset, koreanDataset].map((dataset) =>
  formattingDatasetSchema.parse(dataset),
);
