import React from "react";
import { Task, KanbanState } from "../types";
import { DraggableColumn } from "./DraggableColumn";
import './DraggableColumn.css';

interface KanbanBoardProps {
  data: KanbanState;
  onEditTask: (task: Task) => void;
  onMoveTask: (taskId: string, sourceColumnId: string, destColumnId: string, destIndex: number) => void;
  onCreateTask: (columnId: string) => void;
  onCreateColumn: () => void;
  onReorderColumns: (sourceIndex: number, destIndex: number) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  data,
  onEditTask,
  onMoveTask,
  onCreateTask,
  onCreateColumn,
  onReorderColumns,
}) => {
  return (
    <div>
      <div>
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "16px 0" }}>
          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <DraggableColumn
                key={column.id}
                column={column}
                tasks={tasks}
                index={index}
                onEditTask={onEditTask}
                onMoveTask={onMoveTask}
                onCreateTask={onCreateTask}
                onReorderColumns={onReorderColumns}
              />
            );
          })}
          
          {/* Botão para adicionar nova coluna */}
          <div style={{ 
            minWidth: '280px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: '8px'
          }}>
            <button
              onClick={onCreateColumn}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '24px 16px',
                border: '2px dashed #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'transparent',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                minHeight: '120px',
                width: '100%',
                maxWidth: '250px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.color = '#10b981';
                e.currentTarget.style.backgroundColor = '#f0fdf4';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              <span style={{ fontSize: '32px', marginBottom: '4px' }}>➕</span>
              <span>Adicionar Nova Coluna</span>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>Arraste as colunas para reordenar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
