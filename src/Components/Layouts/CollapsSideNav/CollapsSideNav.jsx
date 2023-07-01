import { Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';
import "./CollapsSideNav.css"
import { useAppContextData } from '../../../Context/AppContext';

export const CollapsSideNav = ({ collapsNavData }) => {

  const [{ currentTab, showSideNav }, dispatch] = useAppContextData();

  const sideNavContainerStyle = {
    height: {
      xs: "50px",
      sm: "100%"
    },
    width: {
      xs: "100%",
      sm: "155px"
    },
    display: "flex",
    flexDirection: {
      xs: "row",
      sm: "column"
    },
    flexWrap: "nowrap",
    gap: {
      xs: "0",
      sm: "5px",
    },
    padding: {
      xs: "5px",
      sm: "10px",
    },
    overflowY: {
      sm: "scroll",
      xs: "hidden"
    },
    overflowX: {
      sm: "hidden",
      xs: "scroll"
    },
    scrollBehavior: "smooth",
    position: {
      xs: "static",
      sm: "absolute",
    },
    left: "0",
    top: "0",
    background: "white",
    zIndex: 100,
  }

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
    <Box id="collapsSideNavMainContainer" sx={sideNavContainerStyle} className={`${showSideNav ? "scrollDiv" : "hideCollapsNav scrollDiv"}`}>
      {
        collapsNavData.map((collapsNavDataElement, indx) => (

          <NavLink
            className={"collapsSideNavLink"}
            to={setLink(collapsNavDataElement.name)}
            key={`${collapsNavDataElement.name}_${indx}`}
            onClick={() => handleNavLinkClick(collapsNavDataElement.name, false)}>

            <Box sx={{
              width: {
                sm: "100%",
                xs: "125px"
              },
              height: "100%",
              padding: "5px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: {
                xs: "center",
                sm: "flex-start"
              }
            }}>

              {collapsNavDataElement.name === currentTab ? <collapsNavDataElement.active_icon className="collapsNavLinksIcon" /> : <collapsNavDataElement.icon className="collapsNavLinksIcon" />}

              <Typography variant='p' component="p" sx={{
                fontSize: "0.8rem",
                textTransform: "capitalize"
              }}>
                {collapsNavDataElement.name}
              </Typography>
            </Box>
          </NavLink>

        ))
      }
    </Box>
  )
}
