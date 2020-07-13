import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0;
  padding: 16px;
  border-radius: 16px;
  background-color: #232129;
`

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const UserAvatar = styled.Image`
  height: 64px;
  width: 64px;
  border-radius: 16px;
`

export const UserInfo = styled.View`
  margin-left: 16px;
`

export const UserName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`

export const AppointmentTime = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #999591;
  margin-top: 4px;
`

export const CancelButton = styled.TouchableOpacity``

export const CancelIcon = styled(Icon).attrs({
  name: 'calendar',
  size: 28,
  color: '#f64c75',
})``
