
/**
 * creates JSX code from an args object
 * @param {object} args - arguments for the generated component code
 * @returns generated code string
 */
 const createJSX = (args) => {
  const {
    // ? name of the component tag
    tagName,
    // ? compnent inner text, if any
    innerText,
    // ? component properties
    ...properties
  } = args;

  // * serialize properties to attribute string
  const attributes = Object.keys(properties)
    .map((f) => `${f}="${properties[f]}"`)
    .join(" ");

  // * component open tag
  const openTag = `<Specimen.${tagName} ${attributes}`;
  if (!innerText) {
    // * if no inner text, close tag and return here
    return `${openTag} />`;
  }
  // * otherwise return with inner text and a close tag
  return `${openTag} >\n  ${innerText}\n</Specimen.${tagName}>`;
};

export default createJSX;