import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav flex-row flex-lg-row justify-content-center" id="navbarNav">
          {/* <li className="nav-item mx-auto">
            <Link className="nav-link" to="/">Home</Link>
          </li> */}
          <li className={"nav-item mx-auto"+ (location.pathname === "/tesco" ? " active" : "")}>
            <Link className="nav-link" to="/tesco">tesco</Link>
          </li>
          <li className={"nav-item mx-auto" + (location.pathname === "/asda" ? " active" : "")}>
            <Link className="nav-link" to="/asda">asda</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
