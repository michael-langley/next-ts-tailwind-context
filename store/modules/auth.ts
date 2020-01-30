import { AuthState, Action, Dispatch, ThunkReturn, ComponentStates } from 'trhc-sample';
import axios from 'axios';

enum Actions {
  UpdateToken = 'UPDATE_TOKEN',
  RemoveToken = 'REMOVE_TOKEN',
  SetComponentState = 'SET_AUTH_COMPONENT_STATE',
}

const initialState: AuthState = {
  token: null,
  componentState: 'ready',
};

const setComponentState = (state: ComponentStates) => (dispatch: Dispatch) => {
  dispatch({
    type: Actions.SetComponentState,
    payload: state,
  });
};

const revertToReadyState = (): ThunkReturn => async (dispatch: Dispatch) => setTimeout(() => dispatch(setComponentState('ready')), 2000);

export const updateToken = (token: string) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.UpdateToken, payload: token });
};

export const getApigeeToken = (): ThunkReturn => async (dispatch: Dispatch) => {
  dispatch(setComponentState('loading'));
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/auth',
    });

    dispatch(updateToken(`Bearer ${res.data.accessToken}`) as any);
    dispatch(setComponentState('success'));
    dispatch(revertToReadyState());
  } catch (error) {
    dispatch(setComponentState('fail'));
    dispatch(revertToReadyState());
    console.log({ error });
  }
};

export default (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case Actions.UpdateToken:
      return { ...state, token: action.payload };
    case Actions.RemoveToken:
      return { ...state, token: null };
    case Actions.SetComponentState:
      return { ...state, componentState: action.payload };
    default:
      return state;
  }
};
