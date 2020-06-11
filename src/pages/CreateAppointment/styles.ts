/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import {
  Provider,
  ProviderContainerProps,
  ProviderNameProps,
  HourProps,
  HourTextProps,
} from './types'

export const Container = styled.View`
  flex: 1;
`
export const Header = styled.View`
  padding: 16px 32px;
  padding-top: ${getStatusBarHeight() + 16}px;
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
export const Content = styled.ScrollView``

export const ProvidersListContainer = styled.View`
  height: 112px;
`
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 0;
`
export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  margin: 0 8px;
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
export const Calendar = styled.View``

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 0 32px 16px;
`
export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 32px;
`
export const OpenDatePickerText = styled.Text`
  color: #232129;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`
export const Schedule = styled.View`
  padding: 16px 0;
`
export const Section = styled.View`
  margin-bottom: 16px;
`
export const SectionTitle = styled.Text`
  color: #999591;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin: 0 32px 32px;
`
export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 32 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``
export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`
export const HourText = styled.Text<HourTextProps>`
  font-size: 16px;
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
`
export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`
export const CreateAppointmentButtonText = styled.Text`
  color: #232129;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`
