import React, { useCallback, useRef } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Alert,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather'
import logoImg from '../../assets/logo.png'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { ForgotPasswordFormData } from './types'
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles'

const ForgotPassword: React.FC = () => {
  const { goBack } = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)

  const handleForgotPasswordRequest = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
        })
        await schema.validate(data, {
          abortEarly: false,
        })
        await api.post('/password/forgot', {
          email: data.email,
        })
        Alert.alert('E-mail de recuperação de senha enviado')
        goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        Alert.alert(
          'Erro na solicitação',
          'Ocorreu um erro ao solicitar recuperação de senha, tente novamente .',
        )
      }
    },
    [goBack],
  )

  const handleGoback = useCallback(() => {
    goBack()
  }, [goBack])

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
              <Title>Recuperar Senha</Title>
            </View>
            <Form ref={formRef} onSubmit={handleForgotPasswordRequest}>
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                placeholder="E-mail"
                icon="mail"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Recuperar senha
              </Button>
            </Form>
          </Container>
          <BackToSignInButton onPress={handleGoback}>
            <Icon name="arrow-left" size={20} color="#f4ede8" />
            <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
          </BackToSignInButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default ForgotPassword
