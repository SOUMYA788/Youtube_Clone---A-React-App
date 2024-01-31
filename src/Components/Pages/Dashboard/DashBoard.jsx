import React from 'react'
import { USER_DASHBOARD_LINKS } from '../../../constants'
import { Link } from 'react-router-dom'


export const DashBoard = () => {
  return (
    <div className='w-full flex flex-col '>
      <div className="w-full flex flex-row flex-wrap gap-6 dark:bg-slate-700 p-5 rounded-xl">
        <img src="/logo.svg" alt="user" className='w-24 h-24 rounded-full bg-slate-500 p-2' />
        <div>
          <h2 className='capitalize font-semibold dark:text-slate-300 text-base'>user name</h2>
          <p className='dark:text-slate-300 my-1 text-xs'>prime | free</p>
          <p className='dark:text-slate-300 my-1 mt-4 text-xs'>useremail@gmail.com</p>
        </div>
      </div>



      <div className='w-full p-2 flex flex-row items-center gap-3 mt-3'>

        {
          USER_DASHBOARD_LINKS.map(({ id, title, url }) => (
            <Link to={url} className='text-xs p-3 py-5 rounded-md bg-gray-400 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-red-400 focus:bg-red-400 font-semibold uppercase tracking-wider outline-none border-2 border-transparent hover:border-red-800 focus:border-red-800 transition-colors' key={id}>
              {title}
            </Link>
          ))
        }

        {/*create channel - Another Page */}
        {/*watchlist - common page */}
        {/*video(s) uploaded - common page */}
        {/*history - common page */}

      </div>
    </div>
  )
}