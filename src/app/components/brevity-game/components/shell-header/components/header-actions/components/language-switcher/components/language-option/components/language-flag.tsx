type LanguageFlagProps = { flag: string };

export function LanguageFlag({ flag }: LanguageFlagProps) {
  return <span aria-hidden="true">{flag}</span>;
}
