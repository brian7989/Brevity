import type { ReactNode } from "react";

type EditorFormatButtonProps = {
  active?: boolean;
  children: ReactNode;
  disabled: boolean;
  label: string;
  onPress: () => void;
  shortcut?: string;
};

export function EditorFormatButton({
  active = false,
  children,
  disabled,
  label,
  onPress,
  shortcut,
}: EditorFormatButtonProps) {
  return (
    <button
      type="button"
      className={active ? "is-active" : ""}
      aria-label={shortcut ? `${label} (${shortcut})` : label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onPress}
      title={shortcut ? `${label} ${shortcut}` : label}
    >
      {children}
    </button>
  );
}
