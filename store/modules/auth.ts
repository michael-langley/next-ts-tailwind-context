import { AuthState, Action, Dispatch, AppState, ThunkReturn } from 'trhc-sample';

enum Actions {
  AddUser = 'ADD_USER',
  RemoveUser = 'REMOVE_USER',
  UpdateToken = 'UPDATE_TOKEN',
  RemoveToken = 'REMOVE_TOKEN',
}

const initialState: AuthState = {
  user: {
    name: 'Test User',
    id: 1,
  },
  token: null,
};

export const changeUser = (email: string, password: string): ThunkReturn => async (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch({ type: Actions.AddUser, payload: { name: email, id: password } });
  }, 2000);
};

export const removeUser = async () => (dispatch: Dispatch) => {
  dispatch({ type: Actions.RemoveUser });
};

export const updateToken = (token: string) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.UpdateToken, payload: token });
};

export default (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case Actions.AddUser:
      return { ...state, user: action.payload };
    case Actions.RemoveUser:
      return { ...state, user: null };
    case Actions.UpdateToken:
      return { ...state, token: action.payload };
    case Actions.RemoveUser:
      return { ...state, token: null };
    default:
      return state;
  }
};
