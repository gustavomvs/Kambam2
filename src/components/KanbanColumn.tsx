import React from "react";
import { Column, Task } from "../types";
import { getColumnConfig } from "../utils/constants";
import { TaskCard } from "./TaskCard";
import "./KanbanColumn.css";

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onMoveTask: (
    taskId: string,
    sourceColumnId: string,
    destColumnId: string,
    destIndex: number
  ) => void;
  onCreateTask: (columnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onEditTask,
  onMoveTask,
  onCreateTask,
}) => {
  const config = getColumnConfig(column.status);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const dragData = e.dataTransfer.getData("text/plain");

    if (dragData) {
      const { taskId, sourceColumnId } = JSON.parse(dragData);

      if (sourceColumnId !== column.status) {
        console.log(
          `Moving task ${taskId} from ${sourceColumnId} to ${column.status}`
        );
        onMoveTask(taskId, sourceColumnId, column.status, tasks.length);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div
      className={`kanban-column ${isDragOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div
        className="kanban-column-header"
        style={{ backgroundColor: config.bgColor }}
      >
        <div className="kanban-column-title-row">
          <h2 className="kanban-column-title" style={{ color: config.color }}>
            {config.title}
          </h2>
          <span
            className="kanban-column-count"
            style={{
              backgroundColor: config.color + "20",
              color: config.color,
            }}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="kanban-column-tasks">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onEdit={onEditTask}
          />
        ))}
      </div>

      <button className="add-task-btn" onClick={() => onCreateTask(column.id)}>
        ➕ Adicionar tarefa
      </button>
    </div>
  );
};
