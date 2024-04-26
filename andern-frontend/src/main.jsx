import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Root from './components/Root.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // path: "/",
        index: true,
        element: <div>this is home</div> ,
      },
      {
        path: "/contact",
        element: <div>This is contact us page</div> ,
      },
    ]
  },
  {
    path: "ddd",
    element: <div>hello you are on DDD</div>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
    {/* <App /> */}
  </React.StrictMode>,
)
