import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorsReducer,
  post: postReducer
})