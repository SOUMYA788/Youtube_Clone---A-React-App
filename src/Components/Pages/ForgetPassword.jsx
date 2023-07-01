import { Lock } from "@mui/icons-material";
import { Avatar, Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as ReactLink  } from "react-router-dom";
import { customTheme } from "../Layouts/MuiInput";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useFirebaseAuthContext } from "../../Context/FirebaseContext";

export const ForgetPassword = () => {
    const { resetPasswordWithEmail } = useFirebaseAuthContext()

    const [resetEmail, setResetEmail] = useState("")
    const [resetError, setResetError] = useState(null)
    const [resetGuide, setResetGuide] = useState(null);
    const [resetProcess, setResetProcess] = useState(false)

    const outerTheme = useTheme();

    // function responsible reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        // trying to login
        try {
            setResetGuide("")
            setResetProcess(true)
            setResetError("")
            await resetPasswordWithEmail(resetEmail)
            setResetGuide("Password reset link send to your inbox")
        } catch (error) {
            setResetError("Faild to reset password")
        }
        setResetProcess(false)
    }

    return (

        <Box sx={{ width: { xs: "100%", sm: "300px", }, padding: "5px", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position:"relative" }}>

            <Avatar sx={{ bgcolor: resetError ? "red" : "green" }}>
                <Lock />
            </Avatar>

            <Typography variant="p" component="p" sx={{ margin: "5px 0 0", fontSize: "1rem" }}>
                {resetError || resetGuide || "Reset Password"}
            </Typography>

            <Box component="form" onSubmit={handleResetPassword} sx={{ width: "100%" }}>

                <ThemeProvider theme={customTheme(outerTheme, null, null, "red")}>

                    <TextField margin="normal" required fullWidth label="Email ID" type="email" id="userEmail" autoComplete="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                    
                </ThemeProvider>

                <Button disabled={resetProcess} type="submit" fullWidth variant="contained" sx={{ backgroundColor: "rgb(230 0 0)", marginTop: "15px", marginBottom: "10px", ":hover": { backgroundColor: "rgb(255 0 0)" } }}>reset password</Button>

                <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"5px", flexWrap:"wrap"}}>

                    <Link component={ReactLink} to="/login" underline="hover" color="red">Login</Link>

                    <Link component={ReactLink} to="/signin" underline="hover" color="red">Need an account? Sign In first</Link>

                </Box>

            </Box>

        </Box>
    )
}
