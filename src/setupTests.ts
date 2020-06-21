import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
// @types/react-native-community__async-storage

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
