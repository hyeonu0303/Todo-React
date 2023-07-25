/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import RouterInfo from './router/router.jsx';
import './index.css'


//react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const RouterObject = createBrowserRouter(RouterInfo) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={RouterObject}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
