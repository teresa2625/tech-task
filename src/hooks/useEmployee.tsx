import * as React from "react";
import { EmployeeLineItem } from "../interfaces/employees";
import { sleep } from "../utils/sleep";

export const useEmployee = () => {
  const [employees, setEmployees] = React.useState<EmployeeLineItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const listEmployees = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees([] as EmployeeLineItem[]);
    } catch (e: any) {
      setError("Could not list employees");
    } finally {
      setIsLoading(false);
    }
  };

  const createEmployee = async (employee: EmployeeLineItem): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees([...employees, { ...employee }]);
    } catch (e: any) {
      setError("Could not create employee");
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmployee = async (employee: EmployeeLineItem): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees(
        employees.map((existEmployee) =>
          existEmployee.id === employee.id
            ? { ...existEmployee, ...employee }
            : existEmployee,
        ),
      );
    } catch (e: any) {
      setError("Could not update employee");
    } finally {
      setIsLoading(false);
    }
  };

  const removeEmployee = async (employee: EmployeeLineItem): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees(
        employees.filter((existEmployee) => existEmployee.id !== employee.id),
      );
    } catch (e: any) {
      setError("Could not remove employee");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    listEmployees();
  }, []);

  return {
    employees,
    createEmployee,
    updateEmployee,
    removeEmployee,
    isLoading,
    error,
  };
};
