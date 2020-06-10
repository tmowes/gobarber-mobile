/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Provider } from './types'

import {
  Container,
  Title,
  Header,
  BackButton,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderAvatar,
  ProviderName,
  ProviderContainer,
} from './styles'

interface SignInFormData {
  email: string
  password: string
}

interface RouteParams {
  provider_id: string
}

const CreateAppointment: React.FC = () => {
  const { goBack, navigate } = useNavigation()
  const route = useRoute()
  const { provider_id } = route.params as RouteParams
  const { signOut, user } = useAuth()
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(provider_id)

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers')
      setProviders(response.data)
    }
    loadProviders()
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const handleSelectProvider = useCallback((selectedProvider_id: string) => {
    setSelectedProvider(selectedProvider_id)
  }, [])

  return (
    <>
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
          <HeaderTitle>Cabeleireiros</HeaderTitle>
          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </ProfileButton>
        </Header>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <View>
          <Title>{selectedProvider}</Title>
        </View>
      </Container>
    </>
  )
}

export default CreateAppointment
