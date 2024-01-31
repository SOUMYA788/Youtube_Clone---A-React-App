import axios from "axios"
import { ENV_CONFIG } from "../envConfig";


export const YoutubeAPI = async (url) => {
  const {YOUTUBE_API_KEY} = ENV_CONFIG;

  const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com';
   
  const options = {
    headers: {
      'X-RapidAPI-Key': YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
    }
  };

  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
}