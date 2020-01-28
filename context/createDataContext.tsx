import React from 'react';
import { Action, Dispatch } from 'trhc-sample';

type ContextProps<T, F> = T & F;

type Reducer<T> = (state: T, action: Action) => T;

interface ProviderProps {
  children: React.ReactNode;
}

interface Actions {
  [key: string]: (dispatch: Dispatch) => Function;
}

type BoundActions<F> = F;

function createDataContext<T, F>(reducer: Reducer<T>, actions: Actions, defaultValue: T) {
  const Context = React.createContext<ContextProps<T, F>>({} as ContextProps<T, F>);
  const Provider = ({ children }: ProviderProps) => {
    const [state, dispatch] = React.useReducer(reducer, defaultValue);

    const boundActions: BoundActions<F> = {} as F;
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ ...state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
}

export default createDataContext;
