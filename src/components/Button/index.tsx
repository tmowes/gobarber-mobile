import React from 'react'
import { Container, ButtonText } from './styles'
import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

export default Button
