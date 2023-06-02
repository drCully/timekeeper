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
  useCreateClientMutation,
  useClientQuery,
  useUpdateClientMutation,
} from './clientsApiSlice'

const Client = () => {
  const initialValues = {
    name: '',
    addr1: '',
    addr2: '',
    addr3: '',
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [editMode, setEditMode] = useState(false)
  const [createClient] = useCreateClientMutation()
  const [updateClient] = useUpdateClientMutation()

  const { name, addr1, addr2, addr3, firstName, lastName, email, isActive } =
    formValues

  const navigate = useNavigate()
  let { id } = useParams()
  if (!id) {
    id = ''
  }
  const { data, error } = useClientQuery(id)

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
        await createClient(formValues)
        navigate('/clients')
        toast.success('Client Created Successfully')
      } else {
        await updateClient(formValues)
        setEditMode(false)
        navigate('/clients')
        toast.success('Client Updated Successfully')
      }
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setFormValues({ ...initialValues })
    navigate('/clients')
  }

  return (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>{editMode ? 'Edit Client' : 'Add New Client'}</SFormTitle>
        <SFormControl>
          <SLabel htmlFor='name'>Name</SLabel>
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
          <SLabel htmlFor='addr1'>Address Line 1</SLabel>
          <SInput
            type='text'
            id='addr1'
            name='addr1'
            value={addr1}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='addr2'>Address Line 2</SLabel>
          <SInput
            type='text'
            id='addr2'
            name='addr2'
            value={addr2}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='addr3'>Address Line 3</SLabel>
          <SInput
            type='text'
            id='addr3'
            name='addr3'
            value={addr3}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='firstName'>Contact First Name</SLabel>
          <SInput
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='lastName'>Contact Last Name</SLabel>
          <SInput
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='email'>Contact Email</SLabel>
          <SInput
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl style={{ marginTop: '1.1rem' }}>
          <SLabel htmlFor='isActive'>Active?</SLabel>
          <SInput
            type='checkbox'
            id='isActive'
            name='isActive'
            value={isActive}
            checked={isActive}
            onChange={handleInputChange}
            style={{ cursor: 'pointer' }}
            width={`2rem`}
            height={`1.1rem`}
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

export default Client
