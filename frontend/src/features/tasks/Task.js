import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
} from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'

import {
  useCreateTaskMutation,
  useTaskQuery,
  useUpdateTaskMutation,
} from './tasksApiSlice'

const Task = () => {
  const initialValues = {
    name: '',
    active: true,
  }
  const [formValues, setFormValues] = useState(initialValues)
  const [editMode, setEditMode] = useState(false)
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const { name, active } = formValues

  const navigate = useNavigate()
  let { id } = useParams()
  if (!id) {
    id = ''
  }
  const { data, error } = useTaskQuery(id)

  useEffect(() => {
    if (error && id) {
      toast.error('Something went wrong')
    }
  }, [error, id])

  useEffect(() => {
    if (id) {
      setEditMode(true)
      if (data) {
        setFormValues({ ...data })
      }
    } else {
      setEditMode(false)
      setFormValues({ ...initialValues })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data])

  const handleInputChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name) {
      toast.error('Please complete each input field')
    } else {
      if (!editMode) {
        await createTask(formValues)
        navigate('/tasks')
        toast.success('Task Added Successfully')
      } else {
        await updateTask(formValues)
        setEditMode(false)
        navigate('/tasks')
        toast.success('Task Updated Successfully')
      }
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setFormValues({ ...initialValues })
    navigate('/tasks')
  }

  return (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>{editMode ? 'Edit Task' : 'Add New Task'}</SFormTitle>
        <SFormControl>
          <SLabel htmlFor='name'>Task Description</SLabel>
          <SInput
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='active'>Active?</SLabel>
          <SInput
            type='checkbox'
            id='active'
            name='active'
            checked={active}
            onChange={handleInputChange}
            margin='1em 0 1em 0'
          />
        </SFormControl>

        <SFlexContainer>
          <SButton type='submit' margin='.5rem'>
            {editMode ? 'Update' : 'Save'}
          </SButton>

          <SButton
            background='gray'
            type='button'
            margin='.5rem'
            onClick={handleCancel}
          >
            Cancel
          </SButton>
        </SFlexContainer>
      </SForm>
    </SFixedContainer>
  )
}

export default Task
