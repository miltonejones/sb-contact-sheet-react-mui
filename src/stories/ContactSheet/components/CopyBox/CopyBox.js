import React from 'react';  
import { Box, styled } from "@mui/material"; 


/**
 * custom Box with a styled inner menu button
 */
 const CopyBox = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: theme.spacing(1),
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  lineHeight: 1,

  // place and hide menu button in inactive state
  "& .menu": {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: "0.6rem",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5),
    zIndex: 10,
    opacity: 0,
    transition: "opacity 0.4s linear",
  },

  // show the menu in hover state
  "&:hover": {
    outline: "solid 1px" + theme.palette.grey[300],
    "& .menu": {
      // the menu button is translucent until hovered
      opacity: 0.3,
      "&:hover": {
        opacity: 1,
      },
    },
  },

  // add an colored outline in active state
  "&:active": {
    outline: "solid 1px " + theme.palette.primary.border,
  },

  // play animation when copied
  "&.copied": {
    cursor: "progress",
  },
}));

CopyBox.defaultProps = {};
export default CopyBox;
