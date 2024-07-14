import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { EmployeeTableRowSkeleton } from "./EmployeeTableRowSkeleton";
import { NoRows } from "./NoRows";
import { EmployeeLineItem } from "../../interfaces/employees";
import { StyledCell, StyledHeaders } from "../../styles/modal";
import useSortableData from "../../hooks/useSortable";
import usePagination from "../../hooks/usePagination";

interface EmployeeTableProps {
  loading: boolean;
  employees: EmployeeLineItem[];
  handleEditEmployee: (employee: EmployeeLineItem) => void;
  removeEmployee: (employee: EmployeeLineItem) => void;
  sortEmployee: (employee: EmployeeLineItem[]) => void;
}
// TODO: unit tests
// 1. duplicate users

export const EmployeeTable = ({
  loading,
  employees,
  handleEditEmployee,
  removeEmployee,
  sortEmployee,
}: EmployeeTableProps) => {
  const {
    employeeDatas: sortedEmployeeDatas,
    requestSort,
    sortConfig,
  } = useSortableData(employees);

  const handleSortRequest = (key: keyof EmployeeLineItem) => {
    requestSort(key);
    sortEmployee(sortedEmployeeDatas);
  };

  const totalData = employees.length;
  const [paginationState, paginationActions] = usePagination({ totalData });

  const { currentPage, itemsPerPage } = paginationState;
  const { goToPage, setItemsPerPage } = paginationActions;

  const handleChangePage = (event: unknown, newPage: number) => {
    goToPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    goToPage(0); // Reset to first page when changing items per page
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <Grid item xs={12} md={12}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledCell>
              <StyledHeaders>
                <TableSortLabel
                  active={sortConfig?.key === "name"}
                  direction={
                    sortConfig?.key === "name" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSortRequest("name")}
                >
                  Name
                </TableSortLabel>
              </StyledHeaders>
            </StyledCell>
            <StyledCell>
              <StyledHeaders>
                <TableSortLabel
                  active={sortConfig?.key === "email"}
                  direction={
                    sortConfig?.key === "email" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSortRequest("email")}
                >
                  Email
                </TableSortLabel>
              </StyledHeaders>
            </StyledCell>
            <StyledCell>
              <StyledHeaders>Phone</StyledHeaders>
            </StyledCell>
            <StyledCell>
              <StyledHeaders>
                <TableSortLabel
                  active={sortConfig?.key === "occupation"}
                  direction={
                    sortConfig?.key === "occupation"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSortRequest("occupation")}
                >
                  Occupation
                </TableSortLabel>
              </StyledHeaders>
            </StyledCell>
            <TableCell>
              <StyledHeaders>Actions</StyledHeaders>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 10 }, (_) => <EmployeeTableRowSkeleton />)
            : employees?.slice(startIndex, endIndex).map((row) => {
                return (
                  <EmployeeTableRow
                    employee={row}
                    handleEditEmployee={handleEditEmployee}
                    removeEmployee={removeEmployee}
                  />
                );
              })}

          {!loading && !employees.length ? (
            <NoRows title={"Employees"} />
          ) : null}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalData}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Grid>
  );
};

export default EmployeeTable;
