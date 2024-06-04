import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchEmployeesData } from "./fetchService";
import {
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { ActionButton, DangerButton } from "./UI/Buttons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function App() {
  const isDevelopmentRun =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  const isMountedRef = useRef(!isDevelopmentRun);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popEdit, setPopEdit] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();

  const getEmployeesData = async () => {
    let employeesData = await fetchEmployeesData();
    if (employeesData) {
      setEmployees(employeesData.data);
      setLoading(false);
    } else if (employeesData.error) {
      setLoading(false);
      setError(employeesData.error);
    }
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    getEmployeesData();
  }, []);

  const handleDelete = () => {
    setEmployees(employees.filter((employee) => employee.id !== idToDelete));
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdToDelete(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setPopEdit(true);
  };

  if (loading) {
    return <div>Loading..........</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <>
        <div className="employeesView">
          {employees.map((employee) => (
            <div className="employeeCard" key={employee.id}>
              <div className="entry">
                <div className="tag">
                  {employee.profile_image.length > 0 ? (
                    <img width={80} height={80} src={employee.profile_image} alt="Profile" />
                  ) : (
                    <UserCircleIcon width={80} height={80} />
                  )}
                </div>
                <div className="employeeName">{employee.employee_name}</div>
              </div>

              <div className="entry">
                <div className="tag">Salary</div>
                <div className="value">
                  <span>LKR</span>
                  {employee.employee_salary}
                </div>
              </div>
              <div className="entry">
                <div className="tag">Age</div>
                <div className="value">{employee.employee_age}</div>
              </div>
              <div className="actions">
                <DangerButton onClick={() => handleClickOpen(employee.id)}>
                  <TrashIcon width={20} height={20} />
                </DangerButton>
                <ActionButton onClick={() => handleEdit(employee)}>
                  <PencilIcon width={20} height={20} />
                </ActionButton>
              </div>
            </div>
          ))}
        </div>
        {popEdit && (
          <EditEmployee
            employee={employeeToEdit}
            setPopEdit={setPopEdit}
            setEmployees={setEmployees}
          />
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Want to delete employee selected?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <DangerButton className="dangerBtn" onClick={handleDelete} autoFocus>
              Confirm Delete
            </DangerButton>
            <ActionButton onClick={handleClose}>Cancel</ActionButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default App;

const EditEmployee = ({ employee, setPopEdit, setEmployees }) => {
  const [employeeEdit, setEmployeeEdit] = useState(employee);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "employee_salary" || name === "employee_age") && !/^\d*$/.test(value)) {
      return;
    }
    setEmployeeEdit((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = [];
    if (!employeeEdit.employee_name) tempErrors.push("Name");
    if (!employeeEdit.employee_salary) tempErrors.push("Salary");
    if (!employeeEdit.employee_age) tempErrors.push("Age");
    setErrors(tempErrors);
    return tempErrors.length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === employeeEdit.id ? employeeEdit : emp
        )
      );
      setPopEdit(false);
    }
  };

  return (
    <div className="employeeEdit">
      <div className="editHeader">
        <div className="title">
          <h6>Edit employee details</h6>
        </div>
      </div>

      <div className="entryEdit">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="employee_name"
          value={employeeEdit.employee_name}
          onChange={handleChange}
        />
      </div>
      <div className="entryEdit">
        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          name="employee_salary"
          value={employeeEdit.employee_salary}
          onChange={handleChange}
        />
      </div>
      <div className="entryEdit">
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          className="text-white"
          name="employee_age"
          value={employeeEdit.employee_age}
          onChange={handleChange}
        />
      </div>
      {errors.length > 0 && <div className="error">Fill required inputs</div>}
      <div className="actions flex flex-row">
        <div>
          <ActionButton onClick={handleSave}>Save</ActionButton>
        </div>
        <div>
          <Button color="secondary" onClick={() => setPopEdit(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
