import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { IProduct } from "@/types";
import { fetchProducts } from "@/services/api";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/useDebounce";

const ProductTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 10;
  const initialSortBy = searchParams.get("sortBy") || "name";
  const initialSortOrder = searchParams.get("sortOrder") || "asc";

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    initialSortOrder as "asc" | "desc"
  );

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setSearchParams({
      search: debouncedSearch,
      page: String(page),
      limit: String(limit),
      sortBy,
      sortOrder,
    });
  }, [debouncedSearch, page, limit, sortBy, sortOrder, setSearchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      { search: debouncedSearch, page, limit, sortBy, sortOrder },
    ],
    queryFn: () =>
      fetchProducts({
        search: debouncedSearch,
        page,
        limit,
        sort: sortBy,
        order: sortOrder,
      }),
  });

  const handleSort = (field: keyof IProduct | "supplier.name") => {
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Product List</h1>
      <div className="flex items-center space-x-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name or SKU"
          className="w-1/3"
        />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell
              onClick={() => handleSort("sku")}
              className="cursor-pointer"
            >
              SKU {sortBy === "sku" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell
              onClick={() => handleSort("supplier.name")}
              className="cursor-pointer"
            >
              Supplier{" "}
              {sortBy === "supplier.name" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell
              onClick={() => handleSort("description")}
              className="cursor-pointer"
            >
              Description{" "}
              {sortBy === "description" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableCell>
            <TableCell
              onClick={() => handleSort("manufactoringDate")}
              className="cursor-pointer"
            >
              Manufactoring Date{" "}
              {sortBy === "manufactoringDate" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.products?.map((product: IProduct) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.supplier.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                {new Date(product.manufactoringDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil((data?.total || 0) / limit)}
        limit={limit}
        onPageChange={(pageNum) => setPage(pageNum)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default ProductTable;
