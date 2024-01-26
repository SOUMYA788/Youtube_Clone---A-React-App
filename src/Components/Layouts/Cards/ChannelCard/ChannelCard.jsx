import React from 'react'
import { Link, useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material'

import "./ChannelCard.css"

export const ChannelCard = ({ channelCardInfo, cardDirection, cardLogoStyle }) => {

  const { channelId } = useParams();

  const { channelTitle } = channelCardInfo;

  const checkLogoImg = (url) => {
    if (url?.toString()?.startsWith("http:")) {
      return `https:${url.toString().slice(5)}`;
    } else if (url?.toString()?.startsWith("//")) {
      return `https:${url}`;
    } else {
      return url;
    }
  }

  const channelLogoStyle = {
    width: cardLogoStyle || "100%",
    height: cardLogoStyle || "100%",
    borderRadius: "50%",
    margin: "0 auto",
  }

  const channelLink = {
    display: "flex",
    flexDirection: "column",
    width: (!cardLogoStyle) && "65%",
    textDecoration: "none",
    color: "black",
  }

  const logoImgHolderLink = {
    ...channelLink,
    height: cardLogoStyle ? "100%" : "65%",
    margin: cardDirection ? "0 10px 0 0" : "2%",
  }
  const channelLogoDetails = {
    ...channelLink,
    height: cardLogoStyle ? "100%" : "35%",
    justifyContent: "center",
    alignItems: cardDirection ? "flex-start" : "center",
    marginTop: (!cardDirection) && "2%"
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
    <div className={`flex w-full h-full flex-col items-center`}>

      <Link className={`w-full no-underline text-black`} to={`/channel/${channelId}`}>
        <img src={checkLogoImg(channelCardInfo?.thumbnail[0]?.url) || "/logo.svg"} className={` w-full h-full object-contain rounded-xl mx-auto bg-slate-300 dark:bg-slate-600 ${!channelCardInfo?.thumbnail[0]?.url ? "px-4" : ""}`} alt={channelTitle} />
      </Link>

      <Link className={`${cardLogoStyle ? "h-full" : "w-2/3 h-1/3"} no-underline text-black flex flex-col justify-center ${cardDirection ? "items-start" : "items-center mt-3"} channelLogoDetails`} to={`/channel/${channelId}`}>

        <h2 className='text-lg font-semibold text-black dark:text-slate-100 tracking-wide'>
          {channelTitle || channelCardInfo?.title}
        </h2>

        {channelCardInfo?.subscriberCount && <p className='text-sm text-slate-800 dark:text-slate-300'> {setSubs(channelCardInfo?.subscriberCount)}</p>}

      </Link>

    </div >
  )
}
