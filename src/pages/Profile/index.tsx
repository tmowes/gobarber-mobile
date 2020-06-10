import React from 'react'
import { View } from 'react-native'

import { Title } from './styles'

interface SignInFormData {
  email: string
  password: string
}

const Profile: React.FC = () => {
  return (
    <>
      <View>
        <Title>PROFILE</Title>
      </View>
    </>
  )
}

export default Profile