import type { Meta, StoryObj } from '@storybook/react';
import Input from '@/components/Input.Component';
import { ComponentProps } from 'react';
import { IconsArr, IconRightArr } from './helper';

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'filled', 'unstyled'],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'inline-radio' },
    },
    radius: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'inline-radio' },
    },
    leftSection: {
      control: 'select',
      options: ['none', 'IconAB2', 'IconAccessible', 'IconApple'],
      description: 'Example icons from Tabler Icons',
    },
    rightSection: {
      control: 'select',
      options: ['none', 'IconAssembly', 'IconBrandDribbble', 'IconBrightnessAutoFilled'],
      description: 'Example icons from Tabler Icons',
    },
    leftSectionWidth: {
      control: { type: 'number', min: 20, max: 100, step: 4 },
      if: { arg: 'leftSection', neq: 'none' },
    },
    rightSectionWidth: {
      control: { type: 'number', min: 20, max: 100, step: 4 },
      if: { arg: 'rightSection', neq: 'none' },
    },
    leftSectionPointerEvents: {
      options: ['none', 'all'],
      control: { type: 'inline-radio' },
      if: { arg: 'leftSection', neq: 'none' },
    },
    rightSectionPointerEvents: {
      options: ['none', 'all'],
      control: { type: 'inline-radio' },
      if: { arg: 'rightSection', neq: 'none' },
    },
    loading: {
      control: 'boolean',
    },
    loadingPosition: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
      if: { arg: 'loading', eq: true },
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

const renderWithSections = (args: StoryProps) => {
  const { leftSection, rightSection, ...rest } = args;
  const iconLeft = IconsArr[leftSection as keyof typeof IconsArr] || null;
  const iconRight = IconRightArr[rightSection as keyof typeof IconRightArr] || null;
  return <Input {...rest} leftSection={iconLeft} rightSection={iconRight} />;
};

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    radius: 'sm',
    placeholder: 'Enter text...',
  },
  render: renderWithSections,
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    size: 'md',
    radius: 'sm',
    placeholder: 'Enter text...',
  },
  render: renderWithSections,
};

export const Unstyled: Story = {
  args: {
    variant: 'unstyled',
    size: 'md',
    placeholder: 'Unstyled input...',
  },
  render: renderWithSections,
};

export const WithSections: Story = {
  args: {
    variant: 'default',
    size: 'md',
    radius: 'sm',
    placeholder: 'Search...',
  },
  render: (args) => {
    const iconLeft = IconsArr['IconAB2'];
    const iconRight = IconRightArr['IconAssembly'];
    return <Input {...args} leftSection={iconLeft} rightSection={iconRight} />;
  },
};

export const WithWrapper: Story = {
  args: {
    variant: 'default',
    size: 'md',
    radius: 'sm',
    placeholder: 'your@email.com',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Input.Wrapper
        label="Email address"
        description="We will never share your email with anyone"
        required
        id="story-email"
      >
        <Input {...args} id="story-email" />
      </Input.Wrapper>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    variant: 'default',
    size: 'md',
    radius: 'sm',
    placeholder: 'Loading...',
    loading: true,
    loadingPosition: 'right',
  },
  render: renderWithSections,
};

export const Error: Story = {
  args: {
    variant: 'default',
    size: 'md',
    radius: 'sm',
    placeholder: 'Pick a username',
    error: true,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Input.Wrapper label="Username" error="Username is already taken" id="story-username">
        <Input {...args} id="story-username" />
      </Input.Wrapper>
    </div>
  ),
};
