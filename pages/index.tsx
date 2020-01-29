import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import Button from '../components/Button';
import { AuthContext } from '../context';

type ComponentStates = 'ready' | 'loading' | 'success' | 'fail';

const Home: NextPage = () => {
  const { updateToken, token } = React.useContext(AuthContext);
  const [compState, setCompState] = React.useState<ComponentStates>('ready');

  let poll;

  React.useEffect(() => {
    clearInterval(poll);
    poll = null;
    pollStatus();
  }, [token]);

  const pollStatus = async () => {
    poll = setInterval(() => {
      console.log({ token });
    }, 10000);
  };

  const revertToReadyState = () => setTimeout(() => setCompState('ready'), 3000);

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

  const getObservation = async () => {
    setCompState('loading');
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/observation',
        params: {
          token,
        },
      });

      console.log({ d: res.data });
      setCompState('success');
      revertToReadyState();
    } catch (error) {
      setCompState('fail');
      revertToReadyState();
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <h1 className='text-primary-500'>Welcome to the Sample App</h1>
      <p>Component State: {compState}</p>
      <Button type='button' className='bg-primary-500 text-white' onClick={getApigeeToken}>
        Get Apigee Token
      </Button>
      <Button type='button' className='bg-primary-500 text-white' onClick={getObservation}>
        Get PGX Observation
      </Button>
    </div>
  );
};

export default Home;
