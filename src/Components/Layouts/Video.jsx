import React from 'react'

import { VideoCard, ChannelCard, VideoCardWrapper } from './';


export const Video = ({ videos, videoDirection, callingFrom }) => {

    if (!videos?.length > 0) return <div className={`w-full h-full flex flex-wrap gap-3 p-1 `}>
        {["loading_video_item_1", "loading_video_item_2", "loading_video_item_3", "loading_video_item_4", "loading_video_item_5", "loading_video_item_6"].map((value) => (
            <VideoCardWrapper className='w-full' key={value} callingFrom={callingFrom}>
                <VideoCard className="w-full"/>
            </VideoCardWrapper>
        ))}
    </div>


    return (
        <div className={`w-full h-full flex flex-wrap gap-3 md:gap-7 p-1 `}>
            {videos.map((videoElement, indx) => {
                if (videoElement?.type === "video") {
                    return <VideoCardWrapper key={`${videoElement?.type}_${indx}`} title={videoElement?.title} className="cursor-pointer" callingFrom={callingFrom}>
                        <VideoCard videoInfo={videoElement} />
                    </VideoCardWrapper>
                } else {
                    return <VideoCardWrapper key={`${videoElement?.type}_${indx}`} title={videoElement?.title} className="w-fit h-fit p-2 cursor-pointer">
                        <ChannelCard channelCardInfo={videoElement} />
                    </VideoCardWrapper>
                }
            })}
        </div >
    )
}