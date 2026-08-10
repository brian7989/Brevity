import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "src/app/icon.svg");
const outputDirectory = path.join(projectRoot, "public/icons");
const source = await readFile(sourcePath);

await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  [192, 512].map((size) =>
    sharp(source, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(outputDirectory, `brevity-${size}.png`)),
  ),
);
