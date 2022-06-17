import React from 'react'; 
import { Box, styled  } from "@mui/material"; 


/**
 * creates a flex-styled Box
 */
const Flex = styled(Box)(({ theme, top, center,  spaced }) => ({
  display: "flex",
  marginTop: top ? theme.spacing(1) : 0,
  alignItems: center ? "center" : "flex-start", 
  justifyContent: spaced ? "space-between" : ""
}));


Flex.defaultProps = {};
export default Flex; 
