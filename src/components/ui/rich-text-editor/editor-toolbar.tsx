import type { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import { EditorBlockStyleSelect } from "./editor-block-style-select";
import { EditorFormatButton } from "./editor-format-button";
import { ToolbarDivider } from "./toolbar-divider";

type EditorToolbarProps = { disabled: boolean; editor: Editor | null };

export function EditorToolbar({ disabled, editor }: EditorToolbarProps) {
  const t = useTranslations("Editor");
  const blockStyle = editor?.isActive("heading", { level: 2 })
    ? "h2"
    : editor?.isActive("heading", { level: 3 })
      ? "h3"
      : editor?.isActive("blockquote")
        ? "quote"
        : "p";

  return (
    <div className="rich-toolbar" role="toolbar" aria-label={t("toolbar")}>
      <EditorBlockStyleSelect
        blockStyle={blockStyle}
        disabled={disabled || !editor}
        onChange={(value) => setBlock(editor, value)}
      />
      <ToolbarDivider />
      <EditorFormatButton
        active={editor?.isActive("bold")}
        disabled={disabled}
        label={t("bold")}
        onPress={() => editor?.chain().focus().toggleBold().run()}
        shortcut="⌘B"
      >
        <strong>B</strong>
      </EditorFormatButton>
      <EditorFormatButton
        active={editor?.isActive("italic")}
        disabled={disabled}
        label={t("italic")}
        onPress={() => editor?.chain().focus().toggleItalic().run()}
        shortcut="⌘I"
      >
        <em>I</em>
      </EditorFormatButton>
      <ToolbarDivider />
      <EditorFormatButton
        active={editor?.isActive("bulletList")}
        disabled={disabled}
        label={t("bulletList")}
        onPress={() => editor?.chain().focus().toggleBulletList().run()}
      >
        • {t("list")}
      </EditorFormatButton>
      <EditorFormatButton
        active={editor?.isActive("orderedList")}
        disabled={disabled}
        label={t("numberedList")}
        onPress={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        1. {t("list")}
      </EditorFormatButton>
    </div>
  );
}

function setBlock(editor: Editor | null, block: string) {
  if (block === "h2") editor?.chain().focus().setHeading({ level: 2 }).run();
  else if (block === "h3") editor?.chain().focus().setHeading({ level: 3 }).run();
  else if (block === "quote") editor?.chain().focus().setBlockquote().run();
  else editor?.chain().focus().setParagraph().run();
}
