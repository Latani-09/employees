import Alert from '@mui/material/Alert';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SimpleAlert({message}) {
  return (
    <div className='alertBox'>
    <Alert icon={<CheckCircleIcon width={30} height={30} />} style={{background:'none',color:'white'}} severity="success">
      <p style={{fontSize:'20px'}}>{message}</p>
    </Alert>
    </div>
  );
}