import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import EmployeeTable from "./EmployeeTable";

test("renders modal", async () => {
  render(
    <EmployeeTable
      loading={false}
      employees={[
        {
          id: "",
          name: "",
          email: "",
          phone: "",
          occupation: "",
          created: new Date(Date.now()),
        },
      ]}
      handleEditEmployee={() => {}}
    />,
  );
  const modal = screen.getByRole("dialog");
  expect(modal).toBeInTheDocument();
});

test("renders form", async () => {
  render(
    <EmployeeTable
      loading={false}
      employees={[
        {
          id: "",
          name: "",
          email: "",
          phone: "",
          occupation: "",
          created: new Date(Date.now()),
        },
      ]}
      handleEditEmployee={() => {}}
    />,
  );
  const nameText = screen.getAllByText(/Name/i);
  expect(nameText.length).toBe(2);

  const saveButton = screen.getByRole("button", { name: "Save" });
  expect(saveButton).toBeInTheDocument();
});
