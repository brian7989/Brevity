"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { EditorToolbar } from "./editor-toolbar";
import { RichTextEditorFrame } from "./rich-text-editor-frame";

type RichTextEditorProps = { disabled?: boolean; id: string; onChange: (value: string) => void; value: string };

export function RichTextEditor({ disabled = false, id, onChange, value }: RichTextEditorProps) {
  const t = useTranslations("Editor");
  const editor = useEditor({
    content: value,
    editable: !disabled,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({ placeholder: t("placeholder") }),
    ],
    immediatelyRender: false,
    editorProps: { attributes: { id, class: "rich-editor__surface", "aria-label": t("ariaLabel"), role: "textbox" } },
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);
  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  return (
    <RichTextEditorFrame disabled={disabled}>
      <EditorToolbar disabled={disabled} editor={editor} />
      <EditorContent editor={editor} />
    </RichTextEditorFrame>
  );
}
