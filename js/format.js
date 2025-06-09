export function toggleFormat(callback) {
  const textarea = document.getElementById("editor");
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const formattedText = callback(selectedText);

  textarea.setRangeText(formattedText, start, end, "end");
}

export const boldCallback = (text) => {
  return text.startsWith("**") && text.endsWith("**")
    ? text.slice(2, -2)
    : `**${text}**`;
};

export const italicCallback = (text) => {
  return text.startsWith("*") && text.endsWith("*")
    ? text.slice(1, -1)
    : `*${text}*`;
};

