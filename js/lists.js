export function parseListLines(lines, transformCallback) {
  return lines.map((line) => {
    const match = line.match(/^\d+\.\s+(.*)/);
    return match ? transformCallback(match[1]) : line;
  });
}

export function listToHTML(text) {
  const lines = text.split("\n");
  const parsed = parseListLines(lines, (item) => `<li>${item}</li>`);
  if (parsed.some((line) => line.startsWith("<li>"))) {
    return `<ol>\n${parsed.join("\n")}\n</ol>`;
  }
  return text;
}

