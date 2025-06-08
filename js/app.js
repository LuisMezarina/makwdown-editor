document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const previewContent = document.getElementById('preview-content');
    const generatePreviewBtn = document.getElementById('generate-preview');
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    
    let contrastEnabled = false;
    
    
    function convertMarkdownToHtml(markdown) {
        
        let html = markdown
            .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-3">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold mb-2">$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4 class="text-xl font-medium mb-2">$1</h4>')
            .replace(/^##### (.*$)/gm, '<h5 class="text-lg font-medium mb-1">$1</h5>')
            .replace(/^###### (.*$)/gm, '<h6 class="text-base font-medium">$1</h6>');
        
        
        html = html.replace(/^-\s(.*$)/gm, '<li class="ml-4">$1</li>');
        html = html.replace(/(<li class="ml-4">.*<\/li>)+/gms, '<ul class="list-disc ml-6 mb-4">$&</ul>');
        
        
        html = html.replace(/^\d+\.\s(.*$)/gm, '<li class="ml-4">$1</li>');
        html = html.replace(/(<li class="ml-4">.*<\/li>)+/gms, '<ol class="list-decimal ml-6 mb-4">$&</ol>');
        
        
        html = html.replace(/\n\n/g, '<br><br>');
        
        return html;
    }
    
    
    function toggleContrast() {
        const headings = previewContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headings.forEach(heading => {
            if (contrastEnabled) {
                
                heading.classList.add('contrast-heading');
                switch(heading.tagName) {
                    case 'H1':
                        heading.classList.add('text-red-600', 'underline', 'text-4xl');
                        break;
                    case 'H2':
                        heading.classList.add('text-blue-600', 'text-3xl');
                        break;
                    case 'H3':
                        heading.classList.add('text-green-600', 'text-2xl');
                        break;
                    case 'H4':
                        heading.classList.add('text-purple-600', 'text-xl');
                        break;
                    case 'H5':
                        heading.classList.add('text-yellow-600', 'text-lg');
                        break;
                    case 'H6':
                        heading.classList.add('text-pink-600', 'text-base');
                        break;
                }
            } else {
                
                heading.classList.remove('contrast-heading', 
                                       'text-red-600', 'underline',
                                       'text-blue-600', 
                                       'text-green-600',
                                       'text-purple-600',
                                       'text-yellow-600',
                                       'text-pink-600');
                
                switch(heading.tagName) {
                    case 'H1':
                        heading.className = 'text-4xl font-bold mb-4';
                        break;
                    case 'H2':
                        heading.className = 'text-3xl font-bold mb-3';
                        break;
                    case 'H3':
                        heading.className = 'text-2xl font-semibold mb-2';
                        break;
                    case 'H4':
                        heading.className = 'text-xl font-medium mb-2';
                        break;
                    case 'H5':
                        heading.className = 'text-lg font-medium mb-1';
                        break;
                    case 'H6':
                        heading.className = 'text-base font-medium';
                        break;
                }
            }
        });
        
        toggleContrastBtn.textContent = contrastEnabled 
            ? 'Quitar Contraste' 
            : 'Contrastar Encabezados';
    }
    
    
    function generatePreview() {
        previewContent.innerHTML = convertMarkdownToHtml(markdownInput.value);
        if (contrastEnabled) {
            toggleContrast();
        }
    }
    
    
    generatePreviewBtn.addEventListener('click', generatePreview);
    
    let timeout;
    markdownInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(generatePreview, 300);
    });
    
    toggleContrastBtn.addEventListener('click', () => {
        contrastEnabled = !contrastEnabled;
        toggleContrast();
    });
    
    
    generatePreview();
});