import api from '..';

export const getBookDetail = async (key: string): Promise<TBookAPIResponse> => {
  const res = await api.get(`/works/${key}`);
  return res.data as TBookAPIResponse;
};
