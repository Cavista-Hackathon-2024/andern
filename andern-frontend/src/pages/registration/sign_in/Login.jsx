import { useState } from 'react';
import randomImage from '../../../assets/onboarding/log in/Capture.png';  
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import Nav from '../Nav';

const Login = () => {
  const [formIsValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '', 
    password: '',
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
    const { email, password } = formData;
    const isPasswordValidResult = isPasswordValid(); // Call isPasswordValid function
    const formValid = email !== '' && password !== '' && isPasswordValidResult;
    setFormValid(formValid); // Use setFormValid instead of setIsFormValid
    return formValid;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Nav className="sticky"/>
      <div className="flex gap-8 justify-center mt-8 items-center">
        <div className="flex h-1/2 w-fit items-center ">
          <img src={randomImage} className="object-contain  mb-4" alt="Random" />
        </div>
        <div style={{ border: "0.5px solid #b2b2b2" }} className="ml-4 w-[40%] rounded-xl flex items-center justify-center gap-4 p-4">
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
              <div className="flex text-gray-400 flex-col">
                <label className='text-gray-400' htmlFor="email">Email address</label>
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
                <div className='flex items-center   justify-between'>
                  <label className='text-gray-400' htmlFor="password">Password</label>
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
                <p className={(formSubmitted && !isPasswordValid()) ? 'text-red-500' : 'text-gray-400'}>
                  Use 8 or more characters including at least one letter, one number, and one special character
                </p>
              </div>
            </div>
            <div className='mt-4 flex gap-12 items-center '>
              <NavLink
                to="/dashboard"
                className='bg-slate-400 text-white px-5 py-2 rounded-full'
                type="submit"
                style={{ backgroundColor: formIsValid ? '#b2b2b2':  'blue' }}
                disabled={!formIsValid}>
                 Login
              </NavLink>
              <div>
                <p>I  am a new user? <NavLink style={{textDecoration: "underline"}} to='/sign_up'>Sign up</NavLink>
                 </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
