import Button from "@mui/material/Button";
import {useState} from 'react';
import { ActionButton } from "../UI/Buttons";
export const EditEmployee = ({ dispatch,employee, setPopEdit, setEmployees,setAlert,setMessage }) => {
    const [employeeEdit, setEmployeeEdit] = useState(employee);
    const [errors, setErrors] = useState({});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if ((name === "employee_salary" || name === "employee_age") && !/^\d*$/.test(value)) {
        return;
      }
      setEmployeeEdit((prev) => ({ ...prev, [name]: value }));
    };
  
    const validate = () => {
      let tempErrors = {
        name:false,
        age:false,
        salary:false
      };
      if (!employeeEdit.employee_name) tempErrors.name=true;
      if (!employeeEdit.employee_salary) tempErrors.age=true;
      if (!employeeEdit.employee_age) tempErrors.salary=true;
      console.log(tempErrors);
      setErrors(tempErrors);
      return !(tempErrors.salary||tempErrors.age||tempErrors.name);
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
        { <div className="entryError">{ errors.name  && 'input is required'} </div>}

        <div className="entryEdit">
          <label htmlFor="salary">Salary:</label>
          <input
            id="salary"
            name="employee_salary"
            value={employeeEdit.employee_salary}
            onChange={handleChange}
          />
        </div>
        <div className="entryError">{ errors.name  && 'input is required'}  </div>

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
       <div className="entryError">{ errors.name  && 'input is required'}  </div>
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
  