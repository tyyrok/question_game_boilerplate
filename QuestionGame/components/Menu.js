import * as React from 'react';
import { View, Text, Button } from "react-native";

export function MenuScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Menu will be here</Text>
        <Button
          title="Start New Game"
          onPress={() => navigation.navigate('Home')}
        />
          <Button
          title="Return Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
}