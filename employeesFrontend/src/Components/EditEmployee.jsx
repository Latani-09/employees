import Button from "@mui/material/Button";
import {useState} from 'react';
import { ActionButton } from "../UI/Buttons";
export const EditEmployee = ({ dispatch,employee, setPopEdit, setEmployees,setAlert,setMessage }) => {
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
        dispatch({
          type:'edit',
          employeeEdit:employeeEdit
        })
        setPopEdit(false);
        setMessage('Employee details updated');
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          setMessage("");
        }, 3000);
        
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
  