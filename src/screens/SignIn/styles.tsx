import styled from 'styled-components/native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Form as Unform } from '@unform/mobile'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede9;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const Form = styled(Unform)`
  width: 100%;
`

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
  color: #f4ede9;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  background: #312e38;
  left: 0;
  bottom: 0;
  right: 0;

  align-items: center;
  justify-content: center;
  flex-direction: row;

  border-top-width: 1px;
  border-top-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
`

export const CreateAccountText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`
