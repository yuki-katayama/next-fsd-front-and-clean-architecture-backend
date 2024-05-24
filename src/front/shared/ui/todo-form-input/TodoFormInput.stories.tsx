import { TodoFormInput } from './TodoFormInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: "Form/FormInput",
	component: TodoFormInput,
	tags: ["autodocs"],
	args: {
	},
} satisfies Meta<typeof TodoFormInput>

export default meta;
type Story = StoryObj<typeof meta>;

export const INBOX: Story = {
  args: {
	placeholder: "test"
  },
};