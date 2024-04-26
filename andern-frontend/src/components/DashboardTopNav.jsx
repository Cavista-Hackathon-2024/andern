import React from 'react'
import { IoMailOpenOutline, IoMenuOutline, IoNotifications } from "react-icons/io5";
import Section from './Section';
import { Link } from 'react-router-dom';

const DashboardTopNav = () => {
  return (
    <div className=' bg-slate-50 ' >
      <Section >
        <div className='py-4 flex items-center  justify-between  ' >
          <div className='flex items-center gap-4 ' >
            {/* menu toggle */}
            <IoMenuOutline size={32} />
            {/* logo */}
            <Link to={'/dashboard'} >
              <h1 className=' text-2xl ' >Andern</h1>
            </Link>
          </div>
          <div className='flex items-center ' >
            {/* Search */}
            <input type="text" name="" id="" placeholder='Search' className='p-4 px-9 w-[700px] rounded-2xl bg-transparent border-2 '  />
          </div>
          <div className='flex items-center gap-4 justify-self-end ' >
            {/* Notifications */}
            <IoNotifications size={32} />
            {/* toggle dark mode */}
            <IoMailOpenOutline size={32} />
            {/* profile pic */}
            <img />
          </div>
        </div>

      </Section>
    </div>
  )
}

export default DashboardTopNav