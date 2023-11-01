import api from '..';

export const getBooksBySubjects = async (
  key: string,
  params: object,
): Promise<TSubjectAPIResponse> => {
  const res = await api.get(`/subjects/${key}.json`, {params: params});
  return res.data as TSubjectAPIResponse;
};
