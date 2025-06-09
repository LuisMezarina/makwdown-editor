const input = document.getElementById("markdown-input");
const preview = document.getElementById("preview");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const clearBtn = document.getElementById("clear-btn");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");

// Vista previa en tiempo real
input.addEventListener("input", () => {
  const markdownText = input.value;
  preview.innerHTML = marked.parse(markdownText);
  updateCounter(markdownText);
});

// Negrita
boldBtn.addEventListener("click", () => {
  formatSelection("**");
});

// Cursiva
italicBtn.addEventListener("click", () => {
  formatSelection("*");
});

// Limpiar
clearBtn.addEventListener("click", () => {
  input.value = "";
  preview.innerHTML = "";
  updateCounter("");
});

// Funciones auxiliares
function formatSelection(wrapper) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const selected = input.value.substring(start, end);
  const formatted = `${wrapper}${selected}${wrapper}`;
  input.setRangeText(formatted, start, end, "end");
  input.dispatchEvent(new Event("input")); // Actualiza vista previa
}

function updateCounter(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = words.length;
  charCount.textContent = text.length;
}
