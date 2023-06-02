import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isEditor = false
  let isAdmin = false

  if (token) {
    const decoded = jwtDecode(token)

    const { userId, userName, userRate, roles } = decoded.UserInfo

    isEditor = roles.includes('Editor')
    isAdmin = roles.includes('Admin')

    return { userId, userName, userRate, roles, isEditor, isAdmin }
  }

  return {
    userId: '',
    userName: '',
    userRate: 0,
    roles: [],
  }
}
export default useAuth
