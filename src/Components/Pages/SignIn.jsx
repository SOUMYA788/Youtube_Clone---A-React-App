import { Lock } from "@mui/icons-material";
import { Avatar, Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { customTheme } from "../Layouts/MuiInput";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useFirebaseAuthContext } from "../../Context/FirebaseContext";

export const SignIn = () => {
  const { signUp } = useFirebaseAuthContext()

  const [signinInfo, setSigninInfo] = useState({
    userEmail: "",
    userPassword: "",
    reCheckUserPassword: "",
    signInError: ""
  })

  const [signInUILoading, setSignInUILoading] = useState(false)

  const outerTheme = useTheme();

  // a function used to set an error for sign in problems...
  const setSignInError = (errorInfo) => {
    setSigninInfo({
      ...signinInfo,
      signInError: errorInfo
    })
  }

  // function responsible to submit sign in form and create a new user...
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { userEmail, userPassword, reCheckUserPassword } = signinInfo

    // Checkout for same password
    if (userPassword !== reCheckUserPassword) {
      setSignInError("checkout all credentials")
    }

    // trying to signup
    try {
      setSignInUILoading(true)
      setSignInError("")
      await signUp(userEmail, userPassword)
    } catch (error) {
      setSignInError("Faild to create an account")
      console.log(error)
    }

    setSignInUILoading(false)
  }

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "300px",
        },
        padding: "5px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Avatar sx={{
        bgcolor: signinInfo.signInError !== "" ? "red" : "green"
      }}>
        <Lock />
      </Avatar>
      <Typography
        variant="p"
        component="p"
        sx={{
          margin: "5px 0 0",
          fontSize: "1rem"
        }}>
        {signinInfo.signInError !== "" ? signinInfo.signInError : "SIGN IN"}
      </Typography>

      <Box component="form" onSubmit={handleSignIn} sx={{
        width: "100%"
      }}>

        <ThemeProvider theme={customTheme(outerTheme, null, null, "red")}>
          <TextField margin="normal" required fullWidth label="Email ID" type="email" id="userEmail" autoComplete="email" value={signinInfo.userEmail} onChange={(e) => {
            setSigninInfo({
              ...signinInfo,
              userEmail: e.target.value
            })
          }} />
          <TextField margin="normal" required fullWidth label="Password" type="password" id="userPassword" autoComplete="current-password" value={signinInfo.userPassword} onChange={(e) => {
            setSigninInfo({
              ...signinInfo,
              userPassword: e.target.value
            })
          }} />
          <TextField margin="normal" required fullWidth label="Re Enter Password" type="password" id="reCheckPassword" autoComplete="current-password" value={signinInfo.reCheckUserPassword} onChange={(e) => {
            setSigninInfo({
              ...signinInfo,
              reCheckUserPassword: e.target.value
            })
          }} />
        </ThemeProvider>

        <Button disabled={signInUILoading} type="submit" fullWidth variant="contained" sx={{backgroundColor: "rgb(230 0 0)", marginTop: "15px", marginBottom:"10px", ":hover": { backgroundColor: "rgb(255 0 0)" }}}>SIGN IN</Button>

          <Link component={ReactLink} to="/login" underline="hover" color="red" sx={{display:"block", textAlign:"right"}}>Already have an account? Login</Link>

      </Box>
    </Box>
  )
}
