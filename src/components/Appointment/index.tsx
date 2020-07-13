/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo } from 'react'
import { parseISO, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { AppointmentProps, AppointmentDTO } from './types'
import {
  Container,
  Left,
  UserAvatar,
  UserInfo,
  UserName,
  AppointmentTime,
  CancelButton,
  CancelIcon,
} from './styles'

const Appointment: React.FC<AppointmentDTO> = ({ appointment }) => {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(appointment.date), new Date(), {
      locale: ptBR,
    })
  }, [appointment.date])

  return (
    <Container>
      <Left>
        <UserAvatar source={{ uri: appointment.user.avatar_url }} />
        <UserInfo>
          <UserName>{appointment.user.name}</UserName>
          <AppointmentTime>{dateParsed}</AppointmentTime>
        </UserInfo>
      </Left>
      <CancelButton onPress={() => {}}>
        <CancelIcon />
      </CancelButton>
    </Container>
  )
}

export default Appointment
