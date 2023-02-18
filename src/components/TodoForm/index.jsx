import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { createTodo } from '../../store/slices/todoListSlice'
import { TODO_VALIDATION_SCHEMA } from '../../utils/validationSchemas'
import './TodoForm.css'
function TodoForm ({ create }) {
  const initialValues = { value: '' }
  const handleSubmit = (values, formikBag) => {
    create(values)
    formikBag.resetForm()
  }
  return (
    <Formik
      className='app-wrapper'
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TODO_VALIDATION_SCHEMA}
    >
      <Form>
        <Field
          name='value'
          type='text'
          placeholder='Enter a Todo...'
          className='task-input'
          autoFocus
        />
        <ErrorMessage name='value' component='span' />
        <button className='button-add' type='submit'>
          Add
        </button>
      </Form>
    </Formik>
  )
}
const mapDispatchToProps = dispatch => ({
  create: values => dispatch(createTodo(values))
})
export default connect(null, mapDispatchToProps)(TodoForm)
