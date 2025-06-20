const input = document.getElementById("markdown-input");
const preview = document.getElementById("preview");
const errorMsg = document.getElementById("error-message");
const previewBtn = document.getElementById("preview-btn");
const clearBtn = document.getElementById("clear-btn");
const wordCountDisplay = document.getElementById("word-count");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const injectErrorBtn = document.getElementById("inject-error-btn");
const exportPdfBtn = document.getElementById("export-pdf");


// Función para contar palabras y caracteres
function updateWordCount() {
  const text = input.value.trim();
  const words = text === "" ? 0 : text.split(/\s+/).length;
  const chars = text.length;
  wordCountDisplay.textContent = `Palabras: ${words} | Caracteres: ${chars}`;
}

input.addEventListener("input", () => {
  updateWordCount();
});

// Aplicar formato negrita
boldBtn.addEventListener("click", () => {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const selected = input.value.substring(start, end);
  input.setRangeText(`**${selected}**`, start, end, "end");
  input.focus();
});

// Aplicar formato cursiva
italicBtn.addEventListener("click", () => {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const selected = input.value.substring(start, end);
  input.setRangeText(`*${selected}*`, start, end, "end");
  input.focus();
});

// Limpiar todo
clearBtn.addEventListener("click", () => {
  input.value = "";
  preview.innerHTML = "";
  errorMsg.textContent = "";
  wordCountDisplay.textContent = "";
});

// Inyectar error de prueba
injectErrorBtn.addEventListener("click", () => {
  input.value += "\n##EncabezadoMal\n-EsteElementoNoTieneEspacio";
  updateWordCount();
});

// Validar sintaxis Markdown
function validateMarkdown(content) {
  const lines = content.split("\n");
  const errors = [];

  lines.forEach((line, index) => {
    if (/^#{1,6}[^ ]/.test(line)) {
      errors.push(`Línea ${index + 1}: Encabezado sin espacio tras #`);
    }
    if (/^[-+*][^\s]/.test(line)) {
      errors.push(`Línea ${index + 1}: Lista sin espacio tras símbolo`);
    }
  });

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

// Vista previa
previewBtn.addEventListener("click", () => {
  try {
    const markdownText = input.value.trim();
    errorMsg.textContent = "";

    if (!markdownText) {
      throw new Error("No se ingresó contenido");
    }

    validateMarkdown(markdownText);

    const html = marked.parse(markdownText);
    preview.innerHTML = html;
  } catch (err) {
    console.error("Error de marcado:", err.message);
    errorMsg.textContent = err.message;
    preview.innerHTML = "";
  }
});





















































// Exportar vista previa como PDF
exportPdfBtn.addEventListener('click', () => {
  try {
    const content = document.getElementById('preview');

    if (!content || content.innerHTML.trim() === '') {
      alert('No hay contenido para exportar.');
      return;
    }

    const opt = {
      margin: 0.5,
      filename: 'vista-previa-markdown.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(content).set(opt).save();
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    alert('Ocurrió un error al intentar exportar el PDF.');
  }
});