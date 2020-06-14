export interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}
export interface AuthStateData {
  token: string
  user: User
}
export interface SignCredentials {
  email: string
  password: string
}
export interface AuthContextData {
  user: User
  loading: boolean
  signIn(credentials: SignCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): Promise<void>
}
