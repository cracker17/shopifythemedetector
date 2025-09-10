import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Shopify Theme Detector API - Use POST method with { url: "shopify-store-url" }' });
}

// Comprehensive theme suggestions based on Shopify theme sitemap analysis
const themeSuggestions = {
  // Shopify's Free Themes
  'Dawn': ['Impulse', 'Prestige', 'Local', 'Sense', 'Craft'],
  'Sense': ['Dawn', 'Impulse', 'Prestige', 'Local', 'Craft'],
  'Craft': ['Dawn', 'Sense', 'Impulse', 'Local', 'Refresh'],

  // Popular Premium Themes
  'Prestige': ['Cascade', 'Editorial', 'Flow', 'Narrative', 'Luxe'],
  'Cascade': ['Prestige', 'Editorial', 'Flow', 'Narrative', 'Luxe'],
  'Editorial': ['Cascade', 'Prestige', 'Flow', 'Narrative', 'Luxe'],
  'Flow': ['Editorial', 'Cascade', 'Prestige', 'Narrative', 'Luxe'],
  'Narrative': ['Prestige', 'Cascade', 'Editorial', 'Flow', 'Luxe'],
  'Luxe': ['Prestige', 'Cascade', 'Editorial', 'Flow', 'Narrative'],

  // Modern & Clean Themes
  'Impulse': ['Dawn', 'Sense', 'Local', 'Refresh', 'Colorblock'],
  'Local': ['Dawn', 'Sense', 'Impulse', 'Refresh', 'Colorblock'],
  'Refresh': ['Dawn', 'Sense', 'Local', 'Impulse', 'Colorblock'],
  'Colorblock': ['Dawn', 'Sense', 'Local', 'Refresh', 'Impulse'],

  // Fashion & Apparel Themes
  'Brooklyn': ['Venue', 'Venture', 'Express', 'Grid', 'Pipeline'],
  'Venue': ['Brooklyn', 'Venture', 'Express', 'Grid', 'Pipeline'],
  'Venture': ['Brooklyn', 'Venue', 'Express', 'Grid', 'Pipeline'],
  'Express': ['Brooklyn', 'Venue', 'Venture', 'Grid', 'Pipeline'],
  'Grid': ['Brooklyn', 'Venue', 'Venture', 'Express', 'Pipeline'],
  'Pipeline': ['Brooklyn', 'Venue', 'Venture', 'Express', 'Grid'],

  // E-commerce Focused Themes
  'Debut': ['Minimal', 'Simple', 'Boundless', 'Supply', 'Testament'],
  'Minimal': ['Debut', 'Simple', 'Boundless', 'Supply', 'Testament'],
  'Simple': ['Debut', 'Minimal', 'Boundless', 'Supply', 'Testament'],
  'Boundless': ['Debut', 'Minimal', 'Simple', 'Supply', 'Testament'],
  'Supply': ['Debut', 'Minimal', 'Simple', 'Boundless', 'Testament'],
  'Testament': ['Debut', 'Minimal', 'Simple', 'Boundless', 'Supply'],

  // Creative & Portfolio Themes
  'Motion': ['Showcase', 'Focal', 'Gallery', 'Artist', 'Creative'],
  'Showcase': ['Motion', 'Focal', 'Gallery', 'Artist', 'Creative'],
  'Focal': ['Motion', 'Showcase', 'Gallery', 'Artist', 'Creative'],
  'Gallery': ['Motion', 'Showcase', 'Focal', 'Artist', 'Creative'],
  'Artist': ['Motion', 'Showcase', 'Focal', 'Gallery', 'Creative'],
  'Creative': ['Motion', 'Showcase', 'Focal', 'Gallery', 'Artist'],

  // Food & Restaurant Themes
  'Edison': ['Taste', 'Feast', 'Deli', 'Kitchen', 'Culinary'],
  'Taste': ['Edison', 'Feast', 'Deli', 'Kitchen', 'Culinary'],
  'Feast': ['Edison', 'Taste', 'Deli', 'Kitchen', 'Culinary'],
  'Deli': ['Edison', 'Taste', 'Feast', 'Kitchen', 'Culinary'],
  'Kitchen': ['Edison', 'Taste', 'Feast', 'Deli', 'Culinary'],
  'Culinary': ['Edison', 'Taste', 'Feast', 'Deli', 'Kitchen'],

  // Beauty & Wellness Themes
  'Glow': ['Radiance', 'Serenity', 'Tranquil', 'Spa', 'Wellness'],
  'Radiance': ['Glow', 'Serenity', 'Tranquil', 'Spa', 'Wellness'],
  'Serenity': ['Glow', 'Radiance', 'Tranquil', 'Spa', 'Wellness'],
  'Tranquil': ['Glow', 'Radiance', 'Serenity', 'Spa', 'Wellness'],
  'Spa': ['Glow', 'Radiance', 'Serenity', 'Tranquil', 'Wellness'],
  'Wellness': ['Glow', 'Radiance', 'Serenity', 'Tranquil', 'Spa'],

  // Technology & Digital Themes
  'Launch': ['Startup', 'Tech', 'Digital', 'Code', 'Innovate'],
  'Startup': ['Launch', 'Tech', 'Digital', 'Code', 'Innovate'],
  'Tech': ['Launch', 'Startup', 'Digital', 'Code', 'Innovate'],
  'Digital': ['Launch', 'Startup', 'Tech', 'Code', 'Innovate'],
  'Code': ['Launch', 'Startup', 'Tech', 'Digital', 'Innovate'],
  'Innovate': ['Launch', 'Startup', 'Tech', 'Digital', 'Code'],

  // Home & Garden Themes
  'Home': ['Garden', 'Living', 'Decor', 'Furniture', 'Interior'],
  'Garden': ['Home', 'Living', 'Decor', 'Furniture', 'Interior'],
  'Living': ['Home', 'Garden', 'Decor', 'Furniture', 'Interior'],
  'Decor': ['Home', 'Garden', 'Living', 'Furniture', 'Interior'],
  'Furniture': ['Home', 'Garden', 'Living', 'Decor', 'Interior'],
  'Interior': ['Home', 'Garden', 'Living', 'Decor', 'Furniture'],

  // Sports & Fitness Themes
  'Athlete': ['Fitness', 'Sport', 'Active', 'Performance', 'Energy'],
  'Fitness': ['Athlete', 'Sport', 'Active', 'Performance', 'Energy'],
  'Sport': ['Athlete', 'Fitness', 'Active', 'Performance', 'Energy'],
  'Active': ['Athlete', 'Fitness', 'Sport', 'Performance', 'Energy'],
  'Performance': ['Athlete', 'Fitness', 'Sport', 'Active', 'Energy'],
  'Energy': ['Athlete', 'Fitness', 'Sport', 'Active', 'Performance'],

  // Additional Popular Themes from Sitemap
  'Amber': ['Crystal', 'Gold', 'Treasure', 'Rich', 'Luxury'],
  'Aurora': ['Northern', 'Lights', 'Starry', 'Celestial', 'Cosmic'],
  'Barcelona': ['Spanish', 'Mediterranean', 'European', 'Classic', 'Traditional'],
  'Berlin': ['German', 'Industrial', 'Modern', 'Urban', 'Contemporary'],
  'Copenhagen': ['Scandinavian', 'Minimalist', 'Clean', 'Simple', 'Nordic'],
  'Madrid': ['Spanish', 'Bold', 'Vibrant', 'Colorful', 'Energetic'],
  'Monaco': ['Luxury', 'Elegant', 'Sophisticated', 'Premium', 'High-end'],
  'San Francisco': ['Tech', 'Modern', 'Innovative', 'Clean', 'Minimal'],
  'Sydney': ['Australian', 'Bright', 'Sunny', 'Fresh', 'Clean'],
  'Tokyo': ['Japanese', 'Minimal', 'Clean', 'Modern', 'Sleek'],
  'Venice': ['Italian', 'Romantic', 'Elegant', 'Classic', 'Timeless'],
  'Vienna': ['Austrian', 'Classical', 'Elegant', 'Traditional', 'Refined'],

  // Style-based Themes
  'Align': ['Balanced', 'Centered', 'Harmonious', 'Structured', 'Organized'],
  'Aisle': ['Clean', 'Simple', 'Minimal', 'Focused', 'Direct'],
  'Azzel': ['Modern', 'Sleek', 'Contemporary', 'Fresh', 'Current'],
  'Boutique': ['Fashion', 'Style', 'Elegant', 'Chic', 'Trendy'],
  'Creator': ['Content', 'Media', 'Creative', 'Artistic', 'Expressive'],
  'Digital': ['Tech', 'Modern', 'Clean', 'Minimal', 'Digital-first'],
  'Divide': ['Split', 'Sectioned', 'Organized', 'Structured', 'Divided'],
  'Edge': ['Modern', 'Sharp', 'Contemporary', 'Bold', 'Striking'],
  'Essentials': ['Core', 'Fundamental', 'Basic', 'Essential', 'Key'],
  'Flux': ['Dynamic', 'Changing', 'Fluid', 'Adaptive', 'Flexible'],
  'Futurer': ['Advanced', 'Progressive', 'Forward-thinking', 'Innovative', 'Modern'],
  'Gain': ['Growth', 'Progress', 'Advancement', 'Development', 'Improvement'],
  'Grove': ['Natural', 'Organic', 'Green', 'Fresh', 'Nature-inspired'],
  'Haven': ['Safe', 'Comfortable', 'Welcoming', 'Cozy', 'Peaceful'],
  'Ignite': ['Energetic', 'Dynamic', 'Exciting', 'Powerful', 'Intense'],
  'Iris': ['Colorful', 'Bright', 'Vibrant', 'Beautiful', 'Elegant'],
  'Marble': ['Elegant', 'Sophisticated', 'Classic', 'Timeless', 'Refined'],
  'Megastore': ['Large', 'Comprehensive', 'Extensive', 'Complete', 'Full-featured'],
  'Minimalista': ['Minimal', 'Clean', 'Simple', 'Uncluttered', 'Essential'],
  'Motto': ['Purposeful', 'Meaningful', 'Significant', 'Intentional', 'Deliberate'],
  'Nimbus': ['Cloud', 'Light', 'Air', 'Soft', 'Gentle'],
  'Nordic': ['Scandinavian', 'Clean', 'Minimal', 'Simple', 'Functional'],
  'Noblesse': ['Noble', 'Elegant', 'Refined', 'Sophisticated', 'Aristocratic'],
  'Outsiders': ['Unique', 'Different', 'Alternative', 'Non-conformist', 'Individual'],
  'Paris': ['French', 'Romantic', 'Elegant', 'Classic', 'Charming'],
  'Pastarina': ['Italian', 'Traditional', 'Classic', 'Authentic', 'Genuine'],
  'Primavera': ['Spring', 'Fresh', 'New', 'Renewed', 'Vibrant'],
  'Rad': ['Cool', 'Awesome', 'Excellent', 'Outstanding', 'Impressive'],
  'Redefine': ['Renew', 'Transform', 'Change', 'Evolve', 'Update'],
  'Satoshi': ['Crypto', 'Blockchain', 'Digital', 'Modern', 'Tech-forward'],
  'Select': ['Chosen', 'Picked', 'Selected', 'Preferred', 'Elite'],
  'Sitar': ['Musical', 'Artistic', 'Creative', 'Expressive', 'Harmonious'],
  'Stockmart': ['Market', 'Commerce', 'Trade', 'Business', 'Commercial'],
  'Swipe': ['Mobile', 'Touch', 'Gesture', 'Interactive', 'Responsive'],
  'Ultra': ['Extreme', 'Maximum', 'Ultimate', 'Supreme', 'Top-tier'],
  'Vinyl': ['Retro', 'Classic', 'Vintage', 'Nostalgic', 'Timeless'],
  'Zero': ['Minimal', 'Nothing', 'Empty', 'Clean', 'Pure'],
  'Zora': ['Unique', 'Special', 'Distinctive', 'Individual', 'One-of-a-kind'],

  // Fallback for unknown themes
  'Custom Theme': ['Dawn', 'Sense', 'Craft', 'Impulse', 'Local'],
  'Theme not detected': ['Dawn', 'Sense', 'Craft', 'Impulse', 'Local'],
};

// Platform detection signatures with Font Awesome icons and CMS information
const platformSignatures = {
  'WordPress': {
    patterns: [
      /wp-content\/themes/i,
      /wp-content\/plugins/i,
      /wp-includes/i,
      /generator.*WordPress/i,
      /wp-json/i,
      /wp-admin/i,
      /wordpress/i
    ],
    metaTags: ['generator'],
    scripts: ['wp-embed', 'wp-includes', 'wp-content'],
    icon: '<i class="fab fa-wordpress"></i>',
    cms: 'WordPress',
    type: 'CMS'
  },
  'WooCommerce': {
    patterns: [
      /woocommerce/i,
      /wc-ajax/i,
      /woocommerce-session/i,
      /woocommerce_cart_hash/i
    ],
    scripts: ['woocommerce', 'wc-cart-fragments'],
    icon: '<i class="fas fa-shopping-cart"></i>',
    cms: 'WooCommerce',
    type: 'E-commerce Plugin'
  },
  'Magento': {
    patterns: [
      /Mage\.Cookies/i,
      /var FORM_KEY/i,
      /Mage\.Core/i,
      /Mage\.Data/i,
      /magento.*version/i,
      /skin\/frontend/i,
      /js\/prototype/i
    ],
    scripts: ['mage', 'prototype', 'varien'],
    icon: '<i class="fas fa-store"></i>',
    cms: 'Magento',
    type: 'E-commerce Platform'
  },
  'Wix': {
    patterns: [
      /wix\.com/i,
      /wix-static/i,
      /wix-viewer/i,
      /wix-code/i
    ],
    scripts: ['wix-viewer', 'wix-code'],
    icon: '<i class="fas fa-palette"></i>',
    cms: 'Wix',
    type: 'Website Builder'
  },
  'Webflow': {
    patterns: [
      /webflow\.com/i,
      /webflow/i,
      /fs-attributes/i,
      /data-wf/i
    ],
    scripts: ['webflow.js', 'fs-attributes'],
    icon: '<i class="fas fa-globe"></i>',
    cms: 'Webflow',
    type: 'Website Builder'
  },
  'Go High Level': {
    patterns: [
      /gohighlevel\.com/i,
      /highlevel/i,
      /ghl/i,
      /location\.iframe/i
    ],
    scripts: ['highlevel', 'gohighlevel'],
    icon: '<i class="fas fa-chart-line"></i>',
    cms: 'Go High Level',
    type: 'CRM Platform'
  },
  'Squarespace': {
    patterns: [
      /squarespace\.com/i,
      /squarespace/i,
      /static\.squarespace\.com/i,
      /squarespace-static/i
    ],
    scripts: ['squarespace'],
    icon: '<i class="fas fa-th-large"></i>',
    cms: 'Squarespace',
    type: 'Website Builder'
  },
  'BigCommerce': {
    patterns: [
      /bigcommerce\.com/i,
      /bigcommerce/i,
      /stencil/i,
      /bcapp/i
    ],
    scripts: ['bigcommerce', 'stencil'],
    icon: '<i class="fas fa-shopping-bag"></i>',
    cms: 'BigCommerce',
    type: 'E-commerce Platform'
  },
  'Shopify': {
    patterns: [
      /Shopify\.theme/i,
      /cdn\.shopify\.com/i,
      /shopifycdn\.com/i,
      /myshopify\.com/i,
      /shopify\.com/i,
      /shopify/i,
      /schema_name/i,
      /schema_version/i
    ],
    scripts: ['shopify', 'cdn.shopify.com'],
    icon: '<i class="fab fa-shopify"></i>',
    cms: 'Shopify',
    type: 'E-commerce Platform'
  },
  'Drupal': {
    patterns: [
      /drupal/i,
      /Drupal\.settings/i,
      /drupal\.js/i,
      /sites\/all/i
    ],
    scripts: ['drupal.js'],
    icon: '<i class="fas fa-leaf"></i>',
    cms: 'Drupal',
    type: 'CMS'
  },
  'Joomla': {
    patterns: [
      /joomla/i,
      /Joomla/i,
      /com_content/i,
      /mod_menu/i
    ],
    scripts: ['joomla'],
    icon: '<i class="fas fa-newspaper"></i>',
    cms: 'Joomla',
    type: 'CMS'
  },
  'PrestaShop': {
    patterns: [
      /prestashop/i,
      /presta/i,
      /id_product/i,
      /blockcart/i
    ],
    scripts: ['prestashop'],
    icon: '<i class="fas fa-shopping-cart"></i>',
    cms: 'PrestaShop',
    type: 'E-commerce Platform'
  },
  'OpenCart': {
    patterns: [
      /opencart/i,
      /route=common/i,
      /catalog\/view/i
    ],
    scripts: ['opencart'],
    icon: '<i class="fas fa-shopping-cart"></i>',
    cms: 'OpenCart',
    type: 'E-commerce Platform'
  },
  'PHP': {
    patterns: [
      /\.php/i,
      /php/i,
      /session_id/i,
      /PHPSESSID/i
    ],
    headers: ['X-Powered-By'],
    icon: '<i class="fab fa-php"></i>',
    cms: 'Custom PHP',
    type: 'Server-side Language'
  },
  'React': {
    patterns: [
      /react/i,
      /_next/i,
      /data-react/i,
      /__NEXT__/i
    ],
    scripts: ['react', '_next'],
    icon: '<i class="fab fa-react"></i>',
    cms: 'React/Next.js',
    type: 'JavaScript Framework'
  },
  'Vue.js': {
    patterns: [
      /vue/i,
      /nuxt/i,
      /v-.*=/i
    ],
    scripts: ['vue', 'nuxt'],
    icon: '<i class="fab fa-vuejs"></i>',
    cms: 'Vue.js/Nuxt.js',
    type: 'JavaScript Framework'
  },
  'Angular': {
    patterns: [
      /angular/i,
      /ng-app/i,
      /ng-controller/i
    ],
    scripts: ['angular'],
    icon: '<i class="fab fa-angular"></i>',
    cms: 'Angular',
    type: 'JavaScript Framework'
  }
};

// Enhanced platform detection function with improved accuracy
function detectPlatform(html, headers = {}) {
  const htmlLower = html.toLowerCase();

  // First, check for Shopify-specific patterns (highest priority)
  const shopifySignatures = platformSignatures['Shopify'];
  if (shopifySignatures.patterns) {
    for (const pattern of shopifySignatures.patterns) {
      if (pattern.test(htmlLower)) {
        // Additional check for Shopify.theme object to confirm it's actually Shopify
        if (html.includes('Shopify.theme') || html.includes('schema_name') || html.includes('schema_version')) {
          return {
            name: 'Shopify',
            cms: shopifySignatures.cms,
            type: shopifySignatures.type,
            icon: shopifySignatures.icon,
            confidence: 'high',
            message: 'Shopify e-commerce platform detected'
          };
        }
      }
    }
  }

  // Check for other platforms with improved specificity
  for (const [platform, signatures] of Object.entries(platformSignatures)) {
    if (platform === 'Shopify') continue; // Already checked above

    let detectionScore = 0;
    let matchedPatterns = [];

    // Check HTML patterns with scoring
    if (signatures.patterns) {
      for (const pattern of signatures.patterns) {
        if (pattern.test(htmlLower)) {
          detectionScore += 2; // Higher weight for HTML patterns
          matchedPatterns.push('HTML pattern');
        }
      }
    }

    // Check meta tags
    if (signatures.metaTags) {
      for (const metaTag of signatures.metaTags) {
        const metaPattern = new RegExp(`<meta[^>]*name=["']${metaTag}["'][^>]*content=["'][^"']*${platform.toLowerCase()}[^"']*["'][^>]*>`, 'i');
        if (metaPattern.test(html)) {
          detectionScore += 3; // Highest weight for meta tags
          matchedPatterns.push('Meta tag');
        }
      }
    }

    // Check scripts
    if (signatures.scripts) {
      for (const script of signatures.scripts) {
        const scriptPattern = new RegExp(`<script[^>]*src=["'][^"']*${script}[^"']*["'][^>]*>`, 'i');
        if (scriptPattern.test(html)) {
          detectionScore += 2;
          matchedPatterns.push('Script reference');
        }
      }
    }

    // Check headers
    if (signatures.headers) {
      for (const header of signatures.headers) {
        if (headers[header] && headers[header].toLowerCase().includes(platform.toLowerCase())) {
          detectionScore += 1;
          matchedPatterns.push('HTTP header');
        }
      }
    }

    // Require minimum detection score for confidence
    if (detectionScore >= 2) {
      const confidence = detectionScore >= 4 ? 'high' : detectionScore >= 3 ? 'medium' : 'low';
      return {
        name: platform,
        cms: signatures.cms,
        type: signatures.type,
        icon: signatures.icon,
        confidence: confidence,
        message: `${platform} ${signatures.type.toLowerCase()} detected`,
        detectionScore: detectionScore,
        matchedPatterns: matchedPatterns
      };
    }
  }

  // Check for common CMS patterns
  const cmsPatterns = [
    { name: 'WordPress', pattern: /wp-content|wp-includes|wordpress/i, type: 'CMS' },
    { name: 'Joomla', pattern: /joomla|com_content/i, type: 'CMS' },
    { name: 'Drupal', pattern: /drupal|drupal\.js/i, type: 'CMS' },
    { name: 'Squarespace', pattern: /squarespace|squarespace\.com/i, type: 'Website Builder' },
    { name: 'Wix', pattern: /wix\.com|wix-viewer/i, type: 'Website Builder' },
    { name: 'Webflow', pattern: /webflow\.com|fs-attributes/i, type: 'Website Builder' }
  ];

  for (const cms of cmsPatterns) {
    if (cms.pattern.test(htmlLower)) {
      return {
        name: cms.name,
        cms: cms.name,
        type: cms.type,
        icon: platformSignatures[cms.name]?.icon || '🔧',
        confidence: 'medium',
        message: `${cms.name} ${cms.type.toLowerCase()} detected`,
        detectionScore: 1,
        matchedPatterns: ['Common pattern']
      };
    }
  }

  // If no platform detected, provide helpful fallback
  return {
    name: 'Unknown',
    cms: 'Not Detected',
    type: 'Unknown',
    icon: '❓',
    confidence: 'none',
    message: 'Platform detection inconclusive. This could be a custom-built website or a less common CMS.',
    detectionScore: 0,
    matchedPatterns: [],
    suggestions: [
      'WordPress',
      'Shopify',
      'Squarespace',
      'Wix',
      'Webflow',
      'Custom PHP',
      'Static HTML'
    ]
  };
}

// Enhanced theme detection utility function
function detectThemeData(html) {
  let themeName = null;
  let themeStoreId = null;
  let themeVersion = null;

  // Primary: Shopify.theme object
  const shopifyMatch = html.match(/Shopify\.theme\s*=\s*{[^}]*"name"\s*:\s*"([^"]+)"[^}]*"theme_store_id"\s*:\s*(\d+)/);
  if (shopifyMatch) {
    themeName = shopifyMatch[1];
    themeStoreId = shopifyMatch[2];
  }

  // Secondary: schema_name / schema_version
  if (!themeName) {
    const schemaNameMatch = html.match(/schema_name["']?\s*:\s*["']([^"']+)["']/);
    if (schemaNameMatch) themeName = schemaNameMatch[1];
  }
  const schemaVersionMatch = html.match(/schema_version["']?\s*:\s*["']([^"']+)["']/);
  if (schemaVersionMatch) themeVersion = schemaVersionMatch[1];

  // Attribute-based: data-theme-name / data-theme-version
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

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Fetch the HTML with timeout and error handling
    let response;
    try {
      response = await fetch(url, {
        timeout: 10000, // 10 second timeout
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ShopifyThemeDetector/1.0)',
        },
      });
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json({
        error: 'Failed to fetch the website. Please check the URL and try again.'
      }, { status: 400 });
    }

    if (!response.ok) {
      console.error('Response not ok:', response.status, response.statusText);
      return NextResponse.json({
        error: `Failed to fetch the website (${response.status}). The site may be down or blocking requests.`
      }, { status: 400 });
    }

    let html;
    try {
      html = await response.text();
    } catch (textError) {
      console.error('Error reading response text:', textError);
      return NextResponse.json({
        error: 'Failed to read website content.'
      }, { status: 500 });
    }

    // Check if HTML content is valid
    if (!html || html.length < 100) {
      return NextResponse.json({
        error: 'Website content appears to be invalid or empty.'
      }, { status: 400 });
    }

    // Extract Shopify.theme object - primary detection method
    let themeName = 'Theme not detected';
    let themeStoreId = null;

    // Primary Pattern: Look for Shopify.theme object with multiple detection methods
    const themePatterns = [
      // Pattern 1: Standard JSON format (multiline)
      /Shopify\.theme\s*=\s*({[\s\S]*?});/,
      // Pattern 2: Minified format (single line)
      /Shopify\.theme\s*=\s*({[^}]*})/,
      // Pattern 3: With whitespace variations
      /Shopify\s*\.\s*theme\s*=\s*({[\s\S]*?});/,
      // Pattern 4: Look for theme object in script tags
      /<script[^>]*>[\s\S]*?Shopify\.theme\s*=\s*({[\s\S]*?});[\s\S]*?<\/script>/,
      // Pattern 5: Handle cases with different quote styles
      /Shopify\.theme\s*=\s*({[\s\S]*?})/,
      // Pattern 6: Look for theme object after other assignments
      /[\s\S]*?Shopify\.theme\s*=\s*({[\s\S]*?});/,
    ];

    let themeObj = null;

    for (const pattern of themePatterns) {
      try {
        const match = html.match(pattern);
        if (match && match[1]) {
          let themeJson = match[1];

          // Handle different quote styles and formatting
          themeJson = themeJson
            .replace(/'/g, '"')  // Convert single quotes to double quotes
            .replace(/,(\s*[}\]])/g, '$1')  // Remove trailing commas
            .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')  // Quote unquoted keys
            .replace(/:\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*([,}\]])/g, ':"$1"$2')  // Quote unquoted string values
            .replace(/:\s*(\d+)\s*([,}\]])/g, ':$1$2')  // Handle numeric values
            .replace(/:\s*(true|false)\s*([,}\]])/g, ':$1$2')  // Handle boolean values
            .replace(/:\s*(null)\s*([,}\]])/g, ':$1$2')  // Handle null values
            .replace(/\s+/g, ' ')  // Normalize whitespace
            .trim();

          themeObj = JSON.parse(themeJson);
          console.log('Successfully parsed theme object with pattern:', pattern);
          break; // Use the first successful match
        }
      } catch (e) {
        console.log('Error with pattern:', pattern, 'Error:', e.message);
        continue; // Try next pattern
      }
    }

    // Initialize variables
    let themeVersion = null;
    let themeStoreLink = null;
    let themeImage = null;
    let faviconUrl = null;
    let metaTitle = null;

    // Detect platform/CMS with Shopify priority
    let platform = detectPlatform(html, Object.fromEntries(response.headers.entries()));
    console.log('🔍 Initial Platform Detection:', platform);

    // Enhanced Detection Logic with Priority Order (Schema-first approach)

    // 1. PRIMARY DETECTION: schema_name (most accurate for theme identification)
    const schemaNameMatch = html.match(/schema_name["']?\s*:\s*["']([^"']+)["']/);
    if (schemaNameMatch) {
      themeName = schemaNameMatch[1];
      console.log('🎯 Primary Detection (schema_name):', themeName);
    }

    // 2. SECONDARY DETECTION: Shopify.theme object (fallback)
    if (!themeName && themeObj) {
      if (themeObj.name) {
        themeName = themeObj.name;
      }

      if (themeObj.theme_store_id) {
        themeStoreId = themeObj.theme_store_id;
      } else if (themeObj.id) {
        themeStoreId = themeObj.id;
      }

      if (themeObj.version) {
        themeVersion = themeObj.version;
      }

      console.log('📦 Secondary Detection (Shopify.theme):', {
        name: themeName,
        themeStoreId,
        version: themeVersion
      });
    }

    // Look for schema_version (can be combined with any detection method)
    const schemaVersionMatch = html.match(/schema_version["']?\s*:\s*["']([^"']+)["']/);
    if (schemaVersionMatch) {
      themeVersion = schemaVersionMatch[1];
      console.log('📋 Schema Version Detected:', themeVersion);
    }

    // 3. TERTIARY DETECTION: data attributes (last resort)
    if (!themeName) {
      const dataNameMatch = html.match(/data-theme-name=["']([^"']+)["']/);
      if (dataNameMatch) {
        themeName = dataNameMatch[1];
        console.log('🏷️ Tertiary Detection (data-theme-name):', themeName);
      }
    }

    if (!themeVersion) {
      const dataVersionMatch = html.match(/data-theme-version=["']([^"']+)["']/);
      if (dataVersionMatch) {
        themeVersion = dataVersionMatch[1];
        console.log('🏷️ Tertiary Detection (data-theme-version):', themeVersion);
      }
    }

    // Additional theme_store_id detection (can work with any method)
    if (!themeStoreId) {
      const idPatterns = [
        /Shopify\.theme\.theme_store_id\s*=\s*["']?([^"'\s,;}]+)["']?/,
        /"theme_store_id"\s*:\s*["']?([^"'\s,;}]+)["']?/,
        /'theme_store_id'\s*:\s*['"]?([^'"\s,;}]+)['"]?/,
        /theme_store_id["']?\s*:\s*["']([^"']+)["']/,
        /theme_store_id\s*=\s*["']([^"']+)["']/,
      ];

      for (const pattern of idPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          themeStoreId = match[1].replace(/["']/g, '');
          console.log('🔗 Found theme_store_id:', themeStoreId);
          break;
        }
      }
    }

    // Secondary Pattern: Look for individual theme properties if object not found
    if (themeName === 'Theme not detected') {
      // Look for Shopify.theme.name
      const nameMatch = html.match(/Shopify\.theme\.name\s*[:=]\s*["']([^"']+)["']/);
      if (nameMatch) {
        themeName = nameMatch[1];
      }

      // Look for theme_store_id separately
      const idMatch = html.match(/["']theme_store_id["']\s*:\s*["']([^"']+)["']/);
      if (idMatch) {
        themeStoreId = idMatch[1];
      }
    }

    // Check for password protection and other scenarios
    const hasPasswordProtection = html.includes('password') && (
      html.includes('store is password protected') ||
      html.includes('enter store password') ||
      html.includes('password page') ||
      html.includes('coming soon')
    );

    const isMaintenanceMode = html.includes('maintenance') || html.includes('temporarily unavailable');

    // If still not detected, check if it's a Shopify store at all
    if (themeName === 'Theme not detected') {
      const isShopify = html.includes('Shopify') || html.includes('shopify') ||
                        html.includes('cdn.shopify.com') || html.includes('shopifycdn.com');

      if (!isShopify) {
        themeName = 'Not a Shopify store';
      } else if (hasPasswordProtection) {
        themeName = 'Store is password protected';
      } else if (isMaintenanceMode) {
        themeName = 'Store is in maintenance mode';
      } else {
        themeName = 'Custom Theme';
      }
    } else if (hasPasswordProtection) {
      // Even if theme was detected, if password protected, show that status
      themeName = 'Store is password protected';
      themeStoreLink = null;
    } else if (isMaintenanceMode) {
      themeName = 'Store is in maintenance mode';
      themeStoreLink = null;
    }

    // Enhanced platform override logic - only override if initial detection was uncertain
    const isShopifyStore = themeName !== 'Not a Shopify store' &&
                          themeName !== 'Store is password protected' &&
                          themeName !== 'Store is in maintenance mode' &&
                          themeName !== 'Theme not detected';

    if (isShopifyStore) {
      // Only override if initial platform detection was uncertain (Unknown or low confidence)
      const shouldOverride = !platform ||
                            platform.name === 'Unknown' ||
                            platform.confidence === 'low' ||
                            platform.confidence === 'none';

      if (shouldOverride) {
        platform = {
          name: 'Shopify',
          cms: 'Shopify',
          type: 'E-commerce Platform',
          icon: '<i class="fab fa-shopify"></i>',
          confidence: 'high',
          message: 'Shopify e-commerce platform detected',
          detectionScore: 5,
          matchedPatterns: ['Shopify.theme', 'schema_name', 'schema_version']
        };
        console.log('🔄 Platform overridden to Shopify due to theme detection');
      } else {
        // Conflict detected - keep original platform but add conflict note
        platform.conflictDetected = true;
        platform.shopifyThemeFound = true;
        platform.message = `${platform.name} detected, but Shopify theme information was also found. This may indicate a custom integration or migration in progress.`;
        console.log('⚠️ Platform conflict detected - keeping original platform detection');
      }
    }

    // Theme store link - generate using schema_name (theme name) in lowercase
    if (themeName && themeName !== 'Not a Shopify store' && themeName !== 'Store is password protected' && themeName !== 'Store is in maintenance mode' && themeName !== 'Theme not detected') {
      // Generate the official Shopify theme store URL using theme name in lowercase
      const themeSlug = themeName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      const potentialThemeLink = `https://themes.shopify.com/themes/${themeSlug}`;

      // Check if the theme link is valid (not 404)
      try {
        const linkCheckResponse = await fetch(potentialThemeLink, {
          method: 'HEAD',
          timeout: 5000, // 5 second timeout for link check
        });

        if (linkCheckResponse.ok) {
          themeStoreLink = potentialThemeLink;
          console.log('🎨 Generated Theme Link:', themeStoreLink);
        } else {
          console.log('⚠️ Theme link not available (404):', potentialThemeLink);
          themeStoreLink = null;
        }
      } catch (linkError) {
        console.log('⚠️ Theme link check failed:', linkError.message);
        themeStoreLink = null;
      }

      // Generate store screenshot using ScreenshotOne API directly
      try {
        console.log('📸 Generating screenshot for:', url);
  
        // Use ScreenshotOne API directly with proper parameters
        const screenshotUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&viewport_width=1280&viewport_height=720&image_quality=80&format=jpg&cache=true&delay=2&full_page=false&block_cookie_banners=true&block_chats=true&block_ads=true&full_page_scroll=false&device_scale=1`;
  
        // Test if the URL is accessible (optional, but good practice)
        try {
          const testResponse = await fetch(url, { method: 'HEAD', timeout: 5000 });
          if (!testResponse.ok) {
            console.log('⚠️ Store URL may not be accessible:', testResponse.status);
          }
        } catch (testError) {
          console.log('⚠️ Could not verify store URL accessibility');
        }
  
        themeImage = screenshotUrl;
        console.log('📸 Generated Store Screenshot:', themeImage);
      } catch (screenshotError) {
        console.log('⚠️ Screenshot generation failed:', screenshotError.message);
        // Fallback to theme preview
        themeImage = `https://cdn.shopify.com/shopifycloud/theme-store/themes/${themeSlug}/preview.jpg`;
        console.log('🖼️ Using theme preview fallback:', themeImage);
      }
  
      // Fetch favicon, meta title, and meta description for preview
      let metaDescription = null;
      try {
        console.log('🔍 Fetching favicon, meta title, and description for:', url);
  
        // Extract domain for favicon
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
  
        // Generate favicon URL using Google service
        faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  
        // Fetch meta title and description from the website
        try {
          const titleResponse = await fetch(url, {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; ShopifyThemeDetector/1.0)',
            },
            timeout: 5000,
          });
  
          if (titleResponse.ok) {
            const html = await titleResponse.text();
  
            // Extract meta title
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleMatch && titleMatch[1]) {
              metaTitle = titleMatch[1].trim();
              console.log('📄 Extracted meta title:', metaTitle);
            }
  
            // Extract meta description
            const descPatterns = [
              /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
              /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i,
              /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
              /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["'][^>]*>/i
            ];
  
            for (const pattern of descPatterns) {
              const descMatch = html.match(pattern);
              if (descMatch && descMatch[1]) {
                metaDescription = descMatch[1].trim();
                console.log('📝 Extracted meta description:', metaDescription);
                break;
              }
            }
          }
        } catch (titleError) {
          console.log('⚠️ Could not fetch meta data:', titleError.message);
        }
  
        console.log('🖼️ Generated favicon URL:', faviconUrl);
      } catch (faviconError) {
        console.log('⚠️ Favicon generation failed:', faviconError.message);
      }
    }

    // Suggestions - only show if we detected a known theme
    let suggestions = [];
    try {
      if (themeName && themeName !== 'Not a Shopify store' &&
          themeName !== 'Store is password protected' &&
          themeName !== 'Store is in maintenance mode' &&
          themeName !== 'Theme not detected') {

        if (themeName === 'Custom Theme') {
          suggestions = ['Dawn', 'Prestige', 'Impulse', 'Cascade'];
        } else {
          suggestions = themeSuggestions[themeName] || ['Dawn', 'Prestige', 'Impulse'];
        }
      }
    } catch (suggestionError) {
      console.error('Error generating suggestions:', suggestionError);
      suggestions = ['Dawn', 'Prestige', 'Impulse']; // Fallback
    }



    // Ensure all response fields are properly formatted
    const responseData = {
      themeName: themeName || 'Theme not detected',
      themeVersion: themeVersion || null,
      themeStoreLink: themeStoreLink || null,
      themeImage: themeImage || null,
      faviconUrl: faviconUrl || null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      suggestions: Array.isArray(suggestions) ? suggestions : [],
      platform: platform,
    };

    console.log('Final response data:', {
      themeName: responseData.themeName,
      themeVersion: responseData.themeVersion,
      themeStoreLink: responseData.themeStoreLink,
      themeImage: responseData.themeImage,
      faviconUrl: responseData.faviconUrl,
      metaTitle: responseData.metaTitle,
      metaDescription: responseData.metaDescription,
      suggestions: responseData.suggestions
    });

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Unexpected error in theme detection:', error);
    return NextResponse.json({
      error: 'An unexpected error occurred while detecting the theme. Please try again later.'
    }, { status: 500 });
  }
}