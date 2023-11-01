type TRoutes = {
  'dashboard/home': undefined;
  'dashboard/books': {
    key: string;
    subject: string;
  };
  'dashboard/books/detail': {
    key: string;
    title: string;
  };
  'dashboard/checkout': {
    key: string;
  };
  'dashboard/checkout/success': {
    key: string;
  };
};
