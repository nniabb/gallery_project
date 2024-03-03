import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../src/styles/History.css';
import Search from '../svg-components/Search';
import Delete from '../svg-components/Delete';
import { useSearch } from "../context/Search"; 
import { useNavigate } from "react-router-dom";


const HistoryPage: React.FC = () => {
    const { setSearchTerm } = useSearch(); 
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if (history) {
            setSearchHistory(JSON.parse(history));
        }
    }, []);

    const handleDelete = (index: number) => {
        const updatedHistory = [...searchHistory];
        updatedHistory.splice(index, 1);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleHistoryClick = (term: string) => {
        setSearchTerm(term); 
        navigate('/'); 
    };

    return (
        <div className="history-container">
            <Link to='/' className="bck-main">Back To Main Page</Link>
            <div className="search-history">
                <Search />
                <h2>Your Search History</h2>
                <ul>
                    {searchHistory.slice(0).reverse().map((item, index) => (
                        <div className="history-box" key={index} onClick={() => handleHistoryClick(item)}>
                            <p className="searches">Searched for {item}</p>
                            <div className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(searchHistory.length - 1 - index); }}>
                                <Delete />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HistoryPage;