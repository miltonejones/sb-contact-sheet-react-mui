import React from 'react'; 
import { Stack, Box } from "@mui/material";
import useClipboard from './hooks/useClipboard'; 
import { Flex, Frame, Label,  SpecimenCard } from './components';



/**
 * renders a given component in all its possible variants
 */
 const ContactSheet = (props) => {
  // + deconstruct the component props
  const {
    // ? reference to the variant node being passed in
    variant,
    // ? true/false whether this is a child node
    child,
    // ? list of accumulated arguments from the recursion
    accumulatedProps = {},
  } = props;

  // + deconstruct the variant
  const {
    // ? property name of the variant
    name,
    // ? possible values for this property
    options,
    // ? descendant variants, if any
    variants,
  } = variant;

  // + apply filters
  // $ a property name appended with ':' is a filter
  const filter_name = props[`${name}:`];

  // * only show options matching the filter, if there is one
  const shownOptions = options.filter((f) => !filter_name || f === filter_name);

  // + display component specimen row
  // * when there are no more descendant nodes, draw the component row
  if (!variants) {
    return (
      // display the list of options for this variant
      <Flex>
        {shownOptions.map((option) => {
          // * append this option to the accumulated set
          const properties = { ...accumulatedProps, [name]: option };
          return (
            <SpecimenCard {...props} option={option} properties={properties} />
          );
        })}
      </Flex>
    );
  }

  // * top-level nodes are wrapped vertically in Paper Stacks.
  // * everything else is rendered in a horizontal row
  const Wrap = !!child ? Flex : Frame;

  // + render intermediate nodes
  return (
    // $ NOTE: each Stack is a child of the previous one,
    // $       but is displayed as a sibling unless
    // $       it is a top-level element
    <Stack data-testid="test-for-ContactSheet">
      {/* display the list of options for this variant */}
      {shownOptions.map((option) => {
        // * append this option to the accumulated set
        const properties = { ...accumulatedProps, [name]: option };

        // * configure wrapper style
        const sx = !!child
          ? // ? childen have no margin or padding to
            // ? make them appear in an even line
            { m: 0, pt: 0 }
          : // ? spacing provided for parent nodes
            { mt: 4, mb: 2, p: 3 };

        return (
          <Wrap className="padded" key={option} sx={sx}>
            {/* parent nodes get a card header */}
            {!child && (
              <legend>
                {name}: {option}
              </legend>
            )}

            {/* child nodes displayed as siblings */}
            {!!child && (
              <Label>
                <b>{name}</b> <br /> {option}
              </Label>
            )}

            {/* component calls itself with child flag always set to TRUE */}
            {!!variants && (
              <ContactSheet
                child
                {...props}
                accumulatedProps={properties}
                variant={variants}
              />
            )}
          </Wrap>
        );
      })}
    </Stack>
  );
};


ContactSheet.defaultProps = {};
export default ContactSheet;

