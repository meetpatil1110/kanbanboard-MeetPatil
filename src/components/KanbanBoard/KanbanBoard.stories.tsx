// src/stories/KanbanBoard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import KanbanBoard from "./KanbanBoard";
import { generateSampleData, generateManyTasks } from "../../utils/sampleData";

const meta: Meta<typeof KanbanBoard> = {
  title: "Kanban/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  }
};
export default meta;

type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    initialData: generateSampleData(),
  }
};

export const Empty: Story = {
  args: {
    initialData: { columns: [], tasks: {} },
  },
  name: "Empty State"
};

export const ManyTasks: Story = {
  args: {
    initialData: generateManyTasks(60) // 60 tasks across columns to test perf
  },
  name: "With Many Tasks"
};

export const Priorities: Story = {
  args: {
    initialData: generateSampleData(true) // with priority field
  },
  name: "Different Priorities"
};

export const MobileView: Story = {
  args: {
    initialData: generateSampleData()
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" }
  },
  name: "Mobile View"
};

export const Accessibility: Story = {
  args: {
    initialData: generateSampleData()
  },
  name: "Keyboard navigation demo"
};
