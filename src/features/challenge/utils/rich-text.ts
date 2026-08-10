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
  if (typeof window === "undefined") return "";
  const parsed = new DOMParser().parseFromString(value, "text/html");
  for (const element of Array.from(parsed.body.querySelectorAll("*"))) {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }
    for (const attribute of Array.from(element.attributes)) element.removeAttribute(attribute.name);
  }
  return parsed.body.innerHTML;
}
