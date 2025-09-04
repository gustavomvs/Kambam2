import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, KanbanState } from "../types";
import { INITIAL_DATA } from "../utils/constants";

const STORAGE_KEY = "kanban-data";

export const useTasks = () => {
  const [data, setData] = useState<KanbanState>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : INITIAL_DATA;
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const createTask = (
    title: string,
    description: string,
    status: "backlog" | "in-progress" | "completed" = "backlog"
  ) => {
    const taskId = uuidv4();
    const newTask: Task = {
      id: taskId,
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setData((prevData) => {
      if (!prevData.columns[status]) {
        console.error("Column not found:", status);
        return prevData;
      }

      return {
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: newTask,
        },
        columns: {
          ...prevData.columns,
          [status]: {
            ...prevData.columns[status],
            taskIds: [...(prevData.columns[status]?.taskIds || []), taskId],
          },
        },
      };
    });

    return taskId;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setData((prevData) => {
      const task = prevData.tasks[taskId];
      const updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date(),
      };

      let newData = {
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: updatedTask,
        },
      };

      if (updates.status && updates.status !== task.status) {
        const oldColumnId = task.status;
        const oldColumn = newData.columns[oldColumnId];

        if (!oldColumn) {
          console.error("Old column not found:", oldColumnId);
          return newData;
        }

        const newTaskIds = (oldColumn.taskIds || []).filter(
          (id) => id !== taskId
        );

        const newColumnId = updates.status;
        const newColumn = newData.columns[newColumnId];

        if (!newColumn) {
          console.error("New column not found:", newColumnId);
          return newData;
        }

        newData = {
          ...newData,
          columns: {
            ...newData.columns,
            [oldColumnId]: {
              ...oldColumn,
              taskIds: newTaskIds,
            },
            [newColumnId]: {
              ...newColumn,
              taskIds: [...(newColumn.taskIds || []), taskId],
            },
          },
        };
      }

      return newData;
    });
  };

  const deleteTask = (taskId: string) => {
    setData((prevData) => {
      const task = prevData.tasks[taskId];
      const column = prevData.columns[task.status];

      const { [taskId]: deletedTask, ...remainingTasks } = prevData.tasks;

      return {
        ...prevData,
        tasks: remainingTasks,
        columns: {
          ...prevData.columns,
          [task.status]: {
            ...column,
            taskIds: column.taskIds.filter((id) => id !== taskId),
          },
        },
      };
    });
  };

  const moveTask = (
    taskId: string,
    sourceColumnId: string,
    destColumnId: string,
    destIndex: number
  ) => {
    if (sourceColumnId === destColumnId) {
      setData((prevData) => {
        const column = prevData.columns[sourceColumnId];
        const newTaskIds = Array.from(column.taskIds);
        const sourceIndex = newTaskIds.indexOf(taskId);
        newTaskIds.splice(sourceIndex, 1);
        newTaskIds.splice(destIndex, 0, taskId);

        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [sourceColumnId]: {
              ...column,
              taskIds: newTaskIds,
            },
          },
        };
      });
    } else {
      setData((prevData) => {
        const sourceColumn = prevData.columns[sourceColumnId];
        const destColumn = prevData.columns[destColumnId];

        if (!sourceColumn || !destColumn) {
          console.error("Column not found:", { sourceColumnId, destColumnId });
          return prevData;
        }

        const sourceTaskIds = Array.from(sourceColumn.taskIds || []);
        const destTaskIds = Array.from(destColumn.taskIds || []);

        sourceTaskIds.splice(sourceTaskIds.indexOf(taskId), 1);
        destTaskIds.splice(destIndex, 0, taskId);

        const updatedTask = {
          ...prevData.tasks[taskId],
          status: destColumn.status as Task["status"],
          updatedAt: new Date(),
        };

        return {
          ...prevData,
          tasks: {
            ...prevData.tasks,
            [taskId]: updatedTask,
          },
          columns: {
            ...prevData.columns,
            [sourceColumnId]: {
              ...sourceColumn,
              taskIds: sourceTaskIds,
            },
            [destColumnId]: {
              ...destColumn,
              taskIds: destTaskIds,
            },
          },
        };
      });
    }
  };

  const createColumn = (
    title: string,
    status: string,
    color: string,
    bgColor: string
  ) => {
    import("../utils/constants").then(({ setColumnConfig }) => {
      setColumnConfig(status, {
        id: status,
        title,
        status,
        color,
        bgColor,
      });
    });

    setData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [status]: {
          id: status,
          title,
          status: status as any,
          taskIds: [],
        },
      },
      columnOrder: [...prevData.columnOrder, status],
    }));

    return status;
  };

  const deleteColumn = (columnId: string) => {
    setData((prevData) => {
      const column = prevData.columns[columnId];

      const tasksToMove = column.taskIds;
      const updatedTasks = { ...prevData.tasks };

      tasksToMove.forEach((taskId) => {
        if (updatedTasks[taskId]) {
          updatedTasks[taskId] = {
            ...updatedTasks[taskId],
            status: "backlog",
            updatedAt: new Date(),
          };
        }
      });

      const { [columnId]: deletedColumn, ...remainingColumns } =
        prevData.columns;

      const updatedBacklog = {
        ...remainingColumns.backlog,
        taskIds: [...remainingColumns.backlog.taskIds, ...tasksToMove],
      };

      return {
        ...prevData,
        tasks: updatedTasks,
        columns: {
          ...remainingColumns,
          backlog: updatedBacklog,
        },
        columnOrder: prevData.columnOrder.filter((id) => id !== columnId),
      };
    });
  };

  const reorderColumns = (sourceIndex: number, destIndex: number) => {
    setData((prevData) => {
      const newColumnOrder = Array.from(prevData.columnOrder);
      const [removed] = newColumnOrder.splice(sourceIndex, 1);
      newColumnOrder.splice(destIndex, 0, removed);

      return {
        ...prevData,
        columnOrder: newColumnOrder,
      };
    });
  };

  const filteredData = {
    ...data,
    columns: Object.keys(data.columns).reduce((acc, columnId) => {
      const column = data.columns[columnId];
      const filteredTaskIds = (column.taskIds || []).filter((taskId) => {
        const task = data.tasks[taskId];
        if (!task) return false;
        return (
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      acc[columnId] = {
        ...column,
        taskIds: filteredTaskIds,
      };
      return acc;
    }, {} as typeof data.columns),
  };

  return {
    data: filteredData,
    searchQuery,
    setSearchQuery,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createColumn,
    deleteColumn,
    reorderColumns,
  };
};
