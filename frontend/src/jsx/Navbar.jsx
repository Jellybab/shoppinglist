import { Link } from "react-router-dom"; 
function Navbar() {   
  return (     
  <nav>       
    <ul>         
      <li>           
        <Link to="/">Home</Link>         
      </li>         
      <li>           
        <Link to="/tesco">tesco</Link>         
      </li>         
      <li>           
        <Link to="/asda">asda</Link>         
      </li>       
    </ul>     
  </nav>   
  ); 
} 
export default Navbar;
