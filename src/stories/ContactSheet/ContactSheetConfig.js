 

// * list of default props to add to the settings table in Storybook
const defaultParamNames = ["innerText"];

// * list of props to exclude from the settings table
const excludedParamNames = [
  "figma",
  "tagName",
  "count",
  "variant",
  "title",
  "Component",
];

/**
 * * adds a parameter to the Settings section of the args table
 * $ ref -> https://storybook.js.org/docs/react/essentials/controls
 * @param {object} object - argsTable seed object
 * @returns function to decorate the object
 */
const createDefaultParam =
  (object) =>
  /**
   * decorates an object with an argsType node for the Settings table
   * @param {*} name - name of the argument
   */
  (name) =>
    Object.assign(object, {
      [name]: {
        table: {
          category: "Settings",
        },
      },
    });

/**
 * default params to dress the args table with
 */
const defaultParams = ((argsTable) => {
  defaultParamNames.map(createDefaultParam(argsTable));
  return argsTable;
})({});

/**
 * * counts the variants in a set
 * @param {object} variant - variant configuration node
 * @param {number} count - variant count to be returned
 * @returns variant count
 */
const countParams = (variant, count = 1) => {
  const {
    // ? options for this variant
    options,
    // ? descendant variants, if any
    variants,
  } = variant;

  // $ the total count is the product of this and all descendant options
  count = count * options.length;

  if (!!variants) {
    // * if there are descendants, recurse through those
    return countParams(variants, count);
  }

  // * otherwise return the count
  return count;
};

/**
 * * creates an argsTable for Storybook from a variant set
 * @param {object} variant - variant configuration node
 * @param {object} argsTable - argsTable to be returned
 * @returns argsTable object
 */
const createParams = (variant, argsTable = {}) => {
  const {
    // ? variant property name
    name,
    // ? list of available options for this variant
    options,
    // ? descendant variants, if any
    variants,
  } = variant;

  // displayed value for the empty string
  const emptyProp = "<no filter>";

  const optionKeys = options
    .map((option) => ({ [option]: option }))
    .concat({ "": emptyProp });

  // create the argType object for this variant
  // $ ref -> https://storybook.js.org/docs/react/api/argtypes
  const argType = {
    // $ a propery name appended with ':' is a filter
    [`${name}:`]: {
      table: {
        category: "Variants",
        subcategory: "Select to filter",
      },
      // * populating select with name/value pairs to support
      // * the empty string at the end having a visible value
      // append an empty string to clear the filter
      options: options.concat(""),
      // add a text alias for the empty string
      mapping: options.concat(emptyProp),
      // create the select control with labels
      // $ ref -> https://storybook.js.org/docs/react/essentials/controls
      control: {
        // * show options in a select box
        type: "select",
        // * object labels create a name/value mapping for the select
        labels: ((s, o) => {
          o.map((i) => Object.assign(s, i));
          return s;
        })({}, optionKeys),
      },
    },
  };

  // * add this type to the argsTable
  Object.assign(argsTable, argType);

  // * if there are descendants recurse through those
  if (!!variants) {
    return createParams(variants, argsTable);
  }

  // * otherwise return the args table
  return {
    ...argsTable,
    // * append table with the default params
    ...defaultParams,
  };
};

/**
 * * decorates a Storybook story with arguments from a
 * * variant config object
 * @param {object} story - Storybook story object
 * @param {object} config - Variant configuration object
 */
const prepareStory = (story, config) => {
  // * get the total count of variants for display
  const count = countParams(config.variant);

  // * set configuration and count as arguments to the story
  story.args = { ...config, count };

  console.error ({ ...config, count })

  // * generate the argsTable for the Controls tab
  story.argTypes = createParams(config.variant);

  // * set excluded parameters in the Controls tab, we
  // * just want them to see Variants in these stories
  // $ ref -> https://storybook.js.org/docs/react/essentials/controls
  story.parameters = {
    controls: {
      // ? only include innerText if this config supports it
      exclude: excludedParamNames.concat(!!config.innerText ? [] : "innerText"),
    },
  }; 
};

const ContactSheetConfig = {  
  prepareStory 
};

export default ContactSheetConfig;