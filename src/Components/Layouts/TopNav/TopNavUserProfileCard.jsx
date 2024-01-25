import { AccountCircle, LockResetRounded, Logout } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import { useFirebaseAuthContext } from '../../../Context/FirebaseContext';
import { Link as ReactLink } from 'react-router-dom';
import { useAppContextData } from '../../../Context/AppContext';
import { updateAppData } from '../../../Reducers/AppReducer';


const TopNavUserProfileCard = () => {
    const { currentUser, logOut, deleteUserId } = useFirebaseAuthContext();

    const [{ showDashboard, accountDeleteProcessing }, dispatch] = useAppContextData();

    const handleLogout = async () => {
        try {
            updateAppData(dispatch, "setLogoutProcessing", "logoutProcessing", true)
            updateAppData(dispatch, "setLogOutError", "logOutError", null)
            await logOut()
        } catch (error) {
            updateAppData(dispatch, "setLogOutError", "logOutError", "faild to logout")
        } finally {
            updateAppData(dispatch, "setLogoutProcessing", "logoutProcessing", false)
        }
    }

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

        <Box sx={{ background: "white", position: "absolute", top: "20px", right: "0px", width: "170px", padding: "10px", display: `${showDashboard ? "flex" : "none"}`, flexDirection: "column", gap: "10px", zIndex: "101", transition: "2s ease", borderRadius: "5px", boxShadow: "-3px 3px 10px 1px rgba(0, 0, 0,0.2)" }}>

            <Typography component="h2" variant='h2' sx={{ fontSize: "0.8rem", textTransform: "uppercase", textAlign: "center", letterSpacing: "5px" }}> profile </Typography>

            {/* Horizontal Line */}
            <Box sx={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.5)", margin: "5px 0" }} />

            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                <AccountCircle sx={{ width: "20px", height: "20px", color: "black" }} />
                <Typography component="p" variant='p' sx={{ fontSize: "0.8rem" }}>
                    {currentUser?.email?.split("@")[0]}
                </Typography>
            </Box>

            <Link component={ReactLink} underline="none" variant='body1' color="black" to="/dashboard" sx={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                <LockResetRounded sx={{ width: "20px", height: "20px", color: "black" }} />
                <Typography component="p" variant='p' sx={{ fontSize: "0.8rem" }}>
                    Change Password
                </Typography>
            </Link>

            {/* SETUP LOGOUT deleteUser */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={handleLogout}>
                <Logout sx={{ width: "20px", height: "20px", color: "black" }} />
                <Typography component="p" variant='p' sx={{ padding: "3px 1px", fontSize: "0.8rem" }}>
                    Log Out
                </Typography>
            </Box>

            <Button fullWidth disabled={accountDeleteProcessing} type="button" variant="contained" sx={{ backgroundColor: "rgb(230 0 0)", fontSize: "12px", ":hover": { backgroundColor: "rgb(255 0 0)" } }} onClick={handleUserDelete}> DELETE ACCOUNT </Button>

        </Box>
    )
}

export default TopNavUserProfileCard