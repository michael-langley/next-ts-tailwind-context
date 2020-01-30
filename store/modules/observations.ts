import { ObservationsState, Action, Dispatch, ThunkReturn, ComponentStates, AppState } from 'trhc-sample';
import axios from 'axios';

enum Actions {
  SetPatientObs = 'SET_PATIENT_OBSERVATIONS',
  SetGeneObs = 'SET_GENE_OBSERVATIONS',
  SetComponentState = 'SET_OBS_COMPONENT_STATE',
}

const initialState: ObservationsState = {
  componentState: 'ready',
  patientObservations: null,
  geneObservations: null,
};

const setComponentState = (state: ComponentStates) => (dispatch: Dispatch) => {
  dispatch({
    type: Actions.SetComponentState,
    payload: state,
  });
};

const revertToReadyState = (): ThunkReturn => async (dispatch: Dispatch) => setTimeout(() => dispatch(setComponentState('ready')), 2000);

export const getPatientObservation = (): ThunkReturn => async (dispatch: Dispatch, getState: () => AppState) => {
  const { auth } = getState();
  dispatch(setComponentState('loading'));
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/patient-observation',
      params: {
        token: auth.token,
      },
    });

    dispatch({
      type: Actions.SetPatientObs,
      payload: res.data.data,
    });
    dispatch(setComponentState('success'));

    dispatch(revertToReadyState());
  } catch (error) {
    dispatch(setComponentState('fail'));
    dispatch(revertToReadyState());
    console.log({ error });
  }
};

export const getGeneObservation = (): ThunkReturn => async (dispatch: Dispatch, getState: () => AppState) => {
  const { auth } = getState();
  dispatch(setComponentState('loading'));
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/gene-observation',
      params: {
        token: auth.token,
      },
    });

    dispatch({
      type: Actions.SetGeneObs,
      payload: res.data.data,
    });
    dispatch(setComponentState('success'));

    dispatch(revertToReadyState());
  } catch (error) {
    dispatch(setComponentState('fail'));
    dispatch(revertToReadyState());
    console.log({ error });
  }
};

export default (state: ObservationsState = initialState, action: Action): ObservationsState => {
  switch (action.type) {
    case Actions.SetGeneObs:
      return { ...state, geneObservations: action.payload };
    case Actions.SetPatientObs:
      return { ...state, patientObservations: action.payload };
    case Actions.SetComponentState:
      return { ...state, componentState: action.payload };
    default:
      return state;
  }
};
