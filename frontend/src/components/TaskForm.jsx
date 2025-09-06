import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addTask, editTask } from '../features/tasks/tasksSlice'
import gsap from "gsap"

const TaskForm = ({ editingTask, onFinish }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const headingRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
    }
  }, [editingTask])

  useEffect(() => {
    gsap.fromTo(
      headingRef.current.querySelectorAll("span"),
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.4,
        ease: "power2.out",
      }
    )

    const btn = buttonRef.current
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.05, boxShadow: "0 0 12px rgba(99,102,241,0.5)", duration: 0.2 })
    })
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, boxShadow: "0 4px 10px rgba(0,0,0,0.15)", duration: 0.2 })
    })
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
      className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-8 max-w-3xl mx-auto border border-gray-200"
    >
      <h2 ref={headingRef} className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {(editingTask ? "Edit Task" : "Add New Task")
          .split("")
          .map((letter, index) => (
            <span key={index} className="inline-block">{letter}</span>
          ))}
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
          ref={buttonRef}
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
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
