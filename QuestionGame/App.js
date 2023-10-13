import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { GameScreen } from './components/Game';
import { HomeScreen } from './components/Home';
import { MenuScreen } from './components/Menu';
import { GameOverScreen } from './components/GameOver';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"r>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Game Over" component={GameOverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
