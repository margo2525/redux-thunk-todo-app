import { configureStore } from '@reduxjs/toolkit'
import todosReduces from './slices/todoListSlice'

const store = configureStore({
  reducer: {
    todosData: todosReduces
  }
})

export default store
