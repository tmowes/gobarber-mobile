/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Provider, ProviderContainerProps, ProviderNameProps } from './types'

export const Container = styled.View`
  flex: 1;
`
export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const BackButton = styled.TouchableOpacity``

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`
export const ProfileButton = styled.TouchableOpacity`
  margin-left: auto;
`
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`
export const ProvidersListContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  /* background: white; */
  padding: 32px 24px;
`
export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  border-radius: 10px;
  margin-right: 16px;
`
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`
export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 8px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`
export const SignOutButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #312e38;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-top-width: 1px;
  border-color: #232129;
`

export const SignOutButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`
