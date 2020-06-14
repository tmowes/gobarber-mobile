import React, { useCallback, useRef } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { ProfileFormData } from './types'
import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
} from './styles'

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth()
  const { goBack } = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const ConfirmpasswordInputRef = useRef<TextInput>(null)

  const handleProfileUpdate = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: value => !!value.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: value => !!value.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha incorreta',
            ),
        })
        await schema.validate(data, {
          abortEarly: false,
        })
        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data
        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        }
        const response = await api.put('/profile', formData)
        updateUser(response.data)
        Alert.alert('Perfil atualizado com sucesso')
        goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar o perfil, tente novamente .',
        )
      }
    },
    [goBack, updateUser],
  )

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
        takePhotoButtonTitle: 'Usar câmera',
        cancelButtonTitle: 'Cancelar',
      },
      updateAvatar => {
        if (updateAvatar.didCancel) {
          return
        }
        if (updateAvatar.error) {
          Alert.alert('Erro ao atualizar seu avatar')
          return
        }
        const data = new FormData()
        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: updateAvatar.uri,
        })
        async function handleupdateAvatar() {
          const response = await api.patch('users/avatar', data)
          updateUser(response.data)
        }
        handleupdateAvatar()
      },
    )
  }, [user.id, updateUser])

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
            <BackButton onPress={handleGoback}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form
              initialData={user}
              ref={formRef}
              onSubmit={handleProfileUpdate}
            >
              <Input
                autoCapitalize="words"
                name="name"
                placeholder="Nome"
                icon="user"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                placeholder="E-mail"
                icon="mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus()
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="old_password"
                placeholder="Senha atual"
                icon="lock"
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                placeholder="Nova senha"
                icon="lock"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  ConfirmpasswordInputRef.current?.focus()
                }}
              />
              <Input
                ref={ConfirmpasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                placeholder="Confirmar senha"
                icon="lock"
                textContentType="newPassword"
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
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Profile
