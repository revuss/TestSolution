import { useState, useMemo, useEffect } from "react";

interface Product {
  Category: string;
  Company: string;
  Product: string;
  Description: string;
  Price: number;
}

interface UseTableLogicProps {
  products: Product[];
}

export const useTableLogic = ({ products }: UseTableLogicProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>(products);
  const [rowsLimit] = useState<number>(5);
  const [rowsToShow, setRowsToShow] = useState<Product[]>(
    productList.slice(0, rowsLimit)
  );
  const [customPagination, setCustomPagination] = useState<null[]>([]);
  const [activeColumn, setActiveColumn] = useState<string[]>(["Price"]);
  const [sortingColumn, setSortingColumn] = useState<string[]>(["Price"]);
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(productList.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  const searchProducts = (keyword: string) => {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (keyword !== "") {
      const results = productList.filter((product) => {
        return (
          product.Category.toLowerCase().includes(keyword) ||
          product.Company.toLowerCase().includes(keyword) ||
          product.Product.toLowerCase().includes(keyword) ||
          product.Description.toLowerCase().includes(keyword) ||
          product.Price.toString().toLowerCase().includes(keyword)
        );
      });
      setProductList(results);
      setRowsToShow(results.slice(0, rowsLimit));
      setCurrentPage(0);
      setTotalPage(Math.ceil(results.length / rowsLimit));
      setCustomPagination(
        Array(Math.ceil(results.length / rowsLimit)).fill(null)
      );
    } else {
      clearData();
    }
  };

  const clearData = () => {
    setSearchValue("");
    const sortedProducts = products.slice().sort((a, b) => a.Price - b.Price);
    setProductList(sortedProducts);
    setRowsToShow(sortedProducts.slice(0, rowsLimit));
    setCustomPagination(
      Array(Math.ceil(products.length / rowsLimit)).fill(null)
    );
    setTotalPage(Math.ceil(products.length / rowsLimit));
  };

  const sortByColumn = (
    column: keyof Product,
    changeSortingColumn: boolean = true
  ) => {
    if (column !== "Price") {
      if (sortingColumn.includes(column) && changeSortingColumn) {
        const sortData = productList
          .slice()
          .sort((a, b) =>
            b[column].toString().localeCompare(a[column].toString())
          );
        setRowsToShow(
          sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setProductList(sortData);
        }
      } else {
        const sortData = productList
          .slice()
          .sort((a, b) =>
            a[column].toString().localeCompare(b[column].toString())
          );
        setRowsToShow(
          sortData.slice(currentPage * rowsLimit, (currentPage + 1) * rowsLimit)
        );
        if (changeSortingColumn) {
          setProductList(sortData);
          setSortingColumn([column]);
        }
      }
    } else {
      if (sortingColumn.includes(column)) {
        const sortedProducts = productList
          .slice()
          .sort((a, b) => b.Price - a.Price);
        setRowsToShow(
          sortedProducts.slice(
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([]);
          setProductList(sortedProducts);
        }
      } else {
        const sortedProducts = productList
          .slice()
          .sort((a, b) => a.Price - b.Price);
        setRowsToShow(
          sortedProducts.slice(
            currentPage * rowsLimit,
            (currentPage + 1) * rowsLimit
          )
        );
        if (changeSortingColumn) {
          setSortingColumn([column]);
          setProductList(sortedProducts);
        }
      }
    }
    setActiveColumn([column]);
  };

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value: number) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = productList.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = products.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(productList.length / rowsLimit)).fill(null)
    );
  }, [productList.length, rowsLimit]);

  useEffect(() => {
    const sortedProducts = products.slice().sort((a, b) => a.Price - b.Price);
    setProductList(sortedProducts);
    setRowsToShow(sortedProducts.slice(0, rowsLimit));
  }, [products, rowsLimit]);

  return {
    searchValue,
    searchProducts,
    clearData,
    sortByColumn,
    nextPage,
    changePage,
    previousPage,
    rowsToShow,
    currentPage,
    totalPage,
    customPagination,
    activeColumn,
    sortingColumn,
  };
};
