import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@/components/Buttton.Component';
import { ComponentProps } from 'react';
import { IconRightArr, IconsArr } from './helper';

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['filled', 'light', 'outline', 'subtle', 'gradient'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'inline-radio',
      },
    },

    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'inline-radio',
      },
    },

    color: {
      control: 'color',
      if: { arg: 'variant', neq: 'gradient' }, // Only show color when not in gradient mode
    },
    from: {
      control: 'color',
      if: { arg: 'variant', eq: 'gradient' }, // Only show when variant is gradient
    },
    to: {
      control: 'color',
      if: { arg: 'variant', eq: 'gradient' }, // Only show when variant is gradient
    },
    deg: {
      control: {
        type: 'number',
        min: 0,
        max: 360,
      },
      if: { arg: 'variant', eq: 'gradient' }, // Only show when variant is gradient
    },
    leftsection: {
      control: 'select',
      options: ['IconAB2', 'IconAccessible', 'IconApple'],
      description: 'Example Icon Uses from Tablar Icons Just to demonstrate',
    },
    rightsection: {
      control: 'select',
      options: ['IconAssembly', 'IconBrandDribbble', 'IconBrightnessAutoFilled'],
      description: 'Example Icon Uses from Tablar Icons Just to demonstrate',
    },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Filled: Story = {
  args: {
    variant: 'filled',
    radius: 'md',
    color: '#339af0',
    children: 'Button',
    size: 'sm',
  },
  render: (args) => {
    const { leftsection, rightsection } = args;
    const iconLeft = IconsArr[leftsection as keyof typeof IconsArr] || null;
    const iconRight = IconRightArr[rightsection as keyof typeof IconsArr] || null;

    return (
      <Button {...args} leftsection={iconLeft} rightsection={iconRight}>
        {args.children}
      </Button>
    );
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    radius: 'md',
    color: '#339af0',
    children: 'Button',
    size: 'sm',
  },

  render: (args) => {
    const { leftsection, rightsection } = args;
    const iconLeft = IconsArr[leftsection as keyof typeof IconsArr] || null;
    const iconRight = IconRightArr[rightsection as keyof typeof IconsArr] || null;
    return (
      <Button {...args} leftsection={iconLeft} rightsection={iconRight}>
        {args.children}
      </Button>
    );
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    radius: 'md',
    color: '#339af0',
    children: 'Button',
    size: 'sm',
  },
  render: (args) => {
    const { leftsection, rightsection } = args;
    const iconLeft = IconsArr[leftsection as keyof typeof IconsArr] || null;
    const iconRight = IconRightArr[rightsection as keyof typeof IconsArr] || null;
    return (
      <Button {...args} leftsection={iconLeft} rightsection={iconRight}>
        {args.children}
      </Button>
    );
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    radius: 'md',
    color: '#339af0',
    children: 'Button',
    size: 'sm',
  },
  render: (args) => {
    const { leftsection, rightsection } = args;
    const iconLeft = IconsArr[leftsection as keyof typeof IconsArr] || null;
    const iconRight = IconRightArr[rightsection as keyof typeof IconsArr] || null;
    return (
      <Button {...args} leftsection={iconLeft} rightsection={iconRight}>
        {args.children}
      </Button>
    );
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    radius: 'md',
    from: '#12b886',
    to: '#7950f2',
    deg: 81,
    children: 'Button',
    size: 'sm',
  },
  render: (args) => {
    const { leftsection, rightsection } = args;
    const iconLeft = IconsArr[leftsection as keyof typeof IconsArr] || null;
    const iconRight = IconRightArr[rightsection as keyof typeof IconsArr] || null;
    return (
      <Button {...args} leftsection={iconLeft} rightsection={iconRight}>
        {args.children}
      </Button>
    );
  },
};
