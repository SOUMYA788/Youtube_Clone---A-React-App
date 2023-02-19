import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { YoutubeAPI } from '../../Assets/YoutubeAPI';
import {Video} from '../'
const Search = () => {
  const [searchVideos, setSearchVideos] = useState([]);
  const { searchId } = useParams();
  useEffect(() => {
    YoutubeAPI(`search?query=${searchId}&type=channel`).then((data) => { setSearchVideos(data.data) })
  }, [searchId])

  console.log(searchVideos);

  return (
    <Video videos={searchVideos} />
  )
}

export default Search