import React from 'react'
import { VideoCard, ChannelCard } from '../../';

const VideoCardWrapper = ({ children, className, ...props }) => {
    return <div className={`w-full 300px:w-72 sm:w-80 my-1 mx-auto sm:mx-0 flex flex-col gap-1 p-2 bg-slate-100 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-400 rounded-lg ${className}`} {...props}>
        {children}
    </div>
}


export const Video = ({ videos, videoDirection }) => {

    return (
        <div className={`w-full h-full flex ${videoDirection || "flex-col 300px:flex-row flex-wrap"} 300px:gap-3 p-1 sm:p-0`}>
            {
                (!videos?.length > 0) ? (
                    ["loading_video_item_1", "loading_video_item_2", "loading_video_item_3", "loading_video_item_4", "loading_video_item_5", "loading_video_item_6"].map((value) => (
                        <VideoCardWrapper className="h-fit" key={value}>
                            <VideoCard />
                        </VideoCardWrapper>
                    ))
                ) : (
                    videos.map((videoElement, indx) => (
                        <VideoCardWrapper key={`${videoElement?.type}_${indx}`} title={videoElement?.title} className="h-80 cursor-pointer">
                            {videoElement?.type === "channel" && <ChannelCard channelCardInfo={videoElement} />}
                            {(videoElement?.type === "video" || videoElement?.videoId) && <VideoCard videoInfo={videoElement} />}
                        </VideoCardWrapper>
                    ))
                )
            }
        </div>
    )
}

