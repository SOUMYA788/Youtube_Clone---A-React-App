import React from 'react'
import "./VideoCard.css"
import LinkWrapper from '../../Wrapper/LinkWrapper'

export const VideoCard = ({ videoInfo }) => {

  const allPossibleThumbnails = {
    channelThumbnail: videoInfo?.channelThumbnail?.length > 0 && videoInfo.channelThumbnail[0].url,
    authorThumbnail: videoInfo?.authorThumbnail?.length > 0 && videoInfo.authorThumbnail[0].url,
    videoThumbnail: videoInfo?.thumbnail?.length > 0 && videoInfo?.thumbnail[0]?.url,
    defaultLogo: "/logo.svg"
  }

  const channelThumbnail = allPossibleThumbnails.channelThumbnail || allPossibleThumbnails.authorThumbnail || allPossibleThumbnails.defaultLogo;

  const videoThumbnail = allPossibleThumbnails.videoThumbnail || allPossibleThumbnails.defaultLogo;


  return (
    <>

      <LinkWrapper linkTo={videoInfo?.videoId ? `/video/${videoInfo.videoId}` : null} className=' w-full text-black outline-none border-2 border-transparent focus:border-slate-800 dark:focus:border-slate-200 rounded-xl overflow-hidden'>
        <img src={videoThumbnail} alt={videoInfo?.title} className={`w-full h-full object-contain rounded-xl mx-auto bg-slate-300 dark:bg-slate-600 ${!videoInfo?.thumbnail[0]?.url ? "px-4 animate-pulse flex-1" : "h-full"}`} />
      </LinkWrapper>

      <LinkWrapper linkTo={videoInfo?.videoId ? `/video/${videoInfo.videoId}` : null} className={`text-sm font-semibold ${videoInfo?.title ? "text-slate-600 dark:text-slate-300 outline-none border-none focus:text-black dark:focus:text-white" : "h-3 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse"} tracking-wide my-1 px-1 transition-colors`}>
        {videoInfo?.title?.length > 25 ? `${videoInfo.title.slice(0, 55)}...` : (videoInfo?.title || "")}
      </LinkWrapper>

      <LinkWrapper linkTo={videoInfo?.channelId ? `/channel/${videoInfo.channelId}` : null} className={`flex flex-row items-center justify-center gap-2 px-1 ${videoInfo?.channelId ? "sm:flex-1 outline-none border-none text-slate-600 dark:text-slate-300 focus:text-black dark:focus:text-white" : "bg-slate-200 dark:bg-slate-700"} mt-2`}>

        <img src={channelThumbnail} alt={videoInfo?.title} className='w-10 h-10 rounded-full' /> 
        
        <div className='w-full text-xs p-2 rounded-md'>

          <p className={`${videoInfo?.channelTitle ? "w-full" : "w-full h-3 bg-slate-300 dark:bg-slate-800 rounded-full animate-pulse"}`}>
            {(videoInfo?.channelTitle) || ""}
          </p>

          <p className={`mt-2 ${videoInfo?.channelId ? "" : "w-full h-3 bg-slate-300 dark:bg-slate-800 rounded-full animate-pulse"}`}>
            {
              (videoInfo?.viewCount || videoInfo?.publishedText || videoInfo?.publishedTimeText) ? <> {parseInt(videoInfo?.viewCount).toLocaleString()} Views • {videoInfo?.publishedText || videoInfo?.publishedTimeText} </> : ""
            }
          </p>

        </div>
        
      </LinkWrapper>

    </>
  )
}
