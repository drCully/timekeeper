import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  SFormControl,
  SFormPlain,
  SInput,
  SLabel,
} from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'

import { InvoiceCreateDetail } from './InvoiceCreateDetail'
import { useClientQuery } from '../clients/clientsApiSlice'
import { useCreateInvoiceMutation } from './invoicesApiSlice'
import { useInvoiceTimeslipMutation } from '../timeslips/timeslipsApiSlice'
import { clearBilling } from '../../features/billings/billingSlice'

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const InvoiceCreate = () => {
  const { asOfDate, clientId, items, timeAmount, hours } = useSelector(
    (state) => state.billing
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    date: format(parseISO(asOfDate), 'yyyy-MM-dd'),
    client: clientId,
    subTotal: timeAmount,
    salesTax: 0,
  }

  const [formValues, setFormValues] = useState(initialValues)

  const { date, client, subTotal, salesTax } = formValues

  const { data: clientData, isLoading } = useClientQuery(clientId, {
    refetchOnMountOrArgChange: true,
  })
  const [createInvoice] = useCreateInvoiceMutation()
  const [invoiceTimeslip] = useInvoiceTimeslipMutation()

  const handleInputChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.type === 'expensebox' ? target.expenseed : target.value

    /* setFormValues({ ...formValues, [name]: value }) */
    setFormValues({
      ...formValues,
      [name]: value,
      subTotal: timeAmount,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const invoiceResult = await createInvoice({
      date: date,
      client: clientId,
      subTotal: timeAmount,
      salesTax: salesTax,
      hours: hours,
    })

    items.map(async (timeslip) => {
      let updatedValue = { ...timeslip }
      updatedValue.billed = true
      updatedValue.invoice = invoiceResult.data._id
      await invoiceTimeslip(updatedValue)
    })

    dispatch(clearBilling())
    navigate('/billings')
    toast.success('Invoice Added Successfully')
  }

  const handleCancel = () => {
    //setFormValues({ ...initialValues })
    dispatch(clearBilling())
    navigate('/billings')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <SFixedContainer maxwidth={`${s.xl}`}>
      <h2>Prepare Invoice</h2>
      <SFlexContainer justify='space-between'>
        <SFlexCol fsize='1' margin='1rem'>
          {clientData.name}
          <br />
          {clientData.addr1}
          <br />
          {clientData.addr2}
          <br />
          {clientData.addr3}
          <br />
        </SFlexCol>
        <SFlexCol>
          <SFormPlain onSubmit={handleSubmit}>
            <SFlexRow>
              <SFlexCol margin='0 0 0 auto'>
                <SFormControl>
                  <SLabel htmlFor='invoiceDate'>Date</SLabel>
                  <SInput
                    type='Date'
                    id='date'
                    name='date'
                    value={format(parseISO(date), 'yyyy-MM-dd')}
                    onChange={handleInputChange}
                    width='10rem'
                  />
                </SFormControl>
              </SFlexCol>
              <SFlexCol margin='0 0 0 auto'>
                <SFormControl>
                  <SLabel htmlFor='hours'>Hours</SLabel>
                  <SInput
                    type='number'
                    id='hours'
                    name='hours'
                    value={addDecimals(Number(hours))}
                    disabled={true}
                    width='6rem'
                    style={{ textAlign: 'right' }}
                  />
                </SFormControl>
              </SFlexCol>
              <SFlexCol margin='0 0 0 auto'>
                <SFormControl>
                  <SLabel htmlFor='subTotal'>Amount</SLabel>
                  <SInput
                    type='number'
                    id='subTotal'
                    name='subTotal'
                    value={addDecimals(timeAmount)}
                    disabled={true}
                    width='6rem'
                    style={{ textAlign: 'right' }}
                  />
                </SFormControl>
              </SFlexCol>
            </SFlexRow>
            <SFlexRow>
              <SFlexCol margin='0 0 0 auto'>
                <SFormControl>
                  <SLabel htmlFor='salesTax'>Sales Tax</SLabel>
                  <SInput
                    type='number'
                    id='salesTax'
                    name='salesTax'
                    value={Number(salesTax)}
                    onChange={handleInputChange}
                    width='6rem'
                    style={{ textAlign: 'right' }}
                  />
                </SFormControl>
              </SFlexCol>
            </SFlexRow>
            <SFlexRow>
              <SFlexCol fsize='1' margin='0 0 0 15rem'>
                <SButton
                  type='submit'
                  margin='.5rem'
                  width='5rem'
                  onClick={handleSubmit}
                >
                  Post
                </SButton>
                <SButton
                  background='gray'
                  margin='.5rem'
                  width='5rem'
                  onClick={handleCancel}
                >
                  Cancel
                </SButton>
              </SFlexCol>
              <SFlexCol margin='0 0 0 3rem'>
                <SFormControl>
                  <SLabel htmlFor='total'>Total</SLabel>
                  <SInput
                    type='number'
                    id='total'
                    name='total'
                    value={(Number(timeAmount) + Number(salesTax)).toFixed(2)}
                    disabled={true}
                    width='6rem'
                    style={{ textAlign: 'right' }}
                  />
                </SFormControl>
              </SFlexCol>
            </SFlexRow>
            <input type='hidden' id='client' name='client' value={clientId} />
          </SFormPlain>
        </SFlexCol>
      </SFlexContainer>
      <SFixedContainer height='30rem' overflow='auto'>
        <InvoiceCreateDetail />
      </SFixedContainer>
    </SFixedContainer>
  )
}

export default InvoiceCreate
