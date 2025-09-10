import { NextResponse } from 'next/server';

// Simple in-memory cache for screenshots (in production, use Redis or similar)
const screenshotCache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

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

    // Check cache first
    const cacheKey = url;
    const cachedResult = screenshotCache.get(cacheKey);

    if (cachedResult && (Date.now() - cachedResult.timestamp) < CACHE_DURATION) {
      console.log('📸 Cache hit for:', url);
      return NextResponse.json({
        screenshotUrl: cachedResult.screenshotUrl,
        cached: true
      });
    }

    // Generate screenshot using a free screenshot service
    // Using screenshot.rocks (free tier available)
    const screenshotServiceUrl = `https://screenshot.rocks/api/take?url=${encodeURIComponent(url)}&width=1280&height=720&quality=80&format=jpg&delay=2000&fullpage=false&block_ads=true&block_trackers=true`;

    console.log('📸 Generating screenshot for:', url);
    console.log('🔗 Screenshot service URL:', screenshotServiceUrl);

    // For demo purposes, we'll use a working screenshot service
    // In production, you would use a paid service like ScreenshotOne, Browserless, etc.
    const fallbackScreenshotUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&viewport_width=1280&viewport_height=720&image_quality=80&format=jpg&cache=true&delay=2&full_page=false&block_cookie_banners=true&block_chats=true&block_ads=true`;

    // Cache the result
    screenshotCache.set(cacheKey, {
      screenshotUrl: fallbackScreenshotUrl,
      timestamp: Date.now()
    });

    // Clean up old cache entries (simple cleanup)
    if (screenshotCache.size > 100) {
      const oldestKey = screenshotCache.keys().next().value;
      screenshotCache.delete(oldestKey);
    }

    return NextResponse.json({
      screenshotUrl: fallbackScreenshotUrl,
      cached: false
    });

  } catch (error) {
    console.error('Screenshot generation error:', error);

    // Return a fallback placeholder
    const fallbackUrl = `https://via.placeholder.com/800x450/e74c3c/ffffff?text=Screenshot+Unavailable`;

    return NextResponse.json({
      screenshotUrl: fallbackUrl,
      error: 'Screenshot service temporarily unavailable'
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Screenshot API - Use POST method with { url: "store-url" }',
    cache: {
      size: screenshotCache.size,
      duration: `${CACHE_DURATION / 1000 / 60} minutes`
    }
  });
}