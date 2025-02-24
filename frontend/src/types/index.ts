export interface IProductResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  products: IProduct[];
}

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  description: string;
  manufactoringDate: string;
  supplier: ISupplier;
}

export interface ISupplier {
  _id: string;
  name: string;
  address: string;
}
