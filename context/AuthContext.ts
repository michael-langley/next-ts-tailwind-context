import { AuthState, Action, Dispatch } from 'trhc-sample';
import createDataContext from './createDataContext';

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

const authReducer = (state: AuthState, action: Action): AuthState => {
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

const changeUser = (dispatch: Dispatch) => async (email: string, password: string) => {
  dispatch({ type: Actions.AddUser, payload: { name: 'New User', id: 2 } });
};

const removeUser = (dispatch: Dispatch) => async () => {
  dispatch({ type: Actions.RemoveUser });
};

const updateToken = (dispatch: Dispatch) => (token: string) => {
  dispatch({ type: Actions.UpdateToken, payload: token });
};

interface Fns {
  changeUser: (email: string, password: string) => Promise<void>;
  removeUser: () => Promise<void>;
  updateToken: (token: string) => void;
}

export const { Provider, Context } = createDataContext<AuthState, Fns>(authReducer, { changeUser, removeUser, updateToken }, initialState);
