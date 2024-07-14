import { Dialog, DialogContent } from "@mui/material";
import {
  createDefaultEmployee,
  EmployeeLineItem,
} from "../../interfaces/employees";
import { EmployeeForm } from "./EmployeeModalForm";
import { StyledDialogTitle } from "../../styles/modal";

interface EmployeeModalProps {
  loading: boolean;
  existingEmployee?: EmployeeLineItem;
  createEmployee: (
    employee: EmployeeLineItem,
    assignEmployee?: boolean,
  ) => void;
  updateEmployee: (employee: EmployeeLineItem) => void;
  handleClose: () => void;
}

export default function EmployeeModal({
  loading,
  existingEmployee,
  createEmployee,
  updateEmployee,
  handleClose,
}: EmployeeModalProps) {
  return (
    <Dialog fullWidth open onClose={handleClose}>
      <StyledDialogTitle>Add Employee</StyledDialogTitle>
      <DialogContent>
        <EmployeeForm
          loading={loading}
          employee={existingEmployee || createDefaultEmployee()}
          handleSubmit={async (employee: EmployeeLineItem): Promise<void> => {
            if (existingEmployee) {
              await updateEmployee(employee);
            } else {
              await createEmployee(employee);
            }
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
