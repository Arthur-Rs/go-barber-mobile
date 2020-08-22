import { createContext } from 'react'

import { contextInterface } from './types'

const AuthContext = createContext<contextInterface>({} as contextInterface)

export default AuthContext
