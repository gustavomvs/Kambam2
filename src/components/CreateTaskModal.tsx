import React, { useState } from "react";
import './CreateTaskModal.css';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="create-task-modal-backdrop" onClick={handleBackdropClick}>
      <div className="create-task-modal-container">
        <div className="create-task-modal-header">
          <h2 className="create-task-modal-title">Nova Tarefa</h2>
          <button onClick={onClose} className="create-task-modal-close-btn">×</button>
        </div>

        <div className="create-task-modal-content">
          <div className="create-task-modal-field">
            <label htmlFor="new-title" className="create-task-modal-label">Título</label>
            <input
              id="new-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da tarefa..."
              autoFocus
              className="create-task-modal-input"
            />
          </div>

          <div className="create-task-modal-field">
            <label htmlFor="new-description" className="create-task-modal-label">Descrição</label>
            <textarea
              id="new-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Digite a descrição da tarefa..."
              className="create-task-modal-textarea"
            />
          </div>
        </div>

        <div className="create-task-modal-footer">
          <button onClick={onClose} className="create-task-modal-cancel-btn">
            Cancelar
          </button>
          <button 
            onClick={handleCreate} 
            disabled={!title.trim()}
            className="create-task-modal-create-btn"
          >
            ➕
            <span>Criar Tarefa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
