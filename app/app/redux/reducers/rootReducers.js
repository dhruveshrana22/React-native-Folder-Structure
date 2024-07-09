import { combineReducers } from 'redux';
import auth from './auth/reducer';
import language from './language/reducer';

const rootReducer = combineReducers({
  auth,
  language,
});

export default rootReducer;
