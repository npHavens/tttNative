import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  checkForWin,
  checkForWinnable,
  getAllAdjacentSpaces,
  getNextSpaceOpenSpace,
} from '../lib/util';
import Row from './Row';

import {BoardData, RowData, Space} from '../types';

type BoardProps = {
  winner: string;
  setWinner: React.Dispatch<React.SetStateAction<string>>;
  boardSize: number;
};

const Board = ({winner, setWinner, boardSize}: BoardProps) => {
  const [turns, setTurns] = useState(0);
  const [board, setBoard] = useState<BoardData>([]);

  const newBoard: BoardData = [];
  for (let i = 0; i < boardSize; i++) {
    const row: RowData = [];
    for (let j = 0; j < boardSize; j++) {
      row.push('.');
    }
    newBoard.push(row);
  }

  useEffect(() => {
    setBoard(newBoard);
    setTurns(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSize]);

  const handleUpdateBoard = (x: number, y: number, char: string) => {
    const updatedBoard = [...board];
    updatedBoard[y][x] = char;

    setBoard(updatedBoard);
  };

  const handleTurn = (x: number, y: number, value: string) => {
    if (value === '.' && !winner) {
      setTurns(turns + 2);

      if (turns >= boardSize) {
        const userWin = checkForWin(board, x, y, 'O');
        const cpuWin = checkForWin(board, x, y, 'X');
        if (userWin) {
          setWinner('USER');
        } else if (cpuWin) {
          setWinner('CPU');
        } else {
          if (turns >= boardSize * boardSize - 1) {
            setWinner('TIE');
          }
        }
      }

      handleUpdateBoard(x, y, 'O');

      const winnableSpaceUser = checkForWinnable(board, x, y, 'O')[0];

      if (winnableSpaceUser) {
        handleUpdateBoard(winnableSpaceUser.x, winnableSpaceUser.y, 'X');
      } else {
        const spaces = getAllAdjacentSpaces(board, x, y);
        const adjacentEmptySpaces = spaces.filter(space => space.val === '.');

        let allPotentialSpaces: Space[] = [];
        for (const space of spaces) {
          const adjacentToOpen = getAllAdjacentSpaces(board, space.x, space.y);

          const adjacentOs = adjacentToOpen.filter(item => {
            return item.val === 'X';
          });
          allPotentialSpaces = [...allPotentialSpaces, ...adjacentOs];
        }

        if (allPotentialSpaces.length) {
          const adjacentEmptyWithAdjacentX = getAllAdjacentSpaces(
            board,
            allPotentialSpaces[0].x,
            allPotentialSpaces[0].y,
          ).filter(item => {
            return item.val === '.';
          });

          if (adjacentEmptyWithAdjacentX.length) {
            handleUpdateBoard(
              adjacentEmptyWithAdjacentX[0].x,
              adjacentEmptyWithAdjacentX[0].y,
              'X',
            );
          }
        } else {
          if (adjacentEmptySpaces.length) {
            const rdm =
              adjacentEmptySpaces[Math.floor(Math.random() * spaces.length)];

            if (rdm) {
              handleUpdateBoard(rdm.x, rdm.y, 'X');
            }
          } else {
            const nextOpenSpace = getNextSpaceOpenSpace(board);

            if (nextOpenSpace) {
              handleUpdateBoard(nextOpenSpace.x, nextOpenSpace.y, 'X');
            }
          }
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {board.map((row, i) => {
        return <Row handleTurn={handleTurn} y={i} row={row} key={i} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#636363',
    borderWidth: 1,
    marginTop: 20,
  },
});

export default Board;
