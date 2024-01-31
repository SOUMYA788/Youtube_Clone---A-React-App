import React from 'react'
import { useFirebaseAuthContext } from '../../../Context/FirebaseContext'
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import { useAppContextData } from '../../../Context/AppContext';
import { AccountCircle } from '@mui/icons-material';
import TopNavUserProfileCard from './TopNavUserProfileCard';
import { updateAppData } from '../../../Reducers/AppReducer';

import { MdAccountCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toggleProfileCardState } from '../../../Store/Slices/topNavProfileCardSlice';
import CustomButton from '../CustomButton';

const TopNavUserProfileSection = () => {
    const { currentUser } = useFirebaseAuthContext()

    const dispatch = useDispatch()
    // const [{ showDashboard }, dispatch] = useAppContextData();

    if (!currentUser) return <Link className='no-underline text-slate-600 hover:text-black focus:text-black dark:text-slate-400 dark:hover:text-white dark:focus:text-white flex flex-row items-center justify-center outline-none transition-colors font-semibold' to="/signin">Signin</Link>

    return (
        <CustomButton className='relative w-9 h-9 outline-none border-none rounded-full text-slate-500 hover:text-red-500 focus:text-red-500 ' onClick={() => dispatch(toggleProfileCardState())}>
            <MdAccountCircle className='w-full h-full text-inherit cursor-pointer transition-colors' />
            <TopNavUserProfileCard />
        </CustomButton>
    )
}

export default TopNavUserProfileSection