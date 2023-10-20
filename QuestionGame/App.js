import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameScreen } from './components/Game';
import { HomeScreen } from './components/Home';
import { ResultsScreen } from './components/Results';
import { BACKEND_IP } from './env';
import { storeUser, getUser } from './services/AuthService';
import { UserContext } from './contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = React.useState({});

  const login = async (username) => {
    try {
      const response = await fetch(`http://${BACKEND_IP}/auth-token/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      if (response.status == '200'){
        const json = await response.json();
        setUser(json);
        await storeUser(json);

        return json
      } else if (response.status == '404') {
        await login('new');
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    (async () => {
      const localUser = await getUser();
      if (localUser?.username && !user.username) {
        console.log("local")
        login(localUser.username);
      }
      if (!localUser?.username && !user.username) {
        console.log("new")
        login('new');
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
