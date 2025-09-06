import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const STORAGE_KEY = "tasks_data";

const loadTasks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: loadTasks(),
    filter: "all", 
    sort: "newest",
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: uuid(),
        title: action.payload.title,
        description: action.payload.description || "",
        completed: false,
        createdAt: Date.now(),
      };
      state.list.unshift(newTask);
      saveTasks(state.list);
    },
    toggleTask: (state, action) => {
      const task = state.list.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveTasks(state.list);
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
      saveTasks(state.list);
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.list.find((t) => t.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
      saveTasks(state.list);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    clearCompleted: (state) => {
      state.list = state.list.filter((t) => !t.completed);
      saveTasks(state.list);
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  setFilter,
  setSort,
  clearCompleted,
} = tasksSlice.actions;

export default tasksSlice.reducer;
