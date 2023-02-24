import React from 'react'
import { Box } from '@mui/system';
import { VideoCard, ChannelCard } from '../';

const Video = ({ videos, videoDirection }) => {
    if (!videos?.length) return "Loading...";
    console.log(videos)

    const video_mainContainer = {
        width: "100%",
        height: "100%",
        padding: "1%",
        display: "flex",
        flexDirection: {
            xs: "column",
            sm: videoDirection || "row"
        },
        flexWrap: {
            xs: "nowrap",
            sm: videoDirection ? "nowrap" : "wrap"
        }
    }

    const videoCardHolder = {
        width: {
            xs: "80vw",
            sm: videoDirection ? "100%" : "30vw"
        },
        minHeight: {
            sm: "20vw"
        },
        margin: {
            xs: "5px auto",
            sm: videoDirection ? "10px auto" : "1%"
        },
        cursor: "pointer"
    }


    return (
        <Box sx={video_mainContainer} >
            {
                videos.map((videoElement, indx) => (
                    <Box sx={videoCardHolder} key={`${videoElement?.type}_${indx}`}>
                        {videoElement?.type === "channel" && <ChannelCard channelCardInfo={videoElement} />}
                        {(videoElement?.type === "video" || videoElement?.videoId) && <VideoCard videoInfo={videoElement} />}
                    </Box>
                ))
            }
        </Box>
    )
}

export default Video