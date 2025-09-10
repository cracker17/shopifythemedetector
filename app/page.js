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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

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
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.inputGroup}>
            <input
              type="url"
              placeholder="https://your-shopify-store.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.input}
            />
            <button
              onClick={handleDetect}
              disabled={loading || !url.trim()}
              className={styles.button}
            >
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  Detecting...
                </>
              ) : (
                <>
                  🔍 Detect Theme
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

                    {result.themeStoreLink && result.themeName !== 'Not a Shopify store' && (
                      <div className={styles.themeLink}>
                        <span className={styles.label}>Theme Link:</span>
                        <a
                          href={result.themeStoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          View Theme
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {result.suggestions.length > 0 && result.themeName !== 'Not a Shopify store' && (
                <div className={styles.suggestions}>
                  <h4>💡 Suggested Alternatives</h4>
                  <div className={styles.suggestionGrid}>
                    {result.suggestions.map((suggestion, index) => (
                      <div key={index} className={styles.suggestion}>
                        {suggestion}
                      </div>
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
                    {`<script src="https://shopifythemedetector.vercel.app/shopify-theme-detector.js"></script>`}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText('<script src="https://shopifythemedetector.vercel.app/shopify-theme-detector.js"></script>')}
                    className={styles.copyButton}
                  >
                    📋 Copy
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