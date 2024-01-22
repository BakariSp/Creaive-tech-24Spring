import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
// import { Router } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import AboutPage from './pages/about';
import HomePage from './pages/homepage';
import SketchfabViewer from './pages/project1';
import Navbar from './components/navigater';
// import Layout from './pages/layout';

function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/project1">
            <SketchfabViewer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </>
  );
  
}

export default function App() {
  return (
    <Router basename='/Creaive-tech-24Spring'>
      <Layout />
    </Router>
  );
}

function Home() {
  return <HomePage />;
}

function About() {
  return <AboutPage />;
}




