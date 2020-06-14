import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { RouteParams } from './types'
import { Container, Title, Description, OkButton, OkButtonText } from './styles'

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()
  const { date, providerName } = params as RouteParams

  const handleOkButton = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, [reset])

  const formattedDate = useMemo(() => {
    return format(date, "EEEE', dia 'dd' de 'MMMM' de 'yyyy' às 'HH:mm'h,'", {
      locale: ptBR,
    })
  }, [date])

  const formattedProviderName = useMemo(() => {
    return `com ${providerName}`
  }, [providerName])

  return (
    <>
      <Container>
        <Icon name="check-square" size={80} color="#04d361" />
        <Title>Agendamento concluído</Title>
        <Description>{formattedDate}</Description>
        <Description>{formattedProviderName}</Description>
        <OkButton onPress={handleOkButton}>
          <OkButtonText>Ok</OkButtonText>
        </OkButton>
      </Container>
    </>
  )
}

export default AppointmentCreated
