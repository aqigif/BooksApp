import {create} from 'zustand';
import {getBookDetail} from '../../services/api/endpoints/books';
import {coverRenderUrl} from '../../utils';

interface IBooksDetailState {
  loading: boolean;
  dataDetail: TBookDetail;
  fetchDataDetail: (key: string) => void;
}

const useBooksDetail = create<IBooksDetailState>(set => ({
  loading: false,
  dataDetail: {
    key: '',
    title: '',
    author: '',
    number_edition: 0,
    cover_url: '',
    description: '',
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
          number_edition: 0,
          cover_url: coverRenderUrl(data.covers?.[0]),
          description: data.description,
        },
      });
    } catch (error) {}
  },
}));

export default useBooksDetail;
