import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface AuthStateData {
  token: string
  user: User
}

interface SignCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  loading: boolean
  signIn(credentials: SignCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthStateData>({} as AuthStateData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Gobarber: token',
        '@Gobarber: user',
      ])
      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        })
      }
      setLoading(false)
    }
    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })
    const { token, user } = response.data
    await AsyncStorage.multiSet([
      ['@Gobarber: token', token],
      ['@Gobarber: user', JSON.stringify(user)],
    ])
    api.defaults.headers.authorization = `Bearer ${token}`
    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobarber: token', '@Gobarber: user'])
    setData({} as AuthStateData)
  }, [])

  const updateUser = useCallback(
    async (user: User) => {
      setData({
        token: data.token,
        user,
      })
      await AsyncStorage.setItem('@Gobarber: user', JSON.stringify(user))
    },

    [setData, data.token],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Auth must be used within a AuthProvider')
  }
  return context
}
