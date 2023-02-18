import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App () {
  return (
    <>
      <div>
        <header>Todo List</header>
      </div>
      <main className='app-wrapper'>
        <TodoForm />
        <TodoList />
      </main>
    </>
  )
}

export default App
