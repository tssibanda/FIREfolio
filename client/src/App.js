import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

// import components
import Header from './components/Header';

// Import pages
import Dashboard from './pages/Dashboard';
import Dividends from './pages/Dividends';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import Register from './pages/Register';
import StockAnalyser from './pages/StockAnalyser';

// import css
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dividends' element={<Dividends />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/stockanalyser' element={<StockAnalyser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
