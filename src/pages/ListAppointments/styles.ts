import styled from 'styled-components/native'
import { FlatList } from 'react-native'

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 32px 0 0;
`
export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  align-self: center;
  font-family: 'RobotoSlab-Medium';
  text-transform: uppercase;
`

export const AppointmentList = styled(
  FlatList as new () => FlatList<any>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 16 },
})``
