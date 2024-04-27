import { useState } from 'react';
import randomImage from '../../../assets/onboarding/log in/pexels-anthony-shkraba-6749777 2.png'; // Import your random image here
import './style.css';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const SignUpForm = () => {
  const [formIsValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', 
    phoneNumber: '',
    password: '',
    accountType: 'user',
    agreeTerms1: false,
    agreeTerms2: false,
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    isFormValid(); // You can remove this line since form validation is already handled within handleChange
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    if (formIsValid) {
      // If form is valid, navigate to the verify page
      history.push('/verify');
    }
  };
  

  const isPasswordValid = () => {
    const { password } = formData;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const isFormValid = () => {
    const { firstName, lastName, phoneNumber, password, agreeTerms1, agreeTerms2 } = formData;
    const isPasswordValidResult = isPasswordValid(); // Call isPasswordValid function
    const isAllFieldsFilled = firstName !== '' && lastName !== '' && phoneNumber !== '';
    const isAllTermsAgreed = agreeTerms1 && agreeTerms2;
    const formValid = isAllFieldsFilled && isPasswordValidResult && isAllTermsAgreed;
    setFormValid(formValid); // Use setFormValid instead of setIsFormValid
    return formValid;
  };

  return (
    <div className="flex gap-8 justify-center mt-8 items-center">
      <div className="flex h-1/2 w-fit items-center bg-slate-500">
        <img src={randomImage} className="object-contain w-1/2 mb-4" alt="Random" />
      </div>
      <div style={{ border: "0.5px solid #b2b2b2" }} className="ml-4 w-[40%] rounded-xl flex items-center justify-center gap-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3  '>
            <div className='flex   justify-between items-center w-full'>
              <div className="flex  flex-col">
                <label className='text-[#b2b2b2]' htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{ border: "0.5px solid #b2b2b2" }}
                  className='rounded-md p-1'
                />
              </div>
              <div className="flex  flex-col">
                <label className='text-[#b2b2b2]' htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{ border: "0.5px solid #b2b2b2" }}
                  className='rounded-md p-1'
                />
              </div>
            </div>
            <div className="flex text-[#b2b2b2] flex-col">
              <label className='text-[#b2b2b2]' htmlFor="email">Email address</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ border: "0.5px solid #b2b2b2" }}
                className='rounded-md p-1'
              />
            </div>
            <div className="flex  flex-col">
              <label className='text-[#b2b2b2]' htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={{ border: "0.5px solid #b2b2b2" }}
                className='rounded-md p-1'
              />
            </div>
            <div className="flex  flex-col">
              <div className='flex items-center   justify-between'>
                <label className='text-[#b2b2b2]' htmlFor="password">Password</label>
                <div onClick={togglePasswordVisibility} className='cursor-pointer flex gap-1 items-center'>
                  {formData.showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  <span>{formData.showPassword ? 'Hide' : 'Show'}</span>
                </div>
              </div>
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ border: "0.5px solid #b2b2b2" }}
                className='rounded-md p-1'
              />
              <p className={(formSubmitted && !isPasswordValid()) ? 'text-red-500' : 'text-[#b2b2b2]'}>
                Use 8 or more characters including at least one letter, one number, and one special character
              </p>
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-4'>
            <div className="flex items-start flex-col">
              <label className='text-[#b2b2b2]' htmlFor="accountType">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                style={{ border: "0.5px solid #b2b2b2" }}
                className='rounded-md p-1'
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div>
              <label className='flex flex-row gap-2 items-center'>
                <input
                  type="checkbox"
                  name="agreeTerms1"
                  checked={formData.agreeTerms1}
                  onChange={handleCheckboxChange}
                />
                <p>
                  By creating an account, I agree to our <span><a href="" style={{ textDecoration: 'underline' }}>Terms of use</a></span> and <span><a href="" style={{ textDecoration: 'underline' }}>Privacy Policy</a></span>.
                </p>
              </label>
            </div>
            <div className='flex flex-row'>
              <label className='flex flex-row gap-2 items-center'>
                <input
                  type="checkbox"
                  name="agreeTerms2"
                  checked={formData.agreeTerms2}
                  onChange={handleCheckboxChange}
                />
                <p>
                  By creating an account, I am also consenting to receive sms messages and emails, including product new feature updates, and marketing promotion.
                </p>
              </label>
            </div>
            <div className="flex gap-12 items-center ">
              <NavLink
                to="/email-verification"
                className='bg-slate-400 px-5 py-2 rounded-full'
                type="submit"
                style={{ backgroundColor: formIsValid ? '#b2b2b2' : 'blue' }}
                disabled={!formIsValid}>
                Sign Up
              </NavLink>
              <div>
                <p>I already have an account</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
