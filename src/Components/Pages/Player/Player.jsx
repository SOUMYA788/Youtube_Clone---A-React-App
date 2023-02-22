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
        flexDirection: { xs: "column", sm: "row" }
    }

    const playerBoxStyle = {
        height: "100%",
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "2vw",
        borderBottom: { xs: "2px solid black", sm: "none" }
    }

    const relatedVideosBox = {
        height: { xs: "200px", sm: "100%" },
        width: { xs: "100%", sm: "25vw" },
        overflowY: "scroll",
        scrollBehavior: "smooth"
    }

    const videoAspectRatio = {
        xsVideoWidth: 96,
        xsVideoHeight: ((96 * 56.25) / 100),
        smVideoWidth: (96 - 25),
        smVideoHeight: (((96 - 25) * 56.25) / 100)
    }

    console.log(playerVideos)
    const { id, title, channelTitle, channelId, viewCount } = playerVideos;

    return (
        <Box sx={playerContainerStyle}>
            <Box sx={playerBoxStyle}>

                <div>
                    <Box sx={{
                        width: {
                            xs: `${videoAspectRatio.xsVideoWidth}vw`,
                            sm: `${videoAspectRatio.smVideoWidth}vw`,
                        },
                        height: {
                            xs: `${videoAspectRatio.xsVideoHeight}vw`,
                            sm: `${videoAspectRatio.smVideoHeight}vw`,
                        },
                        margin: "0 auto"
                    }}>
                        <ReactPlayer controls url={`https://www.youtube.com/watch?v=${id}`} width="100%" height="100%" />
                    </Box>

                    <Typography component="h2" variant='h2' sx={{ fontSize: "1em", margin: "1% 0" }}>
                        {title}
                    </Typography>

                    <Link className='playerLinks' to={`/channel/${channelId}`}>
                        <span> {channelTitle} </span>  <span> {viewCount && `${parseInt(viewCount).toLocaleString()} Views`} </span>
                    </Link>
                </div>

            </Box>

            <Box sx={relatedVideosBox}>
                <Video videos={relatedVideos} videoDirection="column" />
            </Box>
        </Box>
    )
}

export default Player