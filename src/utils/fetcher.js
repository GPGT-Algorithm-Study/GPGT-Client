import axios from 'axios';
import { getHeaderRefreshTokenConfig } from 'utils/auth';

const fetcher = (url) =>
  axios
    .get(url, getHeaderRefreshTokenConfig())
    .then((response) => response.data);

export default fetcher;
