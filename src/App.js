import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {
  const [userName, setUserName] = useState("BrianMirko");
  const [taskItems, setTaskItems] = useState([
    { name: "Task One", done: false },
    { name: "Task Two", done: false },
    { name: "Task Three", done: true },
    { name: "Task Four", done: false },
  ]);
  const [showComplete, setShowComplete] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data !== null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName("BrianMirko Example");
      setTaskItems([
        { name: "Task One Example", done: false },
        { name: "Task Two Example", done: false },
        { name: "Task Three Example", done: true },
        { name: "Task Four Example", done: false },
      ]);
      setShowComplete(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = (task) => {
    return setTaskItems(
      taskItems.map((t) => {
        return t.name === task.name ? { ...t, done: !t.done } : t;
      })
    );
  };

  const taskTableRows = (doneValue) => {
    return taskItems
      .filter((task) => task.done === doneValue)
      .map((task) => {
        return <TaskRow task={task} key={task.name} toggleTask={toggleTask} />;
      });
  };

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(false)}</tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="Completed Task"
          isChecked={showComplete}
          callback={(checked) => setShowComplete(checked)}
        />
      </div>
      {showComplete && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(true)}</tbody>
        </table>
      )}
    </div>
  );
}

export default App;
