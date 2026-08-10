import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const componentRoots = [path.join(sourceRoot, "app", "components"), path.join(sourceRoot, "features")];
const errors = [];

for (const file of walk(sourceRoot)) {
  if (file.endsWith(".tsx")) checkOneComponentPerFile(file);
}

for (const directory of unique(walkDirectories(componentRoots))) {
  if (isComponentDirectory(directory)) checkComponentDirectoryBarrel(directory);
}

for (const file of walk(path.join(sourceRoot, "features"))) {
  if (file.endsWith(".tsx") || file.endsWith(".ts")) checkFeatureImportBoundary(file);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

function checkOneComponentPerFile(file) {
  const source = readFileSync(file, "utf8");
  const componentDeclarations = source.match(/(?:export\s+)?function\s+[A-Z][A-Za-z0-9_]*\s*\(/g) ?? [];
  const forwardedComponents = source.match(/export\s+const\s+[A-Z][A-Za-z0-9_]*\s*=\s*forwardRef/g) ?? [];
  const primitiveAliases =
    source.match(/export\s+const\s+[A-Z][A-Za-z0-9_]*\s*=\s*[A-Z][A-Za-z0-9_]*Primitive\./g) ?? [];
  const count = componentDeclarations.length + forwardedComponents.length + primitiveAliases.length;

  if (count > 1) errors.push(`${relative(file)} declares ${count} components. Keep one component per file.`);
}

function checkComponentDirectoryBarrel(directory) {
  const ownComponent = path.join(directory, `${path.basename(directory)}.tsx`);
  const hasOwnComponent = exists(ownComponent);
  const hasChildComponents = exists(path.join(directory, "components"));
  const hasBarrel = exists(path.join(directory, "index.ts"));

  if ((hasOwnComponent || hasChildComponents) && !hasBarrel) {
    errors.push(`${relative(directory)} is a component folder but has no local index.ts barrel.`);
  }
}

function checkFeatureImportBoundary(file) {
  const featureName = featureFor(file);
  if (!featureName) return;

  const source = readFileSync(file, "utf8");
  const imports = [...source.matchAll(/from\s+["']@\/features\/([^/"']+)\/([^"']+)["']/g)];

  for (const [, importedFeature, importedPath] of imports) {
    if (importedFeature === featureName) continue;
    if (importedPath === "schemas" || importedPath.startsWith("schemas/")) continue;

    errors.push(
      `${relative(file)} imports @/features/${importedFeature}/${importedPath}. Cross-feature imports must use the feature barrel or schemas only.`,
    );
  }
}

function featureFor(file) {
  const match = relative(file).match(/^src\/features\/([^/]+)\//);
  return match?.[1] ?? null;
}

function isComponentDirectory(directory) {
  return (
    directory.split(path.sep).includes("components") || exists(path.join(directory, `${path.basename(directory)}.tsx`))
  );
}

function walkDirectories(roots) {
  return roots.flatMap((directory) => (exists(directory) ? [directory, ...walk(directory).map(path.dirname)] : []));
}

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry);
    if (entry === "node_modules" || entry === ".next") return [];
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function exists(target) {
  try {
    statSync(target);
    return true;
  } catch {
    return false;
  }
}

function unique(values) {
  return [...new Set(values)];
}

function relative(target) {
  return path.relative(root, target);
}
