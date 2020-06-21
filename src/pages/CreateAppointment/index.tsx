import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { Platform, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/Feather'
import { format, formatRelative, addDays } from 'date-fns'
import { useRoute, useNavigation } from '@react-navigation/native'
import ptBR from 'date-fns/locale/pt-BR'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { Provider, RouteParams, AvailabilityItem } from './types'
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
  DateTitle,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  ChooseAppointmentTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles'

const CreateAppointment: React.FC = () => {
  const { goBack, navigate } = useNavigation()
  const { params } = useRoute()
  const { provider_id, providerName } = params as RouteParams
  const { user } = useAuth()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(18)
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(provider_id)
  const [selectedProviderName, setSelectedProviderName] = useState(providerName)

  useEffect(() => {
    async function loadProviders() {
      const { data } = await api.get('providers')
      setProviders(data)
    }
    loadProviders()
  }, [selectedDate])

  useEffect(() => {
    async function loadDayAvailability() {
      const afterHours = selectedDate.getHours()
      if (afterHours >= 17) {
        const tomorrow = new Date(addDays(selectedDate.setMinutes(0), 1))
        setSelectedDate(tomorrow)
        setSelectedHour(8)
      }
      const invalidAppointmentDate = format(selectedDate, 'eeee', {
        locale: ptBR,
      })
      if (invalidAppointmentDate === 'domingo') {
        const nextMonday = new Date(addDays(selectedDate.setMinutes(0), 1))
        setSelectedDate(nextMonday)
        setSelectedHour(8)
      }
      if (invalidAppointmentDate === 'sábado') {
        const nextMonday = new Date(addDays(selectedDate.setMinutes(0), 2))
        setSelectedDate(nextMonday)
        setSelectedHour(8)
      }
      const { data } = await api.get(
        `providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        },
      )
      setAvailability(data)
    }
    loadDayAvailability()
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const handleSelectProvider = useCallback(
    (selectedProvider_id: string, selectedProvider_name: string) => {
      setSelectedProvider(selectedProvider_id)
      setSelectedProviderName(selectedProvider_name)
    },
    [],
  )

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
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
      }
    },
    [],
  )

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate)
      date.setHours(selectedHour)
      date.setMinutes(0)
      await api.post('appointments', { provider_id: selectedProvider, date })
      navigate('AppointmentCreated', {
        date: date.getTime(),
        providerName: selectedProviderName,
      })
    } catch (err) {
      Alert.alert(
        'Erro ao criar o agendamento',
        'Ocorreu um erro ao criar o agendamento, tente novamente.',
      )
    }
  }, [
    selectedDate,
    selectedHour,
    selectedProvider,
    selectedProviderName,
    navigate,
  ])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour <= 12)
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
      .filter(({ hour }) => hour > 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const formattedDate = useMemo(() => {
    return format(selectedDate, "EEEE', dia 'dd' de 'MMMM'", {
      locale: ptBR,
    })
  }, [selectedDate])

  const dateParsed = useMemo(() => {
    return formatRelative(
      new Date(selectedDate.setHours(selectedHour)),
      new Date(),
      {
        locale: ptBR,
      },
    )
  }, [selectedDate, selectedHour])

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
                  onPress={() =>
                    handleSelectProvider(provider.id, provider.name)
                  }
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
            <DateTitle>{formattedDate}</DateTitle>
            <DateTitle>{dateParsed}</DateTitle>
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
            <ChooseAppointmentTitle>Escolha o horário</ChooseAppointmentTitle>
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
          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        </Content>
      </Container>
    </>
  )
}

export default CreateAppointment
