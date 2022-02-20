import {combineReducers} from 'redux';

import userReducer from './user';
import appReducer from './app';
import appearanceReducer from './appearance';

const rootReducers = combineReducers({
  user: userReducer,
  app: appReducer,
  appearance : appearanceReducer
});

export default rootReducers;
