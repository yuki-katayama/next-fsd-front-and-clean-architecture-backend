import FormInput from './FormInput';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: "Form/FormInput",
	component: FormInput,
	tags: ["autodocs"],
	args: {
	},
} satisfies Meta<typeof FormInput>

export default meta;
type Story = StoryObj<typeof meta>;

export const INBOX: Story = {
  args: {
	placeholder: "test"
  },
};