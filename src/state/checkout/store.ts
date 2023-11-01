import {create} from 'zustand';

interface ICheckoutData {
  borrow_time: string;
  name: string;
  email: string;
  borrowed_book?: TBookDetail;
}

interface ICheckoutState extends ICheckoutData {
  id: string;
  checkoutBorrowBook: (params: ICheckoutData) => void;
}

const useCheckoutBook = create<ICheckoutState>(set => ({
  id: '',
  borrow_time: '',
  name: '',
  email: '',
  checkoutBorrowBook: (params: ICheckoutData) => {
    const promise = new Promise(function (resolve, reject) {
      if (params?.borrowed_book) {
        set({
          id: new Date()
            .toTimeString()
            .replaceAll(':', '')
            .replaceAll('GMT+', ''),
          borrow_time: params.borrow_time,
          name: params.name,
          email: params.email,
          borrowed_book: params?.borrowed_book,
        });
        resolve('Success');
      } else {
        reject('Borrowed Book is required');
      }
    });
    return promise;
  },
}));

export default useCheckoutBook;
