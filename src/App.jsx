import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, } from 'react-router-dom';

import { useAppContextData } from './Context/AppContext';
import { updateAppData } from './Reducers/AppReducer';

import { TopNav, SideNav } from './Components/Layouts';

import { Home, SignUp, Channel, CreateChannel, DashBoard, Login, ForgetPassword, Search, Trending, Player, Offline } from './Components/Pages';

import { ONLINE_STATUS, SIDE_NAV_MAIN_LINKS, SIDE_NAV_USER_LINKS, VIDEO_CATEGORY_LINKS } from './constants';

import "./App.css";
import { Bounce, ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from 'react-redux';
import { hideSideNav } from './Store/Slices/sideNavSlice';
import { removeProfileCard } from './Store/Slices/topNavProfileCardSlice';
import DashboardCommonPage from './Components/Pages/Dashboard/DashboardCommonPage';
import { getCurrentUser } from './Services/auth';


const PrivateRoute = () => {
  const currentUser = getCurrentUser()
  return (currentUser ? <Outlet /> : <Navigate to={"/login"} replace={true} />)
}



function App() {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  const navStatus = useSelector(state => state.sideNavReducer.value);
  const topNavProfileCard = useSelector(state => state.topNavProfileState.value);

  const dispatch = useDispatch()

  const [{ accountDeleteError, logOutError }, _] = useAppContextData();

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
  }, [accountDeleteError, logOutError, ONLINE_STATUS, dispatch])


  return (
    <Router>

      <div className={`w-ful relative flex flex-col ${theme}`}  >

        <div className='w-full h-dvh dark:bg-slate-800 dark:text-slate-400 relative flex flex-col' onClick={closeAllWindows}>

          <ToastContainer position='bottom-center' autoClose={1000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme={theme} transition={Bounce} />

          <TopNav theme={theme} setTheme={setTheme} />

          {
            !ONLINE_STATUS && <Offline />
          }

          {
            ONLINE_STATUS && <div className="w-full flex-1 overflow-x-hidden overflow-y-scroll scroll-smooth p-2">
              <SideNav sideNavData={[...SIDE_NAV_MAIN_LINKS, ...SIDE_NAV_USER_LINKS]} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forget-password' element={<ForgetPassword />} />

                <Route element={<PrivateRoute />} >
                  <Route path='/dashboard' element={<DashBoard />} />
                  <Route path='/dashboard/:dashboardLink' element={<DashboardCommonPage />} />
                  <Route path='/dashboard/create-channel' element={<CreateChannel />} />
                </Route>

                <Route path='/search/:searchId' element={<Search />} />
                <Route path='/video/:videoId' element={<Player />} />
                <Route path='/channel/:channelId' element={<Channel />} />
                <Route path='/trending/:trendingId' element={<Trending />} />
                <Route path='/*' element={<h2>SORRY! Page Not Found</h2>} />
              </Routes>
            </div>
          }
        </div>
      </div>
    </Router>
  );
}

export default App;
