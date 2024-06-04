import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchEmployeesData } from "./fetchService";
import EmployeeCard from "./Components/EmployeeCard";
import { EditEmployee } from "./Components/EditEmployee";
import { ActionButton, DangerButton } from "./UI/Buttons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SimpleAlert from "./Components/Alert";

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
  const [alert,setAlert]=useState(false);
  const [message,setMessage]=useState();
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
    setMessage(`selected Employee deleted!`)
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      setMessage("");
    }, 3000);

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
        <div className={`employeesView ${popEdit ? "blur-background" : ""}`}>
          {employees.map((employee) => (
            <EmployeeCard employee={employee} key={employee.id} handleClickOpen={handleClickOpen} handleEdit={handleEdit}/>
          ))}
        </div>
        {alert&&<SimpleAlert message={message}/>}
        {popEdit && (
          <EditEmployee
            employee={employeeToEdit}
            setPopEdit={setPopEdit}
            setEmployees={setEmployees}
            setAlert={setAlert}
            setMessage={setMessage}
          />
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" fontStyle='bold'>
            {"Confirm deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"  >
            Are you sure you want to permanently delete this employee? This action cannot be undone.
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
