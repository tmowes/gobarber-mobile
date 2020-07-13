/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import api from '../../services/api'
import Appointment from '../../components/Appointment'

import { Container, Title, AppointmentList } from './styles'
import { AppointmentProps } from '../../components/Appointment/types'

const ListAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])

  useEffect(() => {
    async function loadAppointments(): Promise<void> {
      const { data } = await api.get<AppointmentProps[]>(
        '/appointments/schedule',
        {
          params: {
            year: 2020,
            month: 7,
            day: 6,
          },
        },
      )
      const sortedSchedule = data.sort(
        (appointmentA, appointmentB) =>
          new Date(appointmentA.date).getTime() -
          new Date(appointmentB.date).getTime(),
      )
      setAppointments(sortedSchedule)
    }
    loadAppointments()
  }, [])

  return (
    <Container>
      <Title>Agendamentos</Title>
      <AppointmentList
        data={appointments}
        keyExtractor={item => String(item.id)}
        renderItem={({ item: appointment }) => (
          <Appointment appointment={appointment} />
        )}
      />
    </Container>
  )
}
export default ListAppointments
