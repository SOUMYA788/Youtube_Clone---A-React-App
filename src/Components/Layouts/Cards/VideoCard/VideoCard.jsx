import React from 'react'
import { Link } from 'react-router-dom'
import "./VideoCard.css"
import { BiLogoYoutube } from 'react-icons/bi'


export const VideoCard = ({ videoInfo }) => {
  return (
    <>

      <Link className=' w-full no-underline text-black' to={`/video/${videoInfo?.videoId}`}>
        <img src={videoInfo?.thumbnail[0]?.url || "/logo.svg"} alt={videoInfo.title} className={`w-full h-full object-contain rounded-xl mx-auto bg-slate-300 dark:bg-slate-600 ${!videoInfo?.thumbnail[0]?.url ? "px-4" : ""}`} />
      </Link>


      <Link className='text-lg font-semibold no-underline text-black dark:text-slate-100 tracking-wide my-1 px-2' to={`/video/${videoInfo.videoId}`}>
        {videoInfo.title.length > 30 ? `${videoInfo.title.slice(0, 30)}...` : videoInfo.title}
      </Link>


      <Link className='no-underline text-slate-800 dark:text-slate-300 flex flex-row items-center gap-3 px-2' to={`/channel/${videoInfo.channelId}`}>

        {
          (videoInfo?.channelThumbnail[0]?.url || videoInfo?.authorThumbnail[0]?.url) ? <img src={videoInfo?.channelThumbnail[0]?.url || videoInfo?.authorThumbnail[0]?.url} alt={videoInfo.title} className='w-7 h-7 rounded-full' /> : <BiLogoYoutube className='w-7 h-7 rounded-full'/>
        }

        <div className='text-xs'>
          <p>
            {videoInfo?.channelTitle}
          </p>

          <p className='mt-1'>
            {parseInt(videoInfo?.viewCount).toLocaleString()} Views • {videoInfo?.publishedText || videoInfo?.publishedTimeText}
          </p>
        </div>
      </Link>

    </>
  )
}
