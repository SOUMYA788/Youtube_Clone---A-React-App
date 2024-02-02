import React, { useState } from 'react'
import { useFirebaseAuthContext } from '../../../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import { updateAppData } from '../../../Reducers/AppReducer';

import CustomButton from '../CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../Services/auth';
import { showErrorToast, showSuccessToast } from '../../../utils/toastMethods';
import { removeCurrentUser } from '../../../Store/Slices/authSlice';



const TopNavUserProfileCard = () => {
    const { deleteUserId } = useFirebaseAuthContext();
    const [logoutProcessing, setLogoutProcessing] = useState(false)
    const currentUser = useSelector(state => state?.authState?.value)
    const topNavProfileCardState = useSelector(state => state?.topNavProfileState?.value);

    const dispatch = useDispatch();
    // jokhon delete function banabo, tokhon kaaje lagbe...
    // const [{ showDashboard, accountDeleteProcessing }, dispatch] = useAppContextData();


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            setLogoutProcessing(true);
            const { success, message } = await logOut()
            if (success) {
                showSuccessToast(message)
                dispatch(removeCurrentUser())
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            showErrorToast("faild to logout")
        } finally {
            setLogoutProcessing(false);
        }
    }


    // jokhon delete function banabo, tokhon kaaje lagbe...
    const handleUserDelete = async (e) => {
        e.preventDefault();
        try {
            updateAppData(dispatch, "setAccountDeleteError", "accountDeleteError", null)
            updateAppData(dispatch, "setAccountDeleteProcessing", "accountDeleteProcessing", true)
            if (currentUser) {
                await deleteUserId(currentUser?.currentUser);
            } else {
                throw new Error("faild to delete account");
            }
        } catch (error) {
            updateAppData(dispatch, "setAccountDeleteError", "accountDeleteError", "faild to delete your account")
        } finally {
            updateAppData(dispatch, "setAccountDeleteProcessing", "accountDeleteProcessing", false)
        }
    }

    return (

        <div className={`w-44 p-3 bg-white dark:bg-slate-600 ring-2 ring-slate-500 absolute top-10 right-0 ${topNavProfileCardState ? "block" : "hidden"} z-[101] transition-all rounded-md shadow-sm`}>

            <h2 className='text-base uppercase text-center text-slate-800 dark:text-slate-100 font-semibold tracking-wider'>
                profile
            </h2>

            {/* Horizontal Line */}
            <div className='w-full h-0.5 bg-slate-500 mt-2 mb-4' />

            <p className='w-full text-sm my-2 text-black dark:text-slate-300 text-left'> {currentUser?.email}</p>

            <Link to="/dashboard" className='w-full block outline-none border-none my-2 text-sm text-slate-800 focus:text-black hover:text-black focus:underline underline-offset-2 dark:text-slate-300 dark:focus:text-white dark:hover:text-white transition-colors text-left'> dashboard </Link>

            {/* SETUP LOGOUT deleteUser */}
            <CustomButton className='w-full text-center text-white font-semibold capitalize rounded-md bg-red-500 my-1.5 py-1 text-sm outline-none border-2 border-transparent hover:border-slate-400 focus:border-slate-400 dark:focus:border-slate-300 dark:hover:border-slate-300 disabled:opacity-60 disabled:hover:border-transparent' disabled={logoutProcessing} onClick={handleLogout}> Log Out </CustomButton>

        </div>
    )
}

export default TopNavUserProfileCard