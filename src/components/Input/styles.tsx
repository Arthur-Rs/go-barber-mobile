import styled, { css } from 'styled-components/native'
import FeatherIcons from 'react-native-vector-icons/Feather'

interface ContainerProps {
  isFocus: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 1px solid #232129;

  ${props =>
    props.isFocus &&
    css`
      border-color: #ff9000;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  flex-direction: row;
  align-items: center;
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #f4ede9;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcons)`
  margin-right: 16px;
`
