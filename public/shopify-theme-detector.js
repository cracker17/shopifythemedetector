// Shopify Theme Detector Widget
(function() {
  // Create widget container
  const container = document.createElement('div');
  container.style.maxWidth = '600px';
  container.style.margin = '0 auto';
  container.style.padding = '20px';
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.border = '1px solid #ddd';
  container.style.borderRadius = '4px';

  // Title
  const title = document.createElement('h2');
  title.textContent = 'Shopify Theme Detector';
  container.appendChild(title);

  // Input
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter Shopify store URL';
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.marginBottom = '10px';
  input.style.border = '1px solid #ccc';
  input.style.borderRadius = '4px';
  container.appendChild(input);

  // Button
  const button = document.createElement('button');
  button.textContent = 'Detect Theme';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#0070f3';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  container.appendChild(button);

  // Loading
  const loading = document.createElement('p');
  loading.textContent = 'Detecting...';
  loading.style.display = 'none';
  container.appendChild(loading);

  // Error
  const error = document.createElement('p');
  error.style.color = 'red';
  error.style.display = 'none';
  container.appendChild(error);

  // Result
  const result = document.createElement('div');
  result.style.display = 'none';
  result.style.marginTop = '20px';
  container.appendChild(result);

  // Append to body or specified element
  const target = document.getElementById('shopify-theme-detector') || document.body;
  target.appendChild(container);

  // Event listener
  button.addEventListener('click', async () => {
    const url = input.value;
    if (!url) return;
    loading.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';
    button.disabled = true;
    try {
      const response = await fetch('https://shopifythemedetector.vercel.app/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) {
        const isNotShopify = data.themeName === 'Not a Shopify store';
        const isPasswordProtected = data.themeName === 'Store is password protected';
        const isMaintenance = data.themeName === 'Store is in maintenance mode';
        const isCustom = data.themeName === 'Custom Theme';
        const showSuggestions = data.suggestions.length > 0 && !isNotShopify && !isPasswordProtected && !isMaintenance;
        const showImage = data.themeImage || (!isNotShopify && !isPasswordProtected && !isMaintenance && !isCustom);

        result.innerHTML = `
          <div style="display: flex; gap: 1rem; align-items: flex-start; flex-wrap: wrap; margin-bottom: 1rem;">
            ${showImage ? `<div style="flex-shrink: 0; width: 150px; height: 112px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background: #f8f9fa; display: flex; align-items: center; justify-content: center;">
              ${data.themeImage ? `<img src="${data.themeImage}" alt="${data.themeName} preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML=\`<div style=\\"display: flex; flex-direction: column; align-items: center; justify-content: center; color: #666; text-align: center; padding: 1rem;\\"><svg width=\\"32\\" height=\\"32\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z\\" fill=\\"currentColor\\" opacity=\\"0.3\\"/><path d=\\"M6 6l12 12M18 6l-12 12\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\"/></svg><span style=\\"font-size: 0.7rem; margin-top: 0.25rem;\\">Preview Unavailable</span></div>\`">` : `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: #666; text-align: center; padding: 1rem;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z" fill="currentColor" opacity="0.3"/><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span style="font-size: 0.7rem; margin-top: 0.25rem;">Preview Unavailable</span></div>`}
            </div>` : ''}
            <div style="flex: 1;">
              <h3 style="margin: 0 0 0.5rem 0; color: ${isNotShopify || isPasswordProtected || isMaintenance ? '#dc3545' : '#0070f3'};">${isNotShopify || isPasswordProtected || isMaintenance ? 'Status' : 'Detected Theme'}: ${data.themeName}</h3>
              ${data.themeStoreLink && !isNotShopify && !isPasswordProtected && !isMaintenance ? `<p style="margin: 0.5rem 0;"><strong>Theme Store Link:</strong> <a href="${data.themeStoreLink}" target="_blank" style="color: #0070f3; text-decoration: none;">View Theme</a></p>` : ''}
            </div>
          </div>
          ${showSuggestions ? `
            <h4 style="margin: 1rem 0 0.5rem 0; color: #0070f3;">Suggested Alternatives:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem;">
              ${data.suggestions.map(s => `<div style="background: #f8f9fa; padding: 0.5rem; border-radius: 6px; text-align: center; font-weight: 600;">${s}</div>`).join('')}
            </div>
          ` : ''}
          <div style="margin-top: 1rem; padding: 0.75rem; background: #f8f9fa; border-radius: 6px; border-left: 3px solid #0070f3;">
            <p style="margin: 0; font-size: 0.85rem; color: #666; line-height: 1.4;">
              <strong>Disclaimer:</strong> This detection is based on publicly available information and may not always be 100% accurate.
            </p>
          </div>
        `;
        result.style.display = 'block';
      } else {
        error.textContent = data.error || 'Failed to detect theme';
        error.style.display = 'block';
      }
    } catch (err) {
      error.textContent = 'Network error';
      error.style.display = 'block';
    }
    loading.style.display = 'none';
    button.disabled = false;
  });
})();