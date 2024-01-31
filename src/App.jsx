import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Box } from '@mui/material';
import { useAppContextData } from './Context/AppContext';
import { updateAppData } from './Reducers/AppReducer';

import { TopNav, Home, Search, Channel, Player, Trending, CollapsSideNav, SideNav, SignIn, Alert, Login, ForgetPassword } from './Components';

import { DashBoard } from './Components/Pages';

import { SIDE_NAV_MAIN_LINKS, SIDE_NAV_USER_LINKS, VIDEO_CATEGORY_LINKS } from './constants';

import "./App.css";
import { Bounce, ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from 'react-redux';
import { hideSideNav } from './Store/Slices/sideNavSlice';
import { removeProfileCard } from './Store/Slices/topNavProfileCardSlice';
import DashboardCommonPage from './Components/Pages/Dashboard/DashboardCommonPage';



function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  const navStatus = useSelector(state => state.sideNavReducer.value);
  const topNavProfileCard = useSelector(state => state.topNavProfileState.value);


  const dispatch = useDispatch()

  const [{ showSideNav, showDashboard, accountDeleteError, logOutError }, _] = useAppContextData();

  /**
   * close all windows e.g. side navigation or top navigation profile card etc...
   */
  const closeAllWindows = () => {
    if (navStatus) { dispatch(hideSideNav()) }
    if (topNavProfileCard) { dispatch(removeProfileCard()) }
  }

  useEffect(() => {
    localStorage.setItem("theme", (theme || "light"));
  }, [theme])


  useEffect(() => {
    if (accountDeleteError || logOutError) {
      updateAppData(dispatch, "setShowAlert", "showAlert", true);
    }
  }, [accountDeleteError, logOutError, dispatch])


  return (
    <Router>
      {/* onClick={handleNavBtn} */}
      <div className={`w-ful relative flex flex-col ${theme}`}  >

        <div className='w-full h-dvh dark:bg-slate-800 dark:text-slate-400 relative flex flex-col' onClick={closeAllWindows}>

          <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme={theme} transition={Bounce} />

          <TopNav theme={theme} setTheme={setTheme} />

          <div className="w-full flex-1 overflow-x-hidden overflow-y-scroll scroll-smooth p-2">
            <SideNav sideNavData={[...SIDE_NAV_MAIN_LINKS, ...SIDE_NAV_USER_LINKS]} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forget-password' element={<ForgetPassword />} />
              <Route path='/dashboard' element={<DashBoard />} />
              {/* watchlist, upload, playlist, history */}
              <Route path='/dashboard/:dashboardLink' element={<DashboardCommonPage />} /> 
              {/* channel */}
              <Route path='/dashboard/:channel' element={<DashboardCommonPage />} /> 
              <Route path='/search/:searchId' element={<Search />} />
              <Route path='/video/:videoId' element={<Player />} />
              <Route path='/channel/:channelId' element={<Channel />} />
              <Route path='/trending/:trendingId' element={<Trending />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
