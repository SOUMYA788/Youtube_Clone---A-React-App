import React from 'react'
import { Link, useParams } from "react-router-dom";

import "./ChannelCard.css"

export const ChannelCard = ({ channelCardInfo, cardDirection, cardLogoStyle, callingFrom }) => {

  const { channelId: paramChannelId } = useParams();

  const channelId = paramChannelId || channelCardInfo?.channelId // * channel id not found.

  const channelTitle = channelCardInfo?.channelTitle || channelCardInfo?.title; //* channel title not found, only title found



  const checkLogoImg = (thumbnailList) => {
    if (!thumbnailList && !(thumbnailList?.length > 0)) {
      if (callingFrom === "channel_page") return
      return "/logo.svg"
    }

    const url = thumbnailList[0]?.url;

    if (url?.toString()?.startsWith("http:")) {
      return `https:${url.toString().slice(0, 5)}`;
    } else if (url?.toString()?.startsWith("//")) {
      return `https:${url}`;
    } else {
      return url;
    }
  }

  const channelLogoSrc = checkLogoImg(channelCardInfo?.thumbnail || null);


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
    <div className={`flex ${cardDirection || 'flex-col'} items-center`}>

      <Link className={`no-underline text-black`} to={`/channel/${channelId}`}>
        <img src={channelLogoSrc} className={`${cardLogoStyle || 'w-52 h-52 rounded-xl'} object-contain mx-auto bg-transparent ${!channelCardInfo?.thumbnail ? "px-4" : ""}`} alt={channelTitle} />

        {/* {
          channelCardInfo?.thumbnail?.length > 0 ? <img src={channelLogoSrc} className={`${cardLogoStyle || 'w-52 h-52 rounded-xl'} object-contain mx-auto bg-transparent`} alt={channelTitle} /> : <img src='/logo.svg' className={`${cardLogoStyle || 'w-52 h-52 rounded-xl'} object-contain mx-auto bg-transparent px-4`} alt={channelTitle} />
        } */}
      </Link>

      <Link className={`${false || "h-full flex-1"} no-underline text-black flex flex-col justify-center ${cardDirection ? "items-start" : "items-center mt-3"} channelLogoDetails`} to={`/channel/${channelId}`}>

        <h2 className='w-full text-lg font-semibold text-black dark:text-slate-100 tracking-wide'>
          {channelTitle}
        </h2>

        {channelCardInfo?.subscriberCount && <p className='w-full text-sm text-slate-800 dark:text-slate-300'> {setSubs(channelCardInfo?.subscriberCount)}</p>}

      </Link>

    </div>
  )
}
