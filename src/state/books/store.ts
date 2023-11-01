import {getBooksBySubjects} from '../../services/api/endpoints/subjects';
import {create} from 'zustand';

interface ISubjectState {
  loading: boolean;
  refreshing: boolean;
  books: TBook[];
  fetchBooks: (key: string) => void;
  refreshBooks: (key: string) => void;
  offsetPaginate: number;
  loadingPaginate: boolean;
  fetchBooksNextPage: (key: string) => void;
}

const useBooks = create<ISubjectState>((set, get) => ({
  offsetPaginate: 0,
  loading: false,
  refreshing: false,
  loadingPaginate: false,
  books: [],
  fetchBooks: async (key: string) => {
    set(() => ({loading: true}));
    try {
      const data = await getBooksBySubjects(key, {limit: 4, offset: 0});
      set(() => ({
        loading: false,
        offsetPaginate: 0,
        books: data.works.map(item => ({
          key: item.key,
          title: item.title,
          author: item.authors?.[0]?.name,
        })),
      }));
    } catch (error) {
      console.log(error);
      set(() => ({loading: false, books: []}));
    }
  },
  refreshBooks: async (key: string) => {
    set(() => ({refreshing: true}));
    await get().fetchBooks(key);
    set(() => ({refreshing: false}));
  },
  fetchBooksNextPage: async (key: string) => {
    if (get().loading || get().refreshing) {
      return;
    }
    set(() => ({loadingPaginate: true}));
    try {
      const data = await getBooksBySubjects(key, {
        offset: get().offsetPaginate + 4,
        limit: 4,
      });
      const newBooks = data.works.map(item => ({
        key: item.key,
        title: item.title,
        author: item.authors?.[0]?.name,
      }));
      set(() => ({
        loadingPaginate: false,
        offsetPaginate: get().offsetPaginate + 4,
        books: [...get().books, ...newBooks],
      }));
    } catch (error) {
      console.log(error);
      set(() => ({loadingPaginate: false}));
    }
  },
}));

export default useBooks;
