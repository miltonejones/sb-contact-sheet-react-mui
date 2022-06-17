import ButtonComponent from "./Button";

const ButtonConfig = {
  variant: {
    name: "variant",
    options: ["contained", "outlined", "text"],
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
  title: "Buttons",
  innerText: "button",
  tagName: "Button", 
  Component: ButtonComponent,
};

export default ButtonConfig;