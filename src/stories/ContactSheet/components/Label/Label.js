import React from 'react';
import { Typography, styled } from "@mui/material"; 

/**
 * simple label sized and spaced for the component grid
 */
 const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary, 
  margin: theme.spacing(0, 1),
  width: theme.spacing(20),
  lineHeight: 1,
  overflow: "hidden",
  fontSize: "0.7rem",
}));
 
export default Label;
