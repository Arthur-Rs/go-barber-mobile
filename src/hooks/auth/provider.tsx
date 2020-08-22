import React, { useCallback, useState, useEffect } from 'react'
import api from '../../services/api'
import { signInRequest, signInResponse } from './types'
import AuthContext from './context'
import AsyncStorage from '@react-native-community/async-storage'

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<signInResponse>({} as signInResponse)

  useEffect(() => {
    const GetDataFromAsyncStorage = async () => {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ])

      if (!token || !user) {
        return
      }

      setData({ token, user: JSON.parse(user) })
    }

    GetDataFromAsyncStorage()
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['GoBarber:t@oken', '@GoBarber:user'])
    setData({} as signInResponse)
  }, [])

  const signIn = useCallback(async ({ email, password }: signInRequest) => {
    const { data } = await api.post<signInResponse>('/session', {
      email,
      password,
    })

    const { token, user } = data

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ])

    setData({ token, user })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        name: 'user',
        signIn,
        user: data.user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
