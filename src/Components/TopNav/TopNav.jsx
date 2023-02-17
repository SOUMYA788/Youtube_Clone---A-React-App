import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import { Menu, Search, YouTube, AccountCircle } from '@mui/icons-material';
import "./TopNav.css"
import { NotificationIcon, VideoCallIcon } from '../../Assets/Icons';

const TopNav = () => {

  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate();

  const flexRowCenter = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }

  const topNavMainContainer = {
    width: "100%",
    height: "100%",
    ...flexRowCenter,
    padding: "0 18px"
  }

  const topNavElements = {
    ...flexRowCenter
  }

  // style for search bar box, temporary unused...
  const searchBarBoxStyle = {
    ...flexRowCenter,
    border: "1px solid #cdcdcd",
    borderRadius: "25px",
    flex: "0.5"
  }

  const topNavSearchEnterBtnLogo = {
    width: "100%",
    height: "100%",
    padding: "10%",
    color: "#0f0f0f"
  }

  const navToggleBtnStyle = {
    width: "1.5em",
    height: "1.5em",
    cursor: "pointer",
    marginRight: "20px",
    padding: "4px",
    borderRadius: "25px",
    ":hover": {
      background: "#d3d3d3",
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`)
  }

  return (
    <Box sx={topNavMainContainer}>

      <Box sx={topNavElements}>
        <Menu sx={navToggleBtnStyle} onClick={() => { document.getElementById("collapsSideNavMainContainer").classList.toggle("hideCollapsNav") }} />
        <Link className="homeLink" to='/'>
          <YouTube sx={{ color: "red", marginRight: "5px" }} />
          <Typography variant='p' component="p">YouTube</Typography>
        </Link>
      </Box>

      <Box sx={{flex: "0.8"}}>
        <form className='searchForm' onSubmit={searchSubmit}>
          <input type="text" placeholder='Search' className='topNavSearchBar' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
          <button type="submit" className='topNavSearchEnterBtn' >
            <Search sx={topNavSearchEnterBtnLogo} />
          </button>
        </form>
      </Box>

      <Box sx={flexRowCenter}>
        <VideoCallIcon className="topNavLeftIcons" />
        <NotificationIcon className="topNavLeftIcons" />
        <AccountCircle sx={{ margin: "0 10px", cursor: "pointer", width: "30px", height: "30px", color: "red" }} />
      </Box>

    </Box>
  )
}

export default TopNav