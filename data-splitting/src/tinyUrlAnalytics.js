import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axiosInstance from './axiosInstance.js';

const TinyUrlAnalytics = () => {
  const [linkId, setLinkId] = useState('');
  const [clickData, setClickData] = useState([]);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (clickData.length > 0) {
      createGraph();
    }
  }, [clickData]);

  const fetchData = async (id) => {
    try {
      const response = await axiosInstance.get(`/links/${id}`);
      setLink(response.data);
      setClickData(response.data.clicks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setLinkId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(linkId);
  };

  const createGraph = () => {
    const labels = clickData.map((entry, index) => `Click ${index + 1}`);
    const values = clickData.map(entry => entry.ipAddress);

    const ctx = document.getElementById('clickGraph');
    Chart.getChart(ctx)?.destroy();
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Clicks',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <h1>Click Analytics</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={linkId}
          onChange={handleInputChange}
          placeholder="Enter Link ID"
        />
        <button type="submit">Get Analytics</button>
      </form>
      {link && (
        <div>
          <h2>Original URL: {link.originalUrl}</h2>
          <canvas id="clickGraph"></canvas>
        </div>
      )}
    </div>
  );
};

export default TinyUrlAnalytics;
