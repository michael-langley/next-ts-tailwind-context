import React from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { AppState } from 'trhc-sample';
import { updateToken, getApigeeToken } from '../store/modules/auth';
import { getGeneObservation, getPatientObservation } from '../store/modules/observations';

// tslint:disable: no-shadowed-variable
const Home = ({
  token,
  getApigeeToken,
  getGeneObservation,
  getPatientObservation,
  geneObservations,
  patientObservations,
  authCompState,
  obsCompState,
}: ConnectedProps) => {
  return (
    <div className='w-5/6 py-12 mx-auto px-12'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-secondary-600 text-3xl tracking-tighter'>Welcome to the Sample App</h1>
        <div>
          <p>Auth State: {authCompState}</p>
          <p>Observations State: {obsCompState}</p>
        </div>
      </div>

      {!token && (
        <Button type='button' className='bg-primary-500 text-white mt-3' onClick={getApigeeToken}>
          Get Apigee Token
        </Button>
      )}
      {token && (
        <Button type='button' className='bg-primary-500 text-white mt-3' onClick={getPatientObservation}>
          Get PGX Patient Observations
        </Button>
      )}
      {token && (
        <Button type='button' className='bg-primary-500 text-white mt-3 md:ml-3' onClick={getGeneObservation}>
          Get PGX Gene Observations
        </Button>
      )}
      {patientObservations && (
        <div>
          <h3 className='mt-12 text-xl tracking-tight font-semibold'>PGX Observations by Patient</h3>
          <div className='mt-6'>
            {patientObservations.entry.map((entry: any, i: number) => {
              return (
                <div key={i} className='mt-5'>
                  <div className='flex items-baseline flex-wrap'>
                    <div className='text-gray-700 text-sm w-full mt-2 lg:w-2/12 lg:mt-0'>Full Url</div>
                    <div className='text-gray-800 tracking-tight w-full pl-1 lg:pl-0 lg:w-10/12'>{entry.fullUrl}</div>
                  </div>
                  {entry.resource.component.map((comp: any, ind: number) => {
                    return (
                      <div className='flex items-baseline flex-wrap' key={ind}>
                        <div className='text-gray-700 text-sm w-full mt-2 lg:w-2/12 lg:mt-0'>{comp.valueCodeableConcept.text}</div>
                        <div className='text-gray-800 tracking-tight w-full pl-1 lg:pl-0 lg:w-10/12'>
                          {comp.valueCodeableConcept.coding[0].display || comp.valueCodeableConcept.coding[0].code}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {geneObservations && (
        <div>
          <h3 className='mt-12 text-xl tracking-tight font-semibold'>PGX Observations by Gene</h3>
          <div className='mt-6'>
            {geneObservations.entry.map((entry: any, i: number) => {
              return (
                <div key={i} className='mt-5'>
                  <div className='flex items-baseline flex-wrap'>
                    <div className='text-gray-700 text-sm w-full mt-2 lg:w-2/12 lg:mt-0'>Full Url</div>
                    <div className='text-gray-800 tracking-tight w-full pl-1 lg:pl-0 lg:w-10/12'>{entry.fullUrl}</div>
                  </div>
                  {entry.resource.component.map((comp: any, ind: number) => {
                    return (
                      <div className='flex items-baseline flex-wrap' key={ind}>
                        <div className='text-gray-700 text-sm w-full mt-2 lg:w-2/12 lg:mt-0'>{comp.valueCodeableConcept.text}</div>
                        <div className='text-gray-800 tracking-tight w-full pl-1 lg:pl-0 lg:w-10/12'>
                          {comp.valueCodeableConcept.coding[0].display || comp.valueCodeableConcept.coding[0].code}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, observations }: AppState) => {
  return {
    ...auth,
    ...observations,
    authCompState: auth.componentState,
    obsCompState: observations.componentState,
  };
};

const actions = { updateToken, getApigeeToken, getGeneObservation, getPatientObservation };

type ConnectedProps = typeof actions & ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, actions)(Home);
