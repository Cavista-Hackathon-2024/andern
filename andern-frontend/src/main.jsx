import React from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'
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
        element: <div></div> ,
      },
    ]
  },
  {
    path: "sign_up",
    element:<SignUpForm/>
  },
  {
    path: "/email-verification", // Define the path for email verification
    element: <Email_verification />,
  },
  {
    path: "/Hos_form", // Define the path for email verification
    element: <Hos_form/>,
  } 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
    {/* <App /> */}
  </React.StrictMode>,
)
