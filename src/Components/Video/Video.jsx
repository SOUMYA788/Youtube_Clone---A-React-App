import React from 'react'
import { Box } from '@mui/system';
import { VideoCard, ChannelCard } from '../';

const Video = ({ videos, videoDirection, videoHeight }) => {
    if (!videos?.length) return "Loading...";
    console.log(videos)
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: {
                xs: videoDirection ? "row" : "column",
                md: videoDirection || "row"
            },
        }} flexWrap={{ xs: videoDirection ? "wrap" : "nowrap", md: videoDirection ? "nowrap" : "wrap" }}>
            {
                videos.map((videoElement, indx) => (
                    <Box height={videoHeight || "215px"} sx={{
                        width: "240px",
                        margin: { xs: "5px auto", md: videoDirection ? "5px auto" : "5px" },
                        cursor: "pointer"
                    }} key={`${videoElement?.type}_${indx}`}>

                        {videoElement?.type === "channel" && <ChannelCard channelCardInfo={videoElement} />}

                        {videoElement?.type === "video" && <VideoCard videoInfo={videoElement} />}

                    </Box>
                ))
            }
        </Box>
    )
}

export default Video