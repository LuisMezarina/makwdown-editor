import { toggleFormat, boldCallback, italicCallback } from "./format.js";

document.getElementById("btnBold").addEventListener("click", () => {
  toggleFormat(boldCallback);
});

document.getElementById("btnItalic").addEventListener("click", () => {
  toggleFormat(italicCallback);
});

document.getElementById("previewBtn").addEventListener("click", () => {
  const editorText = document.getElementById("editor").value;

  // Activar opciones necesarias
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  const html = marked.parse(editorText);
  document.getElementById("preview").innerHTML = html;
});
