"use client";

import axios from "axios";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  userId: string;
  done: boolean;
  createdOn: Date;
  dueBy: Date;
}

export default function Home() {
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [taskData, setTaskData] = React.useState({
    taskId: "",
    title: "",
    dueBy: "",
    description: "",
    done: false,
  });
  const [userTasks, setUserTasks] = React.useState<Task[]>([]);
  const [isAddButtonDisabled, setAddButtonButtonDisabled] =
    React.useState(true);
  const [isEditButtonDisabled, setEditButtonButtonDisabled] =
    React.useState(false);

  React.useEffect(() => {
    const getUserTasks = async () => {
      try {
        const res = await axios.get("/api/tasks");
        setUserTasks(res.data.data);
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    getUserTasks();
  }, []);

  React.useEffect(() => {
    if (
      taskData.title.length > 0 &&
      taskData.dueBy.length > 0 &&
      taskData.description.length > 0
    ) {
      setAddButtonButtonDisabled(false);
    } else {
      setAddButtonButtonDisabled(true);
    }
  }, [taskData]);

  const checkAddButtonDisabled = () => {
    return isAddButtonDisabled;
  };

  const checkEditButtonDisabled = () => {
    return isEditButtonDisabled;
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEditModal = (task: any) => {
    setEditModalOpen(true);
    setTaskData({
      taskId: task._id,
      title: task.title,
      dueBy: task.dueBy,
      description: task.description,
      done: task.done,
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setTaskData({
      taskId: "",
      title: "",
      dueBy: "",
      description: "",
      done: false,
    });
  };

  const handleAddTaskSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/createTask", taskData);
      console.log(response);
      console.log("Task created successfully");
      await refreshTasks();
    } catch (error: any) {
      console.log(error);
      console.log("Error in creating the task:", error.message);
    } finally {
      setTaskData({
        taskId: "",
        title: "",
        dueBy: "",
        description: "",
        done: false,
      });
      closeCreateModal();
    }
  };

  const handleTaskEdit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const taskId = taskData.taskId;
      const response = await axios.put(`/api/tasks/${taskId}`, {
        title: taskData.title,
        dueBy: taskData.dueBy,
        description: taskData.description,
        done: taskData.done,
      });
      console.log("Task updated successfully");
      await refreshTasks();
    } catch (error: any) {
      console.log("Error in editing the task:", error.message);
    } finally {
      closeEditModal();
      setTaskData({
        taskId: "",
        title: "",
        dueBy: "",
        description: "",
        done: false,
      });
    }
  };

  const handleTaskDelete = async (task: any) => {
    try {
      const response = await axios.delete(`/api/tasks/${task._id}`);
      console.log("Task deleted successfully");
      await refreshTasks();
    } catch (error: any) {
      console.log("Error in deleting the task:", error.message);
    }
  };

  const refreshTasks = async () => {
    setUserTasks([]);
    try {
      const res = await axios.get("/api/tasks");
      setUserTasks(res.data.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen">
      {isCreateModalOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden={isCreateModalOpen}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add a task
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeCreateModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="space-y-4 md:space-y-6">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Title"
                      required={true}
                      onChange={(e) =>
                        setTaskData({ ...taskData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Due date
                    </label>
                    <input
                      name="dueDate"
                      id="dueDate"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Due by date"
                      required={true}
                      onChange={(e) =>
                        setTaskData({ ...taskData, dueBy: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write task description here"
                      onChange={(e) =>
                        setTaskData({
                          ...taskData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={checkAddButtonDisabled()}
                  className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleAddTaskSubmit}
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden={isEditModalOpen}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit task
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeEditModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="space-y-4 md:space-y-6">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={taskData.title}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Title"
                      required={true}
                      onChange={(e) =>
                        setTaskData({ ...taskData, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Due date
                    </label>
                    <input
                      name="dueDate"
                      id="dueDate"
                      type="date"
                      value={taskData.dueBy.split("T")[0]}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Due by date"
                      required={true}
                      onChange={(e) =>
                        setTaskData({ ...taskData, dueBy: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Done
                    </label>
                    <input
                      name="done"
                      id="done"
                      type="checkbox"
                      checked={taskData.done}
                      onChange={() =>
                        setTaskData({ ...taskData, done: !taskData.done })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write task description here"
                      value={taskData.description}
                      onChange={(e) =>
                        setTaskData({
                          ...taskData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={checkEditButtonDisabled()}
                  className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleTaskEdit}
                >
                  Edit task
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  id="defaultModalButton"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  onClick={openCreateModal}
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add a task
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Created On
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Due On
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userTasks.length > 0 &&
                    userTasks.map((task) => (
                      <tr
                        key={task._id}
                        className="border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {task.title}
                        </th>
                        <td className="px-4 py-3">{task.description}</td>
                        <td className="px-4 py-3">
                          {task.done ? "Done" : "Not done"}
                        </td>
                        <td className="px-4 py-3">
                          {task.createdOn.toString()}
                        </td>
                        <td className="px-4 py-3">{task.dueBy.toString()}</td>
                        <td className="px-4 py-3 flex items-center justify-between">
                          <button
                            onClick={() => openEditModal(task)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleTaskDelete(task)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
