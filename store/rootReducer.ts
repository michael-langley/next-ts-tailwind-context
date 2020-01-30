import { combineReducers, Action, Reducer } from 'redux';
import { AppState } from 'trhc-sample';
import auth from './modules/auth';
import observations from './modules/observations';

const rootReducer: Reducer<AppState, Action> = combineReducers({
  auth,
  observations,
});

export default rootReducer;
