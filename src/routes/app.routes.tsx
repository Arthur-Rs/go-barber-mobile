import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// => screens
import Dashboard from '../screens/Dashboard'

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#312e38' },
        }}
        initialRouteName="SignUp"
      >
        <Screen name="Dashboard" component={Dashboard} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AuthRoutes
