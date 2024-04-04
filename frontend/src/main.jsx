import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Layout from "./pages/Layout.jsx";
import Home from './pages/Home.jsx';
import Tesco from "./pages/Tesco.jsx";
import Asda from "./pages/Asda.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>   
    <Routes> 
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tesco" element={<Tesco/>} />
        <Route path="asda" element={<Asda/>} />
      </Route>
    </Routes>
  </BrowserRouter>  
)