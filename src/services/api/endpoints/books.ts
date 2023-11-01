import api from '..';

export const getBookDetail = async (key: string): Promise<TBookAPIResponse> => {
  const res = await api.get(`/works/${key}`);
  return res.data as TBookAPIResponse;
};

export const getAuthorData = async (
  key: string,
): Promise<TBookAuthorResponse> => {
  const res = await api.get(`/authors/${key}.json`);
  return res.data as TBookAuthorResponse;
};
