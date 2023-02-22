import React from 'react'
import { Link, useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material'

import "./ChannelCard.css"

const ChannelCard = ({ channelCardInfo, channelCardDirection, channelCardLogoSize }) => {

  const { channelId } = useParams();

  const { channelTitle } = channelCardInfo;

  const checkLogoImg = (url) => {
    if (url.toString().startsWith("http:")) {
      return `https:${url.toString().slice(5)}`;
    } else if (url.toString().startsWith("//")) {
      return `https:${url}`;
    } else {
      return url;
    }
  }

  console.log(channelCardInfo)

  const channelBoxContainer = {
    width: {
      xs: channelCardDirection ? "100%" : "50vw",
      sm: "100%"
    },
    height: {
      xs: channelCardDirection ? "100%" : "50vw",
      sm: "100%"
    },
    margin: channelCardDirection ? "0" : "0 auto",
    display: "flex",
    flexDirection: channelCardDirection || "column",
    alignItems: "center"
  }

  const channelLogoStyle = {
    width: channelCardLogoSize || "100%",
    height: channelCardLogoSize || "100%",
    borderRadius: "50%",
    margin: "0 auto",
  }

  const channelLink = {
    display: "flex",
    flexDirection: "column",
    width: (!channelCardLogoSize) && "65%",
    textDecoration: "none",
    color: "black",
  }

  const logoImgHolderLink = {
    ...channelLink,
    height: channelCardLogoSize ? "100%" : "65%",
    margin: channelCardDirection ? "0 10px 0 0" : "2%",
  }
  const channelLogoDetails = {
    ...channelLink,
    height: channelCardLogoSize ? "100%" : "35%",
    justifyContent: "center",
    alignItems: channelCardDirection ? "flex-start" : "center",
    marginTop: (!channelCardDirection) && "2%"
  }

  const setSubs = (subs) => {
    let subsLower = subs.toLowerCase();

    if (subsLower.endsWith("subscribers") || subsLower.endsWith("subscriber")) {
      return subs;
    } else {
      if (parseFloat(subs) > 1) {
        return `${channelCardInfo?.subscriberCount} subscribers`
      } else {
        return `${channelCardInfo?.subscriberCount} subscriber`
      }
    }
  }

  return (
    <Box className="channelBoxContainer" sx={channelBoxContainer}>
      <Link style={logoImgHolderLink} to={`/channel/${channelId}`}>
        <Box component="img" src={checkLogoImg(channelCardInfo?.thumbnail[0]?.url)} sx={channelLogoStyle} alt={channelTitle} />
      </Link>

      <Link style={channelLogoDetails} to={`/channel/${channelId}`}>

        <Typography component="h2" variant='h2' sx={{ fontSize: '1em' }}>
          {channelTitle || channelCardInfo?.title}
        </Typography>

        {channelCardInfo?.subscriberCount && <Typography component="p" variant='p' sx={{ fontSize: "0.8em" }}>

          {setSubs(channelCardInfo?.subscriberCount)}

        </Typography>}

      </Link>

    </Box >
  )
}

export default ChannelCard