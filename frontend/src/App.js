import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { darkTheme, lightTheme } from './styles/theme'
import { Helmet } from 'react-helmet'
import { SPageContainer } from './styles/containerStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header/Header'
import Layout from './components/Layout'
import Signin from './features/auth/Signin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'

import Billing from './features/billings/Billing'
import ClientsList from './features/clients/ClientsList'
import Client from './features/clients/Client'
import Invoice from './features/invoices/Invoice'
import InvoiceCreate from './features/invoices/InvoiceCreate'
import Profile from './features/profile/Profile'
import ProfileHours from './features/profile/ProfileHours'
import TasksList from './features/tasks/TasksList'
import Task from './features/tasks/Task'
import Timesheet from './features/timeslips/Timesheet'
import Timeslip from './features/timeslips/Timeslip'
import Timeslips from './features/timeslips/TimeslipsList'
import Users from './features/users/UsersList'
import UserAddEdit from './features/users/User'

function App() {
  const { theme } = useSelector((state) => state.ui)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Helmet>
        <title>TimeKeeper</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <>
        <Header />
        <SPageContainer>
          <Routes>
            <Route path='/' element={<Layout />}>
              {/* public routes */}
              <Route path='Signin' element={<Signin />} />

              {/* protected routes */}
              <Route
                element={
                  <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                }
              >
                <Route path='/billings' element={<Billing />} />
                <Route path='/clients' element={<ClientsList />} />
                <Route path='/client' element={<Client />} />
                <Route path='/client/:id' element={<Client />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/profilehours' element={<ProfileHours />} />
                <Route path='/tasks' element={<TasksList />} />
                <Route path='/task' element={<Task />} />
                <Route path='/task/:id' element={<Task />} />
                <Route path='/timesheets' element={<Timesheet />} />
                <Route path='/timeslip' element={<Timeslip />} />
                <Route path='/timeslip/:id' element={<Timeslip />} />
                <Route path='/timeslips' element={<Timeslips />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
                  }
                >
                  <Route path='/billings' element={<Billing />} />
                  <Route path='/invoice' element={<InvoiceCreate />} />
                  <Route path='/invoice/:id' element={<Invoice />} />
                  <Route path='users'>
                    <Route index element={<Users />} />
                    <Route path=':id' element={<UserAddEdit />} />
                    <Route path='add' element={<UserAddEdit />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            {/* End Protected Routes */}
          </Routes>
        </SPageContainer>
        <ToastContainer autoClose={2000} />
      </>
    </ThemeProvider>
  )
}

export default App
