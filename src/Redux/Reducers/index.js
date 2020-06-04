import { combineReducers } from 'redux';

import messagesReducer from './messages';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messagesReducer,
});

export default rootReducer;
