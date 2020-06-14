import { TextInputProperties } from 'react-native'

export interface InputProps extends TextInputProperties {
  name: string
  icon: string
  containerStyle?: {}
}
export interface InputValueRefProps {
  value: string
}
export interface InputRef {
  focus(): void
}
export interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}
