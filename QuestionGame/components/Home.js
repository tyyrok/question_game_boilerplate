import * as React from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Separator = () => <View style={styles.separator} />

export function HomeScreen({ navigation }) {
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);
  const [isButtonVisible2, setIsButtonVisible2] = React.useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
    }, 1500);
    setTimeout(() => {
      setIsButtonVisible2(true);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {user?.username &&
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Hello {user.username}!
        </Text>
      }
      {!isButtonVisible && (
        <>
          <Separator />
          <Text style={{ fontSize: 16 }}>
            This is a simple game, please wait...
          </Text>
        </>)
      }
      <Separator />
      {isButtonVisible &&
        <View style={{ width: '35%'}}>
          <Button
            title="Start Game"
            onPress={() => navigation.navigate('Game')}
          />
        </View>
      }
      <Separator />
      {isButtonVisible2 && (
        <View style={{ width: '35%' }}>
          <Button
            title="Results"
            onPress={() => navigation.navigate('Results')}
          />
        </View>
      )
      }
      { !isButtonVisible2 && (
        <>
        <Separator />
        <Text></Text>
        </>
      )}
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