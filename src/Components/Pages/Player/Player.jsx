import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams, } from 'react-router-dom';
import { Video } from '../../Layouts';

import "./Player.css"
import { YoutubeAPI } from '../../../API/youtube';
import LinkWrapper from '../../Layouts/Wrapper/LinkWrapper';

export const Player = () => {

    const [playerVideos, setPlayerVideos] = useState([]);
    const [relatedVideos, setRelatedVideos] = useState([]);

    let { videoId } = useParams();

    useEffect(() => {

        YoutubeAPI(`video?id=${videoId}`).then(data => setPlayerVideos(data)).catch(err => console.log(err.message))

        YoutubeAPI(`related?id=${videoId}`).then((data) => { setRelatedVideos(data.data) }).catch(err => console.log(err.message))

    }, [videoId])


    console.log(relatedVideos)
    // return null
    const { id, title, channelTitle, channelId, viewCount } = playerVideos;

    return (
        <div className="w-full h-full overflow-hidden flex flex-col 600px:flex-row">

            <div className="w-full 600px:flex-1 flex flex-col justify-center items-start p-3">

                <div className={`${id ? "w-full" : "w-full 300px:w-72 300px:h-36 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"} h-full mx-auto`} >
                    {
                        id && <ReactPlayer controls url={`https://www.youtube.com/watch?v=${id}`} width="100%" height="100%" />
                    }
                </div>

                <h2 className={`my-3 ${title ? "text-base dark:text-slate-400" : "w-full 300px:w-72 h-3 300px:mx-auto bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"} `}> {title || ""} </h2>


                <LinkWrapper linkTo={channelId ? `/channel/${channelId}` : null} className={`w-full no-underline text-black dark:text-slate-400 text-sm flex flex-row justify-between items-center ${(channelTitle || viewCount) ? "" : "w-full 300px:w-72 h-3 300px:mx-auto bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"}`}>
                    {(channelTitle || viewCount) ? <>
                        <span> {channelTitle} </span>
                        <span> {viewCount && `${parseInt(viewCount).toLocaleString()} Views`} </span>
                    </> : ""}
                </LinkWrapper>

            </div>

            <div className='w-full h-full overflow-x-hidden overflow-y-scroll scroll-smooth 600px:w-1/3 p-2'>
                <Video videos={relatedVideos} videoDirection="flex-col" callingFrom="video_player_page"/>
            </div>
        </div>
    )
}
