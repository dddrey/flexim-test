import { IProductResponse } from "@/types";

export const fetchProducts = async ({
  page,
  limit,
  sort,
  order,
  search,
}: {
  search: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
}): Promise<IProductResponse> => {
  const response = await fetch(
    `/api/products?page=${page}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`
  );
  const data = await response.json();
  return data;
};
