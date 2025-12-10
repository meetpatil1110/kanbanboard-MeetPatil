import type { Meta, StoryObj } from "@storybook/react";
import KanbanColumn from "../components/KanbanColumn";

const meta: Meta<typeof KanbanColumn> = {
  title: "Kanban/KanbanColumn",
  component: KanbanColumn,
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

export const ExampleColumn: Story = {
  args: {
    title: "To Do",
    tasks: [
      { id: 1, text: "Wireframes" },
      { id: 2, text: "Project Setup" },
    ],
  },
};
