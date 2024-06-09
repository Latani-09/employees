import Button from "@mui/material/Button";
import { styled } from '@mui/system';
export const DangerButton = styled(Button)({
    color: 'rgb(255,50,50)',
    padding: '10px 5px !important',
    minWidth:'40px',
    '&:hover': {
      backgroundColor: 'rgb(255,50,50)',
      color:'white'
    },
    '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      }
  });
  
export const ActionButton = styled(Button)({
    color: 'rgb(50,50,255)',
    minWidth:'40px',
    '&:hover': {
      backgroundColor: 'rgb(50,50,255)',
      color:'white'
    },
    '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      }
  });