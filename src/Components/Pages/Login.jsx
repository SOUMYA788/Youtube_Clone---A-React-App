import { Lock } from "@mui/icons-material";
import { Avatar, Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { customTheme } from "../Layouts/MuiInput";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useFirebaseAuthContext } from "../../Context/FirebaseContext";

export const Login = () => {
    const { login } = useFirebaseAuthContext()

    const [loginInfo, setLoginInfo] = useState({
        userEmail: "",
        userPassword: "",
        loginError: ""
    })

    const [loginUILoading, setLoginUILoading] = useState(false)

    const outerTheme = useTheme();

    const navigate = useNavigate()

    // a function used to set an error for login problems...
    const setLoginError = (errorInfo) => {
        setLoginInfo({
            ...loginInfo,
            loginError: errorInfo
        })
    }

    // function responsible to submit login form
    const handleLogin = async (e) => {
        e.preventDefault();
        const { userEmail, userPassword } = loginInfo

        // trying to login
        try {
            setLoginUILoading(true)
            setLoginError("")
            await login(userEmail, userPassword)
            navigate("/")
        } catch (error) {
            setLoginError("Faild to create an account")
        }

        setLoginUILoading(false)
    }

    return (

        <Box sx={{ width: { xs: "100%", sm: "300px", }, padding: "5px", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            <Avatar sx={{ bgcolor: loginInfo.loginError !== "" ? "red" : "green" }}>
                <Lock />
            </Avatar>

            <Typography variant="p" component="p" sx={{ margin: "5px 0 0", fontSize: "1rem" }}>
                {loginInfo.loginError !== "" ? loginInfo.loginError : "Login"}
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>

                <ThemeProvider theme={customTheme(outerTheme, null, null, "red")}>
                    <TextField margin="normal" required fullWidth label="Email ID" type="email" id="userEmail" autoComplete="email" value={loginInfo.userEmail} onChange={(e) => {
                        setLoginInfo({
                            ...loginInfo,
                            userEmail: e.target.value
                        })
                    }} />
                    <TextField margin="normal" required fullWidth label="Password" type="password" id="userPassword" autoComplete="current-password" value={loginInfo.userPassword} onChange={(e) => {
                        setLoginInfo({
                            ...loginInfo,
                            userPassword: e.target.value
                        })
                    }} />

                </ThemeProvider>

                <Button disabled={loginUILoading} type="submit" fullWidth variant="contained" sx={{ backgroundColor: "rgb(230 0 0)", marginTop: "15px", marginBottom: "10px", ":hover": { backgroundColor: "rgb(255 0 0)" } }}>log in</Button>

                <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"5px", flexWrap:"wrap"}}>
                    <Link component={ReactLink} to="/forget-password" underline="hover" color="red">Forget password?</Link>

                    <Link component={ReactLink} to="/signin" underline="hover" color="red">Need an account? Sign In first</Link>
                </Box>

            </Box>
        </Box>
    )
}
