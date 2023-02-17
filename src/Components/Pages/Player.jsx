import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useParams, } from 'react-router-dom'
import { YoutubeAPI } from '../../Assets/YoutubeAPI';

const Player = () => {

    const [playerVideos, setPlayerVideos] = useState([])
    const [relatedVideos, setRelatedVideos] = useState([])
    let { videoId } = useParams();
    useEffect(() => {
        YoutubeAPI(`video?id=${videoId}`).then((data) => { setPlayerVideos(data) })
    }, [videoId])
    const { id, title, channelTitle, channelId, viewCount } = playerVideos;

    const full_width_height = {
        width: "100%",
        height: "100%"
    }

    const playerContainerStyle = {
        ...full_width_height,
        display: "flex",
        flexDirection: { xs: "column", md: "row" }
    }

    const playerBoxStyle = { height:"100%", flex: "0.8", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column", padding: "0 10px" }

    return (
        <Box sx={playerContainerStyle}>
            <Box sx={playerBoxStyle}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} width="100%" height="75%" />
                <Typography component="h2" variant='h2' sx={{ fontSize: "1em", margin: "1% 0" }}>
                    {title}
                </Typography>
                <Typography component="p" variant='p' sx={{ fontSize: "0.8em" }}>
                    {channelTitle}
                </Typography>
            </Box>

            <Box sx={{height:"100%", flex: "0.2"}}>
                
            </Box>
        </Box>
    )
}

export default Player