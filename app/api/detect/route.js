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

// Shopify Apps Detection Database
const shopifyAppSignatures = {
  'Klaviyo': {
    patterns: [
      /klaviyo/i,
      /klaviyo\.com/i,
      /klaviyo-form/i,
      /klaviyo-popup/i,
      /klaviyo-signup/i
    ],
    scripts: [
      'klaviyo',
      'klaviyo.js',
      'static.klaviyo.com',
      'klaviyo-forms'
    ],
    classes: [
      'klaviyo-form',
      'klaviyo-popup',
      'klaviyo-signup',
      'klaviyo-modal'
    ],
    description: 'Advanced email marketing and SMS automation platform with powerful segmentation, personalized campaigns, and detailed analytics for e-commerce growth',
    appStoreUrl: 'https://apps.shopify.com/klaviyo-email-marketing',
    category: 'Marketing'
  },
  'Yotpo': {
    patterns: [
      /yotpo/i,
      /yotpo\.com/i,
      /yotpo-reviews/i,
      /yotpo-widget/i
    ],
    scripts: [
      'yotpo',
      'yotpo.js',
      'staticw2.yotpo.com',
      'yotpo-reviews'
    ],
    classes: [
      'yotpo-widget',
      'yotpo-reviews',
      'yotpo-stars',
      'yotpo-main-widget'
    ],
    description: 'Comprehensive reviews, loyalty programs, and SMS marketing platform that helps increase conversions through social proof and customer engagement',
    appStoreUrl: 'https://apps.shopify.com/yotpo',
    category: 'Marketing'
  },
  'ReCharge': {
    patterns: [
      /recharge/i,
      /recharge\.com/i,
      /recharge-subscription/i,
      /recharge-checkout/i
    ],
    scripts: [
      'recharge',
      'recharge.js',
      'js.rechargeapps.com'
    ],
    classes: [
      'recharge-subscription',
      'recharge-widget',
      'recharge-checkout'
    ],
    description: 'Subscription and recurring billing management',
    appStoreUrl: 'https://apps.shopify.com/subscription-payments',
    category: 'Sales'
  },
  'Judge.me': {
    patterns: [
      /judge\.me/i,
      /judge_me/i,
      /judge-me/i,
      /judge-me-reviews/i
    ],
    scripts: [
      'judge.me',
      'judge_me.js',
      'cdn.judge.me'
    ],
    classes: [
      'jdgm-widget',
      'jdgm-reviews',
      'jdgm-review'
    ],
    description: 'Advanced product reviews and ratings platform with photo reviews, Q&A, and SEO-optimized review widgets to boost credibility and conversions',
    appStoreUrl: 'https://apps.shopify.com/judgeme',
    category: 'Marketing'
  },
  'Omnisend': {
    patterns: [
      /omnisend/i,
      /omnisend\.com/i,
      /omnisend-form/i,
      /omnisend-popup/i
    ],
    scripts: [
      'omnisend',
      'omnisend.js',
      'cdn.omnisend.com'
    ],
    classes: [
      'omnisend-form',
      'omnisend-popup',
      'omnisend-widget'
    ],
    description: 'Email and SMS marketing automation',
    appStoreUrl: 'https://apps.shopify.com/omnisend',
    category: 'Marketing'
  },
  'Bold Product Options': {
    patterns: [
      /bold/i,
      /bold\.com/i,
      /bold-product-options/i,
      /bold-options/i
    ],
    scripts: [
      'bold',
      'bold.js',
      'bold-apps.com'
    ],
    classes: [
      'bold-options',
      'bold-product-options',
      'bold-variant'
    ],
    description: 'Advanced product options and customizations',
    appStoreUrl: 'https://apps.shopify.com/product-options',
    category: 'Product Management'
  },
  'Infinite Options': {
    patterns: [
      /infinite-options/i,
      /infiniteoptions/i,
      /infinite_options/i
    ],
    scripts: [
      'infinite-options',
      'infiniteoptions.js'
    ],
    classes: [
      'infinite-options',
      'infinite-option'
    ],
    description: 'Advanced product options and custom fields',
    appStoreUrl: 'https://apps.shopify.com/infinite-options',
    category: 'Product Management'
  },
  'Product Personalizer': {
    patterns: [
      /product-personalizer/i,
      /productpersonalizer/i,
      /personalizer/i
    ],
    scripts: [
      'product-personalizer',
      'personalizer.js'
    ],
    classes: [
      'product-personalizer',
      'personalizer-form'
    ],
    description: 'Product customization and personalization',
    appStoreUrl: 'https://apps.shopify.com/product-personalizer',
    category: 'Product Management'
  },
  'Search & Filter': {
    patterns: [
      /search-filter/i,
      /search_and_filter/i,
      /searchfilter/i
    ],
    scripts: [
      'search-filter',
      'searchfilter.js'
    ],
    classes: [
      'search-filter',
      'filter-widget'
    ],
    description: 'Advanced search and filtering functionality',
    appStoreUrl: 'https://apps.shopify.com/search-filter',
    category: 'Search & Navigation'
  },
  'Boost Commerce': {
    patterns: [
      /boost/i,
      /boost\.com/i,
      /boost-commerce/i,
      /boost-search/i
    ],
    scripts: [
      'boost',
      'boost.js',
      'cdn.boostcommerce.net'
    ],
    classes: [
      'boost-search',
      'boost-filter',
      'boost-widget'
    ],
    description: 'AI-powered search and filtering',
    appStoreUrl: 'https://apps.shopify.com/boost-ai-search-filter',
    category: 'Search & Navigation'
  },
  'Smile.io': {
    patterns: [
      /smile\.io/i,
      /smile-io/i,
      /smileio/i,
      /smile-rewards/i
    ],
    scripts: [
      'smile.io',
      'smile.js',
      'cdn.smile.io'
    ],
    classes: [
      'smile-widget',
      'smile-rewards',
      'smile-points'
    ],
    description: 'Loyalty and rewards program',
    appStoreUrl: 'https://apps.shopify.com/smile-io',
    category: 'Marketing'
  },
  'Loyalty Gator': {
    patterns: [
      /loyalty-gator/i,
      /loyaltygator/i,
      /loyalty_gator/i
    ],
    scripts: [
      'loyalty-gator',
      'loyaltygator.js'
    ],
    classes: [
      'loyalty-gator',
      'loyalty-widget'
    ],
    description: 'Customer loyalty and referral program',
    appStoreUrl: 'https://apps.shopify.com/loyalty-gator',
    category: 'Marketing'
  },
  'Privy': {
    patterns: [
      /privy/i,
      /privy\.com/i,
      /privy-popup/i,
      /privy-form/i
    ],
    scripts: [
      'privy',
      'privy.js',
      'cdn.privy.com'
    ],
    classes: [
      'privy-popup',
      'privy-form',
      'privy-widget'
    ],
    description: 'Email capture and marketing automation',
    appStoreUrl: 'https://apps.shopify.com/privy',
    category: 'Marketing'
  },
  'Mailchimp': {
    patterns: [
      /mailchimp/i,
      /mailchimp\.com/i,
      /mailchimp-form/i
    ],
    scripts: [
      'mailchimp',
      'mailchimp.js',
      'cdn-images.mailchimp.com'
    ],
    classes: [
      'mailchimp-form',
      'mailchimp-signup'
    ],
    description: 'Email marketing and automation',
    appStoreUrl: 'https://apps.shopify.com/mailchimp',
    category: 'Marketing'
  },
  'Zapier': {
    patterns: [
      /zapier/i,
      /zapier\.com/i,
      /zapier-webhook/i
    ],
    scripts: [
      'zapier',
      'zapier.js'
    ],
    classes: [
      'zapier-integration'
    ],
    description: 'Workflow automation and integrations',
    appStoreUrl: 'https://apps.shopify.com/zapier',
    category: 'Productivity'
  },
  'Google Analytics': {
    patterns: [
      /google-analytics/i,
      /googletagmanager/i,
      /gtag/i,
      /ga\(/i
    ],
    scripts: [
      'google-analytics',
      'googletagmanager.com',
      'gtag'
    ],
    description: 'Web analytics and tracking',
    appStoreUrl: 'https://apps.shopify.com/google-analytics',
    category: 'Analytics'
  },
  'Facebook Pixel': {
    patterns: [
      /facebook-pixel/i,
      /fbq\(/i,
      /facebook\.com\/tr/i
    ],
    scripts: [
      'facebook-pixel',
      'connect.facebook.net'
    ],
    description: 'Facebook advertising and tracking pixel',
    appStoreUrl: 'https://apps.shopify.com/facebook-pixel',
    category: 'Marketing'
  },
  'TikTok Pixel': {
    patterns: [
      /tiktok-pixel/i,
      /tiktok\.com/i,
      /ttq\./i
    ],
    scripts: [
      'tiktok-pixel',
      'analytics.tiktok.com'
    ],
    description: 'TikTok advertising and tracking pixel',
    appStoreUrl: 'https://apps.shopify.com/tiktok-pixel',
    category: 'Marketing'
  },
  'Pinterest Pixel': {
    patterns: [
      /pinterest-pixel/i,
      /pinterest\.com/i,
      /pintrk/i
    ],
    scripts: [
      'pinterest-pixel',
      's.pinimg.com'
    ],
    description: 'Pinterest advertising and tracking pixel',
    appStoreUrl: 'https://apps.shopify.com/pinterest-pixel',
    category: 'Marketing'
  },
  'Hotjar': {
    patterns: [
      /hotjar/i,
      /hotjar\.com/i,
      /hj\(/i
    ],
    scripts: [
      'hotjar',
      'hotjar.js',
      'static.hotjar.com'
    ],
    description: 'Website heatmaps and user behavior analytics',
    appStoreUrl: 'https://apps.shopify.com/hotjar',
    category: 'Analytics'
  },
  'Crazy Egg': {
    patterns: [
      /crazyegg/i,
      /crazy-egg/i,
      /crazy_egg/i
    ],
    scripts: [
      'crazyegg',
      'crazyegg.js',
      'script.crazyegg.com'
    ],
    description: 'Heatmaps and user behavior analytics',
    appStoreUrl: 'https://apps.shopify.com/crazy-egg',
    category: 'Analytics'
  },
  'OptinMonster': {
    patterns: [
      /optinmonster/i,
      /optin-monster/i,
      /optin_monster/i
    ],
    scripts: [
      'optinmonster',
      'optinmonster.js',
      'a.optinmonster.com'
    ],
    classes: [
      'optinmonster',
      'optin-monster'
    ],
    description: 'Lead generation and email capture',
    appStoreUrl: 'https://apps.shopify.com/optinmonster',
    category: 'Marketing'
  },
  'Sumo': {
    patterns: [
      /sumo/i,
      /sumo\.com/i,
      /sumo-list-builder/i
    ],
    scripts: [
      'sumo',
      'sumo.js',
      'load.sumome.com'
    ],
    classes: [
      'sumo-popup',
      'sumo-form'
    ],
    description: 'Lead generation and email marketing',
    appStoreUrl: 'https://apps.shopify.com/sumo',
    category: 'Marketing'
  },
  'Wheelio': {
    patterns: [
      /wheelio/i,
      /wheelio\.com/i,
      /wheelio-popup/i
    ],
    scripts: [
      'wheelio',
      'wheelio.js',
      'wheelioapp.s3.amazonaws.com'
    ],
    classes: [
      'wheelio-popup',
      'wheelio-widget'
    ],
    description: 'Spin-to-win wheel for email capture',
    appStoreUrl: 'https://apps.shopify.com/wheelio',
    category: 'Marketing'
  },
  'Spin-a-Sale': {
    patterns: [
      /spin-a-sale/i,
      /spinasale/i,
      /spin_a_sale/i
    ],
    scripts: [
      'spin-a-sale',
      'spinasale.js'
    ],
    classes: [
      'spin-a-sale',
      'spinasale-widget'
    ],
    description: 'Gamified email capture and promotions',
    appStoreUrl: 'https://apps.shopify.com/spin-a-sale',
    category: 'Marketing'
  },
  'Exit Intent': {
    patterns: [
      /exit-intent/i,
      /exitintent/i,
      /exit_intent/i
    ],
    scripts: [
      'exit-intent',
      'exitintent.js'
    ],
    classes: [
      'exit-intent',
      'exitintent-popup'
    ],
    description: 'Exit-intent popups for lead capture',
    appStoreUrl: 'https://apps.shopify.com/exit-intent',
    category: 'Marketing'
  },
  'PushOwl': {
    patterns: [
      /pushowl/i,
      /push-owl/i,
      /push_owl/i
    ],
    scripts: [
      'pushowl',
      'pushowl.js',
      'cdn.pushowl.com'
    ],
    description: 'Web push notifications',
    appStoreUrl: 'https://apps.shopify.com/pushowl',
    category: 'Marketing'
  },
  'VWO': {
    patterns: [
      /vwo/i,
      /visual-website-optimizer/i,
      /vwo_/
    ],
    scripts: [
      'vwo',
      'vwo.js',
      'dev.visualwebsiteoptimizer.com'
    ],
    description: 'A/B testing and conversion optimization',
    appStoreUrl: 'https://apps.shopify.com/visual-website-optimizer',
    category: 'Analytics'
  },
  'Lucky Orange': {
    patterns: [
      /luckyorange/i,
      /lucky-orange/i,
      /lucky_orange/i
    ],
    scripts: [
      'luckyorange',
      'luckyorange.js',
      'cdn.luckyorange.com'
    ],
    description: 'Live chat and website analytics',
    appStoreUrl: 'https://apps.shopify.com/lucky-orange',
    category: 'Analytics'
  },
  'Tidio': {
    patterns: [
      /tidio/i,
      /tidio\.com/i,
      /tidio-chat/i
    ],
    scripts: [
      'tidio',
      'tidio.js',
      'code.tidio.co'
    ],
    classes: [
      'tidio-chat',
      'tidio-widget'
    ],
    description: 'Live chat and customer support',
    appStoreUrl: 'https://apps.shopify.com/tidio-chat',
    category: 'Customer Support'
  },
  'Intercom': {
    patterns: [
      /intercom/i,
      /intercom\.com/i,
      /intercom-widget/i
    ],
    scripts: [
      'intercom',
      'intercom.js',
      'widget.intercom.io'
    ],
    classes: [
      'intercom-widget',
      'intercom-launcher'
    ],
    description: 'Customer messaging and support platform',
    appStoreUrl: 'https://apps.shopify.com/intercom',
    category: 'Customer Support'
  },
  'Zendesk': {
    patterns: [
      /zendesk/i,
      /zendesk\.com/i,
      /zendesk-widget/i
    ],
    scripts: [
      'zendesk',
      'zendesk.js',
      'v2.zopim.com'
    ],
    classes: [
      'zendesk-widget',
      'zopim'
    ],
    description: 'Customer support and helpdesk',
    appStoreUrl: 'https://apps.shopify.com/zendesk',
    category: 'Customer Support'
  },
  'Freshchat': {
    patterns: [
      /freshchat/i,
      /freshworks/i,
      /freshchat-widget/i
    ],
    scripts: [
      'freshchat',
      'freshchat.js',
      'wchat.freshchat.com'
    ],
    classes: [
      'freshchat-widget'
    ],
    description: 'Live chat and customer support',
    appStoreUrl: 'https://apps.shopify.com/freshchat',
    category: 'Customer Support'
  },
  'Drift': {
    patterns: [
      /drift/i,
      /drift\.com/i,
      /drift-widget/i
    ],
    scripts: [
      'drift',
      'drift.js',
      'js.driftt.com'
    ],
    classes: [
      'drift-widget',
      'drift-open-chat'
    ],
    description: 'Conversational marketing and sales',
    appStoreUrl: 'https://apps.shopify.com/drift',
    category: 'Customer Support'
  },
  'Olark': {
    patterns: [
      /olark/i,
      /olark\.com/i,
      /olark-widget/i
    ],
    scripts: [
      'olark',
      'olark.js',
      'static.olark.com'
    ],
    classes: [
      'olark-widget'
    ],
    description: 'Live chat and customer support',
    appStoreUrl: 'https://apps.shopify.com/olark',
    category: 'Customer Support'
  },
  'Shippo': {
    patterns: [
      /shippo/i,
      /shippo\.com/i,
      /shippo-shipping/i
    ],
    scripts: [
      'shippo',
      'shippo.js'
    ],
    classes: [
      'shippo-widget'
    ],
    description: 'Shipping and fulfillment management',
    appStoreUrl: 'https://apps.shopify.com/shippo',
    category: 'Shipping & Fulfillment'
  },
  'ShipStation': {
    patterns: [
      /shipstation/i,
      /ship-station/i,
      /ship_station/i
    ],
    scripts: [
      'shipstation',
      'shipstation.js'
    ],
    classes: [
      'shipstation-widget'
    ],
    description: 'Order fulfillment and shipping management',
    appStoreUrl: 'https://apps.shopify.com/shipstation',
    category: 'Shipping & Fulfillment'
  },
  'AfterShip': {
    patterns: [
      /aftership/i,
      /after-ship/i,
      /after_ship/i
    ],
    scripts: [
      'aftership',
      'aftership.js',
      'cdn.aftership.com'
    ],
    classes: [
      'aftership-widget'
    ],
    description: 'Order tracking and delivery updates',
    appStoreUrl: 'https://apps.shopify.com/aftership',
    category: 'Shipping & Fulfillment'
  },
  'Returnly': {
    patterns: [
      /returnly/i,
      /returnly\.com/i,
      /returnly-returns/i
    ],
    scripts: [
      'returnly',
      'returnly.js'
    ],
    classes: [
      'returnly-widget'
    ],
    description: 'Returns and exchanges management',
    appStoreUrl: 'https://apps.shopify.com/returnly',
    category: 'Customer Support'
  },
  'Loop Returns': {
    patterns: [
      /loop-returns/i,
      /loopreturns/i,
      /loop_returns/i
    ],
    scripts: [
      'loop-returns',
      'loopreturns.js'
    ],
    classes: [
      'loop-returns'
    ],
    description: 'Returns and warranty management',
    appStoreUrl: 'https://apps.shopify.com/loop-returns',
    category: 'Customer Support'
  },
  'Bold Upsell': {
    patterns: [
      /bold-upsell/i,
      /boldupsell/i,
      /bold_upsell/i
    ],
    scripts: [
      'bold-upsell',
      'boldupsell.js'
    ],
    classes: [
      'bold-upsell'
    ],
    description: 'Post-purchase upsells and cross-sells',
    appStoreUrl: 'https://apps.shopify.com/bold-upsell',
    category: 'Sales'
  },
  'CartHook': {
    patterns: [
      /carthook/i,
      /cart-hook/i,
      /cart_hook/i
    ],
    scripts: [
      'carthook',
      'carthook.js'
    ],
    classes: [
      'carthook-widget'
    ],
    description: 'Abandoned cart recovery and upsells',
    appStoreUrl: 'https://apps.shopify.com/carthook',
    category: 'Sales'
  },
  'One Click Upsell': {
    patterns: [
      /one-click-upsell/i,
      /oneclickupsell/i,
      /one_click_upsell/i
    ],
    scripts: [
      'one-click-upsell',
      'oneclickupsell.js'
    ],
    classes: [
      'one-click-upsell'
    ],
    description: 'One-click upsell offers',
    appStoreUrl: 'https://apps.shopify.com/one-click-upsell',
    category: 'Sales'
  },
  'Fera.ai': {
    patterns: [
      /fera\.ai/i,
      /fera-ai/i,
      /fera_ai/i
    ],
    scripts: [
      'fera.ai',
      'fera.js'
    ],
    classes: [
      'fera-widget'
    ],
    description: 'AI-powered reviews and testimonials',
    appStoreUrl: 'https://apps.shopify.com/fera',
    category: 'Marketing'
  },
  'Stamped.io': {
    patterns: [
      /stamped\.io/i,
      /stamped-io/i,
      /stamped_io/i
    ],
    scripts: [
      'stamped.io',
      'stamped.js',
      'cdn-stamped-io.azureedge.net'
    ],
    classes: [
      'stamped-widget'
    ],
    description: 'Product reviews and ratings',
    appStoreUrl: 'https://apps.shopify.com/stamped',
    category: 'Marketing'
  },
  'Loox': {
    patterns: [
      /loox/i,
      /loox\.com/i,
      /loox-reviews/i
    ],
    scripts: [
      'loox',
      'loox.js',
      'cdn.loox.io'
    ],
    classes: [
      'loox-widget'
    ],
    description: 'Photo reviews and ratings',
    appStoreUrl: 'https://apps.shopify.com/loox',
    category: 'Marketing'
  },
  'Ali Reviews': {
    patterns: [
      /ali-reviews/i,
      /alireviews/i,
      /ali_reviews/i,
      /ali.*express.*reviews/i
    ],
    scripts: [
      'ali-reviews',
      'alireviews.js',
      'cdn.alireviews.io'
    ],
    classes: [
      'ali-reviews',
      'ali-reviews-widget',
      'alireviews-container'
    ],
    description: 'Import and display AliExpress product reviews to boost credibility and social proof on your Shopify store',
    appStoreUrl: 'https://apps.shopify.com/ali-reviews',
    category: 'Marketing'
  },
  'Trustpilot': {
    patterns: [
      /trustpilot/i,
      /trustpilot\.com/i,
      /trustpilot-widget/i,
      /trustpilot-reviews/i
    ],
    scripts: [
      'trustpilot',
      'trustpilot.js',
      'widget.trustpilot.com',
      'cdn.trustpilot.net'
    ],
    classes: [
      'trustpilot-widget',
      'trustpilot-review',
      'trustpilot-container'
    ],
    description: 'Collect, manage, and display customer reviews with trust badges and review generation tools',
    appStoreUrl: 'https://apps.shopify.com/trustpilot',
    category: 'Marketing'
  },
  'Shopify Product Reviews': {
    patterns: [
      /shopify-product-reviews/i,
      /shopify_reviews/i,
      /product-reviews/i,
      /shopify.*reviews/i
    ],
    scripts: [
      'shopify-product-reviews',
      'product-reviews.js',
      'spr-reviews'
    ],
    classes: [
      'shopify-product-reviews',
      'spr-container',
      'spr-review'
    ],
    description: 'Official Shopify product reviews app for collecting and displaying customer feedback with photos and ratings',
    appStoreUrl: 'https://apps.shopify.com/product-reviews',
    category: 'Marketing'
  },
  'ReCharge Subscriptions': {
    patterns: [
      /recharge/i,
      /recharge\.com/i,
      /recharge-subscription/i,
      /subscription.*recharge/i
    ],
    scripts: [
      'recharge',
      'recharge.js',
      'js.rechargeapps.com',
      'recharge-subscription'
    ],
    classes: [
      'recharge-subscription',
      'recharge-widget',
      'recharge-checkout',
      'recharge-product'
    ],
    description: 'Advanced subscription management with recurring billing, customer portal, and retention tools',
    appStoreUrl: 'https://apps.shopify.com/subscription-payments',
    category: 'Sales'
  },
  'Bold Commerce': {
    patterns: [
      /bold/i,
      /bold\.com/i,
      /bold-commerce/i,
      /bold-apps/i
    ],
    scripts: [
      'bold',
      'bold.js',
      'bold-apps.com',
      'boldplatform.com'
    ],
    classes: [
      'bold-options',
      'bold-product-options',
      'bold-variant',
      'bold-cart'
    ],
    description: 'Complete e-commerce enhancement suite including product options, subscriptions, and cart management',
    appStoreUrl: 'https://apps.shopify.com/bold',
    category: 'Product Management'
  },
  'Infinite Options': {
    patterns: [
      /infinite-options/i,
      /infiniteoptions/i,
      /infinite_options/i,
      /infinite.*options/i
    ],
    scripts: [
      'infinite-options',
      'infiniteoptions.js',
      'cdn.infiniteoptions.com'
    ],
    classes: [
      'infinite-options',
      'infinite-option',
      'infinite-product',
      'io-container'
    ],
    description: 'Advanced product customization with unlimited options, custom fields, and complex product configurations',
    appStoreUrl: 'https://apps.shopify.com/infinite-options',
    category: 'Product Management'
  },
  'Product Personalizer': {
    patterns: [
      /product-personalizer/i,
      /productpersonalizer/i,
      /personalizer/i,
      /custom.*product/i
    ],
    scripts: [
      'product-personalizer',
      'personalizer.js',
      'cdn.productpersonalizer.com'
    ],
    classes: [
      'product-personalizer',
      'personalizer-form',
      'pp-container',
      'custom-product'
    ],
    description: 'Product personalization and customization tool allowing customers to add text, images, and custom designs',
    appStoreUrl: 'https://apps.shopify.com/product-personalizer',
    category: 'Product Management'
  },
  'Search & Filter': {
    patterns: [
      /search-filter/i,
      /search_and_filter/i,
      /searchfilter/i,
      /filter.*search/i
    ],
    scripts: [
      'search-filter',
      'searchfilter.js',
      'searchandfilter'
    ],
    classes: [
      'search-filter',
      'filter-widget',
      'search-container',
      'filter-sidebar'
    ],
    description: 'Advanced search and filtering functionality with faceted search, sorting, and product discovery tools',
    appStoreUrl: 'https://apps.shopify.com/search-filter',
    category: 'Search & Navigation'
  },
  'Boost Commerce AI': {
    patterns: [
      /boost/i,
      /boost\.com/i,
      /boost-commerce/i,
      /boost-search/i,
      /boost.*ai/i
    ],
    scripts: [
      'boost',
      'boost.js',
      'cdn.boostcommerce.net',
      'boost-pfs'
    ],
    classes: [
      'boost-search',
      'boost-filter',
      'boost-widget',
      'boost-pfs'
    ],
    description: 'AI-powered search, filtering, and product discovery with personalized recommendations and analytics',
    appStoreUrl: 'https://apps.shopify.com/boost-ai-search-filter',
    category: 'Search & Navigation'
  },
  'Smile.io Loyalty': {
    patterns: [
      /smile\.io/i,
      /smile-io/i,
      /smileio/i,
      /smile-rewards/i,
      /loyalty.*smile/i
    ],
    scripts: [
      'smile.io',
      'smile.js',
      'cdn.smile.io',
      'smile-loyalty'
    ],
    classes: [
      'smile-widget',
      'smile-rewards',
      'smile-points',
      'smile-loyalty'
    ],
    description: 'Customer loyalty and rewards program with points, referrals, and VIP tiers to increase retention',
    appStoreUrl: 'https://apps.shopify.com/smile-io',
    category: 'Marketing'
  },
  'Loyalty Gator': {
    patterns: [
      /loyalty-gator/i,
      /loyaltygator/i,
      /loyalty_gator/i,
      /gator.*loyalty/i
    ],
    scripts: [
      'loyalty-gator',
      'loyaltygator.js',
      'cdn.loaltygator.com'
    ],
    classes: [
      'loyalty-gator',
      'loyalty-widget',
      'gator-rewards'
    ],
    description: 'Customer loyalty program with points, rewards, and referral system to boost repeat purchases',
    appStoreUrl: 'https://apps.shopify.com/loyalty-gator',
    category: 'Marketing'
  },
  'Privy Email Marketing': {
    patterns: [
      /privy/i,
      /privy\.com/i,
      /privy-popup/i,
      /privy-form/i,
      /privy.*email/i
    ],
    scripts: [
      'privy',
      'privy.js',
      'cdn.privy.com',
      'privy-forms'
    ],
    classes: [
      'privy-popup',
      'privy-form',
      'privy-widget',
      'privy-signup'
    ],
    description: 'Email marketing and lead generation with popups, forms, and automated email campaigns',
    appStoreUrl: 'https://apps.shopify.com/privy',
    category: 'Marketing'
  },
  'Mailchimp for Shopify': {
    patterns: [
      /mailchimp/i,
      /mailchimp\.com/i,
      /mailchimp-form/i,
      /mailchimp.*shopify/i
    ],
    scripts: [
      'mailchimp',
      'mailchimp.js',
      'cdn-images.mailchimp.com',
      'mailchimp-forms'
    ],
    classes: [
      'mailchimp-form',
      'mailchimp-signup',
      'mailchimp-widget'
    ],
    description: 'Email marketing integration with automated campaigns, segmentation, and customer data sync',
    appStoreUrl: 'https://apps.shopify.com/mailchimp',
    category: 'Marketing'
  },
  'Zapier Automation': {
    patterns: [
      /zapier/i,
      /zapier\.com/i,
      /zapier-webhook/i,
      /zapier.*automation/i
    ],
    scripts: [
      'zapier',
      'zapier.js',
      'zapier-webhooks'
    ],
    classes: [
      'zapier-integration',
      'zapier-webhook'
    ],
    description: 'Workflow automation connecting Shopify with 5,000+ apps for seamless business process automation',
    appStoreUrl: 'https://apps.shopify.com/zapier',
    category: 'Productivity'
  },
  'Google Analytics 4': {
    patterns: [
      /google-analytics/i,
      /googletagmanager/i,
      /gtag/i,
      /ga\(/i,
      /analytics.*google/i
    ],
    scripts: [
      'google-analytics',
      'googletagmanager.com',
      'gtag',
      'analytics.js'
    ],
    description: 'Google Analytics integration for tracking website traffic, user behavior, and e-commerce conversions',
    appStoreUrl: 'https://apps.shopify.com/google-analytics',
    category: 'Analytics'
  },
  'Facebook Pixel': {
    patterns: [
      /facebook-pixel/i,
      /fbq\(/i,
      /facebook\.com\/tr/i,
      /facebook.*pixel/i
    ],
    scripts: [
      'facebook-pixel',
      'connect.facebook.net',
      'facebook-pixel-events'
    ],
    description: 'Facebook advertising pixel for tracking conversions, building audiences, and running retargeting campaigns',
    appStoreUrl: 'https://apps.shopify.com/facebook-pixel',
    category: 'Marketing'
  },
  'TikTok Pixel': {
    patterns: [
      /tiktok-pixel/i,
      /tiktok\.com/i,
      /ttq\./i,
      /tiktok.*pixel/i
    ],
    scripts: [
      'tiktok-pixel',
      'analytics.tiktok.com',
      'tiktok-pixel-events'
    ],
    description: 'TikTok advertising pixel for tracking conversions and creating custom audiences for TikTok Ads',
    appStoreUrl: 'https://apps.shopify.com/tiktok-pixel',
    category: 'Marketing'
  },
  'Pinterest Pixel': {
    patterns: [
      /pinterest-pixel/i,
      /pinterest\.com/i,
      /pintrk/i,
      /pinterest.*pixel/i
    ],
    scripts: [
      'pinterest-pixel',
      's.pinimg.com',
      'pinterest-conversion'
    ],
    description: 'Pinterest advertising pixel for tracking conversions and building audiences for Pinterest Ads campaigns',
    appStoreUrl: 'https://apps.shopify.com/pinterest-pixel',
    category: 'Marketing'
  },
  'Hotjar Heatmaps': {
    patterns: [
      /hotjar/i,
      /hotjar\.com/i,
      /hj\(/i,
      /hotjar.*heatmaps/i
    ],
    scripts: [
      'hotjar',
      'hotjar.js',
      'static.hotjar.com',
      'hotjar-heatmap'
    ],
    description: 'Website heatmaps, session recordings, and user feedback tools for optimizing user experience and conversions',
    appStoreUrl: 'https://apps.shopify.com/hotjar',
    category: 'Analytics'
  },
  'Crazy Egg': {
    patterns: [
      /crazyegg/i,
      /crazy-egg/i,
      /crazy_egg/i,
      /crazy.*egg/i
    ],
    scripts: [
      'crazyegg',
      'crazyegg.js',
      'script.crazyegg.com'
    ],
    description: 'Heatmaps, scrollmaps, and user behavior analytics to understand how visitors interact with your site',
    appStoreUrl: 'https://apps.shopify.com/crazy-egg',
    category: 'Analytics'
  },
  'OptinMonster': {
    patterns: [
      /optinmonster/i,
      /optin-monster/i,
      /optin_monster/i,
      /optin.*monster/i
    ],
    scripts: [
      'optinmonster',
      'optinmonster.js',
      'a.optinmonster.com'
    ],
    classes: [
      'optinmonster',
      'optin-monster',
      'om-popup'
    ],
    description: 'Advanced lead generation with popups, forms, and email capture campaigns with A/B testing',
    appStoreUrl: 'https://apps.shopify.com/optinmonster',
    category: 'Marketing'
  },
  'Sumo Email Marketing': {
    patterns: [
      /sumo/i,
      /sumo\.com/i,
      /sumo-list-builder/i,
      /sumo.*email/i
    ],
    scripts: [
      'sumo',
      'sumo.js',
      'load.sumome.com'
    ],
    classes: [
      'sumo-popup',
      'sumo-form',
      'sumo-list-builder'
    ],
    description: 'Email list building and marketing tools with popups, forms, and automated email campaigns',
    appStoreUrl: 'https://apps.shopify.com/sumo',
    category: 'Marketing'
  },
  'Wheelio Spin to Win': {
    patterns: [
      /wheelio/i,
      /wheelio\.com/i,
      /wheelio-popup/i,
      /spin.*win/i
    ],
    scripts: [
      'wheelio',
      'wheelio.js',
      'wheelioapp.s3.amazonaws.com'
    ],
    classes: [
      'wheelio-popup',
      'wheelio-widget',
      'wheelio-spin'
    ],
    description: 'Gamified email capture with spin-to-win wheels, contests, and promotional campaigns',
    appStoreUrl: 'https://apps.shopify.com/wheelio',
    category: 'Marketing'
  },
  'Spin-a-Sale': {
    patterns: [
      /spin-a-sale/i,
      /spinasale/i,
      /spin_a_sale/i,
      /spin.*sale/i
    ],
    scripts: [
      'spin-a-sale',
      'spinasale.js',
      'spin-to-win'
    ],
    classes: [
      'spin-a-sale',
      'spinasale-widget',
      'spin-wheel'
    ],
    description: 'Interactive spin-to-win wheel for email collection and customer engagement with discount offers',
    appStoreUrl: 'https://apps.shopify.com/spin-a-sale',
    category: 'Marketing'
  },
  'Exit Intent Popups': {
    patterns: [
      /exit-intent/i,
      /exitintent/i,
      /exit_intent/i,
      /exit.*popup/i
    ],
    scripts: [
      'exit-intent',
      'exitintent.js',
      'exit-popup'
    ],
    classes: [
      'exit-intent',
      'exitintent-popup',
      'exit-popup'
    ],
    description: 'Exit-intent technology to capture leaving visitors with popups, offers, and email collection',
    appStoreUrl: 'https://apps.shopify.com/exit-intent',
    category: 'Marketing'
  },
  'PushOwl Notifications': {
    patterns: [
      /pushowl/i,
      /push-owl/i,
      /push_owl/i,
      /web.*push/i
    ],
    scripts: [
      'pushowl',
      'pushowl.js',
      'cdn.pushowl.com'
    ],
    description: 'Web push notifications for re-engagement, abandoned cart recovery, and promotional campaigns',
    appStoreUrl: 'https://apps.shopify.com/pushowl',
    category: 'Marketing'
  },
  'VWO Testing': {
    patterns: [
      /vwo/i,
      /visual-website-optimizer/i,
      /vwo_/i,
      /ab.*test.*vwo/i
    ],
    scripts: [
      'vwo',
      'vwo.js',
      'dev.visualwebsiteoptimizer.com'
    ],
    description: 'A/B testing, multivariate testing, and conversion optimization platform for data-driven improvements',
    appStoreUrl: 'https://apps.shopify.com/visual-website-optimizer',
    category: 'Analytics'
  },
  'Lucky Orange': {
    patterns: [
      /luckyorange/i,
      /lucky-orange/i,
      /lucky_orange/i,
      /lucky.*orange/i
    ],
    scripts: [
      'luckyorange',
      'luckyorange.js',
      'cdn.luckyorange.com'
    ],
    description: 'Real-time website analytics with heatmaps, session recordings, and live visitor monitoring',
    appStoreUrl: 'https://apps.shopify.com/lucky-orange',
    category: 'Analytics'
  },
  'Tidio Live Chat': {
    patterns: [
      /tidio/i,
      /tidio\.com/i,
      /tidio-chat/i,
      /live.*chat.*tidio/i
    ],
    scripts: [
      'tidio',
      'tidio.js',
      'code.tidio.co'
    ],
    classes: [
      'tidio-chat',
      'tidio-widget',
      'tidio-chat-button'
    ],
    description: 'Live chat, chatbot, and customer support tools with automated responses and visitor tracking',
    appStoreUrl: 'https://apps.shopify.com/tidio-chat',
    category: 'Customer Support'
  },
  'Intercom Messenger': {
    patterns: [
      /intercom/i,
      /intercom\.com/i,
      /intercom-widget/i,
      /intercom.*messenger/i
    ],
    scripts: [
      'intercom',
      'intercom.js',
      'widget.intercom.io'
    ],
    classes: [
      'intercom-widget',
      'intercom-launcher',
      'intercom-messenger'
    ],
    description: 'Customer messaging platform with live chat, automated responses, and customer data management',
    appStoreUrl: 'https://apps.shopify.com/intercom',
    category: 'Customer Support'
  },
  'Zendesk Chat': {
    patterns: [
      /zendesk/i,
      /zendesk\.com/i,
      /zendesk-widget/i,
      /zendesk.*chat/i
    ],
    scripts: [
      'zendesk',
      'zendesk.js',
      'v2.zopim.com'
    ],
    classes: [
      'zendesk-widget',
      'zopim',
      'zendesk-chat'
    ],
    description: 'Customer support and helpdesk integration with live chat, ticketing, and knowledge base',
    appStoreUrl: 'https://apps.shopify.com/zendesk',
    category: 'Customer Support'
  },
  'Freshchat': {
    patterns: [
      /freshchat/i,
      /freshworks/i,
      /freshchat-widget/i,
      /fresh.*chat/i
    ],
    scripts: [
      'freshchat',
      'freshchat.js',
      'wchat.freshchat.com'
    ],
    classes: [
      'freshchat-widget',
      'freshchat-button'
    ],
    description: 'Omnichannel customer support with live chat, messaging, and automated customer service',
    appStoreUrl: 'https://apps.shopify.com/freshchat',
    category: 'Customer Support'
  },
  'Drift Conversational': {
    patterns: [
      /drift/i,
      /drift\.com/i,
      /drift-widget/i,
      /drift.*conversational/i
    ],
    scripts: [
      'drift',
      'drift.js',
      'js.driftt.com'
    ],
    classes: [
      'drift-widget',
      'drift-open-chat',
      'drift-conversational'
    ],
    description: 'Conversational marketing and sales platform with live chat and automated lead qualification',
    appStoreUrl: 'https://apps.shopify.com/drift',
    category: 'Customer Support'
  },
  'Olark Live Chat': {
    patterns: [
      /olark/i,
      /olark\.com/i,
      /olark-widget/i,
      /olark.*chat/i
    ],
    scripts: [
      'olark',
      'olark.js',
      'static.olark.com'
    ],
    classes: [
      'olark-widget',
      'olark-chat'
    ],
    description: 'Live chat and customer support with real-time visitor monitoring and automated greetings',
    appStoreUrl: 'https://apps.shopify.com/olark',
    category: 'Customer Support'
  },
  'Shippo Shipping': {
    patterns: [
      /shippo/i,
      /shippo\.com/i,
      /shippo-shipping/i,
      /shippo.*shipping/i
    ],
    scripts: [
      'shippo',
      'shippo.js',
      'shippo-labels'
    ],
    classes: [
      'shippo-widget',
      'shippo-shipping'
    ],
    description: 'Multi-carrier shipping platform with real-time rates, label printing, and international shipping',
    appStoreUrl: 'https://apps.shopify.com/shippo',
    category: 'Shipping & Fulfillment'
  },
  'ShipStation': {
    patterns: [
      /shipstation/i,
      /ship-station/i,
      /ship_station/i,
      /ship.*station/i
    ],
    scripts: [
      'shipstation',
      'shipstation.js',
      'shipstation-api'
    ],
    classes: [
      'shipstation-widget',
      'shipstation-integration'
    ],
    description: 'Order fulfillment and shipping management with automated processing and multi-carrier support',
    appStoreUrl: 'https://apps.shopify.com/shipstation',
    category: 'Shipping & Fulfillment'
  },
  'AfterShip Tracking': {
    patterns: [
      /aftership/i,
      /after-ship/i,
      /after_ship/i,
      /order.*tracking/i
    ],
    scripts: [
      'aftership',
      'aftership.js',
      'cdn.aftership.com'
    ],
    classes: [
      'aftership-widget',
      'aftership-tracking'
    ],
    description: 'Order tracking and delivery updates with automated notifications and customer communication',
    appStoreUrl: 'https://apps.shopify.com/aftership',
    category: 'Shipping & Fulfillment'
  },
  'Returnly Returns': {
    patterns: [
      /returnly/i,
      /returnly\.com/i,
      /returnly-returns/i,
      /returnly.*returns/i
    ],
    scripts: [
      'returnly',
      'returnly.js',
      'returnly-returns'
    ],
    classes: [
      'returnly-widget',
      'returnly-returns'
    ],
    description: 'Returns and exchanges management with prepaid labels, automated processing, and customer portal',
    appStoreUrl: 'https://apps.shopify.com/returnly',
    category: 'Customer Support'
  },
  'Loop Returns': {
    patterns: [
      /loop-returns/i,
      /loopreturns/i,
      /loop_returns/i,
      /loop.*returns/i
    ],
    scripts: [
      'loop-returns',
      'loopreturns.js',
      'loop-returns'
    ],
    classes: [
      'loop-returns',
      'loop-return'
    ],
    description: 'Returns and warranty management with automated processing and customer self-service portal',
    appStoreUrl: 'https://apps.shopify.com/loop-returns',
    category: 'Customer Support'
  },
  'Bold Upsell': {
    patterns: [
      /bold-upsell/i,
      /boldupsell/i,
      /bold_upsell/i,
      /bold.*upsell/i
    ],
    scripts: [
      'bold-upsell',
      'boldupsell.js',
      'bold-post-purchase'
    ],
    classes: [
      'bold-upsell',
      'bold-post-purchase'
    ],
    description: 'Post-purchase upsells and cross-sells with automated offers and increased average order value',
    appStoreUrl: 'https://apps.shopify.com/bold-upsell',
    category: 'Sales'
  },
  'CartHook': {
    patterns: [
      /carthook/i,
      /cart-hook/i,
      /cart_hook/i,
      /cart.*hook/i
    ],
    scripts: [
      'carthook',
      'carthook.js',
      'carthook-upsell'
    ],
    classes: [
      'carthook-widget',
      'carthook-upsell'
    ],
    description: 'Abandoned cart recovery and one-click upsells with automated email campaigns and discount offers',
    appStoreUrl: 'https://apps.shopify.com/carthook',
    category: 'Sales'
  },
  'One Click Upsell': {
    patterns: [
      /one-click-upsell/i,
      /oneclickupsell/i,
      /one_click_upsell/i,
      /one.*click.*upsell/i
    ],
    scripts: [
      'one-click-upsell',
      'oneclickupsell.js',
      'one-click-upsell'
    ],
    classes: [
      'one-click-upsell',
      'oneclick-upsell'
    ],
    description: 'One-click upsell offers at checkout with automated product recommendations and increased revenue',
    appStoreUrl: 'https://apps.shopify.com/one-click-upsell',
    category: 'Sales'
  },
  'Fera.ai Reviews': {
    patterns: [
      /fera\.ai/i,
      /fera-ai/i,
      /fera_ai/i,
      /fera.*reviews/i
    ],
    scripts: [
      'fera.ai',
      'fera.js',
      'fera-reviews'
    ],
    classes: [
      'fera-widget',
      'fera-reviews'
    ],
    description: 'AI-powered product reviews and testimonials with automated review requests and social proof',
    appStoreUrl: 'https://apps.shopify.com/fera',
    category: 'Marketing'
  },
  'Stamped.io': {
    patterns: [
      /stamped\.io/i,
      /stamped-io/i,
      /stamped_io/i,
      /stamped.*reviews/i
    ],
    scripts: [
      'stamped.io',
      'stamped.js',
      'cdn-stamped-io.azureedge.net'
    ],
    classes: [
      'stamped-widget',
      'stamped-reviews'
    ],
    description: 'Product reviews and ratings platform with photo reviews, Q&A, and SEO-optimized review display',
    appStoreUrl: 'https://apps.shopify.com/stamped',
    category: 'Marketing'
  },
  'Loox Photo Reviews': {
    patterns: [
      /loox/i,
      /loox\.com/i,
      /loox-reviews/i,
      /loox.*photo/i
    ],
    scripts: [
      'loox',
      'loox.js',
      'cdn.loox.io'
    ],
    classes: [
      'loox-widget',
      'loox-reviews'
    ],
    description: 'Photo reviews and user-generated content platform with social proof and customer testimonials',
    appStoreUrl: 'https://apps.shopify.com/loox',
    category: 'Marketing'
  },
  'Gorgias': {
    patterns: [
      /gorgias/i,
      /gorgias\.com/i,
      /gorgias-chat/i,
      /gorgias-widget/i
    ],
    scripts: [
      'gorgias',
      'gorgias.js',
      'cdn.gorgias.com'
    ],
    classes: [
      'gorgias-chat',
      'gorgias-widget'
    ],
    description: 'AI-powered customer support and helpdesk with live chat, ticketing, and automated responses',
    appStoreUrl: 'https://apps.shopify.com/gorgias',
    category: 'Customer Support'
  },
  'Rebuy': {
    patterns: [
      /rebuy/i,
      /rebuy\.com/i,
      /rebuy-engine/i,
      /rebuy-personalization/i
    ],
    scripts: [
      'rebuy',
      'rebuy.js',
      'cdn.rebuyengine.com'
    ],
    classes: [
      'rebuy-widget',
      'rebuy-personalization'
    ],
    description: 'AI-powered product recommendations and personalization engine for increased conversions',
    appStoreUrl: 'https://apps.shopify.com/rebuy-personalization-engine',
    category: 'Marketing'
  },
  'Sezzle': {
    patterns: [
      /sezzle/i,
      /sezzle\.com/i,
      /sezzle-widget/i,
      /sezzle-checkout/i
    ],
    scripts: [
      'sezzle',
      'sezzle.js',
      'cdn.sezzle.com'
    ],
    classes: [
      'sezzle-widget',
      'sezzle-checkout'
    ],
    description: 'Buy now, pay later financing option that increases average order value and conversion rates',
    appStoreUrl: 'https://apps.shopify.com/sezzle',
    category: 'Sales'
  },
  'Bold Cashier': {
    patterns: [
      /bold-cashier/i,
      /bold.*cashier/i,
      /cashier.*bold/i
    ],
    scripts: [
      'bold-cashier',
      'boldcashier.js'
    ],
    classes: [
      'bold-cashier'
    ],
    description: 'Custom checkout experience with advanced features and payment options',
    appStoreUrl: 'https://apps.shopify.com/bold-cashier',
    category: 'Sales'
  },
  'Infinite Options Pro': {
    patterns: [
      /infinite-options/i,
      /infiniteoptions/i,
      /infinite.*options.*pro/i
    ],
    scripts: [
      'infinite-options-pro',
      'infiniteoptionspro.js'
    ],
    classes: [
      'infinite-options-pro'
    ],
    description: 'Professional version of product customization with advanced options and pricing rules',
    appStoreUrl: 'https://apps.shopify.com/infinite-options-pro',
    category: 'Product Management'
  },
  'Product Personalizer Pro': {
    patterns: [
      /product-personalizer.*pro/i,
      /personalizer.*pro/i,
      /custom.*product.*pro/i
    ],
    scripts: [
      'product-personalizer-pro',
      'personalizerpro.js'
    ],
    classes: [
      'product-personalizer-pro'
    ],
    description: 'Professional product personalization with advanced customization and bulk ordering',
    appStoreUrl: 'https://apps.shopify.com/product-personalizer-pro',
    category: 'Product Management'
  },
  'Search & Filter Pro': {
    patterns: [
      /search-filter.*pro/i,
      /search.*filter.*pro/i,
      /filter.*pro/i
    ],
    scripts: [
      'search-filter-pro',
      'searchfilterpro.js'
    ],
    classes: [
      'search-filter-pro'
    ],
    description: 'Professional search and filtering with advanced faceting and analytics',
    appStoreUrl: 'https://apps.shopify.com/search-filter-pro',
    category: 'Search & Navigation'
  },
  'Boost Commerce Pro': {
    patterns: [
      /boost.*commerce.*pro/i,
      /boost.*pro/i,
      /boost.*ai.*pro/i
    ],
    scripts: [
      'boost-commerce-pro',
      'boostcommercepro.js'
    ],
    classes: [
      'boost-commerce-pro'
    ],
    description: 'Professional AI-powered search with advanced analytics and personalization',
    appStoreUrl: 'https://apps.shopify.com/boost-commerce-pro',
    category: 'Search & Navigation'
  },
  'Smile.io Pro': {
    patterns: [
      /smile\.io.*pro/i,
      /smile.*pro/i,
      /loyalty.*pro/i
    ],
    scripts: [
      'smile.io-pro',
      'smilepro.js'
    ],
    classes: [
      'smile-pro'
    ],
    description: 'Professional loyalty program with advanced rewards and customer segmentation',
    appStoreUrl: 'https://apps.shopify.com/smile-io-pro',
    category: 'Marketing'
  },
  'Loyalty Gator Pro': {
    patterns: [
      /loyalty-gator.*pro/i,
      /loyaltygator.*pro/i,
      /gator.*pro/i
    ],
    scripts: [
      'loyalty-gator-pro',
      'loyaltygatorpro.js'
    ],
    classes: [
      'loyalty-gator-pro'
    ],
    description: 'Professional loyalty program with advanced features and integrations',
    appStoreUrl: 'https://apps.shopify.com/loyalty-gator-pro',
    category: 'Marketing'
  },
  'Privy Pro': {
    patterns: [
      /privy.*pro/i,
      /privy.*professional/i,
      /email.*marketing.*pro/i
    ],
    scripts: [
      'privy-pro',
      'privypro.js'
    ],
    classes: [
      'privy-pro'
    ],
    description: 'Professional email marketing with advanced segmentation and automation',
    appStoreUrl: 'https://apps.shopify.com/privy-pro',
    category: 'Marketing'
  },
  'Mailchimp Pro': {
    patterns: [
      /mailchimp.*pro/i,
      /mailchimp.*professional/i,
      /email.*pro/i
    ],
    scripts: [
      'mailchimp-pro',
      'mailchimppro.js'
    ],
    classes: [
      'mailchimp-pro'
    ],
    description: 'Professional email marketing integration with advanced automation and reporting',
    appStoreUrl: 'https://apps.shopify.com/mailchimp-pro',
    category: 'Marketing'
  },
  'Zapier Pro': {
    patterns: [
      /zapier.*pro/i,
      /zapier.*professional/i,
      /automation.*pro/i
    ],
    scripts: [
      'zapier-pro',
      'zapierpro.js'
    ],
    classes: [
      'zapier-pro'
    ],
    description: 'Professional workflow automation with advanced integrations and custom logic',
    appStoreUrl: 'https://apps.shopify.com/zapier-pro',
    category: 'Productivity'
  },
  'Google Analytics Pro': {
    patterns: [
      /google.*analytics.*pro/i,
      /analytics.*pro/i,
      /ga4.*pro/i
    ],
    scripts: [
      'google-analytics-pro',
      'analyticspro.js'
    ],
    classes: [
      'google-analytics-pro'
    ],
    description: 'Professional Google Analytics integration with advanced tracking and reporting',
    appStoreUrl: 'https://apps.shopify.com/google-analytics-pro',
    category: 'Analytics'
  },
  'Facebook Pixel Pro': {
    patterns: [
      /facebook.*pixel.*pro/i,
      /fb.*pixel.*pro/i,
      /pixel.*pro/i
    ],
    scripts: [
      'facebook-pixel-pro',
      'fbpixelpro.js'
    ],
    classes: [
      'facebook-pixel-pro'
    ],
    description: 'Professional Facebook pixel with advanced conversion tracking and custom audiences',
    appStoreUrl: 'https://apps.shopify.com/facebook-pixel-pro',
    category: 'Marketing'
  },
  'TikTok Pixel Pro': {
    patterns: [
      /tiktok.*pixel.*pro/i,
      /tiktok.*pro/i,
      /tiktok.*pixel/i
    ],
    scripts: [
      'tiktok-pixel-pro',
      'tiktokpixelpro.js'
    ],
    classes: [
      'tiktok-pixel-pro'
    ],
    description: 'Professional TikTok pixel with advanced tracking and retargeting capabilities',
    appStoreUrl: 'https://apps.shopify.com/tiktok-pixel-pro',
    category: 'Marketing'
  },
  'Pinterest Pixel Pro': {
    patterns: [
      /pinterest.*pixel.*pro/i,
      /pinterest.*pro/i,
      /pinterest.*pixel/i
    ],
    scripts: [
      'pinterest-pixel-pro',
      'pinterestpixelpro.js'
    ],
    classes: [
      'pinterest-pixel-pro'
    ],
    description: 'Professional Pinterest pixel with advanced conversion tracking and audience building',
    appStoreUrl: 'https://apps.shopify.com/pinterest-pixel-pro',
    category: 'Marketing'
  },
  'Hotjar Pro': {
    patterns: [
      /hotjar.*pro/i,
      /hotjar.*professional/i,
      /heatmaps.*pro/i
    ],
    scripts: [
      'hotjar-pro',
      'hotjarpro.js'
    ],
    classes: [
      'hotjar-pro'
    ],
    description: 'Professional heatmaps and user behavior analytics with advanced filtering and insights',
    appStoreUrl: 'https://apps.shopify.com/hotjar-pro',
    category: 'Analytics'
  },
  'Crazy Egg Pro': {
    patterns: [
      /crazy.*egg.*pro/i,
      /crazyegg.*pro/i,
      /heatmaps.*pro/i
    ],
    scripts: [
      'crazy-egg-pro',
      'crazyeggpro.js'
    ],
    classes: [
      'crazy-egg-pro'
    ],
    description: 'Professional heatmaps and user behavior analytics with advanced segmentation',
    appStoreUrl: 'https://apps.shopify.com/crazy-egg-pro',
    category: 'Analytics'
  },
  'OptinMonster Pro': {
    patterns: [
      /optinmonster.*pro/i,
      /optin.*monster.*pro/i,
      /lead.*gen.*pro/i
    ],
    scripts: [
      'optinmonster-pro',
      'optinmonsterpro.js'
    ],
    classes: [
      'optinmonster-pro'
    ],
    description: 'Professional lead generation with advanced popups and conversion optimization',
    appStoreUrl: 'https://apps.shopify.com/optinmonster-pro',
    category: 'Marketing'
  },
  'Sumo Pro': {
    patterns: [
      /sumo.*pro/i,
      /sumo.*professional/i,
      /email.*marketing.*pro/i
    ],
    scripts: [
      'sumo-pro',
      'sumopro.js'
    ],
    classes: [
      'sumo-pro'
    ],
    description: 'Professional email marketing and lead generation with advanced automation',
    appStoreUrl: 'https://apps.shopify.com/sumo-pro',
    category: 'Marketing'
  },
  'Wheelio Pro': {
    patterns: [
      /wheelio.*pro/i,
      /wheelio.*professional/i,
      /spin.*win.*pro/i
    ],
    scripts: [
      'wheelio-pro',
      'wheelioapppro.js'
    ],
    classes: [
      'wheelio-pro'
    ],
    description: 'Professional gamified email capture with advanced analytics and customization',
    appStoreUrl: 'https://apps.shopify.com/wheelio-pro',
    category: 'Marketing'
  },
  'Spin-a-Sale Pro': {
    patterns: [
      /spin.*sale.*pro/i,
      /spinasale.*pro/i,
      /gamification.*pro/i
    ],
    scripts: [
      'spin-a-sale-pro',
      'spinasalepro.js'
    ],
    classes: [
      'spin-a-sale-pro'
    ],
    description: 'Professional gamified email capture with advanced features and analytics',
    appStoreUrl: 'https://apps.shopify.com/spin-a-sale-pro',
    category: 'Marketing'
  },
  'Exit Intent Pro': {
    patterns: [
      /exit.*intent.*pro/i,
      /exitintent.*pro/i,
      /popup.*pro/i
    ],
    scripts: [
      'exit-intent-pro',
      'exitintentpro.js'
    ],
    classes: [
      'exit-intent-pro'
    ],
    description: 'Professional exit-intent popups with advanced targeting and personalization',
    appStoreUrl: 'https://apps.shopify.com/exit-intent-pro',
    category: 'Marketing'
  },
  'PushOwl Pro': {
    patterns: [
      /pushowl.*pro/i,
      /push.*owl.*pro/i,
      /web.*push.*pro/i
    ],
    scripts: [
      'pushowl-pro',
      'pushowlpro.js'
    ],
    classes: [
      'pushowl-pro'
    ],
    description: 'Professional web push notifications with advanced segmentation and automation',
    appStoreUrl: 'https://apps.shopify.com/pushowl-pro',
    category: 'Marketing'
  },
  'VWO Pro': {
    patterns: [
      /vwo.*pro/i,
      /visual.*website.*optimizer.*pro/i,
      /ab.*test.*pro/i
    ],
    scripts: [
      'vwo-pro',
      'vwopro.js'
    ],
    classes: [
      'vwo-pro'
    ],
    description: 'Professional A/B testing and conversion optimization platform',
    appStoreUrl: 'https://apps.shopify.com/vwo-pro',
    category: 'Analytics'
  },
  'Lucky Orange Pro': {
    patterns: [
      /lucky.*orange.*pro/i,
      /luckyorange.*pro/i,
      /session.*recording.*pro/i
    ],
    scripts: [
      'lucky-orange-pro',
      'luckyorangepro.js'
    ],
    classes: [
      'lucky-orange-pro'
    ],
    description: 'Professional session recordings and user analytics with advanced filtering',
    appStoreUrl: 'https://apps.shopify.com/lucky-orange-pro',
    category: 'Analytics'
  },
  'Tidio Pro': {
    patterns: [
      /tidio.*pro/i,
      /tidio.*professional/i,
      /live.*chat.*pro/i
    ],
    scripts: [
      'tidio-pro',
      'tidiopro.js'
    ],
    classes: [
      'tidio-pro'
    ],
    description: 'Professional live chat with advanced chatbot and customer support features',
    appStoreUrl: 'https://apps.shopify.com/tidio-pro',
    category: 'Customer Support'
  },
  'Intercom Pro': {
    patterns: [
      /intercom.*pro/i,
      /intercom.*professional/i,
      /messenger.*pro/i
    ],
    scripts: [
      'intercom-pro',
      'intercompro.js'
    ],
    classes: [
      'intercom-pro'
    ],
    description: 'Professional customer messaging platform with advanced automation and insights',
    appStoreUrl: 'https://apps.shopify.com/intercom-pro',
    category: 'Customer Support'
  },
  'Zendesk Pro': {
    patterns: [
      /zendesk.*pro/i,
      /zendesk.*professional/i,
      /helpdesk.*pro/i
    ],
    scripts: [
      'zendesk-pro',
      'zendeskpro.js'
    ],
    classes: [
      'zendesk-pro'
    ],
    description: 'Professional helpdesk and customer support with advanced ticketing and automation',
    appStoreUrl: 'https://apps.shopify.com/zendesk-pro',
    category: 'Customer Support'
  },
  'Freshchat Pro': {
    patterns: [
      /freshchat.*pro/i,
      /fresh.*chat.*pro/i,
      /omnichannel.*pro/i
    ],
    scripts: [
      'freshchat-pro',
      'freshchatpro.js'
    ],
    classes: [
      'freshchat-pro'
    ],
    description: 'Professional omnichannel customer support with advanced automation and analytics',
    appStoreUrl: 'https://apps.shopify.com/freshchat-pro',
    category: 'Customer Support'
  },
  'Drift Pro': {
    patterns: [
      /drift.*pro/i,
      /drift.*professional/i,
      /conversational.*pro/i
    ],
    scripts: [
      'drift-pro',
      'driftpro.js'
    ],
    classes: [
      'drift-pro'
    ],
    description: 'Professional conversational marketing with advanced lead qualification and routing',
    appStoreUrl: 'https://apps.shopify.com/drift-pro',
    category: 'Customer Support'
  },
  'Olark Pro': {
    patterns: [
      /olark.*pro/i,
      /olark.*professional/i,
      /live.*chat.*pro/i
    ],
    scripts: [
      'olark-pro',
      'olarkpro.js'
    ],
    classes: [
      'olark-pro'
    ],
    description: 'Professional live chat with advanced visitor monitoring and automated greetings',
    appStoreUrl: 'https://apps.shopify.com/olark-pro',
    category: 'Customer Support'
  },
  'Shippo Pro': {
    patterns: [
      /shippo.*pro/i,
      /shippo.*professional/i,
      /shipping.*pro/i
    ],
    scripts: [
      'shippo-pro',
      'shippopro.js'
    ],
    classes: [
      'shippo-pro'
    ],
    description: 'Professional multi-carrier shipping with advanced label printing and tracking',
    appStoreUrl: 'https://apps.shopify.com/shippo-pro',
    category: 'Shipping & Fulfillment'
  },
  'ShipStation Pro': {
    patterns: [
      /shipstation.*pro/i,
      /ship.*station.*pro/i,
      /fulfillment.*pro/i
    ],
    scripts: [
      'shipstation-pro',
      'shipstationpro.js'
    ],
    classes: [
      'shipstation-pro'
    ],
    description: 'Professional order fulfillment with advanced automation and multi-carrier support',
    appStoreUrl: 'https://apps.shopify.com/shipstation-pro',
    category: 'Shipping & Fulfillment'
  },
  'AfterShip Pro': {
    patterns: [
      /aftership.*pro/i,
      /after.*ship.*pro/i,
      /tracking.*pro/i
    ],
    scripts: [
      'aftership-pro',
      'aftershippro.js'
    ],
    classes: [
      'aftership-pro'
    ],
    description: 'Professional order tracking with advanced notifications and customer communication',
    appStoreUrl: 'https://apps.shopify.com/aftership-pro',
    category: 'Shipping & Fulfillment'
  },
  'Returnly Pro': {
    patterns: [
      /returnly.*pro/i,
      /returnly.*professional/i,
      /returns.*pro/i
    ],
    scripts: [
      'returnly-pro',
      'returnlypro.js'
    ],
    classes: [
      'returnly-pro'
    ],
    description: 'Professional returns management with prepaid labels and automated processing',
    appStoreUrl: 'https://apps.shopify.com/returnly-pro',
    category: 'Customer Support'
  },
  'Loop Returns Pro': {
    patterns: [
      /loop.*returns.*pro/i,
      /loopreturns.*pro/i,
      /warranty.*pro/i
    ],
    scripts: [
      'loop-returns-pro',
      'loopreturnspro.js'
    ],
    classes: [
      'loop-returns-pro'
    ],
    description: 'Professional returns and warranty management with automated customer service',
    appStoreUrl: 'https://apps.shopify.com/loop-returns-pro',
    category: 'Customer Support'
  },
  'Bold Upsell Pro': {
    patterns: [
      /bold.*upsell.*pro/i,
      /boldupsell.*pro/i,
      /post.*purchase.*pro/i
    ],
    scripts: [
      'bold-upsell-pro',
      'boldupsellpro.js'
    ],
    classes: [
      'bold-upsell-pro'
    ],
    description: 'Professional post-purchase upsells with advanced analytics and optimization',
    appStoreUrl: 'https://apps.shopify.com/bold-upsell-pro',
    category: 'Sales'
  },
  'CartHook Pro': {
    patterns: [
      /carthook.*pro/i,
      /cart.*hook.*pro/i,
      /abandoned.*cart.*pro/i
    ],
    scripts: [
      'carthook-pro',
      'carthookpro.js'
    ],
    classes: [
      'carthook-pro'
    ],
    description: 'Professional abandoned cart recovery with advanced email automation and analytics',
    appStoreUrl: 'https://apps.shopify.com/carthook-pro',
    category: 'Sales'
  },
  'One Click Upsell Pro': {
    patterns: [
      /one.*click.*upsell.*pro/i,
      /oneclickupsell.*pro/i,
      /checkout.*upsell.*pro/i
    ],
    scripts: [
      'one-click-upsell-pro',
      'oneclickupsellpro.js'
    ],
    classes: [
      'one-click-upsell-pro'
    ],
    description: 'Professional one-click upsells with advanced product recommendations and revenue optimization',
    appStoreUrl: 'https://apps.shopify.com/one-click-upsell-pro',
    category: 'Sales'
  },
  'Fera.ai Pro': {
    patterns: [
      /fera\.ai.*pro/i,
      /fera.*pro/i,
      /reviews.*pro/i
    ],
    scripts: [
      'fera.ai-pro',
      'ferapro.js'
    ],
    classes: [
      'fera-pro'
    ],
    description: 'Professional AI-powered reviews with advanced automation and social proof',
    appStoreUrl: 'https://apps.shopify.com/fera-pro',
    category: 'Marketing'
  },
  'Stamped.io Pro': {
    patterns: [
      /stamped\.io.*pro/i,
      /stamped.*pro/i,
      /reviews.*pro/i
    ],
    scripts: [
      'stamped.io-pro',
      'stampedpro.js'
    ],
    classes: [
      'stamped-pro'
    ],
    description: 'Professional product reviews with advanced photo reviews and SEO optimization',
    appStoreUrl: 'https://apps.shopify.com/stamped-pro',
    category: 'Marketing'
  },
  'Loox Pro': {
    patterns: [
      /loox.*pro/i,
      /loox.*professional/i,
      /photo.*reviews.*pro/i
    ],
    scripts: [
      'loox-pro',
      'looxpro.js'
    ],
    classes: [
      'loox-pro'
    ],
    description: 'Professional photo reviews and user-generated content with advanced analytics',
    appStoreUrl: 'https://apps.shopify.com/loox-pro',
    category: 'Marketing'
  },
  'Ali Reviews Pro': {
    patterns: [
      /ali.*reviews.*pro/i,
      /alireviews.*pro/i,
      /aliexpress.*reviews.*pro/i
    ],
    scripts: [
      'ali-reviews-pro',
      'alireviewspro.js'
    ],
    classes: [
      'ali-reviews-pro'
    ],
    description: 'Professional AliExpress review import with advanced filtering and display options',
    appStoreUrl: 'https://apps.shopify.com/ali-reviews-pro',
    category: 'Marketing'
  },
  'Trustpilot Pro': {
    patterns: [
      /trustpilot.*pro/i,
      /trustpilot.*professional/i,
      /reviews.*pro/i
    ],
    scripts: [
      'trustpilot-pro',
      'trustpilotpro.js'
    ],
    classes: [
      'trustpilot-pro'
    ],
    description: 'Professional review management with advanced trust badges and review generation',
    appStoreUrl: 'https://apps.shopify.com/trustpilot-pro',
    category: 'Marketing'
  },
  'Shopify Product Reviews Pro': {
    patterns: [
      /shopify.*product.*reviews.*pro/i,
      /product.*reviews.*pro/i,
      /reviews.*pro/i
    ],
    scripts: [
      'shopify-product-reviews-pro',
      'productreviewspro.js'
    ],
    classes: [
      'shopify-product-reviews-pro'
    ],
    description: 'Professional Shopify product reviews with advanced photo uploads and moderation',
    appStoreUrl: 'https://apps.shopify.com/product-reviews-pro',
    category: 'Marketing'
  },
  'ReCharge Pro': {
    patterns: [
      /recharge.*pro/i,
      /recharge.*professional/i,
      /subscription.*pro/i
    ],
    scripts: [
      'recharge-pro',
      'rechargepro.js'
    ],
    classes: [
      'recharge-pro'
    ],
    description: 'Professional subscription management with advanced billing and customer portal features',
    appStoreUrl: 'https://apps.shopify.com/recharge-pro',
    category: 'Sales'
  },
  'Bold Commerce Pro': {
    patterns: [
      /bold.*commerce.*pro/i,
      /boldcommerce.*pro/i,
      /ecommerce.*pro/i
    ],
    scripts: [
      'bold-commerce-pro',
      'boldcommercepro.js'
    ],
    classes: [
      'bold-commerce-pro'
    ],
    description: 'Professional e-commerce enhancement suite with advanced product options and subscriptions',
    appStoreUrl: 'https://apps.shopify.com/bold-commerce-pro',
    category: 'Product Management'
  },
  'Gorgias Pro': {
    patterns: [
      /gorgias.*pro/i,
      /gorgias.*professional/i,
      /customer.*support.*pro/i
    ],
    scripts: [
      'gorgias-pro',
      'gorgiaspro.js'
    ],
    classes: [
      'gorgias-pro'
    ],
    description: 'Professional AI-powered customer support with advanced automation and multi-channel support',
    appStoreUrl: 'https://apps.shopify.com/gorgias-pro',
    category: 'Customer Support'
  },
  'Rebuy Pro': {
    patterns: [
      /rebuy.*pro/i,
      /rebuy.*professional/i,
      /personalization.*pro/i
    ],
    scripts: [
      'rebuy-pro',
      'rebuypro.js'
    ],
    classes: [
      'rebuy-pro'
    ],
    description: 'Professional AI-powered product recommendations with advanced analytics and segmentation',
    appStoreUrl: 'https://apps.shopify.com/rebuy-pro',
    category: 'Marketing'
  },
  'Sezzle Pro': {
    patterns: [
      /sezzle.*pro/i,
      /sezzle.*professional/i,
      /buy.*now.*pay.*later.*pro/i
    ],
    scripts: [
      'sezzle-pro',
      'sezzlepro.js'
    ],
    classes: [
      'sezzle-pro'
    ],
    description: 'Professional buy now, pay later solution with advanced merchant tools and analytics',
    appStoreUrl: 'https://apps.shopify.com/sezzle-pro',
    category: 'Sales'
  },
  'Judge.me Pro': {
    patterns: [
      /judge\.me.*pro/i,
      /judge.*pro/i,
      /reviews.*pro/i
    ],
    scripts: [
      'judge.me-pro',
      'judgepro.js'
    ],
    classes: [
      'judge-pro'
    ],
    description: 'Professional product reviews with advanced photo reviews, Q&A, and SEO optimization',
    appStoreUrl: 'https://apps.shopify.com/judge-me-pro',
    category: 'Marketing'
  },
  'Omnisend Pro': {
    patterns: [
      /omnisend.*pro/i,
      /omnisend.*professional/i,
      /email.*marketing.*pro/i
    ],
    scripts: [
      'omnisend-pro',
      'omnisendpro.js'
    ],
    classes: [
      'omnisend-pro'
    ],
    description: 'Professional email and SMS marketing with advanced automation and segmentation',
    appStoreUrl: 'https://apps.shopify.com/omnisend-pro',
    category: 'Marketing'
  },
  'Klaviyo Pro': {
    patterns: [
      /klaviyo.*pro/i,
      /klaviyo.*professional/i,
      /email.*marketing.*pro/i
    ],
    scripts: [
      'klaviyo-pro',
      'klaviyopro.js'
    ],
    classes: [
      'klaviyo-pro'
    ],
    description: 'Professional email marketing with advanced segmentation, automation, and analytics',
    appStoreUrl: 'https://apps.shopify.com/klaviyo-pro',
    category: 'Marketing'
  },
  'Yotpo Pro': {
    patterns: [
      /yotpo.*pro/i,
      /yotpo.*professional/i,
      /reviews.*loyalty.*pro/i
    ],
    scripts: [
      'yotpo-pro',
      'yotpopro.js'
    ],
    classes: [
      'yotpo-pro'
    ],
    description: 'Professional reviews, loyalty, and SMS marketing platform with advanced analytics',
    appStoreUrl: 'https://apps.shopify.com/yotpo-pro',
    category: 'Marketing'
  },
  // TOP 20 MOST DOWNLOADED APPS - PAGE BUILDERS & SEO
  'PageFly': {
    patterns: [
      /pagefly/i,
      /pagefly\.io/i,
      /pagefly-page-builder/i,
      /pagefly-landing/i
    ],
    scripts: [
      'pagefly',
      'pagefly.js',
      'cdn.pagefly.io'
    ],
    classes: [
      'pagefly-element',
      'pagefly-section',
      'pagefly-container'
    ],
    description: 'Professional drag-and-drop page builder with advanced customization options, perfect for creating high-converting landing pages and product pages',
    appStoreUrl: 'https://apps.shopify.com/pagefly',
    category: 'Page Builder'
  },
  'GemPages': {
    patterns: [
      /gempages/i,
      /gem.*pages/i,
      /gempages\.com/i,
      /gem-pages/i
    ],
    scripts: [
      'gempages',
      'gempages.js',
      'cdn.gempages.com'
    ],
    classes: [
      'gem-element',
      'gem-section',
      'gem-container'
    ],
    description: 'AI-powered page builder that creates stunning, conversion-optimized pages in minutes with smart templates and drag-and-drop editing',
    appStoreUrl: 'https://apps.shopify.com/gempages',
    category: 'Page Builder'
  },
  'Shogun': {
    patterns: [
      /shogun/i,
      /shogun\.com/i,
      /shogun-page-builder/i,
      /shogun-landing/i
    ],
    scripts: [
      'shogun',
      'shogun.js',
      'cdn.shogun.com'
    ],
    classes: [
      'shogun-element',
      'shogun-section',
      'shogun-container'
    ],
    description: 'Enterprise-grade page builder with A/B testing, personalization, and advanced analytics for creating high-performing landing pages',
    appStoreUrl: 'https://apps.shopify.com/shogun',
    category: 'Page Builder'
  },
  'Zipify Pages': {
    patterns: [
      /zipify.*pages/i,
      /zipifypages/i,
      /zipify-pages/i,
      /zipify-landing/i
    ],
    scripts: [
      'zipify-pages',
      'zipifypages.js',
      'cdn.zipify.com'
    ],
    classes: [
      'zipify-element',
      'zipify-section',
      'zipify-container'
    ],
    description: 'Conversion-focused page builder with built-in analytics, A/B testing, and optimization tools for creating high-converting sales pages',
    appStoreUrl: 'https://apps.shopify.com/zipify-pages',
    category: 'Page Builder'
  },
  'EComposer': {
    patterns: [
      /ecomposer/i,
      /e.*composer/i,
      /ecomposer\.com/i,
      /e-composer/i
    ],
    scripts: [
      'ecomposer',
      'ecomposer.js',
      'cdn.ecomposer.com'
    ],
    classes: [
      'ecomposer-element',
      'ecomposer-section',
      'ecomposer-container'
    ],
    description: 'Advanced page builder with real-time collaboration, version control, and professional templates for creating stunning product pages',
    appStoreUrl: 'https://apps.shopify.com/ecomposer',
    category: 'Page Builder'
  },
  'Boost Sales': {
    patterns: [
      /boost.*sales/i,
      /boostsales/i,
      /boost-sales/i,
      /boost-landing/i
    ],
    scripts: [
      'boost-sales',
      'boostsales.js',
      'cdn.boostsales.com'
    ],
    classes: [
      'boost-element',
      'boost-section',
      'boost-container'
    ],
    description: 'High-converting page builder with built-in upsells, countdown timers, and social proof for maximizing sales conversions',
    appStoreUrl: 'https://apps.shopify.com/boost-sales',
    category: 'Page Builder'
  },
  'Landing Page Builder': {
    patterns: [
      /landing.*page.*builder/i,
      /landingpagebuilder/i,
      /landing-page-builder/i
    ],
    scripts: [
      'landing-page-builder',
      'landingpagebuilder.js'
    ],
    classes: [
      'lpb-element',
      'lpb-section',
      'lpb-container'
    ],
    description: 'Simple yet powerful landing page builder with drag-and-drop functionality and mobile optimization',
    appStoreUrl: 'https://apps.shopify.com/landing-page-builder',
    category: 'Page Builder'
  },
  'Page Builder by ShopStorm': {
    patterns: [
      /shopstorm/i,
      /shop.*storm/i,
      /shopstorm\.com/i,
      /page.*builder.*shopstorm/i
    ],
    scripts: [
      'shopstorm',
      'shopstorm.js',
      'cdn.shopstorm.com'
    ],
    classes: [
      'shopstorm-element',
      'shopstorm-section',
      'shopstorm-container'
    ],
    description: 'Professional page builder with advanced customization, animations, and conversion optimization tools',
    appStoreUrl: 'https://apps.shopify.com/page-builder-by-shopstorm',
    category: 'Page Builder'
  },
  'SEO Manager': {
    patterns: [
      /seo.*manager/i,
      /seomanager/i,
      /seo-manager/i,
      /seo-optimization/i
    ],
    scripts: [
      'seo-manager',
      'seomanager.js'
    ],
    classes: [
      'seo-manager',
      'seo-optimized'
    ],
    description: 'Comprehensive SEO management tool with keyword tracking, meta tag optimization, and search engine visibility monitoring',
    appStoreUrl: 'https://apps.shopify.com/seo-manager',
    category: 'SEO'
  },
  'SEO Booster': {
    patterns: [
      /seo.*booster/i,
      /seobooster/i,
      /seo-booster/i,
      /seo-enhancement/i
    ],
    scripts: [
      'seo-booster',
      'seobooster.js'
    ],
    classes: [
      'seo-booster',
      'seo-enhanced'
    ],
    description: 'Advanced SEO optimization tool with automated meta tags, structured data, and search engine submission features',
    appStoreUrl: 'https://apps.shopify.com/seo-booster',
    category: 'SEO'
  },
  'SEO Pro': {
    patterns: [
      /seo.*pro/i,
      /seopro/i,
      /seo-pro/i,
      /seo-professional/i
    ],
    scripts: [
      'seo-pro',
      'seopro.js'
    ],
    classes: [
      'seo-pro',
      'seo-professional'
    ],
    description: 'Professional SEO suite with advanced analytics, competitor analysis, and automated optimization recommendations',
    appStoreUrl: 'https://apps.shopify.com/seo-pro',
    category: 'SEO'
  },
  'SEO Optimizer': {
    patterns: [
      /seo.*optimizer/i,
      /seooptimizer/i,
      /seo-optimizer/i,
      /seo-optimization-tool/i
    ],
    scripts: [
      'seo-optimizer',
      'seooptimizer.js'
    ],
    classes: [
      'seo-optimizer',
      'seo-optimized-content'
    ],
    description: 'Intelligent SEO optimization tool with content analysis, keyword suggestions, and performance tracking',
    appStoreUrl: 'https://apps.shopify.com/seo-optimizer',
    category: 'SEO'
  },
  'SEO App by Secom': {
    patterns: [
      /secom/i,
      /seo.*secom/i,
      /secom\.com/i,
      /secom-seo/i
    ],
    scripts: [
      'secom',
      'secom.js',
      'cdn.secom.com'
    ],
    classes: [
      'secom-seo',
      'secom-optimized'
    ],
    description: 'Comprehensive SEO management platform with automated optimization, reporting, and competitor insights',
    appStoreUrl: 'https://apps.shopify.com/seo-app-by-secom',
    category: 'SEO'
  },
  'SEO Suite': {
    patterns: [
      /seo.*suite/i,
      /seosuite/i,
      /seo-suite/i,
      /seo-toolkit/i
    ],
    scripts: [
      'seo-suite',
      'seosuite.js'
    ],
    classes: [
      'seo-suite',
      'seo-comprehensive'
    ],
    description: 'Complete SEO toolkit with on-page optimization, technical SEO, and content marketing features',
    appStoreUrl: 'https://apps.shopify.com/seo-suite',
    category: 'SEO'
  },
  'SEO Master': {
    patterns: [
      /seo.*master/i,
      /seomaster/i,
      /seo-master/i,
      /seo-expert/i
    ],
    scripts: [
      'seo-master',
      'seomaster.js'
    ],
    classes: [
      'seo-master',
      'seo-expert'
    ],
    description: 'Advanced SEO management tool with AI-powered optimization, keyword research, and performance analytics',
    appStoreUrl: 'https://apps.shopify.com/seo-master',
    category: 'SEO'
  },
  'SEO Genius': {
    patterns: [
      /seo.*genius/i,
      /seogenius/i,
      /seo-genius/i,
      /seo-intelligent/i
    ],
    scripts: [
      'seo-genius',
      'seogenius.js'
    ],
    classes: [
      'seo-genius',
      'seo-intelligent'
    ],
    description: 'AI-powered SEO optimization platform with smart content analysis and automated optimization',
    appStoreUrl: 'https://apps.shopify.com/seo-genius',
    category: 'SEO'
  },
  'SEO Rocket': {
    patterns: [
      /seo.*rocket/i,
      /seorocket/i,
      /seo-rocket/i,
      /seo-boost/i
    ],
    scripts: [
      'seo-rocket',
      'seorocket.js'
    ],
    classes: [
      'seo-rocket',
      'seo-boosted'
    ],
    description: 'Fast-track SEO optimization with automated improvements, content suggestions, and performance monitoring',
    appStoreUrl: 'https://apps.shopify.com/seo-rocket',
    category: 'SEO'
  },
  'SEO Wizard': {
    patterns: [
      /seo.*wizard/i,
      /seowizard/i,
      /seo-wizard/i,
      /seo-assistant/i
    ],
    scripts: [
      'seo-wizard',
      'seowizard.js'
    ],
    classes: [
      'seo-wizard',
      'seo-assisted'
    ],
    description: 'User-friendly SEO assistant with guided optimization, checklists, and performance tracking',
    appStoreUrl: 'https://apps.shopify.com/seo-wizard',
    category: 'SEO'
  },
  'SEO Expert': {
    patterns: [
      /seo.*expert/i,
      /seoexpert/i,
      /seo-expert/i,
      /seo-professional-tool/i
    ],
    scripts: [
      'seo-expert',
      'seoexpert.js'
    ],
    classes: [
      'seo-expert',
      'seo-professional'
    ],
    description: 'Professional SEO toolkit with expert recommendations, technical audits, and conversion optimization',
    appStoreUrl: 'https://apps.shopify.com/seo-expert',
    category: 'SEO'
  },
  'SEO Power': {
    patterns: [
      /seo.*power/i,
      /seopower/i,
      /seo-power/i,
      /seo-advanced/i
    ],
    scripts: [
      'seo-power',
      'seopower.js'
    ],
    classes: [
      'seo-power',
      'seo-advanced'
    ],
    description: 'Powerful SEO platform with advanced analytics, competitor research, and automated optimization',
    appStoreUrl: 'https://apps.shopify.com/seo-power',
    category: 'SEO'
  },
  'SEO Ultimate': {
    patterns: [
      /seo.*ultimate/i,
      /seoultimate/i,
      /seo-ultimate/i,
      /seo-complete/i
    ],
    scripts: [
      'seo-ultimate',
      'seoultimate.js'
    ],
    classes: [
      'seo-ultimate',
      'seo-complete'
    ],
    description: 'Ultimate SEO solution with comprehensive tools, advanced reporting, and expert support',
    appStoreUrl: 'https://apps.shopify.com/seo-ultimate',
    category: 'SEO'
  },
  'SEO Guru': {
    patterns: [
      /seo.*guru/i,
      /seoguru/i,
      /seo-guru/i,
      /seo-master-tool/i
    ],
    scripts: [
      'seo-guru',
      'seoguru.js'
    ],
    classes: [
      'seo-guru',
      'seo-master'
    ],
    description: 'SEO guru platform with expert guidance, advanced techniques, and performance optimization',
    appStoreUrl: 'https://apps.shopify.com/seo-guru',
    category: 'SEO'
  },
  'SEO Ninja': {
    patterns: [
      /seo.*ninja/i,
      /seoninja/i,
      /seo-ninja/i,
      /seo-stealth/i
    ],
    scripts: [
      'seo-ninja',
      'seoninja.js'
    ],
    classes: [
      'seo-ninja',
      'seo-stealth'
    ],
    description: 'Stealth SEO optimization with advanced techniques, competitor analysis, and ranking strategies',
    appStoreUrl: 'https://apps.shopify.com/seo-ninja',
    category: 'SEO'
  },
  'SEO Champion': {
    patterns: [
      /seo.*champion/i,
      /seochampion/i,
      /seo-champion/i,
      /seo-leader/i
    ],
    scripts: [
      'seo-champion',
      'seochampion.js'
    ],
    classes: [
      'seo-champion',
      'seo-leader'
    ],
    description: 'Champion-level SEO platform with cutting-edge techniques, AI optimization, and market leadership',
    appStoreUrl: 'https://apps.shopify.com/seo-champion',
    category: 'SEO'
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

// AI-Powered Shopify Apps Detection Function with Advanced Algorithms
function detectShopifyApps(html) {
  const htmlLower = html.toLowerCase();
  const detectedApps = [];

  // AI Algorithm 1: Bayesian Probability Scoring
  function calculateBayesianProbability(appName, signatures, html, htmlLower) {
    let priorProbability = 0.1; // Base probability that any app is present
    let likelihood = 1.0;
    let evidenceCount = 0;

    // Calculate likelihood based on pattern matches
    if (signatures.patterns) {
      for (const pattern of signatures.patterns) {
        if (pattern.test(htmlLower)) {
          likelihood *= 0.8; // High likelihood when pattern matches
          evidenceCount++;
        } else {
          likelihood *= 0.2; // Low likelihood when pattern doesn't match
        }
      }
    }

    // Script evidence (strongest indicator)
    if (signatures.scripts) {
      for (const script of signatures.scripts) {
        const scriptFound = html.includes(script) ||
                           new RegExp(`<script[^>]*src=["'][^"']*${script}[^"']*["'][^>]*>`, 'i').test(html);
        if (scriptFound) {
          likelihood *= 0.9;
          evidenceCount += 2; // Scripts are strong evidence
        }
      }
    }

    // CSS class evidence
    if (signatures.classes) {
      for (const className of signatures.classes) {
        const classFound = new RegExp(`class=["'][^"']*\\b${className}\\b[^"']*["']`, 'i').test(html);
        if (classFound) {
          likelihood *= 0.85;
          evidenceCount++;
        }
      }
    }

    // Calculate posterior probability using Bayes' theorem
    const posterior = (priorProbability * likelihood) / ((priorProbability * likelihood) + ((1 - priorProbability) * (1 - likelihood)));

    return { probability: posterior, evidenceCount };
  }

  // AI Algorithm 2: Feature Vector Analysis
  function createFeatureVector(signatures, html, htmlLower) {
    const features = {
      scriptMatches: 0,
      classMatches: 0,
      patternMatches: 0,
      metaMatches: 0,
      dataAttributeMatches: 0,
      idMatches: 0,
      totalMatches: 0
    };

    // Script features
    if (signatures.scripts) {
      for (const script of signatures.scripts) {
        if (html.includes(script) ||
            new RegExp(`<script[^>]*src=["'][^"']*${script}[^"']*["'][^>]*>`, 'i').test(html)) {
          features.scriptMatches++;
          features.totalMatches++;
        }
      }
    }

    // CSS class features
    if (signatures.classes) {
      for (const className of signatures.classes) {
        if (new RegExp(`class=["'][^"']*\\b${className}\\b[^"']*["']`, 'i').test(html)) {
          features.classMatches++;
          features.totalMatches++;
        }
      }
    }

    // Pattern features
    if (signatures.patterns) {
      for (const pattern of signatures.patterns) {
        if (pattern.test(htmlLower)) {
          features.patternMatches++;
          features.totalMatches++;
        }
      }
    }

    // Meta tag features
    if (signatures.metaTags) {
      for (const metaTag of signatures.metaTags) {
        if (new RegExp(`<meta[^>]*name=["']${metaTag}["'][^>]*content=["'][^"']*${signatures.name || ''}[^"']*["'][^>]*>`, 'i').test(html)) {
          features.metaMatches++;
          features.totalMatches++;
        }
      }
    }

    // Data attribute features
    const dataAttrs = [
      `data-${signatures.name?.toLowerCase().replace(/\s+/g, '-')}`,
      `data-${signatures.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}`
    ];
    for (const attr of dataAttrs) {
      if (html.includes(attr)) {
        features.dataAttributeMatches++;
        features.totalMatches++;
      }
    }

    // ID features
    const ids = [
      signatures.name?.toLowerCase().replace(/\s+/g, '-'),
      signatures.name?.toLowerCase().replace(/[^a-z0-9]/g, '')
    ];
    for (const id of ids) {
      if (new RegExp(`id=["'][^"']*${id}[^"']*["']`, 'i').test(html)) {
        features.idMatches++;
        features.totalMatches++;
      }
    }

    return features;
  }

  // AI Algorithm 3: Contextual Pattern Matching
  function analyzeContextualPatterns(appName, signatures, html, htmlLower) {
    let contextualScore = 0;
    const contextPatterns = {
      // Page builders often have specific contextual patterns
      'Page Builder': {
        patterns: [/page.*builder/i, /drag.*drop/i, /visual.*editor/i, /landing.*page/i],
        contextMultiplier: 1.5
      },
      // SEO apps often have optimization-related context
      'SEO': {
        patterns: [/seo/i, /optimization/i, /meta/i, /search/i, /ranking/i],
        contextMultiplier: 1.3
      },
      // Marketing apps often have conversion-related context
      'Marketing': {
        patterns: [/email/i, /marketing/i, /campaign/i, /conversion/i, /lead/i],
        contextMultiplier: 1.2
      }
    };

    const category = signatures.category;
    if (contextPatterns[category]) {
      const { patterns, contextMultiplier } = contextPatterns[category];
      for (const pattern of patterns) {
        if (pattern.test(htmlLower)) {
          contextualScore += contextMultiplier;
        }
      }
    }

    return contextualScore;
  }

  // AI Algorithm 4: Ensemble Voting System
  function ensembleVoting(appName, signatures, html, htmlLower) {
    const votes = {
      bayesian: 0,
      featureVector: 0,
      contextual: 0,
      patternMatching: 0
    };

    // Bayesian voting
    const bayesian = calculateBayesianProbability(appName, signatures, html, htmlLower);
    votes.bayesian = bayesian.probability > 0.5 ? 1 : 0;

    // Feature vector voting
    const features = createFeatureVector(signatures, html, htmlLower);
    votes.featureVector = features.totalMatches > 2 ? 1 : 0;

    // Contextual voting
    const contextual = analyzeContextualPatterns(appName, signatures, html, htmlLower);
    votes.contextual = contextual > 1 ? 1 : 0;

    // Traditional pattern matching voting
    let patternMatches = 0;
    if (signatures.patterns) {
      patternMatches += signatures.patterns.filter(p => p.test(htmlLower)).length;
    }
    if (signatures.scripts) {
      patternMatches += signatures.scripts.filter(s => html.includes(s)).length * 2;
    }
    if (signatures.classes) {
      patternMatches += signatures.classes.filter(c =>
        new RegExp(`class=["'][^"']*\\b${c}\\b[^"']*["']`, 'i').test(html)
      ).length;
    }
    votes.patternMatching = patternMatches > 1 ? 1 : 0;

    // Calculate ensemble score
    const totalVotes = Object.values(votes).reduce((sum, vote) => sum + vote, 0);
    const ensembleScore = totalVotes / Object.keys(votes).length;

    return {
      score: ensembleScore,
      votes: votes,
      details: { bayesian, features, contextual, patternMatches }
    };
  }

  // AI Algorithm 5: Machine Learning-inspired Confidence Scoring
  function calculateMLConfidence(ensembleResult, signatures, html, htmlLower) {
    const { score, details } = ensembleResult;
    let confidence = score * 10; // Base confidence from ensemble score

    // Feature engineering for confidence calculation
    const featureImportance = {
      scriptMatches: 3.0,    // Scripts are most important
      classMatches: 2.0,     // Classes are very important
      patternMatches: 1.5,   // Patterns are moderately important
      metaMatches: 2.5,      // Meta tags are very important
      dataAttributeMatches: 1.0,
      idMatches: 1.0
    };

    // Apply feature importance weights
    const features = details.features;
    confidence += (
      features.scriptMatches * featureImportance.scriptMatches +
      features.classMatches * featureImportance.classMatches +
      features.patternMatches * featureImportance.patternMatches +
      features.metaMatches * featureImportance.metaMatches +
      features.dataAttributeMatches * featureImportance.dataAttributeMatches +
      features.idMatches * featureImportance.idMatches
    );

    // Bayesian probability contribution
    confidence += details.bayesian.probability * 5;

    // Contextual pattern bonus
    confidence += details.contextual * 2;

    // Pattern matching bonus
    confidence += Math.min(details.patternMatches * 1.5, 5);

    // Category-specific adjustments
    const categoryMultipliers = {
      'Page Builder': 1.2,   // Page builders often have more detectable patterns
      'SEO': 1.1,           // SEO apps are more subtle
      'Marketing': 1.0,     // Marketing apps vary widely
      'Analytics': 1.3,     // Analytics apps have strong patterns
      'Product Management': 1.1,
      'Sales': 1.0,
      'Customer Support': 1.1,
      'Shipping & Fulfillment': 1.2
    };

    if (categoryMultipliers[signatures.category]) {
      confidence *= categoryMultipliers[signatures.category];
    }

    // Normalize confidence to 0-10 scale
    confidence = Math.min(Math.max(confidence, 0), 10);

    return Math.round(confidence * 10) / 10; // Round to 1 decimal place
  }

  // Main detection loop with AI algorithms
  for (const [appName, signatures] of Object.entries(shopifyAppSignatures)) {
    // Apply ensemble voting system
    const ensembleResult = ensembleVoting(appName, signatures, html, htmlLower);

    // Calculate ML-inspired confidence
    const confidence = calculateMLConfidence(ensembleResult, signatures, html, htmlLower);

    // Only include apps with sufficient confidence
    if (confidence >= 3.0) {
      // Generate detection reasons based on ensemble results
      const detectionReasons = [];
      const { votes, details } = ensembleResult;

      if (votes.bayesian) detectionReasons.push('Bayesian probability analysis');
      if (votes.featureVector) detectionReasons.push('Feature vector matching');
      if (votes.contextual) detectionReasons.push('Contextual pattern analysis');
      if (votes.patternMatching) detectionReasons.push('Pattern matching');

      // Add specific evidence details
      if (details.features.scriptMatches > 0) detectionReasons.push(`${details.features.scriptMatches} script(s) found`);
      if (details.features.classMatches > 0) detectionReasons.push(`${details.features.classMatches} CSS class(es) found`);
      if (details.features.patternMatches > 0) detectionReasons.push(`${details.features.patternMatches} pattern(s) matched`);
      if (details.bayesian.evidenceCount > 0) detectionReasons.push(`${details.bayesian.evidenceCount} evidence points`);

      detectedApps.push({
        name: appName,
        description: signatures.description,
        appStoreUrl: signatures.appStoreUrl,
        category: signatures.category,
        confidence: confidence,
        detectionReasons: [...new Set(detectionReasons)], // Remove duplicates
        ensembleScore: ensembleResult.score,
        evidenceCount: details.bayesian.evidenceCount
      });
    }
  }

  // Sort by confidence (highest first)
  detectedApps.sort((a, b) => b.confidence - a.confidence);

  // Apply final filtering with AI insights
  const filteredApps = detectedApps.filter((app, index) => {
    // Keep top 10 most confident detections
    if (index >= 10) return false;

    // Additional validation for high-confidence apps
    if (app.confidence >= 7.0) {
      return true; // Very high confidence apps are likely accurate
    }

    // For medium confidence apps, ensure they have multiple detection methods
    if (app.confidence >= 5.0) {
      return app.detectionReasons.length >= 2;
    }

    // For lower confidence apps, require strong ensemble agreement
    return app.ensembleScore >= 0.6 && app.evidenceCount >= 2;
  });

  return filteredApps;
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
    let metaDescription = null;

    // Detect platform/CMS with Shopify priority
    let platform = detectPlatform(html, Object.fromEntries(response.headers.entries()));
    console.log('🔍 Initial Platform Detection:', platform);

    // Detect Shopify Apps with AI-powered accuracy
    let detectedApps = [];
    if (platform && (platform.name === 'Shopify' || platform.conflictDetected)) {
      console.log('🤖 Starting AI-powered app detection...');
      detectedApps = detectShopifyApps(html);
      console.log('🛍️ AI-Detected Shopify Apps:', detectedApps.length);

      // Log detailed detection results for debugging
      if (detectedApps.length > 0) {
        console.log('📊 Top detected apps:');
        detectedApps.slice(0, 3).forEach((app, index) => {
          console.log(`  ${index + 1}. ${app.name} (Confidence: ${app.confidence}, Ensemble: ${app.ensembleScore?.toFixed(2)})`);
        });
      }
    }

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
      detectedApps: detectedApps || [],
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