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
import DashboardRoot from './components/DashboardRoot.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Diagnosis from './pages/Diagnosis.jsx';
import Symptoms from './pages/Symptoms.jsx';
import Drugs from './pages/Drugs.jsx';

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
      // {
      //   path: "/login",
      //   element: <div>This is th login in page pppppppppp</div> ,
      // },
    ]
  },
  {
    path: "dashboard",
    element: <DashboardRoot />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "dashboard/submitdiagnosis",
        element: <Diagnosis />
      },
      {
        path: "dashboard/symptoms",
        element: <Symptoms />
      },
      {
        path: "dashboard/drugs",
        element: <Drugs />
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
