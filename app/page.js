'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      } else {
        setError(data.error || 'Failed to detect theme');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Shopify Theme Detector</h1>
      <input
        type="text"
        placeholder="Enter Shopify store URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleDetect} disabled={loading} className={styles.button}>
        {loading ? (
          <>
            Detecting...
            <div className={styles.spinner}></div>
          </>
        ) : (
          'Detect Theme'
        )}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {result && (
        <div className={styles.result}>
          <h2>Detected Theme: {result.themeName}</h2>
          {result.themeStoreLink && (
            <p>
              <a href={result.themeStoreLink} target="_blank" rel="noopener noreferrer">
                View on Shopify Theme Store
              </a>
            </p>
          )}
          <h3>Suggested Alternatives:</h3>
          <ul>
            {result.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}