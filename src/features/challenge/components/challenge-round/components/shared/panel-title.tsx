type PanelTitleProps = { id?: string; label: string };

export function PanelTitle({ id, label }: PanelTitleProps) {
  return <span id={id}>{label}</span>;
}
