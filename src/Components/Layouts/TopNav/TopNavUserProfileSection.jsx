import React from 'react'
import { useFirebaseAuthContext } from '../../../Context/FirebaseContext'
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import { useAppContextData } from '../../../Context/AppContext';
import { AccountCircle } from '@mui/icons-material';
import TopNavUserProfileCard from './TopNavUserProfileCard';
import { updateAppData } from '../../../Reducers/AppReducer';

const TopNavUserProfileSection = () => {
    const { currentUser } = useFirebaseAuthContext()
    const [{ showDashboard }, dispatch] = useAppContextData();

    if (!currentUser) return <Link className='no-underline text-slate-600 hover:text-black focus:text-black dark:text-slate-400 dark:hover:text-white dark:focus:text-white flex flex-row items-center justify-center outline-none transition-colors font-semibold' to="/signin">Signin</Link>

    return (
        <Box onClick={() => updateAppData(dispatch, "setShowDashboard", "showDashboard", !showDashboard)} sx={{ margin: "0 10px", position: "relative" }}>
            <AccountCircle sx={{ cursor: "pointer", width: "30px", height: "30px", color: "red" }} />

            <TopNavUserProfileCard />
        </Box>
    )
}

export default TopNavUserProfileSection