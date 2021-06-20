import React, {useState, useCallback} from 'react';
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

  const defaultBoardSize = 3;

  const [winner, setWinner] = useState('');
  const [boardSize, setBoardSize] = useState(defaultBoardSize);
  const [updatedSize, setUpdatedSize] = useState(boardSize);

  const handleInput = useCallback(value => {
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
  sectionContainer: {
    margin: 32,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#3432a8',
  },
  boardOptionsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 320,
  },
  boardOptionsText: {
    fontSize: 18,
    fontWeight: '400',
  },
  boardSizeInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#636363',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 18,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
  },
  updateBtn: {
    backgroundColor: '#d4e2ff',
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    color: '#636363',
  },
  resetBtn: {
    backgroundColor: '#ffd4e1',
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    color: '#636363',
  },
  winnerText: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 26,
    color: '#3432a8',
  },
});

export default App;
