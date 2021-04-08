import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './todoListItem'
import { selectFilteredTodoIds } from './todosSlice'

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds, shallowEqual)

  const renderedListItems = todoIds.map(todoId => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList