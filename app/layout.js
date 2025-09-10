import './global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Setup */}
        <link rel="icon" href="https://shopify.com/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://shopify.com/favicon.ico" />

        {/* SEO-Optimized Meta Title */}
        <title>Shopify Theme Detector – Instantly Identify Any Shopify Store's Theme</title>

        {/* Meta Description */}
        <meta name="description" content="Use our free Shopify Theme Detector to instantly find out which theme any Shopify store is using. No signup required. Fast, accurate, and easy to use." />

        {/* Additional SEO Meta Tags */}
        <meta name="keywords" content="shopify theme detector, shopify theme finder, identify shopify theme, shopify store theme, theme detection tool, shopify theme analyzer" />
        <meta name="author" content="Shopify Theme Detector" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* OpenGraph Metadata for Social Sharing */}
        <meta property="og:title" content="Shopify Theme Detector – Instantly Identify Any Shopify Store's Theme" />
        <meta property="og:description" content="Discover the theme behind any Shopify store in seconds. Free, fast, and accurate." />
        <meta property="og:image" content="https://shopifythemedetector.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://shopifythemedetector.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shopify Theme Detector" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shopify Theme Detector – Instantly Identify Any Shopify Store's Theme" />
        <meta name="twitter:description" content="Discover the theme behind any Shopify store in seconds. Free, fast, and accurate." />
        <meta name="twitter:image" content="https://shopifythemedetector.vercel.app/og-image.jpg" />

        {/* Additional Social Media Meta Tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Shopify Theme Detector - Browser mockup showing theme detection" />

        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#007bff" />
        <meta name="msapplication-TileColor" content="#007bff" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://shopifythemedetector.vercel.app/" />

        {/* External Scripts */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}