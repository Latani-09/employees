import {
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { ActionButton, DangerButton } from "../UI/Buttons";

export default function EmployeeCard({employee,handleClickOpen,handleEdit}){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  });
  
  const formattedAmount = formatter.format(employee.employee_salary);

    return(<div className="employeeCard" key={employee.id}>
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
                  {formattedAmount}
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
            </div>)}