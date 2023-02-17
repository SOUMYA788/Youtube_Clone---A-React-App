import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Box } from '@mui/material';

import { HomeOutlined, HomeRounded, SubscriptionsOutlined, Subscriptions, VideoLibraryOutlined, VideoLibrary, Restore, RestoreOutlined, SlideshowRounded, AccessTimeOutlined, AccountCircleRounded, WhatshotOutlined, WhatshotRounded, MusicNote, MusicNoteOutlined, } from '@mui/icons-material';

import { CreatorStudioIcon, FashionAndBuityIcon, FashionAndBuityIcon_Active, FeedbackIcon, GamingIcon, GamingIcon_Active, HelpIcon, HotspotIcon, HotspotIcon_Active, LearningIcon, LearningIcon_Active, MoviesIcon, MoviesIcon_Active, NewsIcon, NewsIcon_Active, ReportFlagIcon, SettingsIcon, ShortsIcon, ShortsIcon_Active, SportsIcon, SportsIcon_Active, YoutubeIcon, YoutubeKidsIcon, YoutubeMusicIcon, YoutubeTvIcon, } from './Assets/Icons';

import { TopNav, Home, Search, Channel, Player, Trending, CollapsSideNav, SideNav } from './Components';

import "./App.css";

function App() {

  const [currentTab, setCurrentTab] = useState("home")

  const appContentContainerDivStyle = {
    height: "calc(100vh - 50px)",
    width: "100%",
    display: "flex",
    flexDirection: "row",
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

  return (
    <Router>
      <div id="app_mainContainerDiv">
        <Box sx={{
          height: "50px",
          width: "100%",
        }}>
          <TopNav />
        </Box>

        <Box sx={appContentContainerDivStyle}>
          <CollapsSideNav collapsNavData={navData.collapsNavData.explore} currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <Box className="scrollDiv" sx={routerContainerDivStyle}>
            <SideNav sideNavData={navData.sideNavData}  />
            <Routes>
              <Route path='/' element={<Home currentTab = {currentTab}/>} />
              <Route path='/search/:searchId' element={<Search />} />
              <Route path='/video/:videoId' element={<Player />} />
              <Route path='/channel/:channelId' element={<Channel />} />
              <Route path='/trending/:trendingId' element={<Trending />} />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
}

export default App;
