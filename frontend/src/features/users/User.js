import { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
  SSelect,
} from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import {
  useCreateUserMutation,
  useUserQuery,
  useUpdateUserMutation,
} from './usersApiSlice'
import { ROLES } from '../../config/roles'

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const User = () => {
  const emailRef = useRef()

  let { id } = useParams()
  if (!id) {
    id = ''
  }

  const { data: user, isLoading } = useUserQuery(id)

  const [createUser, { isSuccess: createSuccess }] = useCreateUserMutation()
  const [updateUser, { isSuccess: updateSuccess }] = useUpdateUserMutation()

  const navigate = useNavigate()

  const [editMode, setEditMode] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [initials, setInitials] = useState('')
  const [rate, setRate] = useState(150)
  const [roles, setRoles] = useState(['User'])
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (id) {
      setEditMode(true)
      if (user) {
        setEmail(user.email)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setInitials(user.initials)
        setRate(user.rate)
        setRoles(user.roles)
        setIsActive(user.isActive)
      }
    } else {
      setEditMode(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user])

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      console.log('Success effect')
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setInitials('')
      setRate(0)
      setRoles([])
      setIsActive(false)
      navigate('/users')
    }
  }, [createSuccess, updateSuccess, navigate])

  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onFirstNameChanged = (e) => setFirstName(e.target.value)
  const onLastnameChanged = (e) => setLastName(e.target.value)
  const onInitialsChanged = (e) => setInitials(e.target.value)
  const onRateChanged = (e) => setRate(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    )
    setRoles(values)
  }

  const onIsActiveChanged = () => setIsActive((prev) => !prev)

  let canSave
  if (password) {
    canSave =
      [roles.length, validEmail, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validEmail].every(Boolean) && !isLoading
  }

  const onSaveClicked = async (e) => {
    if (!canSave) {
      toast.error('Please complete each input field')
    } else {
      if (!editMode) {
        await createUser({
          email,
          password,
          firstName,
          lastName,
          initials,
          rate,
          roles,
          isActive,
        })
        toast.success('User Created Successfully')
      } else {
        if (password) {
          await updateUser({
            _id: id,
            email,
            password,
            firstName,
            lastName,
            initials,
            rate,
            roles,
          })
        } else {
          await updateUser({
            _id: id,
            email,
            firstName,
            lastName,
            initials,
            rate,
            roles,
          })
          setEditMode(false)
          toast.success('User Updated Successfully')
        }
      }
    }
  }

  const onCancelClicked = () => {
    setEditMode(false)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setInitials('')
    setRate(0)
    setRoles([])
    setIsActive(false)
    navigate('/users')
  }

  /*   const options = Object.entries(ROLES).map(([role, code]) => {
    return (
      <option key={code} value={code}>
        {role}: {code}
      </option>
    )
  }) */

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    )
  })

  const content = (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm className='row g-3 ms-3' onSubmit={(e) => e.preventDefault()}>
        <SFormTitle>{editMode ? 'Edit User' : 'Add New User'}</SFormTitle>
        <SFormControl>
          <SLabel htmlFor='email'>Email</SLabel>
          <SInput
            type='text'
            id='email'
            name='email'
            ref={emailRef}
            value={email}
            onChange={onEmailChanged}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='password'>Password</SLabel>
          <SInput
            type='text'
            id='password'
            name='password'
            value={password}
            onChange={onPasswordChanged}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='firstName'>First Name</SLabel>
          <SInput
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={onFirstNameChanged}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='lastName'>Last Name</SLabel>
          <SInput
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={onLastnameChanged}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='initials'>Initials</SLabel>
          <SInput
            type='text'
            id='initials'
            name='initials'
            value={initials}
            onChange={onInitialsChanged}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='rate'>Bill Rate</SLabel>
          <SInput
            type='number'
            step='any'
            id='rate'
            name='rate'
            value={rate}
            onChange={onRateChanged}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='roles'>Assigned Roles</SLabel>
          <SSelect
            id='roles'
            name='roles'
            multiple={true}
            value={roles}
            onChange={onRolesChanged}
            width='100%'
          >
            {options}
          </SSelect>
        </SFormControl>
        <SFormControl style={{ marginTop: '1.1rem' }}>
          <SLabel htmlFor='isActive'>Active?</SLabel>
          <SInput
            type='checkbox'
            id='isActive'
            name='isActive'
            value={isActive}
            checked={isActive}
            onChange={onIsActiveChanged}
            style={{ cursor: 'pointer' }}
            width={`2rem`}
            height={`1.1rem`}
          />
        </SFormControl>

        <SFlexContainer>
          <SButton onClick={onSaveClicked} disabled={!canSave} margin='.5rem'>
            {editMode ? 'Update' : 'Save'}
          </SButton>

          <SButton
            background='gray'
            type='button'
            margin='.5rem'
            onClick={onCancelClicked}
          >
            Cancel
          </SButton>
        </SFlexContainer>
      </SForm>
    </SFixedContainer>
  )

  return content
}

export default User
