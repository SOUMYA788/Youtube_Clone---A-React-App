import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import "./CollapsSideNav.css"
const CollapsSideNav = ({ collapsNavData, currentTab, setCurrentTab }) => {

  const sideNavContainerStyle = {
    height: "100%",
    width: "155px",
    padding: "10px",
    msOverflowY: "scroll",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    position: "absolute",
    left: "0",
    top: "0",
    background: "white"
  }

  return (
    <Box id="collapsSideNavMainContainer" sx={sideNavContainerStyle} className="hideCollapsNav scrollDiv">
      {
        collapsNavData.map((collapsNavDataElement, indx) => (
          <Link className={collapsNavDataElement.name === currentTab ? "collapsSideNavLink collapsSideNavLinkActive" : "collapsSideNavLink"} to={`/${collapsNavDataElement.name}`} key={`${collapsNavDataElement.name}_${indx}`} onClick={() => { setCurrentTab(collapsNavDataElement.name) }}>
            {collapsNavDataElement.name === currentTab ? <collapsNavDataElement.active_icon className="collapsNavLinksIcon" /> : <collapsNavDataElement.icon className="collapsNavLinksIcon" />}
            <Typography variant='p' component="p" sx={{
              fontSize: "0.8rem",
              textTransform:"capitalize"
            }}>{collapsNavDataElement.name}</Typography>
          </Link>
        ))
      }
    </Box>
  )
}

export default CollapsSideNav 