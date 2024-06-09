import { useState, useEffect, useRef, useReducer } from "react";
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
import { initialState, reducer } from "./reducer";
import { Box, CircularProgress } from "@mui/material";
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isDevelopmentRun =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  const isMountedRef = useRef(!isDevelopmentRun);
  const [loading, setLoading] = useState(true);
  const [popEdit, setPopEdit] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState();

  const getEmployeesData = async () => {
    if (state.employees.length == 0) {
      await fetchEmployeesData({ dispatch });
    }
    if (state.employees.length > 0) {
      setLoading(false);
    } else if (state.error.length > 0) {
      setLoading(false);
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
    if (state.employees.find((employee) => employee.id === idToDelete)) {
      dispatch({
        type: "delete",
        id: idToDelete,
      });
    }
    setOpen(false);
    setMessage(`Selected Employee deleted!`);
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

  if (loading && state.employees.length == 0) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else if (state.error.length > 0) {
    return <div>Error: {state.error}</div>;
  } else {
    return (
      <>
        <div className={`employeesView ${popEdit ? "blur-background" : ""}`}>
          {state.employees &&
            state.employees.map((employee) => (
              <EmployeeCard
                employee={employee}
                key={employee.id}
                handleClickOpen={handleClickOpen}
                handleEdit={handleEdit}
              />
            ))}
        </div>
        {alert && <SimpleAlert message={message} />}
        {popEdit && (
          <div className="overlay">
            <EditEmployee
              employee={employeeToEdit}
              setPopEdit={setPopEdit}
              setAlert={setAlert}
              setMessage={setMessage}
              dispatch={dispatch}
              className="popup"
            />
          </div>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" fontStyle="bold">
            {"Confirm deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to permanently delete this employee? This
              action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <DangerButton
              className="dangerBtn"
              onClick={handleDelete}
              autoFocus
            >
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
