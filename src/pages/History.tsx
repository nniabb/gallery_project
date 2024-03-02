import React from "react";
import { Link } from "react-router-dom";
import '../../src/styles/History.css';


const HistoryPage = () => {
    return(
        <div className="history-container">
            <Link to='/' className="bck-main" >Back To Main Page</Link>
        </div>
    )
}
export default HistoryPage;