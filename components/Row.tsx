import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type RowProps = {
  row: string[];
  handleTurn: (x: number, y: number, value: string) => void;
  y: number;
};

const Row = ({row, handleTurn, y}: RowProps) => {
  return (
    <View style={styles.container}>
      {row.map((_, i: number) => {
        return (
          <View
            key={i}
            onTouchEnd={() => handleTurn(i, y, row[i])}
            style={styles.space}>
            <Text
              style={
                row[i] === 'O' ? styles.playerTextUser : styles.playerTextCPU
              }>
              {row[i] !== '.' && row[i]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  space: {
    alignItems: 'center',
    borderColor: '#636363',
    borderWidth: 1,
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  playerTextUser: {
    color: '#107519',
    fontSize: 24,
  },
  playerTextCPU: {
    color: '#de122d',
    fontSize: 24,
  },
});

export default Row;
