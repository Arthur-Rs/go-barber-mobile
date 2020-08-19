import React from 'react'
import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { SafeAreaView } from './styles/GlobalStyles'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </SafeAreaView>
  )
}

export default App
