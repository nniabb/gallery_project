import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import '../../src/styles/Main.css';
import '../../src/App.css';
import { motion } from 'framer-motion'
import { fadeIn } from '../../src/variant'
import { Link } from 'react-router-dom';
import Heart from '../svg-components/Heart';
import Download from '../svg-components/Download';
import Views from '../svg-components/Views';
import Photo from '../Photo.interface';
import { useSearch } from '../context/Search';


const MainComponent: React.FC = () => {
    const { searchTerm, setSearchTerm } = useSearch(); 
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const loader = useRef<HTMLDivElement>(null);




    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }


    const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newSearchTerm = searchTerm.trim();
            if (newSearchTerm !== '') {
                if (searchHistory.includes(newSearchTerm)) {
                    const updatedHistory = searchHistory.filter(term => term !== newSearchTerm);
                    updatedHistory.unshift(newSearchTerm);
                    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
                    setSearchHistory(updatedHistory);
                } else {
                    const updatedHistory = [newSearchTerm, ...searchHistory];
                    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
                    setSearchHistory(updatedHistory);
                }
            }
        }
    };
    

    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, [])


    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, [])

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

                if (response.data.length > 0) {
                    setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [page])
    

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [])


    const handleIntersection: IntersectionObserverCallback = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    }


    const handleImageClick = async (photo: Photo) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/${photo.id}`, {
                params: {
                    client_id: 'eBDy23tTc28SH5hXsGQjd4U2yGSn_lTmajhGrLzBHP4',
                },
            });

            setSelectedPhoto({
                ...photo,
                views: response.data.views,
                downloads: response.data.downloads,
                likes: response.data.likes,
            });
            setModal(true); 
        } catch (error) {
            console.error('Error fetching photo details:', error);
        }
    };


    const closeModal = () => {
        setSelectedPhoto(null);
        setModal(false); 
    };


    const filteredPhotos = photos.filter((photo) => {
        return photo.alt_description && photo.alt_description.toLowerCase().includes(searchTerm.toLowerCase());
    });


    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modal]);


    return (
        <div className="App">
            <div className='header'>
                <p className='search'>Search An Image</p>
                <input
                    type='text'
                    className='image-input'
                    placeholder='search here'
                    value={searchTerm}
                    onChange={handleSearch}
                    onKeyDown={handleSearchSubmit}
                />
                <Link to='/History' className='history'>History Page</Link>
            </div>
            <div className="photos-container">
                {filteredPhotos.map((photo: Photo, index: number) => (
                    <motion.div variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        className='img-parent'>
                        <img
                            src={photo.urls.regular}
                            alt={photo.alt_description || ''}
                            key={photo.id}
                            className='photo'
                            onClick={() => handleImageClick(photo)}
                        />
                    </motion.div>
                    ))}
                <div ref={loader} style={{ textAlign: 'center' }}></div>
            </div>
            {selectedPhoto && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedPhoto.urls.regular} alt="Selected" className="selected-image" />
                        <div className='icons-side'>
                            <div className='statistics'><Views/><p className='statistics-p'>{selectedPhoto.views}</p></div>
                            <div className='statistics'><Download/><p className='statistics-p'> {selectedPhoto.downloads} </p></div>
                            <div className='statistics'><Heart/><p className='statistics-p'>{selectedPhoto.likes}</p></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default MainComponent;  