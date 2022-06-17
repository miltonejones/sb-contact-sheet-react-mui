import React from 'react';
import { Button } from "@mui/material";  

const ButtonComponent = ({children, state, ...props}) =>{
  const args = {
    ...props,
    disabled: state === 'disabled'
  }
  return <Button {...args}>{children}</Button>
}

ButtonComponent.defaultProps = {};
export default ButtonComponent;
