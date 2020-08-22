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

import { FormHandles } from '@unform/core'

import logoImg from '../../assets/logo.png'

// => Components
import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Title, ReturnLogon, ReturnLogonText, Form } from './styles'

import api from '../../services/api'
import * as yup from 'yup'
import getValidationErros from '../../utils/getValidationErros'
import { useNavigation } from '@react-navigation/native'

interface SignUpData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const { navigate } = useNavigation()
  const FormRef = useRef<FormHandles>(null)
  const InputEmailRef = useRef<TextInput>(null)
  const InputPasswordRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(
    async (data: SignUpData) => {
      try {
        FormRef.current?.setErrors({})

        const schema = yup.object().shape({
          name: yup.string().min(3, 'Mínimo de 3 caracteres'),
          email: yup.string().email().required('E-mail Obrigatório'),
          password: yup.string().min(8, 'Mínimo de 8 caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post('/users', data)

        Alert.alert(
          'Cadastro feito com sucesso!',
          'Agora você já pode fazer logon na aplicação!',
        )

        navigate('SignIn')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err)

          FormRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Error no cadastro',
          'Não foi fazer o cadastro na aplicação, por favor tente novamente!',
        )
      }
    },
    [navigate],
  )

  const handleSubmitButton = useCallback(() => {
    FormRef.current?.submitForm()
  }, [])

  const handleReturnToLogon = useCallback(() => {
    navigate('SignIn')
  }, [navigate])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={FormRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                autoCapitalize="words"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  InputEmailRef.current?.focus()
                }}
              />
              <Input
                ref={InputEmailRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  InputPasswordRef.current?.focus()
                }}
              />
              <Input
                ref={InputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={handleSubmitButton}
                textContentType="newPassword"
              />

              <Button onPress={handleSubmitButton}>Cadastrar</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <ReturnLogon onPress={handleReturnToLogon}>
        <Icon name="arrow-left" size={20} color="#f4ede9" />
        <ReturnLogonText>Voltar para logon</ReturnLogonText>
      </ReturnLogon>
    </>
  )
}

export default SignUp
