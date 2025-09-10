# Shopify Theme Detector

A full-stack web application that detects the Shopify theme used by any store URL, links to the theme on the Shopify Theme Store, and suggests alternative themes. The app is embeddable via a script tag and deployable on Vercel.

## Features

- Detect Shopify theme name and theme store ID from any store URL
- Link to the theme on Shopify Theme Store (if available)
- Suggest alternative themes based on detected theme
- Responsive design
- Embeddable widget for any website
- Vercel-ready deployment

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Deployment to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Follow the prompts to link your GitHub repo or deploy directly

## Embedding the Widget

To embed the widget on any website, add the following script tag:

```html
<script src="https://your-vercel-url.vercel.app/shopify-theme-detector.js"></script>
```

Replace `your-vercel-url` with your actual Vercel deployment URL.

The widget will render in the element with id `shopify-theme-detector`, or append to the body if not found.

## API

The app provides an API endpoint at `/api/detect` that accepts POST requests with JSON body:

```json
{
  "url": "https://example-shopify-store.com"
}
```

Response:

```json
{
  "themeName": "Dawn",
  "themeStoreLink": "https://themes.shopify.com/themes/dawn",
  "suggestions": ["Impulse", "Prestige", "Local"]
}
```

## Technologies Used

- Next.js
- React
- Vercel
- CSS Modules

## License

MIT