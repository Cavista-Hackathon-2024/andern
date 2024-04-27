import { useState } from 'react'
import lol from "../../assets/onboarding/log in/Frame 277.png"
import { NavLink } from 'react-router-dom';

const Nav = () => {

    const [value, setValue] = useState('');

    // List of languages
    const languages = [
      'English',
      'Spanish',
      'French',
      'German',
      'Chinese',
      
    ];
  
  return (
    <div style={{boxShadow:"2px 3px 0.5px 0.5px #b2b2b2"}} className='w-screen  px-6 py-4 bg-slate-200'>
        <div className="flex justify-between items-center">
            <div className="logo" >
                <img src={lol} alt="" />
            </div>
            <div className="flex items-center gap-8">
 
              <div>
                <input
                  type="text"
                  list="languages"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="English"
                  className=" rounded w-[6.8rem] text-black"
                />
                <datalist id="languages">
                  {languages.map((language, index) => (
                    <option key={index} value={language} />
                  ))}
                </datalist>
              </div>
              <div style={{boxShadow: '1px 4px 0px 0px #9ca3af'}} className="login bg-slate-100 rounded-full px-7 py-4">
                <NavLink to='/login'>Login</NavLink>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Nav
