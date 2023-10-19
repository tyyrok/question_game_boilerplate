import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameScreen } from './components/Game';
import { HomeScreen } from './components/Home';
import { MenuScreen } from './components/Menu';
import { serverIp } from './env';
import { storeUser, getUser } from './services/AuthService';
import { useContext, createContext } from 'react';
import { UserContext } from './contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState({});
  const us = useContext(UserContext);

  const login = async (username) => {
    try {
      const response = await fetch(serverIp, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      const json = await response.json();
      setUser(json);
      storeUser(json);
      return json
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    const localUser = getUser();
    if (localUser?.username && !user.username) {
      setUser(localUser);
    }
    if (!localUser?.username && !user.username) {
      login('new');
    }
    
  }, []);
  console.log("APp Username " + user.username + " Token " + user.token);

  return (
    <UserContext.Provider value={user}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}
