document.addEventListener('DOMContentLoaded', () => {
   
    const markdownInput = document.getElementById('markdown-input');
    const previewContent = document.getElementById('preview-content');
    const generatePreviewBtn = document.getElementById('generate-preview');
    
  
    generatePreviewBtn.addEventListener('click', () => {
        const markdown = markdownInput.value;
        previewContent.innerHTML = convertMarkdownToHtml(markdown);
    });
    
    function convertMarkdownToHtml(markdown) {
        // Encabezados
        let html = markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>');
        
        // Listas no ordenadas
        html = html.replace(/^-\s(.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)+/gms, '<ul>$&</ul>');
        
        // Listas ordenadas
        html = html.replace(/^\d+\.\s(.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)+/gms, '<ol>$&</ol>');
        
        return html;
    }
});

    // Contrastar Encabezados
    const toggleContrastBtn = document.createElement('button');
    toggleContrastBtn.id = 'toggle-contrast';
    toggleContrastBtn.className = 'bg-white text-blue-600 px-4 py-2 rounded font-medium ml-4';
    toggleContrastBtn.textContent = 'Contrastar Encabezados';
    document.getElementById('toolbar').appendChild(toggleContrastBtn);
    
    toggleContrastBtn.addEventListener('click', () => {
        previewContent.classList.toggle('heading-contrast');
        toggleContrastBtn.textContent = previewContent.classList.contains('heading-contrast') 
            ? 'Quitar Contraste' 
            : 'Contrastar Encabezados';
    });
    
    generatePreviewBtn.click();