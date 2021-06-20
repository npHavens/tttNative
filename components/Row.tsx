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

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text>TEST</Text>
    </View>
  );
};

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
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      {row.map((item: any, i: number) => {
        return (
          <View
            key={i}
            onTouchEnd={() => handleTurn(i, y, row[i])}
            style={{
              flex: 1,
              alignItems: 'center',
              height: 80,
              borderWidth: 1,
              borderColor: 'black',
              width: 100,
            }}>
            <Text style={{textAlign: 'center'}}>
              {row[i] !== '.' && row[i]}
            </Text>
          </View>
        );
      })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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

export default Row;
