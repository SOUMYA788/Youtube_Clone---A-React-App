import { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as ReactLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import { HomeOutlined, HomeRounded, SubscriptionsOutlined, Subscriptions, VideoLibraryOutlined, VideoLibrary, Restore, RestoreOutlined, SlideshowRounded, AccessTimeOutlined, AccountCircleRounded, WhatshotOutlined, WhatshotRounded, MusicNote, MusicNoteOutlined, AccountCircle, Logout, LockResetRounded } from '@mui/icons-material';

import { CreatorStudioIcon, FashionAndBuityIcon, FashionAndBuityIcon_Active, FeedbackIcon, GamingIcon, GamingIcon_Active, HelpIcon, HotspotIcon, HotspotIcon_Active, LearningIcon, LearningIcon_Active, MoviesIcon, MoviesIcon_Active, NewsIcon, NewsIcon_Active, ReportFlagIcon, SettingsIcon, ShortsIcon, ShortsIcon_Active, SportsIcon, SportsIcon_Active, YoutubeIcon, YoutubeKidsIcon, YoutubeMusicIcon, YoutubeTvIcon, } from './Assets/Icons';

import { TopNav, Home, Search, Channel, Player, Trending, CollapsSideNav, SideNav, SignIn, DashBoard, CustomAlert, Login, ForgetPassword } from './Components';

import "./App.css";
import { useFirebaseAuthContext } from './Context/FirebaseContext';

function App() {
  const { currentUser, logOut } = useFirebaseAuthContext();
  const [currentTab, setCurrentTab] = useState("home")
  const [showSideNav, setShowSideNav] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [logOutError, setLogOutError] = useState(null);
  const dashboardContainerRef = useRef();

  const appContentContainerDivStyle = {
    height: "calc(100vh - 50px)",
    width: "100%",
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    position: "relative"
  }

  const routerContainerDivStyle = {
    width: "100%",
    height: "100%",
    msOverflowY: "scroll",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    display: "flex",
    flexDirection: "row",
  }

  const navData = {

    sideNavData: [
      {
        "icon": HomeOutlined,
        "active_icon": HomeRounded,
        "name": "home"
      },
      {
        "icon": ShortsIcon,
        "active_icon": ShortsIcon_Active,
        "name": "shorts"
      },
      {
        "icon": SubscriptionsOutlined,
        "active_icon": Subscriptions,
        "name": "subscription"
      },
      {
        "icon": VideoLibraryOutlined,
        "active_icon": VideoLibrary,
        "name": "library"
      }
    ],

    collapsNavData: {
      main_links: [
        {
          "icon": HomeOutlined,
          "active_icon": HomeRounded,
          "name": "home"
        },
        {
          "icon": ShortsIcon,
          "active_icon": ShortsIcon_Active,
          "name": "shorts"
        },
        {
          "icon": SubscriptionsOutlined,
          "active_icon": Subscriptions,
          "name": "subscription"
        }
      ],
      user_links: [
        {
          "icon": VideoLibraryOutlined,
          "active_icon": VideoLibrary,
          "name": "library"
        },
        {
          "icon": Restore,
          "active_icon": RestoreOutlined,
          "name": "history"
        },
        {
          "icon": SlideshowRounded,
          "active_icon": SlideshowRounded,
          "name": "Your Videos"
        },
        {
          "icon": AccessTimeOutlined,
          "name": "Watch Later"
        },
      ],
      user_subscribers: [
        {
          "icon": AccountCircleRounded,
          "active_icon": AccountCircleRounded,
          "name": "AbbyViral"
        },
        {
          "icon": AccountCircleRounded,
          "active_icon": AccountCircleRounded,
          "name": "Anshika_Gupta"
        },
        {
          "icon": AccountCircleRounded,
          "active_icon": AccountCircleRounded,
          "name": "codeWithHarry"
        },
      ],
      explore: [
        {
          "icon": HomeOutlined,
          "active_icon": HomeRounded,
          "name": "home"
        },
        {
          "icon": WhatshotOutlined,
          "active_icon": WhatshotRounded,
          "name": "Trending"
        },
        {
          "icon": MusicNoteOutlined,
          "active_icon": MusicNote,
          "name": `Music`
        },
        {
          "icon": MoviesIcon,
          "active_icon": MoviesIcon_Active,
          "name": "Movies"
        },
        {
          "icon": HotspotIcon,
          "active_icon": HotspotIcon_Active,
          "name": "Live"
        },
        {
          "icon": GamingIcon,
          "active_icon": GamingIcon_Active,
          "name": "Gamming"
        },
        {
          "icon": NewsIcon,
          "active_icon": NewsIcon_Active,
          "name": "News"
        },
        {
          "icon": SportsIcon,
          "active_icon": SportsIcon_Active,
          "name": "Sports"
        },
        {
          "icon": LearningIcon,
          "active_icon": LearningIcon_Active,
          "name": "Learning"
        },
        {
          "icon": FashionAndBuityIcon,
          "active_icon": FashionAndBuityIcon_Active,
          "name": "Fashion & Buity"
        },
      ],
      more_from_youtube: [
        {
          "icon": YoutubeIcon,
          "active_icon": YoutubeIcon,
          "name": "YouTube Premium"
        },
        {
          "icon": CreatorStudioIcon,
          "active_icon": CreatorStudioIcon,
          "name": `Creator Studio`
        },
        {
          "icon": YoutubeMusicIcon,
          "active_icon": YoutubeMusicIcon,
          "name": "YouTube Music"
        },
        {
          "icon": YoutubeKidsIcon,
          "active_icon": YoutubeKidsIcon,
          "name": "YouTube Kids"
        },
        {
          "icon": YoutubeTvIcon,
          "active_icon": YoutubeTvIcon,
          "name": "YouTube TV"
        }
      ],
      others_icon: [
        {
          "icon": SettingsIcon,
          "active_icon": SettingsIcon,
          "name": "Settings"
        },
        {
          "icon": ReportFlagIcon,
          "active_icon": ReportFlagIcon,
          "name": `Report History`
        },
        {
          "icon": HelpIcon,
          "active_icon": HelpIcon,
          "name": "Help"
        },
        {
          "icon": FeedbackIcon,
          "active_icon": FeedbackIcon,
          "name": "Send Feedback"
        }
      ]
    }

  }

  const handleNavBtn = () => {
    if (showSideNav) { setShowSideNav(false) }
    if (showDashboard) { setShowDashboard(false) }
  }

  const handleLogout = async () => {
    try {
      setLogOutError(null)
      await logOut()
    } catch (error) {
      setLogOutError("faild to logout")
    }
  }



  return (
    <Router>
      <Box id="app_mainContainerDiv" sx={{ position: "relative", width: "100%", height: "100dvh" }} onClick={handleNavBtn} >
        {
          logOutError && <Box sx={{width:"90%", position:"absolute", top:"0", left:"5%"}}>
            <CustomAlert alertType="warn" alertMessage={logOutError} />
          </Box>
        }
        {
          showDashboard && <Box ref={dashboardContainerRef} sx={{ background: "white", position: "absolute", top: "50px", right: `${showDashboard ? "5px" : "-180px"}`, width: "170px", padding: "10px", display: `${showDashboard ? "flex" : "none"}`, flexDirection: "column", gap: "10px", zIndex: "101", transition: "2s ease", borderRadius: "5px", boxShadow: "-3px 3px 10px 1px rgba(0, 0, 0,0.2)" }}>

            <Typography component="h2" variant='h2' sx={{ fontSize: "0.8rem", textTransform: "uppercase", textAlign: "center", letterSpacing: "5px" }}>
              profile
            </Typography>

            {/* Horizontal Line */}
            <Box sx={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.5)", margin: "5px 0" }} />

            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
              <AccountCircle sx={{ width: "20px", height: "20px", color: "black" }} />
              <Typography component="p" variant='p' sx={{ fontSize: "0.8rem" }}>
                {currentUser.email.split("@")[0]}
              </Typography>
            </Box>

            <Link component={ReactLink} underline="none" variant='body1' color="black" to="/dashboard" sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
              <LockResetRounded sx={{ width: "20px", height: "20px", color: "black" }} />
              <Typography component="p" variant='p' sx={{ fontSize: "0.8rem" }}>
                Change Password
              </Typography>
            </Link>

            {/* SETUP LOGOUT */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={handleLogout}>
              <Logout sx={{ width: "20px", height: "20px", color: "black" }} />
              <Typography component="p" variant='p' sx={{ padding: "3px 1px", fontSize: "0.8rem" }}>
                Log Out
              </Typography>
            </Box>

          </Box>
        }

        <Box sx={{
          height: "50px",
          width: "100%",
        }}>
          <TopNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} showDashboard={showDashboard} setShowDashboard={setShowDashboard} />
        </Box>

        <Box sx={appContentContainerDivStyle}>

          <CollapsSideNav
            collapsNavData={navData.collapsNavData.explore}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            showSideNav={showSideNav}
            setShowSideNav={setShowSideNav} />

          <Box className="scrollDiv" sx={routerContainerDivStyle}>
            <SideNav sideNavData={navData.sideNavData} />
            <Routes>
              <Route path='/' element={<Home currentTab={currentTab} />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forget-password' element={<ForgetPassword />} />
              <Route path='/dashboard' element={<DashBoard />} />
              <Route path='/search/:searchId' element={<Search />} />
              <Route path='/video/:videoId' element={<Player />} />
              <Route path='/channel/:channelId' element={<Channel />} />
              <Route path='/trending/:trendingId' element={<Trending />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
