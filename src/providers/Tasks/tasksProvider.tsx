import { createContext, useState, useContext, useEffect } from "react";

const TaskContext = createContext({
  tasks: {},
});

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

export const TaskProvider = ({ children }: any | null) => {
  const [tasks, setTasks] = useState(INITIAL_DATA);

  const taskUpdate = (taskID: any) => {
    return tasks.tasks[taskID];
  };

  

  return (
    <TaskContext.Provider value={{ tasks: tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
