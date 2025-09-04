import React from "react";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { Box } from "@twilio-paste/core/box";
import { useTasks } from "./hooks/useTasks";
import { Task } from "./types";
import { KanbanBoard } from "./components/KanbanBoard";
import { useState } from "react";
import { useTask } from "../TaskContext";
import { SearchBar } from "./components/SearchBar";
import { TaskModal } from "./components/TaskModal";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { CreateColumnModal } from "./components/CreateColumnModal";

function App() {
  const {
    data,
    searchQuery,
    setSearchQuery,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createColumn,
    deleteColumn,
    reorderColumns,
  } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<string>('backlog');

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateTaskInColumn = (columnId: string) => {
    setTargetColumnId(columnId);
    setIsCreateModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(false);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setTargetColumnId('backlog');
  };

  const handleCreateNewTask = (title: string, description: string) => {
    createTask(title, description, targetColumnId as Task['status']);
  };

  const handleCreateColumn = () => {
    setIsCreateColumnModalOpen(true);
  };

  const handleCloseCreateColumnModal = () => {
    setIsCreateColumnModalOpen(false);
  };

  const handleCreateNewColumn = (title: string, status: string, color: string, bgColor: string) => {
    createColumn(title, status, color, bgColor);
  };

  const { tasks } = useTask();

  console.log(tasks);

  return (
    <Box padding="space80">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateTask={handleCreateTask}
      />
      
      <div>
        <KanbanBoard
          data={data}
          onEditTask={handleEditTask}
          onMoveTask={moveTask}
          onCreateTask={handleCreateTaskInColumn}
          onCreateColumn={handleCreateColumn}
          onReorderColumns={reorderColumns}
        />
      </div>
      
      <TaskModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSave={updateTask}
        onDelete={deleteTask}
      />
      
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreate={handleCreateNewTask}
      />
      
      <CreateColumnModal
        isOpen={isCreateColumnModalOpen}
        onClose={handleCloseCreateColumnModal}
        onCreate={handleCreateNewColumn}
      />
    </Box>
  );
}

export default App;
