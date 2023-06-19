import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import "./SideNav.css"

export const SideNav = ({ sideNavData, currentTab, setCurrentTab }) => {
	return (
		<Box sx={{
			width: "70px",
			height: "100%",
			display:"none"
		}}>
			{
				sideNavData.map((sideNavDataElement, indx) => {
					return (
						<Box sx={{ marginBottom: "15px", marginLeft: "auto", marginRight: "auto" }} key={`${sideNavDataElement.name}_${indx}`}>
							<Link to={`/${sideNavDataElement.name}`} onClick={() => { setCurrentTab(sideNavDataElement.name) }}
								className="indvLinkStyle">
								{currentTab === sideNavDataElement.name ? <sideNavDataElement.active_icon className="sideNavIcon" /> : <sideNavDataElement.icon className="sideNavIcon" />}
								<Typography variant='p' component="p" sx={{
									fontSize: "0.7rem",
									textTransform:"capitalize"
								}}>{sideNavDataElement.name}</Typography>
							</Link>
						</Box>
					)
				})
			}
		</Box>
	)
}
