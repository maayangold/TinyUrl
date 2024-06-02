import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance.js';

const Links = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/links');
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  return (
    <div>
      <h2>Links</h2>
      <ul>
        {links.map(link => (
          <li key={link._id}>
            {link.originalUrl} - <strong>ID:</strong> {link.id ? link.id.toString() : 'No ID available'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Links;
