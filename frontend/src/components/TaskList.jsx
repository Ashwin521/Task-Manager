import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import { setFilter, setSort, clearCompleted } from '../features/tasks/tasksSlice'

const TaskList = () => {
  const { list, filter, sort } = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const [editingTask, setEditingTask] = useState(null)

  const tasks = useMemo(() => {
    let filtered = [...list]
    if (filter === 'active') filtered = filtered.filter((t) => !t.completed)
    if (filter === 'completed') filtered = filtered.filter((t) => t.completed)

    if (sort === 'newest') filtered.sort((a, b) => b.createdAt - a.createdAt)
    else filtered.sort((a, b) => a.createdAt - b.createdAt)

    return filtered
  }, [list, filter, sort])

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-6">
      <TaskForm editingTask={editingTask} onFinish={() => setEditingTask(null)} />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <button
          onClick={() => dispatch(clearCompleted())}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Clear Completed
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks yet</p>
        )}
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onEdit={setEditingTask} />
        ))}
      </div>
    </div>
  )
}

export default TaskList
