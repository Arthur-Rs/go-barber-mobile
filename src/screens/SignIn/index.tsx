import React, { useCallback, useRef } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { FormHandles } from '@unform/core'

import logoImg from '../../assets/logo.png'

import * as yup from 'yup'

import getValidationErros from '../../utils/getValidationErros'

import { useAuth } from '../../hooks/auth'

// => Components
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
  Form,
} from './styles'

interface SignInData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const { navigate } = useNavigation()

  const FormRef = useRef<FormHandles>(null)
  const InputPasswordRef = useRef<TextInput>(null)
  const { signIn } = useAuth()

  const handleSignIn = useCallback(
    async (data: SignInData) => {
      try {
        FormRef.current?.setErrors({})

        const schema = yup.object().shape({
          email: yup.string().email().required('E-mail Obrigatório'),
          password: yup.string().min(8, 'Mínimo de 8 caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        signIn(data)
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err)

          FormRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Error na autenticação',
          'Não foi fazer a logon na aplicação, por favor tente novamente!',
        )
      }
    },
    [signIn],
  )

  const handleSubmitButton = useCallback(() => {
    FormRef.current?.submitForm()
  }, [])

  const handleCreateAccount = useCallback(() => {
    navigate('SignUp')
  }, [navigate])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={FormRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  InputPasswordRef.current.focus()
                }}
              />
              <Input
                ref={InputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                secureTextEntry
                onSubmitEditing={handleSubmitButton}
              />

              <Button onPress={handleSubmitButton}>Entrar</Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={handleCreateAccount}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccount>
    </>
  )
}

export default SignIn
