import React, { useEffect } from 'react'
import { USER_DASHBOARD_LINKS } from '../../../constants'
import { Link } from 'react-router-dom'
import { useFirebaseAuthContext } from '../../../Context/FirebaseContext'
import { getCurrentUser } from '../../../Services/auth'
import { MdEmail } from 'react-icons/md'

export const DashBoard = () => {
  const currentUser = getCurrentUser();
  useEffect(() => {
    console.log('currentUser from dashboard', currentUser);
  }, [])


  return <div className='w-full flex flex-col relative'>

    <h2 className='mb-3 p-1 text-sm font-semibold text-slate-800 tracking-wider'>DASHBOARD</h2>

    <div className="w-full flex flex-col flex-wrap gap-3 bg-gray-100 dark:bg-slate-700 p-5 rounded-xl">

      <img src={currentUser?.photoURL || "/logo.svg"} alt="user" className='w-24 h-24 rounded-full bg-slate-500 p-2' />

      <div className='w-full'>

        <h2 className={`${currentUser?.uid ? 'capitalize font-semibold text-slate-800 dark:text-slate-300 text-base 300px:text-xl' : 'bg-slate-500 h-3 rounded-full animate-pulse'}`}>{currentUser?.displayName || currentUser?.email?.toString().split("@")[0]}</h2>

        <p className={`${currentUser?.uid ? "text-slate-700 dark:text-slate-300 my-1 text-xs 300px:text-sm" : "bg-slate-500 h-3 rounded-full animate-pulse"} `}>prime | free</p>

        <p className={`${currentUser?.uid ? "text-slate-700 dark:text-slate-300 my-1.5 300px:mt-3 text-xs 300px:text-sm" : "bg-slate-500 h-3 rounded-full animate-pulse"} `}>
          {currentUser?.email || ""}
        </p>

        <p className={`${currentUser?.uid ? "text-slate-700 dark:text-slate-300 mt-1.5 text-xs" : "bg-slate-500 h-3 rounded-full animate-pulse"} `}>{currentUser?.phoneNumber || ""}</p>
      </div>

      <Link to={"/dashboard/create-channel"} className='w-fit text-xs px-2 py-1 uppercase rounded-full bg-gray-300 focus:bg-slate-800 hover:bg-slate-800 text-gray-900 hover:text-slate-300 focus:text-slate-300 dark:bg-slate-500 dark:text-slate-300  dark:focus:bg-slate-400 dark:focus:text-slate-800 outline-none border-none'>create channel</Link>

    </div>


    <div className='w-full p-1 600px:bg-slate-600 flex flex-col 600px:flex-row 600px:items-center gap-3 mt-3'>

      {
        USER_DASHBOARD_LINKS.map(({ id, title, url }) => (
          <Link to={url} className='w-24 text-center 600px:w-fit text-xs p-2 rounded-md bg-gray-400 text-slate-800 dark:bg-slate-700 dark:text-slate-300 hover:bg-red-400 focus:bg-red-400 font-semibold uppercase tracking-wider outline-none border-2 border-transparent hover:border-red-800 focus:border-red-800 transition-colors' key={id}>
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

}