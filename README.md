Kanban Board – React + TypeScript

A modular, accessible, and fully interactive Kanban board UI component built with React, TypeScript, Tailwind CSS, and Storybook.
The project emphasizes clean architecture, reusable components, and maintainable front-end engineering practices.

Live Storybook
[http://localhost:5173/](https://69399c72804b6deecef23a0c-dliwzqjadb.chromatic.com/?path=/story/kanban-kanbanboard--default)

Installation:
pnpm install
pnpm dev
# then open: http://localhost:5173
pnpm storybook
# then open: http://localhost:6006

Architecture Overview

The Kanban board is structured into well-defined, independent layers to ensure scalability and maintainability.

1. KanbanBoard

Manages global state and task operations.

Handles task creation, updates, deletion, and column grouping.

Coordinates data flow to child components.

2. KanbanColumn

Renders tasks for each column.

Manages drag-and-drop drop targets.

Displays WIP (Work-In-Progress) limits, warnings, and column controls.

Does not manage global state directly.

3. TaskCard and TaskModal

TaskCard: Responsible for task display, interaction events, and keyboard accessibility.

TaskModal: Provides controlled state for editing, validation, and task deletion.

Design Principles

Strict separation between global and local component logic.

UI components are stateless whenever possible.

Upward data flow to maintain predictable state management.

Accessibility-first approach with ARIA labels and focus management.

Features

Fully functional drag-and-drop using the native HTML Drag & Drop API.

Task creation with inline “Add Task” actions.

Task editing through a modal interface (title and description).

Responsive layout supporting mobile, tablet, and desktop breakpoints.

Keyboard accessibility, including arrow key navigation and focus handling.

WIP limit indicators and visual warnings.

Column collapse and expand functionality.

Clean and semantically correct markup with ARIA support.

Storybook Documentation

This project includes comprehensive Storybook coverage:

Default Board: Standard three-column configuration with sample tasks.

Empty State: Board rendering with zero tasks.

Large Dataset: Performance validation using high task volume.

Mobile View: Demonstrates responsive behavior on small screens.

Interactive Playground: Allows dynamic modification of component props.

Storybook provides visual documentation and encourages isolated component development.

Technology Stack

React (with TypeScript)

Tailwind CSS

Storybook

Native HTML Drag & Drop API

Additional libraries as used within the project

Contact,
7397110896
Meet Patil
meetpatil1110@gmail.com
