import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams, } from 'react-router-dom';
import { Video } from '../../';
import { YoutubeAPI } from '../../../Assets/YoutubeAPI';

import "./Player.css"

const Player = () => {

    const [playerVideos, setPlayerVideos] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);

    let { videoId } = useParams();

    useEffect(() => {
        YoutubeAPI(`video?id=${videoId}`).then((data) => { setPlayerVideos(data) })
        YoutubeAPI(`related?id=${videoId}`).then((data) => { setRelatedVideos(data.data) })
    }, [videoId])



    const full_width_height = {
        width: "100%",
        height: "100%"
    }

    const playerContainerStyle = {
        ...full_width_height,
        display: "flex",
        flexDirection: { xs: "column", md: "row" }
    }

    const playerBoxStyle = {
        height: "100%",
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: {
            xs: "10px",
            sm: "0 10px"
        },
        borderBottom:"2px solid black"
    }

    const relatedVideosBox = {
        height: { xs: "200px", md: "100%" },
        width: { xs: "100%", md: "300px" },
        overflowY: "scroll",
        scrollBehavior: "smooth"
    }

    console.log(playerVideos)
    const { id, title, channelTitle, channelId, viewCount } = playerVideos;
    return (
        <Box sx={playerContainerStyle}>
            <Box sx={playerBoxStyle}>
                <Box sx={{ width: "100%", flex: "1" }}>
                    <ReactPlayer controls="true" className="reactPlayer" url={`https://www.youtube.com/watch?v=${id}`} width="100%" height="100%" style={{ objectFit: "contain" }} />
                </Box>
                <Typography component="h2" variant='h2' sx={{ fontSize: "1em", margin: "1% 0" }}>
                    {title}
                </Typography>
                <Link className='playerLinks' to={`/channel/${channelId}`}>
                    <span> {channelTitle} </span>  <span> {viewCount && `${parseInt(viewCount).toLocaleString()} Views` } </span>
                </Link>
            </Box>
            <Box className="scrollDiv" sx={relatedVideosBox}>
                <Video videos={relatedVideos} videoDirection="column" />
            </Box>
        </Box>
    )
}

export default Player