import React from 'react'; 
import { Box } from "@mui/material";  
import { CopyBox, Label } from '..';
import useClipboard from '../../hooks/useClipboard'; 
import { jcss, createJSX } from '../../../../utils';


/**
 * renders selected component with code copy wrapper
 */
 const SpecimenCard = ({
  // ? Component being rendered
  Component,
  // ? the variant option this Component represents
  option,
  // ? props of the Component
  properties,
  // ? Component inner text, if any
  innerText,
  // ? string Component name for code generation
  tagName,
}) => {
  // ? clipboard methods
  const { copy, copied } = useClipboard();

  // generate code and copy to clipboard
  const copyCode = () => copy(createJSX({ ...properties, innerText, tagName }));
  // return <i>hello</i>
  return (
    <CopyBox className={jcss({ copied })}>
      {/* hidden copy button shows on hover */}
      <Box onClick={copyCode} className="menu">
        {/* show message when button is clicked */}
        {copied ? "copied!" : "copy code"}
      </Box>
        {/* display component here */}
        <Component {...properties}>{innerText}</Component>
      <br />
      {/* label showing component option name */}
      <Label>{option}</Label> 
    </CopyBox>
  );
};


SpecimenCard.defaultProps = {};
export default SpecimenCard;
