import React from 'react'
import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import Routes from './routes'
import AppProvider from './hooks'

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </AppProvider>
  )
}

export default App
