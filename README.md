# Shopify Theme Detector

A full-stack web application that detects the Shopify theme used by any store URL, links to the theme on the Shopify Theme Store, and suggests alternative themes. The app is embeddable via a script tag and deployable on Vercel.

## Features

- **Multi-Tier Theme Detection**: 3-level detection system for maximum accuracy
- **Version Detection**: Extracts and displays theme version information
- **Comprehensive Theme Library**: 100+ themes with intelligent suggestions based on Shopify's sitemap
- **Direct Theme Links**: Automatic linking to `https://themes.shopify.com/themes/{theme-name}` (lowercase)
- **Link Validation**: Checks if theme URLs are accessible, shows warning for broken links
- **Store Screenshots**: Generates and displays actual screenshots of the detected Shopify store with caching for popular stores
- **Smooth Animated Hit Counter**: Displays randomly generated usage statistics with buttery-smooth counting animation using requestAnimationFrame and easing functions (200-800 themes) in American timezone hours
- **Smart Theme Suggestions**: Context-aware alternatives grouped by style, category, and similarity
- **Enhanced Edge Case Handling**: Password protection, maintenance mode, and custom theme detection
- **Responsive Design**: Works perfectly on all devices
- **Embeddable Widget**: Drop-in JavaScript for any website
- **Vercel-Ready**: Optimized for serverless deployment

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

## Theme Detection Accuracy

### How It Works
The detector uses multiple detection methods with a priority order to ensure maximum accuracy:

#### **Detection Priority Order**
1. **Primary**: `Shopify.theme` object (most reliable)
2. **Secondary**: `schema_name` and `schema_version` from theme config
3. **Tertiary**: `data-theme-name` and `data-theme-version` DOM attributes

#### **Detection Methods**
The detector uses Shopify's official `Shopify.theme` JavaScript object that's injected into every Shopify store:

```javascript
Shopify.theme = {
  "name": "Dawn",
  "id": 12345678,
  "theme_store_id": 887,
  "role": "main"
};
```

**Fallback Detection Patterns:**
- `schema_name["']?\s*:\s*["']([^"']+)["']`
- `schema_version["']?\s*:\s*["']([^"']+)["']`
- `data-theme-name=["']([^"']+)["']`
- `data-theme-version=["']([^"']+)["']`

### Detection Methods
1. **Primary**: Parses `Shopify.theme` object for `name` and `theme_store_id`
2. **Fallback**: Regex extraction for individual properties
3. **Validation**: Multiple patterns to handle different formatting
4. **Edge Cases**: Handles password protection, maintenance mode, custom themes

### Theme Library
- **100+ Themes**: Comprehensive collection from Shopify's official sitemap
- **Smart Suggestions**: Grouped by style, category, and visual similarity
- **Regular Updates**: Based on current Shopify theme offerings

## API

### Theme Detection API

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
  "themeVersion": "9.0.0",
  "themeStoreLink": "https://themes.shopify.com/themes/dawn",
  "themeImage": "https://api.screenshotone.com/take?url=https%3A//example-shopify-store.com&viewport_width=1280&viewport_height=720&image_quality=80&format=jpg&cache=true&delay=2&full_page=false&block_cookie_banners=true&block_chats=true&block_ads=true",
  "suggestions": ["Impulse", "Prestige", "Local", "Sense", "Craft"]
}
```

### Screenshot API

The app also provides a dedicated screenshot API at `/api/screenshot` for generating store screenshots with caching:

```json
{
  "url": "https://example-shopify-store.com"
}
```

Response:

```json
{
  "screenshotUrl": "https://api.screenshotone.com/take?url=https%3A//example-shopify-store.com&viewport_width=1280&viewport_height=720&image_quality=80&format=jpg&cache=true&delay=2&full_page=false&block_cookie_banners=true&block_chats=true&block_ads=true",
  "cached": false
}
```

#### Caching Features
- **In-memory cache**: Stores screenshots for 1 hour
- **Cache size limit**: Maximum 100 cached screenshots
- **Automatic cleanup**: Removes oldest entries when limit reached
- **Cache hit detection**: Returns cached results when available

### Response Fields
- `themeName`: Detected theme name or status message
- `themeVersion`: Theme version (when available from schema or DOM attributes)
- `themeStoreLink`: Direct link to theme on Shopify Theme Store (if available)
- `suggestions`: Array of 3-5 relevant alternative themes based on comprehensive library

## Enhanced Detection Capabilities

### Detection Priority Order (Schema-First Approach)
1. **Primary**: `schema_name` (most accurate)
   - Direct extraction from theme's `settings_schema.json`
   - Most reliable for identifying the actual theme name
   - `schema_name["']?\s*:\s*["']([^"']+)["']`

2. **Secondary**: `Shopify.theme` object (fallback)
   - Extracts `name` → Theme Name from JavaScript object
   - Extracts `theme_store_id` → Direct link to Theme Store
   - Used when schema_name is not available

3. **Tertiary**: `data-theme-name` and `data-theme-version` (last resort)
   - Scans `<html>` and `<body>` tags for data attributes
   - `data-theme-name=["']([^"']+)["']`
   - `data-theme-version=["']([^"']+)["']`

### Why Schema-First Approach?
- **Higher Accuracy**: `schema_name` comes directly from the theme's configuration
- **Consistency**: Less likely to be modified by store customizations
- **Reliability**: Present in all properly structured Shopify themes
- **Version Info**: `schema_version` provides accurate version information

### Advanced Pattern Matching
- **Schema Detection**: `schema_name["']?\s*:\s*["']([^"']+)["']`
- **Version Detection**: `schema_version["']?\s*:\s*["']([^"']+)["']`
- **DOM Attributes**: `data-theme-name=["']([^"']+)["']`
- **Enhanced Store ID**: Multiple patterns for `theme_store_id` extraction

### Version Information Display
- Theme version appears directly under the theme name in the UI
- Extracted from multiple sources for maximum compatibility
- Only displayed when version information is available

### Node.js Detection Implementation

```javascript
function detectThemeData(html) {
  let themeName = null;
  let themeStoreId = null;
  let themeVersion = null;

  // Primary: schema_name (most accurate)
  const schemaNameMatch = html.match(/schema_name["']?\s*:\s*["']([^"']+)["']/);
  if (schemaNameMatch) {
    themeName = schemaNameMatch[1];
  }

  // Secondary: Shopify.theme object (fallback)
  if (!themeName) {
    const shopifyMatch = html.match(/Shopify\.theme\s*=\s*{[^}]*"name"\s*:\s*"([^"]+)"[^}]*"theme_store_id"\s*:\s*(\d+)/);
    if (shopifyMatch) {
      themeName = shopifyMatch[1];
      themeStoreId = shopifyMatch[2];
    }
  }

  // Version detection (can be combined with any method)
  const schemaVersionMatch = html.match(/schema_version["']?\s*:\s*["']([^"']+)["']/);
  if (schemaVersionMatch) {
    themeVersion = schemaVersionMatch[1];
  }

  // Tertiary: data attributes (last resort)
  if (!themeName) {
    const dataNameMatch = html.match(/data-theme-name=["']([^"']+)["']/);
    if (dataNameMatch) themeName = dataNameMatch[1];
  }
  if (!themeVersion) {
    const dataVersionMatch = html.match(/data-theme-version=["']([^"']+)["']/);
    if (dataVersionMatch) themeVersion = dataVersionMatch[1];
  }

  return { themeName, themeStoreId, themeVersion };
}
```

### UI Output Example

```
Theme: Dawn
Version: 9.0.0
Link: https://themes.shopify.com/themes/dawn
```

## Technologies Used

- Next.js
- React
- Vercel
- CSS Modules

## License

MIT