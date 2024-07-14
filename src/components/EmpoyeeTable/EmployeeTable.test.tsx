import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import EmployeeTable from "./EmployeeTable";
import { EmployeeLineItem } from "../../interfaces/employees";

test("renders loading", async () => {
  render(
    <EmployeeTable
      loading={true}
      employees={[]}
      handleEditEmployee={() => {}}
      removeEmployee={() => {}}
      sortEmployee={() => {}}
    />,
  );
  const loadingText = screen.queryByText(/No Employees/i);
  expect(loadingText).not.toBeInTheDocument();
});

test("renders empty table", async () => {
  render(
    <EmployeeTable
      loading={false}
      employees={[]}
      handleEditEmployee={() => {}}
      removeEmployee={() => {}}
      sortEmployee={() => {}}
    />,
  );
  const emptyTable = screen.getByText(/No Employees/i);
  expect(emptyTable).toBeInTheDocument();
});

test("renders table with one row", async () => {
  render(
    <EmployeeTable
      loading={false}
      employees={[
        {
          id: "",
          name: "testName",
          email: "",
          phone: "",
          occupation: "",
          created: new Date(Date.now()),
        },
      ]}
      handleEditEmployee={() => {}}
      removeEmployee={() => {}}
      sortEmployee={() => {}}
    />,
  );
  const nameText = screen.getAllByText("testName");
  expect(nameText.length).toBe(1);

  const editButton = screen.getByRole("button", { name: "Edit" });
  expect(editButton).toBeInTheDocument();
});
