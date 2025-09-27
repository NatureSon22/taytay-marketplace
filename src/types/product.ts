type Accounts = {
  logo: string;
  url: string;
};

export type Product = {
  _id: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productPictures: string[];
  storeId: string;
  links?: Accounts[];
  categories: string[];
  types: string[];
};
