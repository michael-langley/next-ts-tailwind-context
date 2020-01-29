const { ThunkAction } = require('redux-thunk');

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

declare module 'trhc-sample' {
  export interface Action {
    type: string;
    payload?: any;
  }

  export type Dispatch = React.Dispatch<Action>;

  export interface AppState {
    auth: AuthState;
  }

  export interface AuthState {
    user: User | null;
    token: string | null;
  }

  export interface User {
    name: string;
    id: number;
  }

  export type ThunkReturn<RT = void> = ThunkAction<RT, AppState, null, Action>;
}
