import styled from 'styled-components/native'
import { Platform, FlatList } from 'react-native'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'

import { RectButton } from 'react-native-gesture-handler'
import { Provider } from './types'

export const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  /* justify-content: center; */
  /* padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px; */
`
export const Header = styled.View`
  padding: 16px 32px;
  padding-top: ${getStatusBarHeight() + 16}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const HeaderTitle = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  line-height: 32px;
`
export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`
export const ProfileButton = styled.TouchableOpacity``
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 0 32px;
`
export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 12px 0;
`
export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  background: #3e3b47;
  border-radius: 10px;
  padding: 16px;
  margin: 8px 0;
`
export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`
export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`
export const ProviderName = styled.Text`
  font-size: 18px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`
export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`
export const ProviderMetaText = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin-left: 8px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`
export const SignOutButton = styled(RectButton)`
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
  padding: 16px 0 ${8 + getBottomSpace()}px;
`

export const SignOutButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`
