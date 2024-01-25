import React from 'react'
import { Box } from '@mui/system';
import { VideoCard, ChannelCard } from '../../';

export const Video = ({ videos }) => {
    
    if (!videos?.length) return "Loading...";

    const videoCardHolder = {
        width: {
            xs: "80vw",
            sm: layoutDirection ? "100%" : "30vw"
        },
        minHeight: {
            sm: "20vw"
        },
        margin: {
            xs: "5px auto",
            sm: layoutDirection ? "10px auto" : "1%"
        },
        cursor: "pointer"
    }


    return (
        <div className="w-full h-full p-1 flex flex-row flex-wrap" >
            {
                videos.map((videoElement, indx) => (
                    <Box sx={videoCardHolder} key={`${videoElement?.type}_${indx}`}>
                        {videoElement?.type === "channel" && <ChannelCard channelCardInfo={videoElement} />}
                        {(videoElement?.type === "video" || videoElement?.videoId) && <VideoCard videoInfo={videoElement} />}
                    </Box>
                ))
            }
        </div>
    )
}

