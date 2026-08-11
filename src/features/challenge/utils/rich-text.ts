const ALLOWED_TAGS = new Set(["P", "BR", "STRONG", "B", "EM", "I", "UL", "OL", "LI", "H2", "H3", "BLOCKQUOTE"]);

export function richTextToPlainText(value: string): string {
  return value
    .replace(/<br\s*\/?\s*>/giu, " ")
    .replace(/<\/\s*(p|h2|h3|blockquote|li)>/giu, " ")
    .replace(/<[^>]*>/gu, " ")
    .replace(/&nbsp;/giu, " ")
    .replace(/&amp;/giu, "&")
    .replace(/&lt;/giu, "<")
    .replace(/&gt;/giu, ">")
    .replace(/&quot;/giu, '"')
    .replace(/&#39;/giu, "'")
    .replace(/\s+/gu, " ")
    .replace(/\s+([,.!?;:])/gu, "$1")
    .trim();
}

export function sanitizeRichText(value: string): string {
  return value
    .replace(/<!--.*?-->/gsu, "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/giu, "")
    .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/giu, (tag, name: string) => {
      const upperName = name.toUpperCase();
      if (!ALLOWED_TAGS.has(upperName)) return "";
      const closing = /^<\//u.test(tag);
      if (upperName === "BR") return "<br>";
      return `<${closing ? "/" : ""}${name.toLowerCase()}>`;
    });
}
