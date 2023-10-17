import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameScreen } from './components/Game';
import { HomeScreen } from './components/Home';
import { MenuScreen } from './components/Menu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
