import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAuth } from '../../hooks/auth'

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          signOut()
        }}
      >
        <Text>SAIR</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard
