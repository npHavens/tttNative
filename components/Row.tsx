/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Row = ({
  row,
  handleTurn,
  y,
}: {
  row: string[];
  handleTurn: any;
  y: number;
}) => {
  return (
    <View style={styles.container}>
      {row.map((item: any, i: number) => {
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
