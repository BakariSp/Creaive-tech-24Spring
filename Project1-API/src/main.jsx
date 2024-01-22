import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import App from './App.jsx';
import './index.css';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)
