import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Typography,
} from "@mui/material";
import { EmployeeTableRow } from "./EmployeeTableRow";
import { EmployeeTableRowSkeleton } from "./EmployeeTableRowSkeleton";
import { NoRows } from "./NoRows";
import { EmployeeLineItem } from "../../interfaces/employees";
import { StyledCell } from "../../styles/modal";

interface EmployeeTableProps {
  loading: boolean;
  employees: EmployeeLineItem[];
  handleEditEmployee: (employee: EmployeeLineItem) => void;
  removeEmployee: (employee: EmployeeLineItem) => void;
}
// TODO: unit tests
// 1. duplicate users
// 2. constants
// 4. sort functions
// 5. pagination
// 6. search function
// 7. main bg
// 8. head banner
// 9. side bar

export const EmployeeTable = ({
  loading,
  employees,
  handleEditEmployee,
  removeEmployee,
}: EmployeeTableProps) => {
  return (
    <Grid item xs={12} md={12}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledCell>
              <Typography>Name</Typography>
            </StyledCell>
            <StyledCell>
              <Typography>Email</Typography>
            </StyledCell>
            <StyledCell>
              <Typography>Phone</Typography>
            </StyledCell>
            <StyledCell>
              <Typography>Occupation</Typography>
            </StyledCell>
            <TableCell>
              <Typography>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 10 }, (_, index) => (
                <EmployeeTableRowSkeleton />
              ))
            : employees?.map((row) => {
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
    </Grid>
  );
};

export default EmployeeTable;
