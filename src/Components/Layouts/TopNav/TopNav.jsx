import React, { useEffect, useState } from 'react'
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material'
import { Menu, Search, YouTube, AccountCircle, Mic, KeyboardBackspaceRounded } from '@mui/icons-material';
import "./TopNav.css"
import { NotificationIcon, VideoCallIcon } from '../../../Assets/Icons';
import { useFirebaseAuthContext } from '../../../Context/FirebaseContext';

export const TopNav = ({ showSideNav, setShowSideNav, showDashboard, setShowDashboard }) => {
  const { currentUser } = useFirebaseAuthContext()
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
    padding: "0 1%",
    position: "relative",
    borderBottom: "1px solid #cdcdcd",
    borderTop: "1px solid #cdcdcd",
  }

  const topNavElements = {
    ...flexRowCenter
  }

  // style for search bar box, temporary unused...
  /*
  const searchBarBoxStyle = {
    ...flexRowCenter,
    border: "1px solid #cdcdcd",
    borderRadius: "25px",
    flex: "0.5"
  }
  */

  const iconStyle = {
    width: {
      sm: "1.5em",
      xs: "1.4em"
    },
    height: {
      sm: "1.5em",
      xs: "1.4em"
    },
    fontSize: {
      sm: "1.5em",
      xs: "1.4em"
    },
    padding: "5px",
    borderRadius: "50%",
    transition: "0.1s ease",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#d3d3d3"
    }
  }

  const topNavSearchEnterBtnLogo = {
    width: "100%",
    height: "100%",
    padding: "5px",
    color: "#0f0f0f"
  }

  const navToggleBtnStyle = {
    marginRight: "10px",
    ...iconStyle,
    display: {
      xs: "none",
      sm: "inline-block"
    }
  }

  const youtubeLogoStyle = {
    color: "red",
    marginRight: "5px",
    fontSize: "1.5em",
    width: "1.5em",
    height: "1.5em"
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search/${searchValue}`)
    }
    setSearchValue("")
  }

  return (
    <Box sx={topNavMainContainer}>
      <Box component="div" sx={topNavElements}>
        <Menu sx={navToggleBtnStyle} onClick={() => setShowSideNav(!showSideNav)} />
        <Link component={ReactLink} className="homeLink" to='/' underline="none" variant='body1' color="black">
          <YouTube sx={youtubeLogoStyle} />
          <Typography variant='p' component="p">YouTube</Typography>
        </Link>
      </Box>

      <div id='topNavSearchDiv' className='navBoxShowHide'>
        <KeyboardBackspaceRounded id="search_BackIcon" focusable="true" tabIndex="1" sx={{
          display: {
            xs: "inline-block",
            sm: "none"
          },
          ...iconStyle,
          marginRight: "5px"
        }}
          onFocus={() => {
            document.getElementById("topNavSearchDiv").classList.remove("fullSearchBar")
          }}
        />
        <form className='searchForm' onSubmit={searchSubmit}>
          <input type="text" placeholder='Search' className='topNavSearchBar' value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value)
          }} />
          <button type="submit" className='topNavSearchEnterBtn' title='search'>
            <Search sx={topNavSearchEnterBtnLogo} />
          </button>
        </form>

        <Mic sx={iconStyle} title="voice search" />
      </div>

      <Box sx={flexRowCenter}>
        <Search
          focusable="true"
          tabIndex="1"
          onFocus={() => { document.getElementById("topNavSearchDiv").classList.add("fullSearchBar") }}
          sx={{
            display: {
              xs: "inline-block",
              sm: "none"
            },
            width: "1.5em",
            height: "1.5em",
            fontSize: "1.5em",
            padding: "7px",
            borderRadius: "25px",
            transition: "0.1s ease",
            cursor: "pointer",
            margin: "0 auto",
            outline: "none",
            ":hover": {
              backgroundColor: "#d3d3d3"
            }
          }}
        />
        <VideoCallIcon className="topNavLeftIcons" />
        <NotificationIcon className="topNavLeftIcons" />
        {
          currentUser ?
            <Box onClick={() => setShowDashboard(!showDashboard)} sx={{ margin: "0 10px" }}>
              <AccountCircle sx={{ cursor: "pointer", width: "30px", height: "30px", color: "red" }} />
            </Box> :
            <Link component={ReactLink} underline="none" variant='body1' color="black" to="/signin" sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <AccountCircle sx={{ margin: "0 10px", cursor: "pointer", width: "30px", height: "30px", color: "red" }} />
              <Typography
                component="p"
                variant='p'>
                Sign In
              </Typography>
            </Link>
        }
      </Box>
    </Box>
  )
}
