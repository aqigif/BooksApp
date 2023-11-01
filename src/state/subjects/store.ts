// myStore.js
import {create} from 'zustand';

interface ISubjectState {
  topSubjects: Subject[];
}

const useSubject = create<ISubjectState>(() => ({
  topSubjects: [
    {
      name: 'Historical Fiction',
      books: [
        {title: 'Book 1', author: 'Author 1'},
        {title: 'Book 2', author: 'Author 2'},
        {title: 'Book 3', author: 'Author 3'},
        {title: 'Book 4', author: 'Author 4'},
      ],
    },
    {
      name: 'Fantasy',
      books: [
        {title: 'Book 1', author: 'Author 1'},
        {title: 'Book 2', author: 'Author 2'},
        {title: 'Book 3', author: 'Author 3'},
        {title: 'Book 4', author: 'Author 4'},
      ],
    },
    {
      name: 'Literature',
      books: [
        {title: 'Book 1', author: 'Author 1'},
        {title: 'Book 2', author: 'Author 2'},
        {title: 'Book 3', author: 'Author 3'},
        {title: 'Book 4', author: 'Author 4'},
      ],
    },
  ],
}));

export default useSubject;
