import type { Meta, StoryObj } from "@storybook/react";
import TaskCard from "../components/TaskCard";

const meta: Meta<typeof TaskCard> = {
  title: "Kanban/TaskCard",
  component: TaskCard,
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Basic: Story = {
  args: {
    task: { id: 1, text: "Example Task" },
  },
};
