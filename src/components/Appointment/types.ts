export interface AppointmentProps {
  id: string
  user: UserProps
  date: string
}
export interface UserProps {
  id: string
  name: string
  avatar_url: string
}
export interface AppointmentDTO {
  appointment: AppointmentProps
}
