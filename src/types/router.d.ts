type TRoutes = {
  'dashboard/home': undefined;
  'dashboard/books': {
    key: string;
    subject: string;
  };
  'dashboard/books/detail': {
    title: string;
  };
  'dashboard/checkout': {
    title: string;
  };
  'dashboard/checkout/success': {
    title: string;
  };
};
