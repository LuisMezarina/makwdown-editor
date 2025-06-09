export function highlightCodeBlocks(text) {
  return text.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    return `<pre><code class="highlighted">${escapeHTML(code)}</code></pre>`;
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
