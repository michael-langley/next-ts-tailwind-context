import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { AppState } from 'trhc-sample';
import { updateToken, changeUser } from '../store/modules/auth';

type ComponentStates = 'ready' | 'loading' | 'success' | 'fail';

// tslint:disable-next-line: no-shadowed-variable
const Home = ({ user, updateToken, token, changeUser }: ConnectedProps) => {
  const [compState, setCompState] = React.useState<ComponentStates>('ready');
  const [patientData, setPatientData] = React.useState<any>();
  const [geneData, setGeneData] = React.useState<any>();

  React.useEffect(() => {
    changeUser('ml@ml.com', 'pass');
  }, []);

  console.log({ user });

  const revertToReadyState = () => setTimeout(() => setCompState('ready'), 2000);

  const getApigeeToken = async () => {
    setCompState('loading');
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/auth',
      });

      updateToken(`Bearer ${res.data.accessToken}`);
      setCompState('success');
      revertToReadyState();
    } catch (error) {
      setCompState('fail');
      revertToReadyState();
      throw new Error(error.message);
    }
  };

  const getPatientObservation = async () => {
    setCompState('loading');
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/patient-observation',
        params: {
          token,
        },
      });

      setPatientData(res.data.data);
      setCompState('success');
      revertToReadyState();
    } catch (error) {
      setCompState('fail');
      revertToReadyState();
      throw new Error(error.message);
    }
  };

  const getGeneObservation = async () => {
    setCompState('loading');
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/gene-observation',
        params: {
          token,
        },
      });

      setGeneData(res.data.data);
      setCompState('success');
      revertToReadyState();
    } catch (error) {
      setCompState('fail');
      revertToReadyState();
      throw new Error(error.message);
    }
  };

  return (
    <div className='w-5/6 py-12 mx-auto px-12'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-secondary-600 text-3xl tracking-tighter'>Welcome to the Sample App</h1>
        <p>Page State: {compState}</p>
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
      {patientData && (
        <div>
          <h3 className='mt-12 text-xl tracking-tight font-semibold'>PGX Observations by Patient</h3>
          <div className='mt-6'>
            {patientData.entry.map((entry: any, i: number) => {
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

      {geneData && (
        <div>
          <h3 className='mt-12 text-xl tracking-tight font-semibold'>PGX Observations by Gene</h3>
          <div className='mt-6'>
            {geneData.entry.map((entry: any, i: number) => {
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

const mapStateToProps = ({ auth }: AppState) => {
  return {
    ...auth,
  };
};

const actions = { updateToken, changeUser };

type ConnectedProps = typeof actions & ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, actions)(Home);
