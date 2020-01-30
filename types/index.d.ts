const { ThunkAction } = require('redux-thunk');

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

declare module 'trhc-sample' {
  export interface Action {
    type: string;
    payload?: any;
  }

  export type Dispatch = React.Dispatch<Action | Function>;

  export interface AppState {
    auth: AuthState;
    observations: ObservationsState;
  }

  export interface AuthState {
    token: string | null;
    componentState: ComponentStates;
  }

  export interface ObservationsState {
    componentState: ComponentStates;
    patientObservations: any | null;
    geneObservations: any | null;
  }

  export type ThunkReturn<RT = void> = ThunkAction<RT, AppState, null, Action>;
  export type ComponentStates = 'ready' | 'loading' | 'success' | 'fail';
}
