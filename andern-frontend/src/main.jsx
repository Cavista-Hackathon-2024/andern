import React from 'react';
import ReactDOM from 'react-dom'; // Change import statement
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Root from './components/Root.jsx'; 
import SignUpForm from './pages/registration/sign_up/Sign_up.jsx';
import Email_verification from './pages/registration/sign_up/Email_verification.jsx';
import Hos_form from './pages/registration/sign_up/Hos_form.jsx'; 
import DashboardRoot from './components/DashboardRoot.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Diagnosis from './pages/Diagnosis.jsx';
import Symptoms from './pages/Symptoms.jsx';
import Drugs from './pages/Drugs.jsx';  
import Login from './pages/registration/sign_in/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/", // Corrected path
    element: <DashboardRoot />,
    children: [
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "submitdiagnosis",
        element: <Diagnosis />,
      },
      {
        path: "symptoms",
        element: <Symptoms />,
      },
      {
        path: "drugs",
        element: <Drugs />,
      },
    ],
  },
  
      {
      path: '/sign_up', 
      element: <SignUpForm />,
    },
    {
      path: '/email-verification',
      element: <Email_verification/>,
    },
    {
      path: '/Hos_form',
      element: <Hos_form />,
    },
    {
      path:"/login",
      element:<Login/>
    }
  


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
    {/* <App /> */}
  </React.StrictMode>,
);
