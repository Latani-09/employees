import { useState, useEffect, useRef } from 'react';
import './App.css';
import { fetchEmployeesData } from './fetchService';

function App() {
  const isDevelopmentRun = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const isMountedRef = useRef(!isDevelopmentRun);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popEdit, setPopEdit] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

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

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
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
        <div className='employeesView'>
          {employees && employees.map(employee => (
            <div className='employeeCard' key={employee.id}>

              <div className="entry"><div className='tag'>Name</div><div className='value '>{employee.employee_name}</div></div>
              <div className='entry'><div className='tag'>Salary</div><div className='value'>{employee.employee_salary} LKR</div></div>
              <div className='entry'><div className='tag'>Age</div><div className='value'>{employee.employee_age}</div></div>
              <div className='actions'>
              <button className='closeBtn' onClick={() => handleDelete(employee.id)}>Delete
</button>
                <button className='editBtn' onClick={() => handleEdit(employee)}>&#9998; </button>
              </div>
            </div>
          ))}
        </div>
        {popEdit ? (
          <EditEmployee
            employee={employeeToEdit}
            setPopEdit={setPopEdit}
            setEmployees={setEmployees}
          />
        ) : null}
      </>
    );
  }
}

export default App;

const EditEmployee = ({ employee, setPopEdit, setEmployees }) => {
  const [employeeEdit, setEmployeeEdit] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employeeEdit.id ? employeeEdit : emp
      )
    );
    setPopEdit(false);
  };

  return (
    <div className='employeeEdit'>
      <div className='editHeader flex flex-row'>
        <div className='title'>
          <h6>Edit employee details</h6>
        </div>
        <div className='closeBtn' onClick={() => setPopEdit(false)}>&#10005;</div>
      </div>

      <div className=' entryEdit'>

        <label htmlFor="name" >Name:</label>

        <input
          id='name'
          name='employee_name'

          value={employeeEdit.employee_name}
          onChange={handleChange}
        />

      </div>
      <div className=' entryEdit'>
        <label htmlFor="salary">Salary:</label>

        <input
          id='salary'
          name='employee_salary'
          value={employeeEdit.employee_salary}
          onChange={handleChange}
        />
      </div>
      <div className='entryEdit'>

        <label htmlFor="age">Age:</label>

        <input
          id='age'
          className=' text-white'
          name='employee_age'
          value={employeeEdit.employee_age}
          onChange={handleChange}
        />

      </div>
      <div className="saveBtn">
        <div>
          <button onClick={handleSave}>Save</button></div></div>
    </div>

  );
};
