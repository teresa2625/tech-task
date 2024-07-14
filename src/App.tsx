import React from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { EmployeeTable } from "./components/EmpoyeeTable/EmployeeTable";
import { EmployeeLineItem } from "./interfaces/employees";
import { useEmployee } from "./hooks/useEmployee";
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import { writeEmployeesToExcel } from "./utils/excel";
import { StyledButtonBox } from "./styles/modal";

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
    sortEmployee,
  } = useEmployee();

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
        <Snackbar
          open={noEmployeeAlert}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={(): void => {
            setNoEmployeeAlert(false);
          }}
        >
          <Alert
            onClose={(): void => {
              setNoEmployeeAlert(false);
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            No employees to export
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default App;
