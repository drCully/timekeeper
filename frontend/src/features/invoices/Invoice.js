import { forwardRef, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format, addHours, parseISO } from 'date-fns'
import ReactToPrint from 'react-to-print'
import { toast } from 'react-toastify'

import {
  SFixedContainer,
  SFlexContainer,
  SFlexRow,
  SFlexCol,
} from '../../styles/containerStyles'
import { SCardFull } from '../../styles/cardStyles'

import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'
import LogoImg from './clientlogo.png'

import { useInvoiceQuery, useUpdateInvoiceMutation } from './invoicesApiSlice'
import {
  useTimeslipsQuery,
  useTimeslipBillingMutation,
} from '../timeslips/timeslipsApiSlice'
import { InvoiceDetail } from './InvoiceDetail'

const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
  })
}

const Invoice = () => {
  let componentRef = useRef()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: invoice, isLoading } = useInvoiceQuery(id)
  const { data: timeslips, isSuccess } = useTimeslipsQuery(`invoice=${id}`)

  const [updateInvoice] = useUpdateInvoiceMutation()
  const [updateTime] = useTimeslipBillingMutation()

  const handleUnpost = async (id) => {
    if (window.confirm('Are you sure you want to VOID this invoice? ')) {
      if (isSuccess) {
        let updatedValue = { ...invoice }
        updatedValue.client = null
        updatedValue.subTotal = 0
        updatedValue.salesTax = 0
        updatedValue.status = 'void'
        await updateInvoice(updatedValue)

        timeslips.map(async (time) => {
          let updatedValue = { ...time }
          updatedValue.billed = false
          updatedValue.invoice = null
          await updateTime(updatedValue)
        })

        navigate('/billings')
        toast.success('Invoice Voided Successfully')
      }
    }
  }

  const handleCancel = () => {
    navigate('/billings')
  }

  return (
    <SFixedContainer>
      <SFlexContainer justify='center'>
        <SFlexCol>
          {/* button to trigger printing of target component */}
          <ReactToPrint
            trigger={() => (
              <SButton background='green' margin='.5rem' width='5rem'>
                Print
              </SButton>
            )}
            content={() => componentRef}
          />
          <SButton
            type='submit'
            margin='.5rem'
            width='5rem'
            onClick={handleUnpost}
          >
            Unpost
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
      </SFlexContainer>
      <SFlexContainer justify='center'>
        {/* component to be printed */}
        <SCardFull
          width={`${s.lg}`}
          maxwidth={`${s.xl}`}
          height='40rem'
          overflow='auto'
        >
          <InvoiceToPrint ref={(el) => (componentRef = el)} />
        </SCardFull>
      </SFlexContainer>
    </SFixedContainer>
  )
}
export default Invoice

const InvoiceToPrint = forwardRef((props, ref) => {
  const { id } = useParams()
  const { data: invoiceData, isLoading } = useInvoiceQuery(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <SFixedContainer ref={ref} width={`${s.md}`}>
      <SFixedContainer margin='1.5rem 0 1rem 0' style={{ padding: '1.5rem' }}>
        <SFlexContainer justify='space-between' align='end'>
          <SFlexCol>
            <img src={LogoImg} style={{ width: '70px', height: '70px' }} />
            <p style={{ fontSize: '.7rem' }}>
              David Cully | 3611 I Street NE, 181 | Auburn, WA 98002 |
              206.683.2831
            </p>
          </SFlexCol>
          <SFlexCol style={{ alignItems: 'flex-end' }}>
            <h1 style={{ color: 'rgb(255, 106, 0)', fontWeight: 'bolder' }}>
              INVOICE
            </h1>
          </SFlexCol>
        </SFlexContainer>
        <SFlexContainer justify='space-between'>
          <SFlexCol margin='2rem 0 0 3.5rem'>
            <p style={{ fontSize: '.85rem' }}>
              {invoiceData.client.name}
              <br />
              {invoiceData.client.addr1}
              <br />
              {invoiceData.client.addr2}
              <br />
              {invoiceData.client.addr3}
              <br />
            </p>
          </SFlexCol>
          <SFlexCol>
            <SFlexRow style={{ marginTop: '1rem' }}>
              <SFlexCol margin='0 1rem 0 auto'>
                <p
                  style={{
                    color: 'rgb(255, 106, 0)',
                    fontSize: '.85rem',
                    fontWeight: 'bolder',
                  }}
                >
                  Date
                </p>
              </SFlexCol>
              <SFlexCol>
                <p
                  style={{
                    width: '5rem',
                    fontSize: '.85rem',
                    textAlign: 'right',
                  }}
                >
                  {format(
                    addHours(parseISO(invoiceData.date), 8),
                    'MM/dd/yyyy'
                  )}
                </p>
              </SFlexCol>
            </SFlexRow>
            <SFlexRow>
              <SFlexCol margin='0 1rem 0 auto'>
                <p
                  style={{
                    color: 'rgb(255, 106, 0)',
                    fontSize: '.85rem',
                    fontWeight: 'bolder',
                  }}
                >
                  Number
                </p>
              </SFlexCol>
              <SFlexCol>
                <p
                  style={{
                    width: '5rem',
                    fontSize: '.85rem',
                    textAlign: 'right',
                  }}
                >
                  {invoiceData.number}
                </p>
              </SFlexCol>
            </SFlexRow>
            <SFlexRow style={{ marginTop: '1rem' }}>
              <SFlexCol margin='0 1rem 0 auto'>
                <p
                  style={{
                    color: 'rgb(255, 106, 0)',
                    fontSize: '.85rem',
                    fontWeight: 'bolder',
                  }}
                >
                  Billable Time ({invoiceData.hours} hours)
                </p>
              </SFlexCol>
              <SFlexCol>
                <p
                  style={{
                    width: '5rem',
                    fontSize: '.85rem',
                    textAlign: 'right',
                  }}
                >
                  {formatNumber(invoiceData.subTotal)}
                </p>
              </SFlexCol>
            </SFlexRow>
            <SFlexRow>
              <SFlexCol margin='0 1rem 0 auto'>
                <p
                  style={{
                    color: 'rgb(255, 106, 0)',
                    fontSize: '.85rem',
                    fontWeight: 'bolder',
                  }}
                >
                  Sales Tax
                </p>
              </SFlexCol>
              <SFlexCol>
                <p
                  style={{
                    width: '5rem',
                    fontSize: '.85rem',
                    textAlign: 'right',
                  }}
                >
                  {formatNumber(invoiceData.salesTax)}
                </p>
              </SFlexCol>
            </SFlexRow>
            <SFlexRow>
              <SFlexCol margin='0 1rem 0 auto'>
                <p
                  style={{
                    color: 'rgb(255, 106, 0)',
                    fontSize: '.85rem',
                    fontWeight: 'bolder',
                  }}
                >
                  Due on Receipt
                </p>
              </SFlexCol>
              <SFlexCol>
                <p
                  style={{
                    width: '5rem',
                    fontSize: '.85rem',
                    textAlign: 'right',
                  }}
                >
                  {formatNumber(
                    Number(invoiceData.subTotal) + Number(invoiceData.salesTax)
                  )}
                </p>
              </SFlexCol>
            </SFlexRow>
          </SFlexCol>
        </SFlexContainer>
        <SFixedContainer margin='1rem 0 5rem 0'>
          <InvoiceDetail invoice={invoiceData._id} />
        </SFixedContainer>
      </SFixedContainer>
    </SFixedContainer>
  )
})
