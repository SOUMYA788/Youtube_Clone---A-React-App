import React from 'react'
import { Box } from '@mui/system';
import { VideoCard, ChannelCard } from '../../';

export const Video = ({ videos, videoDirection }) => {
    
    if (!videos?.length) return "Loading...";

    return (
        <div className="w-full h-full flex flex-row flex-wrap gap-1 p-1 sm:p-0" >
            {
                videos.map((videoElement, indx) => (
                    <div className={`w-full 300px:w-72 300px:min-h-52 my-2 mx-auto sm:mx-0 flex flex-col gap-1 px-2 p-4 300px:p-4 bg-slate-100 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-400 cursor-pointer rounded-lg`} key={`${videoElement?.type}_${indx}`} title={videoElement?.title}>
                        {videoElement?.type === "channel" && <ChannelCard channelCardInfo={videoElement} />}
                        {(videoElement?.type === "video" || videoElement?.videoId) && <VideoCard videoInfo={videoElement} />}
                    </div>
                ))
            }
        </div>
    )
}

