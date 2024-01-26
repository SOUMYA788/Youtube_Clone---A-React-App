import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Box } from '@mui/material';
import { useAppContextData } from './Context/AppContext';
import { updateAppData } from './Reducers/AppReducer';

import { TopNav, Home, Search, Channel, Player, Trending, CollapsSideNav, SideNav, SignIn, DashBoard, Alert, Login, ForgetPassword } from './Components';

import { SIDE_NAV_MAIN_LINKS, SIDE_NAV_USER_LINKS, VIDEO_CATEGORY_LINKS } from './constants';

import "./App.css";
import { Bounce, ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css"



function App() {
  const [theme, setTheme] = useState("light")
  const [{ showSideNav, showDashboard, accountDeleteError, logOutError }, dispatch] = useAppContextData();

  const handleNavBtn = () => {
    if (showSideNav) { updateAppData(dispatch, "setShowSideNav", "showSideNav", false) }
    if (showDashboard) { updateAppData(dispatch, "setShowDashboard", "showDashboard", false) }
  }

  useEffect(() => {
    if (accountDeleteError || logOutError) {
      updateAppData(dispatch, "setShowAlert", "showAlert", true);
    }
  }, [accountDeleteError, logOutError, dispatch])


  return (
    <Router>
      <div className={`w-full p-1 max-h-screen relative flex flex-col ${theme}`} onClick={handleNavBtn} >

        <div className='dark:bg-slate-800 dark:text-slate-400'>
          <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme={theme} transition={Bounce} />

          <TopNav theme={theme} setTheme={setTheme} />

          <div className={`w-full h-full flex-1 relative`}>

            <div className="w-full h-full flex-1 scroll-smooth flex flex-row">
              <SideNav sideNavData={[...SIDE_NAV_MAIN_LINKS, ...SIDE_NAV_USER_LINKS]} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
                <Route path='/dashboard' element={<DashBoard />} />
                <Route path='/search/:searchId' element={<Search />} />
                <Route path='/video/:videoId' element={<Player />} />
                <Route path='/channel/:channelId' element={<Channel />} />
                <Route path='/trending/:trendingId' element={<Trending />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
