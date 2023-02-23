import { Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom';
import "./CollapsSideNav.css"
const CollapsSideNav = ({ collapsNavData, currentTab, setCurrentTab }) => {

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
      sm: "10px",
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
    background: "white"
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
    <Box id="collapsSideNavMainContainer" sx={sideNavContainerStyle} className="hideCollapsNav scrollDiv">
      {
        collapsNavData.map((collapsNavDataElement, indx) => (

          <NavLink
            className={"collapsSideNavLink"}
            to={setLink(collapsNavDataElement.name)}
            key={`${collapsNavDataElement.name}_${indx}`}
            onClick={() => {
              setCurrentTab(collapsNavDataElement.name)
              if (!document.getElementById("collapsSideNavMainContainer").classList.contains("hideCollapsNav")) {
                document.getElementById("collapsSideNavMainContainer").classList.add("hideCollapsNav")
              }
            }}>

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
              justifyContent: "center"
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

export default CollapsSideNav 