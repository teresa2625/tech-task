import { IconButton, TableCell, TableRow, Tooltip, Zoom } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EmployeeLineItem } from "../../interfaces/employees";
interface EmployeeTableRowProps {
  employee: EmployeeLineItem;
  handleEditEmployee: (employee: EmployeeLineItem) => void;
  removeEmployee: (employee: EmployeeLineItem) => void;
}

export const EmployeeTableRow = ({
  employee,
  handleEditEmployee,
  removeEmployee,
}: EmployeeTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{employee.name}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.phone}</TableCell>
      <TableCell>{employee.occupation}</TableCell>
      <TableCell>
        <Tooltip placement="top" title="Edit" TransitionComponent={Zoom}>
          <IconButton
            color="primary"
            size="large"
            onClick={() => handleEditEmployee(employee)}
          >
            <EditIcon
              sx={{
                fontSize: "1.1rem",
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip placement="top" title="Remove" TransitionComponent={Zoom}>
          <IconButton
            color="error"
            size="large"
            onClick={() => removeEmployee(employee)}
          >
            <DeleteIcon
              sx={{
                fontSize: "1.1rem",
              }}
            />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
