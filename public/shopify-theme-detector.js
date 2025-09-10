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
      const response = await fetch('https://your-vercel-url.vercel.app/api/detect', { // Replace with actual URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) {
        result.innerHTML = `
          <h3>Detected Theme: ${data.themeName}</h3>
          ${data.themeStoreLink ? `<p><a href="${data.themeStoreLink}" target="_blank">View on Shopify Theme Store</a></p>` : ''}
          <h4>Suggested Alternatives:</h4>
          <ul>${data.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
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