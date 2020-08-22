import { useContext } from 'react'

import AuthContext from './context'
import { contextInterface } from './types'

const useAuth = (): contextInterface => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used  within as AuthProvider')
  }

  return context
}

export default useAuth
