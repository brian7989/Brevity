type AccessibleLanguageNameProps = { label: string };

export function AccessibleLanguageName({ label }: AccessibleLanguageNameProps) {
  return <span className="sr-only">{label}</span>;
}
