import React, { useState } from "react";
import "./CreateTaskModal.css";

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    title: string,
    status: string,
    color: string,
    bgColor: string
  ) => void;
}

const PREDEFINED_COLORS = [
  { color: "#6B7280", bgColor: "#F9FAFB", name: "Cinza" },
  { color: "#F59E0B", bgColor: "#FFFBEB", name: "Amarelo" },
  { color: "#10B981", bgColor: "#ECFDF5", name: "Verde" },
  { color: "#3B82F6", bgColor: "#EFF6FF", name: "Azul" },
  { color: "#EF4444", bgColor: "#FEF2F2", name: "Vermelho" },
  { color: "#8B5CF6", bgColor: "#F5F3FF", name: "Roxo" },
  { color: "#F97316", bgColor: "#FFF7ED", name: "Laranja" },
  { color: "#06B6D4", bgColor: "#ECFEFF", name: "Ciano" },
];

export const CreateColumnModal: React.FC<CreateColumnModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(PREDEFINED_COLORS[0]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (title.trim()) {
      const status = title.toLowerCase().replace(/\s+/g, "-");
      onCreate(
        title.trim(),
        status,
        selectedColor.color,
        selectedColor.bgColor
      );
      setTitle("");
      setSelectedColor(PREDEFINED_COLORS[0]);
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
          <h2 className="create-task-modal-title">Nova Coluna</h2>
          <button onClick={onClose} className="create-task-modal-close-btn">
            ×
          </button>
        </div>

        <div className="create-task-modal-content">
          <div className="create-task-modal-field">
            <label htmlFor="column-title" className="create-task-modal-label">
              Título da Coluna
            </label>
            <input
              id="column-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Em Revisão, Teste, Deploy..."
              autoFocus
              className="create-task-modal-input"
            />
          </div>

          <div className="create-task-modal-field">
            <label className="create-task-modal-label">Cor da Coluna</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              {PREDEFINED_COLORS.map((colorOption, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(colorOption)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border:
                      selectedColor === colorOption
                        ? `3px solid ${colorOption.color}`
                        : "2px solid #e5e7eb",
                    backgroundColor: colorOption.bgColor,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: colorOption.color,
                    transition: "all 0.2s",
                  }}
                  title={colorOption.name}
                >
                  {selectedColor === colorOption ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="create-task-modal-field">
            <label className="create-task-modal-label">Preview</label>
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: selectedColor.bgColor,
                border: `1px solid ${selectedColor.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: selectedColor.color, fontWeight: "600" }}>
                {title || "Nova Coluna"}
              </span>
              <span
                style={{
                  backgroundColor: selectedColor.color + "20",
                  color: selectedColor.color,
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                0
              </span>
            </div>
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
            ➕<span>Criar Coluna</span>
          </button>
        </div>
      </div>
    </div>
  );
};
