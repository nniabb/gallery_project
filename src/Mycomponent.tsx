import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import './App.css';


const Mycomponent: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos`, {
          params: {
            page: page,
            per_page: 20, 
            order_by: 'popular', 
            client_id: 'eBDy23tTc28SH5hXsGQjd4U2yGSn_lTmajhGrLzBHP4',
          },
        });
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.unobserve(loader.current!);
    };
  }, []);

  const handleObserver: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); 
  };

  const filteredPhotos = photos.filter((photo) => {
    return photo.alt_description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <div className='header'>
        <p>Search An Image</p>
        <input 
          type='text' 
          className='image-input' 
          placeholder='search here'
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
      </div>
      <div className="photos-container">
        {filteredPhotos.map((photo: any, index: number) => (
            <img src={photo.urls.regular} alt={photo.alt_description} key={index} className='photo' />
        ))}
        <div ref={loader} style={{ textAlign: 'center' }}>
        </div>
      </div>
    </div>
  );
}

export default Mycomponent;
