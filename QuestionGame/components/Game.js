import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { BACKEND_IP } from '../env';

export function GameScreen({ navigation }) {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [socket, setSocket] = useState(null);
  const user = useContext(UserContext);

  function handleAnswers(answers) {
    setAnswers([...answers]);
  }

  useEffect(() => {
    token = user.token ? user.token : "";
    const ws = new WebSocket(`ws://${BACKEND_IP}/game/?token=${token}`);
    setSocket(ws);
    ws.onopen = () => {
      console.log("connected")
    }
    ws.onmessage = e => {
      data = JSON.parse(e.data);
      switch (data.type) {
        case "score":
          setScore(data.message);
          break;
        case "next_question":
          setQuestion(data.message.question);
          handleAnswers(data.message.answers);
          ws.send(JSON.stringify({
            "type": "get_score",
          }));
          setNumberOfQuestion(prevNumber => prevNumber + 1);
          break;
        case "win":
          setGameOver(true);
          setGameWin(true);
          setScore(data.message);
          break;
        case "lost":
          setScore(data.message);
          setGameOver(true);
          setGameWin(false);
          break;
        default:
          console.log("Unknown type of message!")
          break;
      }

    }
    ws.onerror = e => {
      console.log("disconnected")
      console.log(e);
    }
    ws.onclose = e => {
      console.log(e.code, e.reason);
      return () => ws.close();
    }
    return () => ws.close();

  }, [user]);
  onPress = key => event => {
    socket.send(JSON.stringify({
      "type": "check_answer",
      "message": key
    }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!gameOver && (
          <>
            <Text style={styles.textHeader}>Current score {score}</Text>
            <Text style={styles.textHeader}>Question №{numberOfQuestion}</Text>
          </>
        )}
        {gameOver && !gameWin && (
          <>
            <Text style={styles.textHeaderMain}>Game Over!</Text>
            <Text style={styles.textHeader}>Your score {score}</Text>
            <Text style={styles.textHeader}>Total questions - {numberOfQuestion}</Text>
          </>
        )}
        {gameOver && gameWin && (
          <>
            <Text style={styles.textHeaderMain}>You won!</Text>
            <Text style={styles.textHeader}>Your score {score}</Text>
            <Text style={styles.textHeader}>Total questions - {numberOfQuestion}</Text>
          </>
        )}
      </View>
      {!gameOver && (
        <>
          <View>
            <Text style={styles.textQuestion}>
              {question}
            </Text>
          </View>
          <View style={{ width: '75%' }}>
            {answers.map((choice) => (
              <TouchableOpacity style={styles.textAsnwer}
                key={choice}
                onPress={this.onPress(choice)}>
                <Text>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {gameOver && (
        <>
          <View style={{ width: '35%', flex: 0.1 }}>
            <View style={{paddingBottom:15}}>
              <Button
                title="Results"
                onPress={() => navigation.navigate('Results')}
              />
            </View>
            <View>
              <Button
                title="Play again"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          </View>
        </>
      )}
    </View>
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
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flex: 0.1,
    paddingBottom: 60,
  },
  textHeaderMain: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
    textDecorationStyle: "solid"
  },
  textQuestion: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    paddingBottom: 15,
  },
  textAsnwer: {
    flex: 0,
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: 'lightskyblue',
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    marginBottom: 2,
    width: '100%',
    alignItems: 'left',
  },
});