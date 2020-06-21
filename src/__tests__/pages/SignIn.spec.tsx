import React from 'react'
import { render } from 'react-native-testing-library'

import SignIn from '../../pages/SignIn'

const mockedNavigation = jest.fn()

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  }
})

describe('SignIn', () => {
  it('should', () => {
    const { getByPlaceholder } = render(<SignIn />)
    expect(getByPlaceholder('E-mail')).toBeTruthy()
    expect(getByPlaceholder('Senha')).toBeTruthy()
  })
})

// const mockedHistory = jest.fn()
// const mockedSignIn = jest.fn()
// const mockedAddToast = jest.fn()

// jest.mock('react-router-dom', () => {
//   return {
//     useHistory: () => ({
//       push: mockedHistory,
//     }),
//     Link: ({ children }: { children: React.ReactNode }) => children,
//   }
// })

// jest.mock('../../hooks/auth', () => {
//   return {
//     useAuth: () => ({
//       signIn: mockedSignIn,
//     }),
//   }
// })

// jest.mock('../../hooks/toast', () => {
//   return {
//     useToast: () => ({
//       addToast: mockedAddToast,
//     }),
//   }
// })

// describe('SignIn Page', () => {
//   beforeEach(() => {
//     mockedHistory.mockClear()
//   })
//   it('should be able to sign in', async () => {
//     const { getByPlaceholder, getByText } = render(<SignIn />)
//     const emailField = getByPlaceholder('E-mail')
//     const passwordField = getByPlaceholder('Senha')
//     const buttonElement = getByText('Entrar')

//     fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } })
//     fireEvent.change(passwordField, { target: { value: '123456' } })
//     fireEvent.click(buttonElement)
//     await wait(() => {
//       expect(mockedHistory).toHaveBeenCalledWith('/')
//     })
//   })
//   it('should not be able to sign in with invalid credentials', async () => {
//     const { getByPlaceholderText, getByText } = render(<SignIn />)
//     const emailField = getByPlaceholderText('E-mail')
//     const passwordField = getByPlaceholderText('Senha')
//     const buttonElement = getByText('Entrar')
//     fireEvent.change(emailField, { target: { value: 'not-valid-email' } })
//     fireEvent.change(passwordField, { target: { value: '123456' } })
//     fireEvent.click(buttonElement)
//     await wait(() => {
//       expect(mockedHistory).not.toHaveBeenCalled()
//     })
//   })
//   it('should display a error if login fails', async () => {
//     mockedSignIn.mockImplementation(() => {
//       throw new Error()
//     })

//     const { getByPlaceholderText, getByText } = render(<SignIn />)
//     const emailField = getByPlaceholderText('E-mail')
//     const passwordField = getByPlaceholderText('Senha')
//     const buttonElement = getByText('Entrar')
//     fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } })
//     fireEvent.change(passwordField, { target: { value: '123456' } })
//     fireEvent.click(buttonElement)
//     await wait(() => {
//       expect(mockedAddToast).toHaveBeenCalledWith(
//         expect.objectContaining({ type: 'error' }),
//       )
//     })
//   })
// })
