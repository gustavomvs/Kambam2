import React, { useState } from "react";
import { Column, Task } from "../types";
import { KanbanColumn } from "./KanbanColumn";
import "./DraggableColumn.css";

interface DraggableColumnProps {
  column: Column;
  tasks: Task[];
  index: number;
  onEditTask: (task: Task) => void;
  onMoveTask: (
    taskId: string,
    sourceColumnId: string,
    destColumnId: string,
    destIndex: number
  ) => void;
  onCreateTask: (columnId: string) => void;
  onReorderColumns: (sourceIndex: number, destIndex: number) => void;
}

export const DraggableColumn: React.FC<DraggableColumnProps> = ({
  column,
  tasks,
  index,
  onEditTask,
  onMoveTask,
  onCreateTask,
  onReorderColumns,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        type: "column",
        columnId: column.id,
        sourceIndex: index,
      })
    );
    e.dataTransfer.effectAllowed = "move";
    console.log("Column drag started:", column.title);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragData = e.dataTransfer.getData("text/plain");

    if (dragData) {
      try {
        const parsed = JSON.parse(dragData);

        if (parsed.type === "column" && parsed.sourceIndex !== index) {
          console.log(
            `Reordering column from ${parsed.sourceIndex} to ${index}`
          );
          onReorderColumns(parsed.sourceIndex, index);
        }
      } catch (error) {
        console.error("Error parsing drag data:", error);
      }
    }
  };

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "rotate(2deg)" : "rotate(0deg)",
        transition: "all 0.2s ease",
        cursor: "move",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        style={{
          position: "relative",
          padding: "4px 0",
        }}
      >
        {/* Indicador visual para drag */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            opacity: 0.3,
            fontSize: "12px",
            color: "#666",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          ⋮⋮
        </div>

        <KanbanColumn
          column={column}
          tasks={tasks}
          onEditTask={onEditTask}
          onMoveTask={onMoveTask}
          onCreateTask={onCreateTask}
        />
      </div>
    </div>
  );
};
