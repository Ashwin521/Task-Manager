import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTask, deleteTask } from '../features/tasks/tasksSlice'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
        className="w-5 h-5 accent-indigo-500 rounded focus:ring-2 focus:ring-indigo-300 transition"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h3
            className={`text-lg ${
              task.completed ? 'line-through text-gray-400' : 'font-semibold text-gray-800'
            }`}
          >
            {task.title}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-300 rounded-lg px-3 py-1 text-sm transition"
            >
              <FiEdit2 size={16} /> Edit
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg px-3 py-1 text-sm transition"
            >
              <FiTrash2 size={16} /> Delete
            </button>
          </div>
        </div>
        {task.description && (
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        )}
        <p className="text-xs text-gray-400">
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default TaskItem
