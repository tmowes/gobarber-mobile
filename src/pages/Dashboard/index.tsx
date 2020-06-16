import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Provider } from './types'
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles'

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([])
  const { user, signOut } = useAuth()
  const { navigate } = useNavigation()

  // TODO: list my schedule appointments sort by early date from today

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers')
      setProviders(response.data)
    }
    loadProviders()
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  const navigateToCreateAppointment = useCallback(
    (provider_id: string, providerName: string) => {
      navigate('CreateAppointment', { provider_id, providerName })
    },
    [navigate],
  )

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>
            Bem vindo,
            {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>
          <ProfileButton onPress={navigateToProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </ProfileButton>
        </Header>
        <ProvidersList
          data={providers}
          ListEmptyComponent={<View />}
          ListHeaderComponent={
            <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
          }
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() =>
                navigateToCreateAppointment(provider.id, provider.name)
              }
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>
                <ProviderMeta>
                  <Icon name="calendar" size={18} color="#ff9000" />
                  <ProviderMetaText>Segunda a Sexta</ProviderMetaText>
                </ProviderMeta>
                <ProviderMeta>
                  <Icon name="clock" size={18} color="#ff9000" />
                  <ProviderMetaText>8:00 a 18:00</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
        <BackToSignInButton onPress={handleSignOut}>
          <Icon
            name="log-out"
            size={20}
            color="#f4ede8"
            style={{ transform: [{ rotateY: '180deg' }] }}
          />
          <BackToSignInButtonText>Sair</BackToSignInButtonText>
        </BackToSignInButton>
      </Container>
    </>
  )
}

export default Dashboard
