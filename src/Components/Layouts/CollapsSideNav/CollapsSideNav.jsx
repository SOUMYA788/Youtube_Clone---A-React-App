import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./collapsSideNav.css"
import { useDispatch, useSelector } from 'react-redux';
import { hideSideNav } from '../../../Store/Slices/sideNavSlice';

export const CollapsSideNav = ({ collapsNavData }) => {
  const navStatus = useSelector(state => state.sideNavReducer.value)

  const dispatch = useDispatch()

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
    
    <div className={`h-fit w-full 600px:h-[calc(100dvh-4rem)] 600px:flex-1 flex ${navStatus ? "600px:flex" : "600px:hidden"} 600px:w-36 flex-row 600px:flex-col flex-nowrap gap-3 600px:gap-1 p-2 600px:px-3 600px:m-0 overflow-x-scroll 600px:overflow-x-hidden 600px:overflow-y-scroll scroll-smooth 600px:absolute ${navStatus ? "600px:left-0" : "600px:-left-40"} 600px:top-16 bg-white dark:bg-slate-800 transition-all duration-200`}>
      {
        collapsNavData.map((collapsNavDataElement, indx) => (
          <NavLink className={"no-underline text-black dark:text-slate-400 600px:my-4 outline-none rounded-sm focus:ring-2 ring-slate-500  ring-offset-1 ring-offset-slate-500"} to={setLink(collapsNavDataElement.name)} key={`${collapsNavDataElement.name}_${indx}`} onClick={() => dispatch(hideSideNav)}>

            <div className='text-sm capitalize w-max h-9 600px:w-full p-2 flex flex-row items-center justify-center 600px:justify-start'>
              {collapsNavDataElement.name}
            </div>

          </NavLink>
        ))
      }
    </div>
  )
}
