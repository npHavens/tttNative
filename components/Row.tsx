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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  space: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 80,
    borderColor: '#636363',
  },
  playerTextUser: {
    fontSize: 24,
    color: '#107519',
  },
  playerTextCPU: {
    fontSize: 24,
    color: '#de122d',
  },
});

export default Row;
