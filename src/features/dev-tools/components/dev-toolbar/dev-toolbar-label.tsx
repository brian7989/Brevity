type DevToolbarLabelProps = { label: string };

export function DevToolbarLabel({ label }: DevToolbarLabelProps) {
  return <span className="dev-toolbar__label">{label}</span>;
}
