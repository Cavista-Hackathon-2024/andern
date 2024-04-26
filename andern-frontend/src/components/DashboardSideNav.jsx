import React from 'react'
import { dashboardMenuList } from '../utils/dashboardMenuList'
import { Link } from 'react-router-dom'

const DashboardSideNav = () => {
  return (
    <div className='bg-slate-50 min-h-screen border-t-2 ' >
      <div className=' flex flex-col px-11 py-11 gap-4 text-xl ' >
        {
          dashboardMenuList.map(({path, name}, idx) => {
            return(
              <Link to={path} className="capitalize hover:text-gray-700  " key={idx}   >{name}</Link>
              )
            })
          }
      </div>
    </div>
  )
}

export default DashboardSideNav