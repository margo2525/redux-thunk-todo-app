import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FaChevronCircleDown, FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import './TodoLIst.css'
import {
  deleteTodo,
  getTodos,
  updateTodo
} from './../../store/slices/todoListSlice'
function TodoList ({
  todos,
  isFetching,
  error,
  get,
  remove,
  update,
  setTodos,
  setEditTodo
}) {
  useEffect(() => {
    get()
  }, [])

  const isBoughtChangeHandler = (id, checked) => {
    update(id, { isBought: checked })
  }
  const handleComplete = todo =>
    setTodos(
      todos.map(item => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    )

  const handleEdit = ({ id }) => {
    const findTodo = todos.find(todo => todo.id === id)
    setEditTodo(findTodo)
  }
  return (
    <ul>
      {isFetching && <div>Loading...</div>}
      {error && <div>!!!!ERROR!!!!</div>}
      {!error &&
        todos.map(t => (
          <li className='list-item' key={t.id}>
            <input
              type='checkbox'
              className={'list ' + (t.completed ? 'complete' : '')}
              checked={t.isBought}
              onChange={({ target: { checked } }) =>
                isBoughtChangeHandler(t.id, checked)
              }
            />
            {t.value}
            <div>
              <button
                className='button-complete task-button'
                onClick={() => handleComplete(t.id)}
              >
                <FaChevronCircleDown />
              </button>
              <button
                className='button-edit task-button'
                onClick={() => handleEdit(t.id)}
              >
                <FaPencilAlt />
              </button>
              <button
                className='button-delete task-button'
                onClick={() => {
                  remove(t.id)
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
    </ul>
  )
}
const mapStateToProps = ({ todosData }) => todosData

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTodos()),
  remove: id => dispatch(deleteTodo(id)),
  update: (id, values) => dispatch(updateTodo({ id, values }))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
