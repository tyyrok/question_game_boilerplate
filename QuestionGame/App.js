import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

const Separator = () => <View style={styles.separator} />;

function HomeScreen({ navigation }) {
  const [ isButtonVisible, setIsButtonVisible ] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Hello Gamer!</Text>
      <Separator />
      <Text>This is a simple game{ !isButtonVisible && ', please wait...'}</Text>
      <Separator />
      { isButtonVisible && 
        <Button
          title="Start Game"
          onPress={() => navigation.navigate('Details')}
        />
      }
      <StatusBar style="auto" />
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"r>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

//export default App;