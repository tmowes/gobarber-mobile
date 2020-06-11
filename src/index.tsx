/* eslint-disable @typescript-eslint/no-unused-vars */
import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './hooks'

import Routes from './routes'

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default App
