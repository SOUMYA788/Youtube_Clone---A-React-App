import React from 'react'
import { Box } from '@mui/system';
import {VideoCard, ChannelCard} from '../';


const Video = ({ videos, videoDirection, videoWidth, videoHeight }) => {
    if (!videos?.length) return "Loading...";
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: videoDirection || "row",
            flexWrap:"wrap"
        }}>
            {
                videos.map((videoElement, indx) => (
                    <Box sx={{
                        width: videoWidth || "320px",
                        height: videoHeight || "350px",
                        margin:"5px"
                    }} key={`${videoElement?.type}_${indx}`}>

                        {videoElement?.type === "channel" && <ChannelCard channelInfo={videoElement} />}

                        {videoElement?.type === "video" && <VideoCard videoInfo={videoElement} />}

                    </Box>
                ))
            }
        </Box>
    )
}

export default Video