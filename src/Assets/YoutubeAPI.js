import axios from "axios"

export const YoutubeAPI = async (url) => {
  const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com';
  const options = {
    headers: {
      'X-RapidAPI-Key': '489789d492mshbf75e527aaa15bdp1888fajsn345ff8238fbd',
      'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
    }
  };
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
}

export const CallAPI = async (url) => {
	const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com';
	const options = {
		headers: {
		  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		  'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
		}
	  };
	let { data } = await axios.get(`${BASE_URL}/${url}`, options);
	return data;
}
