import axios from 'axios';
import { getHeaderRefreshTokenConfig } from 'utils/auth';

const fetcher = (url) =>
  axios.get(url, getHeaderRefreshTokenConfig()).then((response) => {
    return response.data;
  });

export default fetcher;
