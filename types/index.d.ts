declare module 'trhc-sample' {
  export interface Action {
    type: string;
    payload?: any;
  }

  export type Dispatch = React.Dispatch<Action>;

  export interface AuthState {
    user: User | null;
    token: string | null;
  }

  export interface User {
    name: string;
    id: number;
  }
}
