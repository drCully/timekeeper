import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import {
  SFixedContainer,
  SFlexContainer,
  SFlexRow,
  SFlexCol,
} from '../../styles/containerStyles'
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
  SSelect,
  STextArea,
} from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'

import {
  useCreateTimeslipMutation,
  useTimeslipQuery,
  useUpdateTimeslipMutation,
} from './timeslipsApiSlice'
import { useClientLookupQuery } from '../clients/clientsApiSlice'
import { useTaskLookupQuery } from '../tasks/tasksApiSlice'
import { useUserLookupQuery } from '../users/usersApiSlice'
import { setLastClient, setLastTask } from '../sessionSlice'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const Timeslip = () => {
  const currentUser = useSelector((state) => state.auth)
  const { timesheetDate, lastClient, lastTask } = useSelector(
    (state) => state.session
  )
  const dispatch = useDispatch()

  const initialValues = {
    date: timesheetDate,
    timekeeper: currentUser.userId,
    client: lastClient,
    task: lastTask,
    hours: 0.5,
    rate: currentUser.userRate,
    description: '',
    billable: true,
    billed: false,
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [editMode, setEditMode] = useState(false)
  const [createTime] = useCreateTimeslipMutation()
  const [updateTime] = useUpdateTimeslipMutation()

  const {
    date,
    timekeeper,
    client,
    task,
    hours,
    rate,
    description,
    billable,
    billed,
  } = formValues

  const navigate = useNavigate()
  const { id } = useParams()
  const { data, error } = useTimeslipQuery(id)
  const { data: clientlookup } = useClientLookupQuery()
  const { data: tasklookup } = useTaskLookupQuery()
  const { data: userlookup } = useUserLookupQuery()

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
    if (!date && !timekeeper && !client && !description && !rate) {
      toast.error('Please complete each input field')
    } else {
      if (!editMode) {
        await createTime(formValues)
        dispatch(setLastClient(client))
        dispatch(setLastTask(task))
        navigate(-1)
        toast.success('Time record Added Successfully')
      } else {
        await updateTime(formValues)
        setEditMode(false)
        navigate(-1)
        toast.success('Time record Updated Successfully')
      }
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setFormValues({ ...initialValues })
    navigate(-1)
  }

  return (
    <SFixedContainer maxwidth={`${s.md}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>{editMode ? 'Edit Time' : 'Add Time'}</SFormTitle>
        <SFlexRow>
          <SFlexCol>
            <SFormControl margin='0 2em 0 0'>
              <SLabel htmlFor='date'>Date</SLabel>
              <SInput
                type='Date'
                id='date'
                name='date'
                value={format(parseISO(date), 'yyyy-MM-dd')}
                disabled={billed}
                onChange={handleInputChange}
                width='10rem'
              />
            </SFormControl>
          </SFlexCol>
          <SFlexCol>
            <SFormControl>
              <SLabel htmlFor='client'>Client</SLabel>
              <SSelect
                id='client'
                name='client'
                value={client}
                disabled={billed}
                onChange={handleInputChange}
                width={'15rem'}
              >
                <option value=''> -- Select a Client -- </option>
                {clientlookup?.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </SSelect>
            </SFormControl>
          </SFlexCol>
        </SFlexRow>
        <SFlexRow>
          <SFlexCol>
            <SFormControl margin='0 2em 0 0'>
              <SLabel htmlFor='task'>Task</SLabel>
              <SSelect
                id='task'
                name='task'
                value={task}
                disabled={billed}
                onChange={handleInputChange}
                width={'15rem'}
              >
                <option value=''> -- Select a task -- </option>
                {tasklookup?.map((task) => (
                  <option key={task._id} value={task._id}>
                    {task.name}
                  </option>
                ))}
              </SSelect>
            </SFormControl>
          </SFlexCol>
          <SFlexCol>
            <SFormControl>
              <SLabel htmlFor='hours'>Hours</SLabel>
              <SInput
                type='number'
                id='hours'
                name='hours'
                value={hours}
                disabled={billed}
                onChange={handleInputChange}
                width='4rem'
              />
            </SFormControl>
          </SFlexCol>
        </SFlexRow>
        <SFlexRow>
          <SFlexCol size='1'>
            <SFormControl>
              <SLabel htmlFor='description'>Description</SLabel>
              <STextArea
                rows='2'
                id='description'
                name='description'
                value={description}
                disabled={billed}
                onChange={handleInputChange}
                width='44rem'
              />
            </SFormControl>
          </SFlexCol>
        </SFlexRow>
        {billed ? (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            This timeslip has been billed on invoice {data.invoice.number} and
            can not be edited. Undo billing to edit this timeslip and re-bill if
            necessary.
          </div>
        ) : (
          <SFlexContainer justify='space-around' margin='2rem 1rem'>
            <div>
              <SLabel htmlFor='timekeeper'>Timekeeper</SLabel>
              <SSelect
                id='timekeeper'
                name='timekeeper'
                value={timekeeper}
                disabled={billed}
                onChange={handleInputChange}
                width={'15rem'}
              >
                <option value=''> -- Select a Timekeeper -- </option>
                {userlookup?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName}
                  </option>
                ))}
              </SSelect>
            </div>
            <div>
              <SLabel htmlFor='rate'>Rate</SLabel>
              <SInput
                type='number'
                id='rate'
                name='rate'
                value={addDecimals(rate)}
                disabled={billed}
                placeholder='required'
                onChange={handleInputChange}
                width='7rem'
                style={{ textAlign: 'right' }}
              />
            </div>

            <SLabel htmlFor='billable'>Billable</SLabel>
            <SInput
              type='checkbox'
              id='billable'
              name='billable'
              value={billable}
              disabled={billed}
              checked={billable}
              onChange={handleInputChange}
              style={{ cursor: 'pointer' }}
              width={`2rem`}
              height={`1.1rem`}
            />

            <input type='hidden' id='billed' name='billed' value={billed} />
          </SFlexContainer>
        )}
        <SFlexContainer>
          <div hidden={billed}>
            <SButton type='submit' margin='.5rem'>
              {editMode ? 'Update' : 'Save'}
            </SButton>
          </div>

          <SButton background='gray' margin='.5rem' onClick={handleCancel}>
            Cancel
          </SButton>
        </SFlexContainer>
      </SForm>
    </SFixedContainer>
  )
}

export default Timeslip
