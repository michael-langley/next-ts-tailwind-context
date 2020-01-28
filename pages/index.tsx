import { NextPage } from 'next';
import { AuthContext } from '../context/index';
import React from 'react';
import Link from 'next/link';
import Button from '../components/Button';

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  const data = React.useContext(AuthContext);
  console.log({ data });
  return (
    <div>
      <h1 className='text-teal-500'>Hello world! - user agent: {userAgent}</h1>
      <Link href='/page2'>
        <a>Page2</a>
      </Link>
      <Button type='button' className='bg-teal-400 ' onClick={() => console.log('Button Clicked')}>
        Click This Button
      </Button>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;
