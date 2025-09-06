import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTask, editTask } from '../features/tasks/tasksSlice'

const TaskForm = ({ editingTask, onFinish }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    if (editingTask) {
      dispatch(editTask({ id: editingTask.id, title, description }))
      onFinish()
    } else {
      dispatch(addTask({ title, description }))
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-8 max-w-3xl mx-auto border border-gray-200 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition duration-200 placeholder-gray-400"
        />
        <button
          type="submit"
          className={`bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200`}
        >
          {editingTask ? 'Save Changes' : 'Add Task'}
        </button>
      </div>

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mt-5 border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner transition duration-200 resize-none placeholder-gray-400"
        rows={4}
      />
    </form>
  )
}

export default TaskForm
