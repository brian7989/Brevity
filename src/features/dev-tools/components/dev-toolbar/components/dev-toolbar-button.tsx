type DevToolbarButtonProps = { ariaLabel?: string; label: string; onPress: () => void };

export function DevToolbarButton({ ariaLabel, label, onPress }: DevToolbarButtonProps) {
  return (
    <button type="button" aria-label={ariaLabel} onClick={onPress}>
      {label}
    </button>
  );
}
