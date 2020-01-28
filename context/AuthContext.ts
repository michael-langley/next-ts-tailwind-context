import { User, AuthState, Action, Dispatch } from 'trhc-sample';
import createDataContext from './createDataContext';

enum Actions {
  AddUser = 'ADD_USER',
  RemoveUser = 'REMOVE_USER',
}

const initialState: AuthState = {
  user: {
    name: 'Test User',
    id: 1,
  },
};

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case Actions.AddUser:
      return { user: action.payload };
    case Actions.RemoveUser:
      return { user: null };
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

interface Fns {
  changeUser: (email: string, password: string) => Promise<void>;
  removeUser: () => Promise<void>;
}

export const { Provider, Context } = createDataContext<AuthState, Fns>(authReducer, { changeUser, removeUser }, initialState);
