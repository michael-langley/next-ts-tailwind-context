import axiosInstance from '../../utils/axiosInstance';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data?: any;
  error?: any;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const r = await axiosInstance({
      headers: {
        Authorization: req.query.token,
      },
      method: 'GET',
      url: '/pgx/4_0_0/Observation/57',
    });

    res.status(200).json({ data: r.data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
    throw new Error(error.message);
  }
};
