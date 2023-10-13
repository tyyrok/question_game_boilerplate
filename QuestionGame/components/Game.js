import * as React from 'react';
import { View, Text, Button } from "react-native";

export function GameScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game Screen</Text>
        <Button
          title="Game Over"
          onPress={() => navigation.navigate('Game Over')}
        />
      </View>
    );
}