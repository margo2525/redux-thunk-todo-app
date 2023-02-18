import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as API from '../../api'
const TODOS_SLISE_NAME = 'todos'
export const createTodo = createAsyncThunk(
  `todos/create`,
  async (values, thunkAPI) => {
    try {
      const response = await API.createNewTodo(values)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)
export const getTodos = createAsyncThunk(
  `${TODOS_SLISE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await API.getTodos()
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

export const deleteTodo = createAsyncThunk(
  `${TODOS_SLISE_NAME}/delete`,
  async (payload, thunkAPI) => {
    try {
      await API.deleteTodo(payload)
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

export const updateTodo = createAsyncThunk(
  `${TODOS_SLISE_NAME}/update`,
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await API.updateTodo(id, values)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

const todosSlice = createSlice({
  name: TODOS_SLISE_NAME,
  initialState: {
    todos: [],
    isFetching: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    // CREATE
    builder.addCase(createTodo.pending, state => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload)
      state.isFetching = false
    }) // action.payload = response.data
    builder.addCase(createTodo.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })
    // GET
    builder.addCase(getTodos.pending, (state, action) => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos.push(...action.payload)
      state.isFetching = false
    })
    builder.addCase(getTodos.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })
    // DELETE
    builder.addCase(deleteTodo.pending, state => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.Todos = state.Todos.filter(p => p.id !== action.payload)
      state.isFetching = false
    })
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })
    // UPDATE
    builder.addCase(updateTodo.pending, state => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const foundIndex = state.Todos.findIndex(p => p.id === action.payload.id)
      state.Todos[foundIndex] = action.payload
      state.isFetching = false
    })
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })
  }
})

const { reducer, actions } = todosSlice

export const {} = actions

export default reducer
