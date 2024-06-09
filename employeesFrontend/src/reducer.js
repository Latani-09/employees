export const initialState = {
  employees: [],
  error: '',
  loading: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return { ...state, employees: action.data, loading: false };
    case "edit":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.employeeEdit.id ? action.employeeEdit : emp
        ),
      };
    case "delete":
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.id),
      };
    case "error":
      return { ...state, error: action.error, loading: false };
    default:
      throw new Error();
  }
};
