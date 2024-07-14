import * as React from "react";
import { EmployeeLineItem } from "../interfaces/employees";
import { sleep } from "../utils/sleep";

export const useEmployee = () => {
  const [employees, setEmployees] = React.useState<EmployeeLineItem[]>([]);
  const [isDuplicated, setIsDuplicated] = React.useState<boolean>(false);
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
      if (employees.length) {
        checkDuplicateEmployee(employee);
      } else {
        setEmployees([...employees, { ...employee }]);
      }
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

  const sortEmployee = async (
    sortedEmployees: EmployeeLineItem[],
  ): Promise<void> => {
    try {
      setIsLoading(true);
      await sleep(2000);
      setEmployees(sortedEmployees);
    } catch (e: any) {
      setError("Could not set sorted employee");
    } finally {
      setIsLoading(false);
    }
  };

  const checkDuplicateEmployee = async (
    employee: EmployeeLineItem,
  ): Promise<void> => {
    try {
      setIsLoading(true);
      if (
        employees.filter(
          (item) =>
            item.name === employee.name &&
            (item.email === employee.email || item.phone === employee.phone),
        ).length
      ) {
        setIsDuplicated(true);
        await sleep(2000);
      } else {
        setEmployees([...employees, { ...employee }]);
      }
    } catch (e: any) {
      setError("Could not set sorted employee");
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
    sortEmployee,
    setIsDuplicated,
    isDuplicated,
    isLoading,
    error,
  };
};
