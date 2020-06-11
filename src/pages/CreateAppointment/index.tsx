/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useRoute, useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Provider } from './types'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderAvatar,
  ProviderName,
  ProviderContainer,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
} from './styles'

interface AvailabilityItem {
  hour: number
  available: boolean
}

interface RouteParams {
  provider_id: string
}

const CreateAppointment: React.FC = () => {
  const { goBack, navigate } = useNavigation()
  const route = useRoute()
  const { provider_id } = route.params as RouteParams
  const { signOut, user } = useAuth()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(provider_id)

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers')
      setProviders(response.data)
    }
    loadProviders()
  }, [])
  useEffect(() => {
    async function loadDayAvailability() {
      const response = await api.get(
        `providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      setAvailability(response.data)
    }
    loadDayAvailability()
  }, [selectedDate, selectedProvider])
  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])
  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])
  const handleSelectProvider = useCallback((selectedProvider_id: string) => {
    setSelectedProvider(selectedProvider_id)
  }, [])
  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
    // console.log(hour)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])
  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false)
      }
      if (date) {
        setSelectedDate(date)
        console.log(date)
      }
    },
    [],
  )
  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])
  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

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
        <Content>
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
          <Calendar>
            <Title>Escolha a data</Title>
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
            </OpenDatePickerButton>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                textColor="#f4ede8"
                value={selectedDate}
                onChange={handleDateChanged}
              />
            )}
          </Calendar>
          <Schedule>
            <Title>Escolha o horário</Title>
            <Section>
              <SectionTitle>Manhã</SectionTitle>
              <SectionContent>
                {morningAvailability.map(
                  ({ hour, hourFormatted, available }) => (
                    <Hour
                      key={hourFormatted}
                      available={available}
                      enabled={available}
                      onPress={() => handleSelectHour(hour)}
                      selected={selectedHour === hour}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
            <Section>
              <SectionTitle>Tarde</SectionTitle>
              <SectionContent>
                {afternoonAvailability.map(
                  ({ hour, hourFormatted, available }) => (
                    <Hour
                      key={hourFormatted}
                      available={available}
                      enabled={available}
                      onPress={() => handleSelectHour(hour)}
                      selected={selectedHour === hour}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
          </Schedule>
        </Content>
      </Container>
    </>
  )
}

export default CreateAppointment
