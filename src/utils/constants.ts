export const DEFAULT_COLUMN_CONFIG = {
  backlog: {
    id: "backlog",
    title: "Backlog",
    status: "backlog" as const,
    color: "#6B7280",
    bgColor: "#F9FAFB",
  },
  "in-progress": {
    id: "in-progress",
    title: "Em andamento",
    status: "in-progress" as const,
    color: "#F59E0B",
    bgColor: "#FFFBEB",
  },
  completed: {
    id: "completed",
    title: "Concluída",
    status: "completed" as const,
    color: "#10B981",
    bgColor: "#ECFDF5",
  },
};

let COLUMN_CONFIG = { ...DEFAULT_COLUMN_CONFIG };

export const getColumnConfig = (columnId: string) => {
  return COLUMN_CONFIG[columnId] || {
    id: columnId,
    title: columnId,
    status: columnId,
    color: "#6B7280",
    bgColor: "#F9FAFB",
  };
};

export const setColumnConfig = (columnId: string, config: any) => {
  COLUMN_CONFIG[columnId] = config;
};

export const getAllColumnConfigs = () => COLUMN_CONFIG;

export { COLUMN_CONFIG };

export const INITIAL_DATA = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Implementar autenticação",
      description:
        "Criar sistema de login e registro de usuários com validação de email",
      status: "backlog" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    "task-2": {
      id: "task-2",
      title: "Design do dashboard",
      description: "Criar wireframes e protótipos do dashboard principal",
      status: "in-progress" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    "task-3": {
      id: "task-3",
      title: "Setup do projeto",
      description:
        "Configurar estrutura inicial do projeto com React e TypeScript",
      status: "completed" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      status: "backlog" as const,
      taskIds: ["task-1"],
    },
    "in-progress": {
      id: "in-progress",
      title: "Em andamento",
      status: "in-progress" as const,
      taskIds: ["task-2"],
    },
    completed: {
      id: "completed",
      title: "Concluída",
      status: "completed" as const,
      taskIds: ["task-3"],
    },
  },
  columnOrder: ["backlog", "in-progress", "completed"],
};
