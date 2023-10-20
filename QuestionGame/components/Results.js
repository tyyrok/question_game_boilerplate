import * as React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useState, useEffect } from 'react';
import { BACKEND_IP } from '../env';

import { Table, Row, Rows } from 'react-native-reanimated-table';

export function ResultsScreen({ navigation }) {
  const [results, setResults] = useState(null);
  const user = useContext(UserContext);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch(`http://${BACKEND_IP}/api/results/`);
        const json = await response.json();
        setResults(json);
        return json
      } catch (e) {
        console.error(e);
      }
    }
    fetchResults();
  }, []);

  function objToArr(obj) {
    arr = [];
    let i = 1;
    obj.forEach(element => {
      ar = [];
      ar.push(i);
      ar.push(element['username']);
      ar.push(new Date(element['timestamp']).toDateString());
      ar.push(element['score']);
      arr.push(ar);
      i += 1;
    });
    return arr
  }

  useEffect(() => {
    if (results) {
      const data = objToArr(results);
      setTableData(data);
    }
  }, [results]);

  const tableHead = ['Place', 'User', 'Date', 'Score'];

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          Score results:
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: { 
    flex: 0.075, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop:5 },
  container: { flex: 1, padding: 16, paddingTop: 5, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  textHeader: { 
    fontSize: 20, 
    textAlign: 'center', 
    margin: 8, 
    fontWeight: 'bold' }
});