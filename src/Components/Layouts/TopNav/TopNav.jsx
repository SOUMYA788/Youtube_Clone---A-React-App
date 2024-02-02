import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BiLogoYoutube, BiMenu } from "react-icons/bi"
import { GoSearch } from "react-icons/go"
import { MdOutlineKeyboardBackspace } from "react-icons/md"

import TopNavUserProfileSection from './TopNavUserProfileSection';

import {CustomButton, ThemeSwitcher} from "../"


import { CollapsSideNav } from '../CollapsSideNav/CollapsSideNav';
import { ONLINE_STATUS, SIDE_NAV_MAIN_LINKS, VIDEO_CATEGORY_LINKS } from '../../../constants';
import { toggleSideNav } from '../../../Store/Slices/sideNavSlice';



const TopNavSearchBtn = ({ children, className, ...props }) => {
  return <CustomButton type="submit" className={`w-8 h-8 flex items-center justify-center px-1 rounded-full bg-slate-300 focus:bg-slate-800 hover:bg-slate-800 dark:bg-transparent text-slate-800 focus:text-white hover:text-white dark:text-slate-400 dark:hover:text-white dark:focus:text-white border dark:border-transparent border-slate-400 hover:border-slate-800 focus:border-slate-800 font-bold ${className}`} title='search' {...props}>
    {children}
  </CustomButton>
}



export const TopNav = ({ theme, setTheme }) => {
  const [searchValue, setSearchValue] = useState("")
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);
  const navStatus = useSelector(state => state.sideNavReducer.value)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const searchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search/${searchValue}`)
    }
    setSearchValue("")
  }

  return (
    <div className='w-full bg-white dark:bg-slate-800 bg-opacity-80 backdrop-blur-sm sticky top-0 left-0 z-40 pt-3 600px:pb-3'>

      <div className={`w-full flex flex-row items-center justify-between px-2 ${ONLINE_STATUS ? "mb-3" : ""}`}>

        <div className="flex flex-row items-center justify-center gap-5">
          {
            ONLINE_STATUS && <CustomButton className={`h-10 w-10 p-1 ${navStatus ? 'bg-red-400 hover:bg-green-400 focus:bg-green-400 text-slate-700 border-transparent ring-red-600 focus:ring-green-600 hover:ring-green-600 animate-pulse duration-75' : 'text-slate-400 hover:text-white focus:text-white bg-slate-700 ring-transparent border-slate-400 hover:ring-slate-600 dark:ring-transparent'} hidden 600px:inline-flex md:items-center md:justify-center rounded-full dark:rounded-full ring-2 border transition-colors`} onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleSideNav());
            }}>
              <BiMenu className='w-full h-full' />
            </CustomButton>
          }
          <Link to="/" className="font-semibold text-slate-500 hover:text-black focus:text-black dark:text-slate-400 dark:focus:text-white outline-none border-none no-underline flex flex-row items-center justify-center">
            <BiLogoYoutube className='text-red-500 w-8 h-8 mr-1.5' />
            <p>YouTube</p>
          </Link>
        </div>


        {
          ONLINE_STATUS && <div className={`bg-slate-200 dark:bg-slate-700 rounded-full px-2 py-1 flex-[0.5] h-full ${showMobileSearchBar ? "flex" : "hidden"} md:flex md:items-center md:justify-center`}>

            {/* backspace icon use to remove search bar from mobile screens */}

            <TopNavSearchBtn className={`${showMobileSearchBar ? "inline-block" : "hidden"} md:hidden`} onClick={() => setShowMobileSearchBar(value => !value)}>

              <MdOutlineKeyboardBackspace className={`h-full w-full`} />

            </TopNavSearchBtn>

            <form className='h-full w-full rounded-full flex flex-row items-center justify-center' onSubmit={searchSubmit}>

              <input type="text" placeholder='Search' className='h-full text-black dark:text-white min-w-1 outline-none border-none flex-1 bg-transparent px-2' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />

              <TopNavSearchBtn>
                <GoSearch className='w-full h-full' />
              </TopNavSearchBtn>

            </form>

          </div>
        }


        <div className="flex flex-row items-center justify-center gap-5 h-full">

          <ThemeSwitcher theme={theme} setTheme={setTheme} />

          {/* top nav right side earech Icon for mobile screens */}
          <TopNavSearchBtn className={`md:hidden`} onClick={() => setShowMobileSearchBar(value => !value)}>
            <GoSearch className='w-full h-full' />
          </TopNavSearchBtn>
          {
            ONLINE_STATUS && <TopNavUserProfileSection />
          }
        </div>

      </div>

      {
        ONLINE_STATUS && <CollapsSideNav collapsNavData={[...SIDE_NAV_MAIN_LINKS, ...VIDEO_CATEGORY_LINKS]} />
      }

    </div>
  )
}
