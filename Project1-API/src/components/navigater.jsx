import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand me-3" to="/">Linghang</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-2"> {/* Add margin to the right of each nav-item */}
              <NavLink className="nav-link" to="/" exact activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item me-2"> {/* Bootstrap spacing class 'me-2' */}
              <NavLink className="nav-link" to="/about" activeClassName="active">About</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link" to="/project1" activeClassName="active">Project1</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
