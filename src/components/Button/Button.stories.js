import React from 'react'; 
import { Typography, Divider, Stack, styled } from "@mui/material";  
import Flex from '../../stories/ContactSheet/components/Flex/Flex';

// import story component
import { ButtonComponent, ButtonConfig } from '.';

// import ContactSheet plugin
import { ContactSheet, ContactSheetConfig } from '../../stories/ContactSheet';  

export default {
  title: 'Example/Button',
  component: ButtonComponent
};

const Line = styled(Divider)(({theme})=>({
  margin: theme.spacing(1, 0, 3, 0)
}))

const Template = (args) => {
  return <Stack>
    <Flex center spaced>

    <Typography variant="h6">{args.title}</Typography>
      <Typography variant="caption">{args.count} variants</Typography>
      

    </Flex>
  <Line />
  <ContactSheet {...args} /></Stack>
};

export const DefaultView = Template.bind({});

// use the prepareStory method to configure the story
ContactSheetConfig.prepareStory(DefaultView, ButtonConfig);
