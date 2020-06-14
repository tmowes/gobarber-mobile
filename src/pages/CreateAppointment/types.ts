export interface Provider {
  id: string
  name: string
  avatar_url: string
}
export interface ProviderContainerProps {
  selected: boolean
}
export interface ProviderNameProps {
  selected: boolean
}
export interface HourProps {
  available: boolean
  selected: boolean
}
export interface HourTextProps {
  selected: boolean
}
export interface RouteParams {
  provider_id: string
  providerName: string
}
export interface AvailabilityItem {
  hour: number
  available: boolean
}
