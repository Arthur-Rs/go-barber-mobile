import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// => screens
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

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
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AuthRoutes
