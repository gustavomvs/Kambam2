import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateTask?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onCreateTask,
}) => {
  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <div className="search-bar-header">
          <h1 className="search-bar-title">Kanban Board</h1>
        </div>

        <div className="search-bar-actions">
          <div className="search-input-container">
            <label className="search-input-label" htmlFor="search-input">
              Search
            </label>
            <input
              id="search-input"
              type="text"
              className="search-input"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Buscar tarefas"
            />
          </div>

          <button 
            className="create-task-button"
            onClick={onCreateTask}
            aria-label="Criar nova tarefa"
          >
            <span className="create-task-icon">+</span>
            <span>Nova Tarefa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
