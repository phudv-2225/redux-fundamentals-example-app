import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'
import { selectTodoById } from './todosSlice'

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: todo.id })
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch({
      type: 'todos/colorSelected',
      payload: { todoId: todo.id, color },
    })
  }

  const onDelete = () => {
    dispatch({ type: 'todos/todoDeleted', payload: todo.id })
  }

  const colorOptions = availableColors.map((color) => (
    <option key={color} value={color}>
      {capitalize(color)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            x
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
