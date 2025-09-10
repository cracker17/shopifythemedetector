const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rate limiting (basic)
const requestCounts = new Map();
setInterval(() => requestCounts.clear(), 60000); // Reset every minute

app.use((req, res, next) => {
  const ip = req.ip;
  const count = requestCounts.get(ip) || 0;
  if (count > 10) { // 10 requests per minute
    return res.status(429).json({ error: 'Too many requests' });
  }
  requestCounts.set(ip, count + 1);
  next();
});

app.post('/detect-theme', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Store URL is required' });
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch (e) {
    return res.json({
      isShopify: false,
      error: 'Invalid URL format'
    });
  }

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Shopify Theme Detector)'
      }
    });

    const $ = cheerio.load(response.data);

    // Check if it's a Shopify site using multiple indicators
    let isShopify = false;
    let detectionReason = '';

    // Check for Shopify.theme object
    if (response.data.includes('Shopify.theme')) {
      isShopify = true;
      detectionReason = 'Shopify.theme object found';
    }

    // Check for Shopify generator meta tag
    if ($('meta[name="generator"]').attr('content')?.includes('Shopify')) {
      isShopify = true;
      detectionReason = 'Shopify generator meta tag found';
    }

    // Check for Shopify CDN assets
    if (response.data.includes('cdn.shopify.com') || response.data.includes('shopifycdn.com')) {
      isShopify = true;
      detectionReason = 'Shopify CDN assets found';
    }

    // Check for Shopify-specific scripts or patterns
    if (response.data.includes('ShopifyAPI') || response.data.includes('shopify_common.js')) {
      isShopify = true;
      detectionReason = 'Shopify API scripts found';
    }

    // Check for Shopify checkout or cart URLs
    if (response.data.includes('/cart') && response.data.includes('/checkout')) {
      // Additional check for Shopify-specific patterns
      if (response.data.includes('variant_id') || response.data.includes('product_id')) {
        isShopify = true;
        detectionReason = 'Shopify cart/checkout patterns found';
      }
    }

    // Check response headers for Shopify indicators
    const serverHeader = response.headers['server'] || response.headers['Server'];
    if (serverHeader && serverHeader.includes('nginx') && response.data.includes('shopify')) {
      isShopify = true;
      detectionReason = 'Shopify server headers detected';
    }

    // Additional checks for common Shopify patterns
    if (response.data.includes('myshopify.com') || response.data.includes('shopify.com')) {
      isShopify = true;
      detectionReason = 'Shopify domain references found';
    }

    // Debug logging
    console.log(`Shopify detection for ${url}: ${isShopify ? 'YES' : 'NO'} - ${detectionReason}`);
    if (!isShopify) {
      console.log('HTML preview:', response.data.substring(0, 500));
    }

    if (!isShopify) {
      return res.json({
        isShopify: false,
        error: 'This site does not appear to be using Shopify'
      });
    }

    // Extract theme data
    let themeName = null;
    let themeStoreId = null;
    let themeVersion = null;
    let themePreviewUrl = null;

    $('script').each((i, el) => {
      const scriptContent = $(el).html();
      if (scriptContent && scriptContent.includes('Shopify.theme')) {
        // Look for Shopify.theme = { ... }
        const match = scriptContent.match(/Shopify\.theme\s*=\s*({[\s\S]*?});/);
        if (match) {
          try {
            const themeData = JSON.parse(match[1]);
            themeName = themeData.name;
            themeStoreId = themeData.id || themeData.theme_store_id;
            themeVersion = themeData.version;
          } catch (e) {
            // Fallback: try to extract name manually
            const nameMatch = scriptContent.match(/"name"\s*:\s*"([^"]+)"/);
            if (nameMatch) themeName = nameMatch[1];
            const versionMatch = scriptContent.match(/"version"\s*:\s*"([^"]+)"/);
            if (versionMatch) themeVersion = versionMatch[1];
          }
        }
      }
    });

    // Extract theme preview image
    // Look for og:image first
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      themePreviewUrl = ogImage;
    } else {
      // Look for twitter:image
      const twitterImage = $('meta[name="twitter:image"]').attr('content');
      if (twitterImage) {
        themePreviewUrl = twitterImage;
      } else {
        // Look for theme-specific preview images
        $('img').each((i, el) => {
          const src = $(el).attr('src');
          const alt = $(el).attr('alt') || '';
          if (src && (alt.toLowerCase().includes('preview') || alt.toLowerCase().includes('theme') || src.includes('preview'))) {
            themePreviewUrl = src.startsWith('http') ? src : (src.startsWith('//') ? 'https:' + src : url + src);
            return false; // break loop
          }
        });
      }
    }

    // If no theme data found, try alternative methods
    if (!themeName) {
      // Look for theme name in meta tags or other places
      const metaTheme = $('meta[name="theme"]').attr('content');
      if (metaTheme) themeName = metaTheme;
    }

    res.json({
      isShopify: true,
      theme: themeName || 'Unknown Theme',
      storeId: themeStoreId,
      storeUrl: themeStoreId ? `https://themes.shopify.com/themes/${themeStoreId}` : null,
      themeVersion: themeVersion,
      themePreviewUrl: themePreviewUrl
    });

  } catch (error) {
    console.error('Error fetching store:', error.message);
    res.status(500).json({
      error: 'Failed to detect theme. The store may be unavailable or blocking requests.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Shopify Theme Detector Proxy running on port ${PORT}`);
});