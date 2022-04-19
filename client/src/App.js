import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// import components
import Header from './components/Header';

// Import pages
import Dashboard from './pages/Dashboard';
import Dividends from './pages/Dividends';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import Register from './pages/Register';
import StockAnalyser from './pages/StockAnalyser';

function App() {
  return (
    <>
      <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Dividends' element={<Dividends />} />
          <Route path='/Portfolio' element={<Portfolio />} />
          <Route path='/StockAnalyser' element={<StockAnalyser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>

      </Router>
    </>
  );
}

export default App;
