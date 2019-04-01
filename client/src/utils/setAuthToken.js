import axios from 'axios';

export default token => {
  if (token) {
    // Apply to every requests
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
}