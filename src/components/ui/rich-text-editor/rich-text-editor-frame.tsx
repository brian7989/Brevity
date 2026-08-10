import type { ReactNode } from "react";

type RichTextEditorFrameProps = { children: ReactNode; disabled: boolean };

export function RichTextEditorFrame({ children, disabled }: RichTextEditorFrameProps) {
  return <div className={`rich-editor ${disabled ? "rich-editor--disabled" : ""}`}>{children}</div>;
}
