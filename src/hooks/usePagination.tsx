import { useState } from "react";

interface PaginationOptions {
  initialPage?: number;
  initialPerPage?: number;
  totalData: number;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

interface PaginationActions {
  goToPage: (pageNumber: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

// TODO: Unit tests

const usePagination = ({
  initialPage = 0,
  initialPerPage = 10,
  totalData,
}: PaginationOptions): [PaginationState, PaginationActions] => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber <= Math.ceil(totalData / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const paginationState: PaginationState = {
    currentPage,
    itemsPerPage,
  };

  const paginationActions: PaginationActions = {
    goToPage,
    setItemsPerPage,
  };

  return [paginationState, paginationActions];
};

export default usePagination;
