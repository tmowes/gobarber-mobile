/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'
import { RouteParams } from './types'

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()

  const routeParams = params as RouteParams

  const handleOkButton = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }, [reset])

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia ' dd 'de ' MMMM 'de ' yyyy 'às ' HH:mm 'h'",
      { locale: ptBR },
    )
  }, [routeParams.date])
  // TODO: buscar provider do agendamento
  return (
    <>
      <Container>
        <Icon name="check" size={80} color="#04d361" />
        <Title>Agendamento concluído</Title>
        <Description>{formattedDate}</Description>
        <OkButton onPress={handleOkButton}>
          <OkButtonText>Ok</OkButtonText>
        </OkButton>
      </Container>
    </>
  )
}

export default AppointmentCreated
