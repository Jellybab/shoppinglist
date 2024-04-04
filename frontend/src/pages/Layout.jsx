import {Outlet} from "react-router-dom"; 
import Navbar from "../jsx/Navbar"; 

const Layout = () => {   
  return (     
  <>       
    <Navbar />       
    <Outlet />     
  </>   
  ); 
}; 
export default Layout;