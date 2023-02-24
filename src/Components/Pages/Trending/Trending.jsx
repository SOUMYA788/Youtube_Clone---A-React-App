import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { YoutubeAPI } from '../../../Assets/YoutubeAPI';
import {Video} from '../../';
import "./Trending.css"
const Trending = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const { trendingId } = useParams();

  useEffect(() => {
    YoutubeAPI(`trending?type=${trendingId}`).then((data) => { setTrendingVideos(data?.data) });
  }, [trendingId])

  const tredingItems = [
    "NOW", "MUSIC", "GAMMING", "MOVIES"
  ]


  return (
    <Box sx={{ width: "100%", height: "100%", padding:"5px" }}>

      <Box sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Box component="img" src='https://www.youtube.com/img/trending/avatar/trending.png' sx={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          marginRight:"15px"
        }} />
        <Typography component="h2" variant='h2' sx={{ fontSize: "2em" }}>Trending</Typography>
      </Box>

      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px"
      }}>
        {
          tredingItems.map((trendingItemsElement, indx) => (
            <NavLink className="trendingLinks" to={`/trending/${trendingItemsElement.toLowerCase()}`} key={`${trendingItemsElement}_${indx}`}>
              <Typography component="p" variant='p' sx={{ fontSize: "1em", padding:"3px 15px" }}>
                {trendingItemsElement}
              </Typography>
            </NavLink>
          ))
        }
      </Box>

      <Box>
        <Video videos={trendingVideos}/>
      </Box>
    </Box>
  )
}

export default Trending