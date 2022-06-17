
# ContactSheet for React/MUI

The ContactSheet plugin for StoryBook enables the display of React components in all their supported states.

![ContactSheet Plugin for Storybook](http://rubiks.miltonjones.nl/assets/ContactSheetButtons.png)

## Prepare components for the ContactSheet

To use your components in the **ContactSheet** you will have to translate any non-canonical properties to 
ones supported by MUI.

```jsx
import { Button } from "@mui/material"; 

// Simple button
const ButtonComponent = ({children, state, ...props}) =>{
  const args = {

    // user props are overridden by ones defined in the component config
    ...props,

    // translating my component "state" prop to MUI "disabled" prop
    disabled: state === 'disabled'
  }
  return <Button {...args}>{children}</Button>
}
export default ButtonComponent;
```

## Configuring the ContactSheet 
ContactSheet stories can be creating by providing a ComponentConfig file for each component and importing the 
ContactSheet plugin its corresponding story. The **ComponentConfig** file defines the available component properties
hierarchically. The top level of the config "tree" defines the displayed rows. The bottom level of the tree 
defines ContactSheet columns.


```jsx
// config to display a basic MUI button
const ButtonConfig = {
  variant: {

    // property name
    name: "variant",

    // available values for this property
    options: ["contained", "outlined", "text"],

    // other properties are defined as descendants
    variants: {
      name: "state",
      options: ["enabled", "disabled"],
      variants: {
        name: "size",
        options: ["large", "medium", "small"],
        variants: {
          name: "color",
          options: ["primary", "secondary",  "error", "info"],
        },
      },
    },
  },

  // page title for the ContactSheet story
  title: "Buttons",

  // optional innerText for components that support text
  innerText: "button",

  // the tagName property is used to generate JSX code for the component
  tagName: "Button", 

  // (optional) button is wrapped in its own component to enable
  // future decoration. Using an undecorated Button here would also be valid.
  Component: ButtonComponent,
};
```

## Writing the story

To create a story using the **ContactSheet**, declare the story as usual but render the 
***ContactSheet*** instead of your component. The ComponentConfig will contain all the information 
to render all defined instances of the component.

```jsx

// import story component and config file
import { 
  ButtonComponent, 
  // as best practice, config should be in the same folder
  // as its component and exposed via barrel file
  ButtonConfig 
} from '.';

// import ContactSheet plugin and config file
import { ContactSheet, ContactSheetConfig } from '../../stories/ContactSheet';  

// declare story normally.
export default {
  title: 'Example/Button',
  component: ButtonComponent
};

// story template renders the ContactSheet which will 
// contain the component that was declared above
const Template = (args) => <ContactSheet {...args} />

// create story object
export const DefaultView = Template.bind({});

// use the prepareStory method to configure the story.
// args and argTypes will be added automatically
ContactSheetConfig.prepareStory(DefaultView, ButtonConfig);

```

  
