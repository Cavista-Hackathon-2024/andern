import React, { useState } from 'react';
import doc from '../../../assets/onboarding/log in/pngwing 7.png';
import { NavLink } from 'react-router-dom';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setFormIsValid(validateEmail(inputValue));
  };

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center gap-8">
        <img src={doc} className='object-contain' alt="" />
        <div className='flex flex-col justify-between bg-white rounded-xl px-8   py-12  h-[80vh] w-[40%]' style={{border:"0.5px solid #b2b2b2"}}>
            <div className="flex flex-col gap-2 items-start">
              <div className='w-full text-center'>
                <p className='font-bold text-2xl'> Email  Verification</p>
              </div>
              <label>Email address:</label>
              <input type="email" value={email} onChange={handleEmailChange}
                  style={{ border: "0.5px solid #b2b2b2" }}
                  className='rounded-md p-1 w-[60%]'
              />
            </div>
            <div className="flex gap-12 items-center ">
              <NavLink
                to="/Hos_form"
                type="submit"
            style={{ backgroundColor: formIsValid ?  'blue' :  '#b2b2b2'}}
                disabled={!formIsValid}
                className='px-5 py-2 rounded-full'
              >
                Continue
              </NavLink>
              <div>
                <p>I already have an account</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
