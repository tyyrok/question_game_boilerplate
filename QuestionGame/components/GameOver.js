import * as React from 'react';
import { View, Text, Button } from "react-native";

export function GameOverScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Game Over</Text>
        <Text>Here will be info about user's score</Text>
        <Button
          title="Start Game"
          onPress={() => navigation.navigate('Menu')}
        />
      </View>
    );
}