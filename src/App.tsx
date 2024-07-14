import React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { EmployeeTable } from "./components/EmpoyeeTable/EmployeeTable";
import { EmployeeLineItem } from "./interfaces/employees";
import { useEmployee } from "./hooks/useEmployee";
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import { writeEmployeesToExcel } from "./utils/excel";
import { StyledButtonBox } from "./styles/modal";
import AlertSnackbar from "./components/AlertSnackbar/AlertSnackbar";

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [noEmployeeAlert, setNoEmployeeAlert] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<EmployeeLineItem>();
  const {
    employees,
    createEmployee,
    updateEmployee,
    isLoading,
    removeEmployee,
    setIsDuplicated,
    sortEmployee,
    isDuplicated,
  } = useEmployee();
  console.log("isDuplicated", isDuplicated);

  return (
    <Box sx={{ padding: 2 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h5">Social Pro Tech Task</Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <Box>
        <StyledButtonBox>
          <Button
            color="primary"
            variant="outlined"
            sx={{ marginRight: 1 }}
            onClick={async () => {
              if (employees.length) {
                await writeEmployeesToExcel(employees);
              } else {
                setNoEmployeeAlert(true);
              }
            }}
          >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setSelectedEmployee(undefined);
              setIsModalOpen(true);
            }}
          >
            Add
          </Button>
        </StyledButtonBox>
      </Box>
      <EmployeeTable
        loading={isLoading}
        employees={employees}
        handleEditEmployee={(employee: EmployeeLineItem): void => {
          setIsModalOpen(true);
          setSelectedEmployee(employee);
        }}
        removeEmployee={removeEmployee}
        sortEmployee={sortEmployee}
      />
      {isModalOpen ? (
        <EmployeeModal
          loading={isLoading}
          existingEmployee={selectedEmployee}
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          handleClose={(): void => {
            setIsModalOpen(false);
            setSelectedEmployee(undefined);
          }}
        />
      ) : undefined}
      {noEmployeeAlert && (
        <AlertSnackbar
          isOpen={noEmployeeAlert}
          handleClose={setNoEmployeeAlert}
          message="No employees to export"
        ></AlertSnackbar>
      )}
      {isDuplicated && (
        <AlertSnackbar
          isOpen={isDuplicated}
          handleClose={setIsDuplicated}
          message="This employee is already in the list"
        ></AlertSnackbar>
      )}
    </Box>
  );
}

export default App;
