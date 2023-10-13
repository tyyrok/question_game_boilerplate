import * as React from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

const Separator = () => <View style={styles.separator} />

export function HomeScreen({ navigation }) {
  const [ isButtonVisible, setIsButtonVisible ] = React.useState(false);
  const [ isButtonVisible2, setIsButtonVisible2 ] = React.useState(false);
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
          onPress={() => navigation.navigate('Game')}
        />
      }
      <Separator />
      { isButtonVisible2 && 
        <Button
          title="Menu"
          onPress={() => navigation.navigate('Menu')}
          style={{ width:20 }}
        />
      }
      <StatusBar style="auto" />
    </View>
  )
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