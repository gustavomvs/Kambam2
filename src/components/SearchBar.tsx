import React from "react";
import "./SearchBar.css";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";

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
      </div>
    </div>
  );
};
