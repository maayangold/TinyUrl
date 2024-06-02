import React, { useState } from 'react';
import axios from 'axios';

const TinyUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-link', { originalUrl });
      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>URL Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter URL" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
        <button type="submit">Shorten URL</button>
      </form>
      {shortenedUrl && <p>Shortened URL: {shortenedUrl}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TinyUrl;