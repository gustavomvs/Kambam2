import React, { useState } from "react";
import { Task } from "../types";
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit }) => {
  const [isDragging, setIsDragging] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        taskId: task.id,
        sourceColumnId: task.status,
      })
    );
    console.log("Drag started for task:", task.title);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      onEdit(task);
    }
  };

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      draggable
    >
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className="task-card-edit-hint">Editar</span>
      </div>

      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        <div className="task-card-date">
          <span>📅</span>
          <span>{formatDate(task.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};
