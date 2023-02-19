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

  const channelBoxContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: channelCardDirection || "column",
    alignItems: "center"
  }

  const channelLogoStyle = {
    width: channelCardLogoSize || "50%",
    height: channelCardLogoSize || "50%",
    borderRadius: "50%",
    margin: "0 auto"
  }

  // console.log(channelCardInfo)

  return (
    <Box sx={channelBoxContainer}>
      <Link style={{ margin: "10px" }} className='channelCardLinks' to={`/channel/${channelId}`}>
        <Box component="img" src={checkLogoImg(channelCardInfo?.thumbnail[0]?.url)} sx={channelLogoStyle} alt={channelTitle} />
      </Link>

      <Link style={{ marginBottom: channelCardDirection ? "0" : "10px" }} className='channelCardLinks' to={`/channel/${channelId}`}>
        <Typography component="h2" variant='h2' sx={{ fontSize: '0.8em' }}>
          {channelTitle || channelCardInfo?.title}
        </Typography>
        {channelCardInfo?.subscriberCount && <Typography component="p" variant='p'>{channelCardInfo?.subscriberCount} Subscribers</Typography>}
      </Link>
    </Box>
  )
}

export default ChannelCard