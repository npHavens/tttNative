import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Board from './components/Board';

const App = () => {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  const defaultBoardSize = 3;

  const [winner, setWinner] = useState('');
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [updatedSize, setUpdatedSize] = useState(boardSize);

  const handleInput = useCallback((value: string) => {
    setUpdatedSize(Number(value));
  }, []);

  const handleUpdateBoard = useCallback(() => {
    setBoardSize(updatedSize);
    setWinner('');
  }, [updatedSize]);

  const handleResetBoard = useCallback(() => {
    setWinner('');
    setBoardSize(0);
    setTimeout(() => {
      setBoardSize(updatedSize || defaultBoardSize);
    }, 1);
  }, [updatedSize]);

  return (
    <>
      <SafeAreaView style={backgroundStyle} />
      <SafeAreaView style={styles.sectionContainer}>
        <View>
          <Text style={styles.sectionTitle}>Tic Tac Toe</Text>
        </View>
        <View style={styles.boardOptionsContainer}>
          <Text style={styles.boardOptionsText}>Board Size:</Text>
          <TextInput
            style={styles.boardSizeInput}
            onChangeText={handleInput}
            value={String(updatedSize)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={handleUpdateBoard}>
            <Text>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn} onPress={handleResetBoard}>
            <Text>Reset Board</Text>
          </TouchableOpacity>
        </View>
        <Board winner={winner} setWinner={setWinner} boardSize={boardSize} />
        <View>
          <Text style={styles.winnerText}>
            {winner && `Winner: ${winner}!`}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  boardOptionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    width: 320,
  },
  boardOptionsText: {
    fontSize: 18,
    fontWeight: '400',
  },
  boardSizeInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#636363',
    borderRadius: 3,
    borderWidth: 1,
    fontSize: 18,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
  },
  sectionContainer: {
    justifyContent: 'center',
    margin: 32,
  },
  sectionTitle: {
    color: '#3432a8',
    fontSize: 32,
    fontWeight: '600',
  },
  updateBtn: {
    backgroundColor: '#d4e2ff',
    borderRadius: 10,
    color: '#636363',
    fontSize: 12,
    padding: 8,
  },
  resetBtn: {
    backgroundColor: '#ffd4e1',
    borderRadius: 10,
    color: '#636363',
    fontSize: 12,
    padding: 8,
  },
  winnerText: {
    color: '#3432a8',
    fontSize: 26,
    marginTop: 60,
    textAlign: 'center',
  },
});

export default App;
