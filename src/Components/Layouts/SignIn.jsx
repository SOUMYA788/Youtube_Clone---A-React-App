import { Lock } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { MuiInputOutlined, customTheme, outerTheme } from "./MuiInput";
import { ThemeProvider, useTheme } from '@mui/material/styles';


export const SignIn = () => {

  const outerTheme = useTheme();

  const handleSignIn = (e) => {
    e.preventDefault();
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
        bgcolor: "red"
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
        SIGN IN
      </Typography>
      <Box component="form" onSubmit={handleSignIn} sx={{
        width: "100%"
      }}>

        <ThemeProvider theme={customTheme(outerTheme, null, null, "red")}>
          <TextField margin="normal" required fullWidth label="Email ID" type="email" id="userEmail" autoComplete="email" />
          <TextField margin="normal" required fullWidth label="Password" type="password" id="userPassword" autoComplete="current-password" />
          <TextField margin="normal" required fullWidth label="Re Enter Password" type="password" id="reCheckPassword" autoComplete="current-password" />
        </ThemeProvider>

        <Button type="submit" fullWidth variant="contained" sx={{
          backgroundColor: "rgb(230 0 0)",
          marginTop:"15px",
          ":hover":{
            backgroundColor:"rgb(255 0 0)"
          }
        }}>SIGN IN</Button>

      </Box>
    </Box>
  )
}
