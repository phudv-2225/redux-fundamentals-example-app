import { StatusFilters } from '../filters/filtersSlice'

const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
]

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export const selectTodoById = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId)
}

export const selectFilteredTodoIds = (state) => {
  const { todos, filters } = state;
  const { status, colors } = filters
  const showAllCompletions = status === StatusFilters.All

  if (showAllCompletions && colors.length === 0) {
    return todos.map(todo => todo.id)
  }

  const completedStatus = status === StatusFilters.Completed
  return todos.filter((todo) => {
    const statusMatches = showAllCompletions || todo.completed === completedStatus
    const colorMatches = colors.length === 0 || colors.includes(todo.color)
    return statusMatches && colorMatches
  }).map(todo => todo.id)
}

export const selectTotalCompletedTodos = (state) => {
  const completedTodos = state.todos.filter(todo => todo.completed)
  return completedTodos.length
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false
        }
      ]
    }

    case 'todos/todoToggled': {
      return state.map(todo => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      })
    }

    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }

    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }

    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
  
    default:
      return state
  }
}