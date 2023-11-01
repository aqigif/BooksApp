import {getBooksBySubjects} from '../../services/api/endpoints/subjects';
import {create} from 'zustand';

interface ISubjectState {
  loading: boolean;
  topSubjects: TSubject[];
  fetchTopSubjects: () => void;
}

const useSubject = create<ISubjectState>((set, get) => ({
  loading: false,
  topSubjects: [
    {
      key: 'historical fiction',
      name: 'Historical Fiction',
      books: [],
    },
    {
      key: 'fantasy',
      name: 'Fantasy',
      books: [],
    },
    {
      key: 'literature',
      name: 'Literature',
      books: [],
    },
  ],
  fetchTopSubjects: async () => {
    set(() => ({loading: true}));
    try {
      const promises = Array.from(get().topSubjects).map(item =>
        getBooksBySubjects(item.key, {limit: 4}),
      );

      const topSubjectsBooks = await Promise.all(promises);
      set(() => ({
        loading: false,
        topSubjects: topSubjectsBooks.map((item, index) => ({
          key: get().topSubjects[index].key,
          name: get().topSubjects[index].name,
          books: item.works.map(itemWorks => ({
            key: itemWorks.key,
            title: itemWorks.title,
            author: itemWorks.authors?.[0]?.name,
          })),
        })),
      }));
    } catch (error) {
      set(() => ({loading: false}));
    }
  },
}));

export default useSubject;
