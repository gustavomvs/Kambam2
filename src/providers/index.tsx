import { TaskProvider } from "./Tasks/tasksProvider";

const Providers = ({ children }: any | null) => {
  return <TaskProvider>{children}</TaskProvider>;
};

export default Providers;
