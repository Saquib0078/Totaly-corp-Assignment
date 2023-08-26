import './App.css';
import NavBar from './components/NavBar';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './components/Home.js';
import Cart from './components/Cart';

function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
     <NavBar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
