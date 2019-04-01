import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(()=> history.push('/login'))
    .catch(err =>
      dispatch({ // https://daveceddia.com/what-is-a-thunk/
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res=> {
      // save to localStorage
      const {token} = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // decode to get the user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({ // https://daveceddia.com/what-is-a-thunk/
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

// Logout - remove token from localstorage
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}))
};