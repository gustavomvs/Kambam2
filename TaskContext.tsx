import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "backlog" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
};

type Column = {
  id: string;
  title: string;
  status: "backlog" | "in-progress" | "completed";
  taskIds: string[];
};

type TasksData = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

type TaskContextType = {
  tasks: TasksData;
  taskUpdate: (taskID: string) => Task | undefined;
};

export const INITIAL_DATA: TasksData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Implementar autenticação",
      description:
        "Criar sistema de login e registro de usuários com validação de email",
      status: "backlog",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    "task-2": {
      id: "task-2",
      title: "Design do dashboard",
      description: "Criar wireframes e protótipos do dashboard principal",
      status: "in-progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    "task-3": {
      id: "task-3",
      title: "Setup do projeto",
      description:
        "Configurar estrutura inicial do projeto com React e TypeScript",
      status: "completed",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      status: "backlog",
      taskIds: ["task-1"],
    },
    "in-progress": {
      id: "in-progress",
      title: "Em andamento",
      status: "in-progress",
      taskIds: ["task-2"],
    },
    completed: {
      id: "completed",
      title: "Concluída",
      status: "completed",
      taskIds: ["task-3"],
    },
  },
  columnOrder: ["backlog", "in-progress", "completed"],
};

const TaskContext = createContext<TaskContextType>({
  tasks: INITIAL_DATA,
  taskUpdate: () => undefined,
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TasksData>(INITIAL_DATA);

  useEffect(() => {
    setTasks(INITIAL_DATA);
  }, []);

  const taskUpdate = (taskID: string) => {
    return tasks.tasks[taskID];
  };

  return (
    <TaskContext.Provider value={{ tasks, taskUpdate }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
