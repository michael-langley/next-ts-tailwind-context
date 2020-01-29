import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  accessToken?: string;
  error?: any;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const auth = `Basic ${Buffer.from(`${process.env.APP_KEY}:${process.env.APP_SECRET}`).toString('base64')}`;

  try {
    const r = await axios({
      method: 'POST',
      headers: {
        'Content-Length': 0,
        Authorization: auth,
      },
      url: process.env.TOKEN_URL,
    });

    res.status(200).json({ accessToken: r.data.access_token });
  } catch (error) {
    throw new Error(error.message);
    res.status(500).json({ error });
  }
};
