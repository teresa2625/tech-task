import {
  render,
  screen,
} from "@testing-library/react";
import EmployeeModal from "./EmployeeModal";

// TODO: Add more test cases

test("renders modal", async () => {
  render(
    <EmployeeModal
      loading={false}
      existingEmployee={{
        id: "",
        name: "",
        email: "",
        phone: "",
        occupation: "",
        created: new Date(Date.now()),
      }}
      createEmployee={() => {}}
      updateEmployee={() => {}}
      handleClose={() => {}}
    />,
  );
  const modal = screen.getByRole("dialog");
  expect(modal).toBeInTheDocument();
});

test("renders form", async () => {
  render(
    <EmployeeModal
      loading={false}
      existingEmployee={{
        id: "",
        name: "",
        email: "",
        phone: "",
        occupation: "",
        created: new Date(Date.now()),
      }}
      createEmployee={() => {}}
      updateEmployee={() => {}}
      handleClose={() => {}}
    />,
  );
  const nameText = screen.getAllByText(/Name/i);
  expect(nameText.length).toBe(2);

  const saveButton = screen.getByRole("button", { name: "Save" });
  expect(saveButton).toBeInTheDocument();
});
