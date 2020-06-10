import React from 'react'
import { View } from 'react-native'

import { Title } from './styles'

interface SignInFormData {
  email: string
  password: string
}

const AppointmentCreated: React.FC = () => {
  return (
    <>
      <View>
        <Title>AppointmentCreated</Title>
      </View>
    </>
  )
}

export default AppointmentCreated
