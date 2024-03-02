import React from 'react';
import './App.css';
import './styles/Main.css';
import './pages/Main';
import MainComponent from './pages/Main';
import HistoryPage from './pages/History'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

{/* <div className="App">
<MainComponent/>
</div> */}
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainComponent/>} />
        <Route path= '/History' element={<HistoryPage/>}/>
      </Routes>
    </Router>

  );
}

export default App;
