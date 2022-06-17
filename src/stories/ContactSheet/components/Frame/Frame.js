import React from 'react';
import { Box, styled  } from "@mui/material"; 


 const Frame = styled(Box)(({ theme }) => ({
  position: "relative",
  border: "solid 1px " + theme.palette.grey[200],
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,

  // constrain size to that of inner content
  display: "inline-block",

  // expanded vertical margins leave room for the legend header
  margin: theme.spacing(3, 1),

  // position the legend above the frame
  "& legend": {
    position: "absolute",
    top: theme.spacing(-4.5),
    left: 0,
    fontSize: "0.6rem",

    // add a little ⁘ icon before the frame title
    // because we absolutely have to
    "&:before": {
      content: '"⁘"',
      marginRight: theme.spacing(1),
    },
  },

  // give the frame a Figma-like hover effect
  "&:hover": {
    border: "solid 1px " + theme.palette.primary.border,
    "& legend": {
      color: theme.palette.primary.dark,
      outline: "solid 1px " + theme.palette.primary.border,
    },
  },
  // fixme: need to do this with props
  "&.padded": {
    padding: theme.spacing(4),
  },
}));


Frame.defaultProps = {};
export default Frame;
