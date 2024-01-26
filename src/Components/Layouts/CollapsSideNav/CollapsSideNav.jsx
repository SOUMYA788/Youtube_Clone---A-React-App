import { Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';
import "./CollapsSideNav.css"
import { useAppContextData } from '../../../Context/AppContext';

export const CollapsSideNav = ({ collapsNavData }) => {

  const [{ currentTab, showSideNav }, dispatch] = useAppContextData();

  const handleNavLinkClick = (currentTab, showSideNav) => {
    dispatch({
      type: "setCurrentTab",
      currentTab
    })

    if (showSideNav) {
      dispatch({
        type: "setShowSideNav",
        showSideNav
      })
    }
  }

  const setLink = (link) => {
    if (link.toLowerCase() === "home") {
      return ("/")
    } else if (link.toLowerCase() === "trending") {
      return ("/trending/now")
    } else {
      return (`/search/${link}`)
    }
  }
  return (
    <div className={`h-fit w-full 600px:h-full 600px:w-40 flex flex-row 600px:flex-col flex-nowrap gap-3 600px:gap-1 p-2 600px:p-3 600px:m-0 overflow-x-scroll 600px:overflow-y-scroll scroll-smooth 600px:absolute 600px:left-0 600px:top-10 bg-white dark:bg-slate-800 z-40`}>
      {
        collapsNavData.map((collapsNavDataElement, indx) => (

          <NavLink className={"no-underline text-black dark:text-slate-400 600px:my-4 outline-none rounded-sm focus:ring-2 ring-slate-500 ring-offset-1"} to={setLink(collapsNavDataElement.name)} key={`${collapsNavDataElement.name}_${indx}`} onClick={() => handleNavLinkClick(collapsNavDataElement.name, false)}>

            <div className='text-sm capitalize w-max h-9 600px:w-full p-2 flex flex-row items-center justify-center 600px:justify-start'>

              {collapsNavDataElement.name}

            </div>
          </NavLink>

        ))
      }
    </div>
  )
}
