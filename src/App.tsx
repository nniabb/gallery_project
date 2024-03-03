import React from 'react';
import './App.css';
import './styles/Main.css';
import './pages/Main';
import MainComponent from './pages/Main';
import { SearchProvider } from './context/Search';
import HistoryPage from './pages/History'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <SearchProvider>
    <Router>
      <Routes>
        <Route path='/' element={<MainComponent/>} />
        <Route path= '/History' element={<HistoryPage/>}/>
      </Routes>
    </Router>
    </SearchProvider>
  );
}


export default App;