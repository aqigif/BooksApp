import {create} from 'zustand';

interface ISubjectState {
  books: Book[];
}

const useBooks = create<ISubjectState>(() => ({
  books: [
    {title: 'Book 1', author: 'Author 1'},
    {title: 'Book 2', author: 'Author 2'},
    {title: 'Book 3', author: 'Author 3'},
    {title: 'Book 4', author: 'Author 4'},
  ],
}));

export default useBooks;
