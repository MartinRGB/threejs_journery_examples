import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Example } from './Example';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example',
  component: Example,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      table: {
        disable: true,
      },
    },
    desc: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Example>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Starter = Template.bind({});
Starter.args = {
  title: 'starter',
  desc: 'simple threejs starter',
  id: 'starter'
};

export const Lesson1 = Template.bind({});
Lesson1.args = {
  title: 'lesson 1',
  desc: 'simple threejs starter',
  id: 'lesson1'
};

