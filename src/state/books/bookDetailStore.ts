import {getBookDetail} from '../../services/api/endpoints/books';
import {create} from 'zustand';

interface IBooksDetailState {
  loading: boolean;
  dataDetail: TBook;
  fetchDataDetail: (key: string) => void;
}

const useBooksDetail = create<IBooksDetailState>(set => ({
  loading: false,
  dataDetail: {
    key: '',
    title: '',
    author: '',
  },
  fetchDataDetail: async (key: string) => {
    set({loading: true});
    try {
      const data = await getBookDetail(key);
      set({
        loading: false,
        dataDetail: {
          key: data.key,
          author: '',
          title: data.title,
        },
      });
    } catch (error) {}
  },
}));

export default useBooksDetail;
