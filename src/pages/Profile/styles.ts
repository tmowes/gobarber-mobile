import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 32px;
  /* padding: 0 32px ${Platform.OS === 'android' ? 150 : 40}px; */
  position: relative;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 16px;
`

export const Title = styled.Text`
  font-size: 18px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 16px 0;
`

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 16px;
`

export const UserAvatar = styled.Image`
  width: 168px;
  height: 168px;
  border-radius: 84px;
  align-self: center;
`
