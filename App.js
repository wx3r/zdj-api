import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const searchImages = async (category) => {
    const apiKey = '44093514-db281f2e0bfbf50a0c7c3a461';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${category}&image_type=photo`;

    try {
      const response = await axios.get(url);
      setImages(response.data.hits);
      setError('');
    } catch {
      setError('Błąd podczas pobierania obrazów.');
      setImages([]);
    }
  };

  return (
    <div className="app">
      <h1 className="header">Wybierz kategorię obrazów do wyszukania</h1>
      <div className="button-container">
        <button onClick={() => searchImages('animals')}>Zwierzęta</button>
        <button onClick={() => searchImages('landscapes')}>Krajobrazy</button>
        <button onClick={() => searchImages('cities')}>Miasta</button>
        <button onClick={() => searchImages('other')}>Inne</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <a href={image.largeImageURL} target="_blank" rel="noopener noreferrer">
              <img src={image.webformatURL} alt={image.tags} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
