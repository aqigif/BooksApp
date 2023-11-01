import {create} from 'zustand';
import {getBooksBySubjects} from '../../services/api/endpoints/subjects';
import {coverRenderUrl} from '../../utils';

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
        topSubjects: topSubjectsBooks.map((item, index) => {
          const books = item.works.map(itemWorks => ({
            key: itemWorks.key,
            title: itemWorks.title,
            author: itemWorks.authors?.[0]?.name || '',
            number_edition: itemWorks.edition_count,
            cover_url: coverRenderUrl(itemWorks.cover_id),
          })) as TBook[];
          return {
            key: get().topSubjects[index].key,
            name: get().topSubjects[index].name,
            books: books,
          };
        }),
      }));
    } catch (error) {
      set(() => ({loading: false}));
    }
  },
}));

export default useSubject;
