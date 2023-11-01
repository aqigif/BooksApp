type TBook = {
  key: string;
  title: string;
  author: string;
};
type TBookAPIResponse = {
  authors: AuthorBooks[];
  covers: number[];
  description: string;
  excerpts: Excerpt[];
  first_publish_date: string;
  key: string;
  links: Link[];
  subject_people: string[];
  subject_places: string[];
  subject_times: string[];
  subjects: string[];
  title: string;
  type: Type3;
  works: string[];
  latest_revision: number;
  revision: number;
  created: Created;
  last_modified: LastModified;
};

type AuthorBooks = {
  author: Author2;
  type: Type;
};

type Author2 = {
  key: string;
};

type Type = {
  key: string;
};

type Excerpt = {
  author: Author3;
  excerpt: string;
  comment: string;
};

type Author3 = {
  key: string;
};

type Link = {
  title: string;
  url: string;
  type: Type2;
};

type Type2 = {
  key: string;
};

type Type3 = {
  key: string;
};

type Created = {
  type: string;
  value: string;
};

type LastModified = {
  type: string;
  value: string;
};
