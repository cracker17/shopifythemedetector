'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [themeVersion, setThemeVersion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');
  const [showEmbed, setShowEmbed] = useState(false);
  const [hitCounter, setHitCounter] = useState(null);
  const [animatedCounter, setAnimatedCounter] = useState(0);
  const [hoursSinceMidnight, setHoursSinceMidnight] = useState(0);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    // Generate random hit counter between 200-800
    const randomHits = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
    setHitCounter(randomHits);

    // Calculate hours since midnight in American timezone (EST/EDT)
    const now = new Date();
    const estOffset = -5; // EST is UTC-5, EDT is UTC-4
    const estTime = new Date(now.getTime() + (estOffset * 60 * 60 * 1000));

    // Get midnight in EST
    const midnightEST = new Date(estTime);
    midnightEST.setHours(0, 0, 0, 0);

    // Calculate hours since midnight
    const hoursSince = Math.floor((estTime - midnightEST) / (1000 * 60 * 60));
    setHoursSinceMidnight(hoursSince);
  }, []);

  // Animate counter when hitCounter is set with smooth easing
  useEffect(() => {
    if (hitCounter && animatedCounter !== hitCounter) {
      const duration = 2500; // 2.5 seconds for smoother animation
      const startValue = animatedCounter;
      const endValue = hitCounter;
      const startTime = Date.now();

      // Easing function for smooth animation
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);
        setAnimatedCounter(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedCounter(hitCounter); // Ensure final value is exact
        }
      };

      requestAnimationFrame(animate);
    }
  }, [hitCounter, animatedCounter]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleDetect = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);
    setPlatform(null); // Clear platform notification
    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setThemeVersion(data.themeVersion);
        setPlatform(data.platform);
      } else {
        setError(data.error || 'Failed to detect theme');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>🎨 Shopify Theme Detector</h1>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <p className={styles.subtitle}>
          Discover the theme powering any Shopify store instantly
        </p>

        {/* Hit Counter */}
        {hitCounter && (
          <div className={styles.hitCounter}>
            <div className={styles.hitCounterContent}>
              <span className={styles.hitIcon}>📊</span>
              <span className={styles.hitText}>
                We've already detected <strong>{animatedCounter.toLocaleString()}</strong> Shopify themes in <strong>{hoursSinceMidnight.toString().padStart(2, '0')}:00</strong> hours
              </span>
            </div>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <input
              type="url"
              placeholder="https://your-shopify-store.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                // Clear platform notification when user starts typing new URL
                if (platform) {
                  setPlatform(null);
                }
              }}
              className={styles.input}
            />
            <button
              onClick={handleDetect}
              disabled={loading || !url.trim()}
              className={`${styles.button} ${loading ? styles.loading : ''}`}
            >
              {loading ? (
                <>
                  <div className={styles.searchIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" className={styles.searchCircle}></circle>
                      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchLine}></path>
                    </svg>
                  </div>
                  <span className={styles.loadingText}>Detecting...</span>
                  <div className={styles.spinner}></div>
                </>
              ) : (
                <>
                  <div className={styles.searchIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
                      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span>Detect Theme</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className={styles.alert}>
              <span className={styles.alertIcon}>⚠️</span>
              {error}
            </div>
          )}

          {result && (
            <div className={styles.result}>
              <div className={styles.resultHeader}>
                <h3>🎯 Detection Results</h3>
              </div>

              <div className={styles.themeInfo}>
                <div className={styles.themeHeader}>
                  {(result.themeImage || (result.themeName !== 'Not a Shopify store' && result.themeName !== 'Store is password protected' && result.themeName !== 'Store is in maintenance mode' && result.themeName !== 'Custom Theme')) && (
                    <div className={styles.themeImageContainer}>
                      {result.themeImage ? (
                        <img
                          src={result.themeImage}
                          alt={`${result.themeName} theme preview`}
                          className={styles.themeImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className={styles.imagePlaceholder}
                        style={{ display: result.themeImage ? 'none' : 'flex' }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8zm2 2v4h4v-4h-4z" fill="currentColor" opacity="0.3"/>
                          <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>Preview Unavailable</span>
                      </div>
                    </div>
                  )}
                  <div className={styles.themeDetails}>
                    <div className={styles.themeName}>
                      <span className={styles.label}>
                        {result.themeName === 'Not a Shopify store' ? 'Status:' : 'Theme Name:'}
                      </span>
                      <span className={`${styles.value} ${result.themeName === 'Not a Shopify store' ? styles.errorText : ''}`}>
                        {result.themeName}
                      </span>
                    </div>

                    {themeVersion && result.themeName !== 'Not a Shopify store' && (
                      <div className={styles.themeVersion}>
                        <span className={styles.label}>Version:</span>
                        <span className={styles.value}>{themeVersion}</span>
                      </div>
                    )}

                    {result.themeName !== 'Not a Shopify store' && result.themeName !== 'Store is password protected' && result.themeName !== 'Store is in maintenance mode' && result.themeName !== 'Theme not detected' && (
                      <div className={styles.themeLink}>
                        <span className={styles.label}>Theme Link:</span>
                        {result.themeStoreLink ? (
                          <a
                            href={result.themeStoreLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                          >
                            View Theme
                          </a>
                        ) : (
                          <span className={styles.warningText}>
                            ⚠️ Shopify Theme URL Not Available
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Platform Detection Warning - Only show for non-Shopify platforms */}
              {platform && platform.name !== 'Unknown' && platform.name !== 'Shopify' && (
                <div className={styles.platformWarning}>
                  <div className={styles.platformContent}>
                    <span
                      className={styles.platformIcon}
                      dangerouslySetInnerHTML={{ __html: platform.icon }}
                    />
                    <span className={styles.platformText}>
                      This website uses a <strong>{platform.name}</strong> platform
                    </span>
                  </div>
                </div>
              )}

              {result.suggestions.length > 0 && result.themeName !== 'Not a Shopify store' && (
                <div className={styles.suggestions}>
                  <h4>💡 Suggested Alternatives</h4>
                  <div className={styles.suggestionGrid}>
                    {result.suggestions.map((suggestion, index) => (
                      <a
                        key={index}
                        href={`https://themes.shopify.com/themes/${suggestion.toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.suggestionLink}
                      >
                        <div className={styles.suggestion}>
                          {suggestion}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.disclaimer}>
                <p>
                  <strong>Disclaimer:</strong> This detection is based on publicly available information and may not always be 100% accurate.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.embedSection}>
            <button
              onClick={() => setShowEmbed(!showEmbed)}
              className={styles.embedToggle}
            >
              📋 How to Embed This Widget
              <span className={styles.arrow}>{showEmbed ? '↑' : '↓'}</span>
            </button>

            {showEmbed && (
              <div className={styles.embedContent}>
                <p>Add this script tag to any website to embed the theme detector:</p>
                <div className={styles.codeBlock}>
                  <code>
                    <span className="punctuation">{'<'}</span>
                    <span className="keyword">script</span>
                    <span className="operator"> </span>
                    <span className="keyword">src</span>
                    <span className="operator">=</span>
                    <span className="string">"https://shopifythemedetector.vercel.app/shopify-theme-detector.js"</span>
                    <span className="punctuation">{'>'}</span>
                    <span className="punctuation">{'</'}</span>
                    <span className="keyword">script</span>
                    <span className="punctuation">{'>'}</span>
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText('<script src="https://shopifythemedetector.vercel.app/shopify-theme-detector.js"></script>')}
                    className={styles.copyButton}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" strokeWidth="2"/>
                      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Copy
                  </button>
                </div>
                <p className={styles.note}>
                  <strong>Note:</strong> This script will embed the Shopify Theme Detector widget on any website.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Built with ❤️{' '}
          <a
            href="https://julevajeto.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Julev Ajeto
          </a>
        </p>
      </footer>
    </div>
  );
}