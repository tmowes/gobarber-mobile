import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`
export const Title = styled.Text`
  color: #f4ede8;
  font-size: 32px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  margin: 48px 0 16px;
`
export const Description = styled.Text`
  color: #999591;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
`
export const OkButton = styled(RectButton)`
  background: #ff9000;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 16px 0;
  padding: 8px 32px;
`
export const OkButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
`
