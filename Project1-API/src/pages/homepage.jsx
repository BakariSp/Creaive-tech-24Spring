import reactLogo from '../assets/react.svg';
import '../APP.css';
import { NavLink } from 'react-router-dom';


function HomePage() { 
  return (
    <>
      <NavLink to="/project1" className="card">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h2>Project1</h2>
      </NavLink>
      {/* <div>Hompage</div> */}
    </>
  );
}

export default HomePage;