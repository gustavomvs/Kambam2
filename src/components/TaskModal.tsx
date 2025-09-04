import React, { useState, useEffect } from "react";
import { Task } from "../types";
import "./TaskModal.css";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"backlog" | "in-progress" | "completed">(
    "backlog"
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave(task.id, {
      title: title.trim(),
      description: description.trim(),
      status,
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="task-modal-backdrop" onClick={handleBackdropClick}>
      <div className="task-modal-container">
        <div className="task-modal-header">
          <h2 className="task-modal-title">Editar Tarefa</h2>
          <button onClick={onClose} className="task-modal-close-btn">
            ×
          </button>
        </div>

        <div className="task-modal-content">
          <div className="task-modal-field">
            <label htmlFor="title" className="task-modal-label">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="task-modal-input"
              placeholder="Digite o título da tarefa..."
            />
          </div>

          <div className="task-modal-field">
            <label htmlFor="description" className="task-modal-label">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="task-modal-textarea"
              placeholder="Digite a descrição da tarefa..."
            />
          </div>

          <div className="task-modal-field">
            <label htmlFor="status" className="task-modal-label">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="task-modal-select"
            >
              <option value="backlog">Backlog</option>
              <option value="in-progress">Em andamento</option>
              <option value="completed">Concluída</option>
            </select>
          </div>
        </div>

        <div className="task-modal-footer">
          <button onClick={handleDelete} className="task-modal-delete-btn">
            🗑️
            <span>Excluir</span>
          </button>

          <div className="task-modal-actions">
            <button onClick={onClose} className="task-modal-cancel-btn">
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="task-modal-save-btn"
            >
              💾
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
