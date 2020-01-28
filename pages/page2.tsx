import { NextPage } from 'next';
import { AuthContext } from '../context/index';
import React from 'react';
const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  const data = React.useContext(AuthContext);
  console.log({ data });
  return <h1 className='text-teal-500'>Hello world! - user agent: {userAgent}</h1>;
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Home;
