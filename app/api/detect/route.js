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

    // Initialize theme version
    let themeVersion = null;

    // Extract theme information from parsed object (PRIMARY METHOD)
    if (themeObj) {
      if (themeObj.name) {
        themeName = themeObj.name;
      }

      // Prioritize theme_store_id, fallback to id
      if (themeObj.theme_store_id) {
        themeStoreId = themeObj.theme_store_id;
      } else if (themeObj.id) {
        themeStoreId = themeObj.id;
      }

      // Extract version if available
      if (themeObj.version) {
        themeVersion = themeObj.version;
      }

      console.log('Successfully detected theme object (Primary):', {
        name: themeName,
        themeStoreId,
        version: themeVersion
      });
    } else {
      // SECONDARY METHOD: Look for schema_name and schema_version
      console.log('Theme object not found, trying secondary detection methods');

      // Look for schema_name (from settings_schema.json or inline scripts)
      const schemaNamePatterns = [
        /schema_name["']?\s*:\s*["']([^"']+)["']/,
        /"schema_name"\s*:\s*["']([^"']+)["']/,
        /'schema_name'\s*:\s*['"]([^'"]+)['"]/,
        /schema_name\s*=\s*["']([^"']+)["']/,
      ];

      for (const pattern of schemaNamePatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          themeName = match[1];
          console.log('Found schema_name (Secondary):', themeName);
          break;
        }
      }

      // Look for schema_version
      const schemaVersionPatterns = [
        /schema_version["']?\s*:\s*["']([^"']+)["']/,
        /"schema_version"\s*:\s*["']([^"']+)["']/,
        /'schema_version'\s*:\s*['"]([^'"]+)['"]/,
        /schema_version\s*=\s*["']([^"']+)["']/,
      ];

      for (const pattern of schemaVersionPatterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          themeVersion = match[1];
          console.log('Found schema_version (Secondary):', themeVersion);
          break;
        }
      }

      // TERTIARY METHOD: Look for data attributes in DOM
      if (!themeName) {
        // Look for data-theme-name attributes
        const dataThemeNamePatterns = [
          /data-theme-name=["']([^"']+)["']/,
          /data-theme-name\s*=\s*["']([^"']+)["']/,
        ];

        for (const pattern of dataThemeNamePatterns) {
          const match = html.match(pattern);
          if (match && match[1]) {
            themeName = match[1];
            console.log('Found data-theme-name (Tertiary):', themeName);
            break;
          }
        }
      }

      if (!themeVersion) {
        // Look for data-theme-version attributes
        const dataThemeVersionPatterns = [
          /data-theme-version=["']([^"']+)["']/,
          /data-theme-version\s*=\s*["']([^"']+)["']/,
        ];

        for (const pattern of dataThemeVersionPatterns) {
          const match = html.match(pattern);
          if (match && match[1]) {
            themeVersion = match[1];
            console.log('Found data-theme-version (Tertiary):', themeVersion);
            break;
          }
        }
      }

      // Look for theme_store_id using expanded patterns
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
          console.log('Found theme_store_id:', themeStoreId);
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

    // Initialize variables
    let themeStoreLink = null;
    let themeImage = null;

    // Theme store link - only generate if we have a valid theme_store_id
    if (themeStoreId && themeName !== 'Not a Shopify store' && themeName !== 'Store is password protected' && themeName !== 'Store is in maintenance mode') {
      // Generate the official Shopify theme store URL
      themeStoreLink = `https://themes.shopify.com/themes/${themeStoreId}`;

      // Generate theme preview image URL (Shopify's CDN pattern)
      themeImage = `https://cdn.shopify.com/shopifycloud/theme-store/themes/${themeStoreId}/preview.jpg`;
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
      suggestions: Array.isArray(suggestions) ? suggestions : [],
    };

    console.log('Final response data:', responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Unexpected error in theme detection:', error);
    return NextResponse.json({
      error: 'An unexpected error occurred while detecting the theme. Please try again later.'
    }, { status: 500 });
  }
}