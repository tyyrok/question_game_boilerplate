import React, { useEffect, useState } from 'react';
import { View, Text, Button, Switch, TouchableOpacity } from "react-native";

export function GameScreen({ navigation, user }) {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [socket, setSocket] = useState(null);

  function handleAnswers(answers) {
    setAnswers([...answers]);
  }

  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.0.6:8000/game/`);
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

  }, []);
  onPress = key => event => {
    console.log(key);
    socket.send(JSON.stringify({
      "type": "check_answer",
      "message": key
    }));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 0.3 }}>
        {!gameOver && (
          <>
            <Text>Current score {score}</Text>
            <Text>Question №{numberOfQuestion}</Text>
          </>
        )}
        {gameOver && !gameWin && (
          <>
            <Text>Game Over!</Text>
            <Text>Your score {score}</Text>
            <Text>Total questions - {numberOfQuestion}</Text>
          </>
        )}
        {gameOver && gameWin && (
          <>
            <Text>You win!</Text>
            <Text>Your score {score}</Text>
            <Text>Total questions - {numberOfQuestion}</Text>
          </>
        )}
      </View>
      {!gameOver && (
        <>
          <View style={{ flex: 0.1 }}>
            <Text>{question} ?</Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <View style={{ flex: 1 }}>
              {answers.map((choice) => (
                <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10 }}
                  key={choice}
                  onPress={this.onPress(choice)}>
                  <Text>{choice}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
      {gameOver && (
        <>
          <Button
            title="Menu"
            onPress={() => navigation.navigate('Menu')}
          />
        </>
      )}
    </View>
  );
}