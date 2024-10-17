export type MetaSEO = {
  title?: string;
  description?: string;
  image?: string;

  canonical?: string | URL;
  noFollow?: boolean;
  noIndex?: boolean;
};
