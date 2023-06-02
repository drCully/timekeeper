import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import { SForm, SFormTitle, SInput, SLabel } from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
} from './profileApiSlice'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const User = () => {
  const currentUser = useAuth()

  const initialValues = {
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    initials: '',
    rate: 0,
    isActive: true,
  }

  const [formValues, setFormValues] = useState(initialValues)

  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    initials,
    rate,
    isActive,
  } = formValues

  const [editMode, setEditMode] = useState(false)
  const [updateUser] = useUpdateUserProfileMutation()
  const navigate = useNavigate()

  const { data, error } = useUserProfileQuery(currentUser.userId)

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setFormValues({ ...data })
    }
  }, [data])

  const handleInputChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!firstName && !lastName && !initials && !rate) {
      toast.error('Please provide value for required fields')
    } else {
      if (password !== password2) {
        toast.error('Passwords do not match')
      } else {
        if (!editMode) {
          setEditMode(true)
        } else {
          //const userData = formValues.filter('password2')
          await updateUser(formValues)
          setEditMode(false)
          toast.success('Profile Updated Successfully')
        }
      }
    }
  }

  const handleCancel = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(false)
      setFormValues({ ...initialValues })
      navigate(-1)
    }
  }

  return (
    <SFixedContainer maxwidth={`${s.md}`} minwidth={`${s.sm}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>{editMode ? 'Edit Profile' : 'Profile'}</SFormTitle>
        <SFlexContainer justify='start' margin='.5rem 1rem'>
          <div>
            <SLabel htmlFor='email'>Email Address</SLabel>
            <SInput
              type='text'
              id='email'
              name='email'
              value={email}
              disabled={!editMode}
              placeholder='required'
              onChange={handleInputChange}
              width='20rem'
            />
          </div>
        </SFlexContainer>
        <SFlexContainer justify='space-around' margin='2rem 1rem'>
          <div>
            <SLabel htmlFor='password'>New Password</SLabel>
            <SInput
              type='password'
              id='password'
              name='password'
              value={password}
              disabled={!editMode}
              onChange={handleInputChange}
              width='18rem'
            />
          </div>
          <div>
            <SLabel htmlFor='password2'>Confirm New Password</SLabel>
            <SInput
              type='password'
              id='password2'
              name='password2'
              value={password2}
              disabled={!editMode}
              onChange={handleInputChange}
              width='18rem'
            />
          </div>
        </SFlexContainer>
        <SFlexContainer justify='space-around' margin='2rem 1rem'>
          <div>
            <SLabel htmlFor='firstName'>First Name</SLabel>
            <SInput
              type='text'
              id='firstName'
              name='firstName'
              value={firstName}
              disabled={!editMode}
              placeholder='required'
              onChange={handleInputChange}
              width='15rem'
            />
          </div>
          <div>
            <SLabel htmlFor='lastName'>Last Name</SLabel>
            <SInput
              type='text'
              id='lastName'
              name='lastName'
              value={lastName}
              disabled={!editMode}
              placeholder='required'
              onChange={handleInputChange}
              width='15rem'
            />
          </div>
          <div>
            <SLabel htmlFor='initials'>Initials</SLabel>
            <SInput
              type='text'
              id='initials'
              name='initials'
              value={initials}
              disabled={!editMode}
              placeholder='required'
              onChange={handleInputChange}
              width='7rem'
            />
          </div>
        </SFlexContainer>
        <SFlexContainer justify='space-around' margin='2rem 1rem'>
          <div>
            <SLabel htmlFor='rate'>Billing Rate</SLabel>
            <SInput
              type='number'
              id='rate'
              name='rate'
              value={addDecimals(rate)}
              disabled={true}
              placeholder='required'
              onChange={handleInputChange}
              width='7rem'
              style={{ textAlign: 'right' }}
            />
          </div>
          <div style={{ marginTop: '.5rem' }}>
            <SLabel htmlFor='isActive'>Active?</SLabel>
            <SInput
              type='checkbox'
              id='isActive'
              name='isActive'
              value={isActive}
              checked={isActive}
              disabled={true}
              onChange={handleInputChange}
              style={{ cursor: 'pointer' }}
              width={`2rem`}
              height={`1.1rem`}
            />
          </div>
        </SFlexContainer>
        <SFlexContainer>
          <SButton type='submit' width='5rem' margin='.5rem'>
            {editMode ? 'Save' : 'Edit'}
          </SButton>

          {editMode ? (
            <SButton
              background='gray'
              type='button'
              width='5rem'
              margin='.5rem'
              onClick={handleCancel}
            >
              Cancel
            </SButton>
          ) : (
            ''
          )}
        </SFlexContainer>
      </SForm>
    </SFixedContainer>
  )
}

export default User
