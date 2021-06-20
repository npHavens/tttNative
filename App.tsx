import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Board from './components/Board';

const App = () => {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  const [winner, setWinner] = useState('');
  const [boardSize, setBoardSize] = useState(3);
  const [updatedSize, setUpdatedSize] = useState(boardSize);

  return (
    <>
      <SafeAreaView style={backgroundStyle} />
      <SafeAreaView style={styles.sectionContainer}>
        <View>
          <Text style={styles.sectionTitle}>Tic Tac Toe</Text>
        </View>
        <View>
          <TextInput
            onChangeText={value => setUpdatedSize(Number(value))}
            value={String(updatedSize)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => setBoardSize(Number(updatedSize))}>
            <Text>Update</Text>
          </TouchableOpacity>
        </View>
        <Board winner={winner} setWinner={setWinner} boardSize={boardSize} />
        <View style={styles.sectionContainer}>
          <Text>{winner && `Winner! ${winner}`}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
