import axios from 'axios';

const postFetcher = (params) => (url) =>
  axios.post(url, params).then((response) => response.data);

export default postFetcher;
