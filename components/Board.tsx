import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Row from './Row';

const Board = ({
  winner,
  setWinner,
  boardSize,
}: {
  winner: string;
  setWinner: any;
  boardSize: number;
}) => {
  const [turns, setTurns] = useState(0);

  const newBoard = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push('.');
    }
    newBoard.push(row);
  }

  const [board, setBoard] = useState(newBoard);

  useEffect(() => {
    setBoard(newBoard);
  }, [boardSize]);
  const checkForWin = (x: number, y: number, char: string) => {
    return (
      checkHorizontalPath(y, char) ||
      checkVerticalPath(x, char) ||
      checkDiagonalPath(x, y, char)
    );
  };

  const checkHorizontalPath = (y: number, char: string) => {
    const row = board[y];
    return row.every((space: string) => space === char);
  };

  const checkVerticalPath = (x: number, char: string) => {
    for (const row of board) {
      if (row[x] !== char) {
        return false;
      }
    }
    return true;
  };

  const checkDiagonalPath = (x: number, y: number, char: string) => {
    const checkNegativeSlope = (x: number, y: number, char: string) => {
      for (const [i, row] of board.entries()) {
        if (row[x + i - y] !== char) {
          return false;
        }
      }
      return true;
    };
    const checkPositiveSlope = (x: number, y: number, char: string) => {
      for (const [i, row] of board.entries()) {
        if (row[x - i + y] !== char) {
          return false;
        }
      }
      return true;
    };

    return checkNegativeSlope(x, y, char) || checkPositiveSlope(x, y, char);
  };

  const checkForWinnable = (x: number, y: number, char: string) => {
    const row = board[y];
    const winnableSpaces = [];
    const column = board.reduce((column: any, row: any, i) => {
      column.push(row[x]);
      return column;
    }, []);

    // Check Row
    if (row.filter(space => space === char).length === boardSize - 1) {
      const foundIndex = row.findIndex(space => space === '.');
      if (foundIndex > -1) {
        winnableSpaces.push({x: foundIndex, y});
      }
    }

    // Check Column
    if (column.filter(space => space === char).length === boardSize - 1) {
      const foundIndex = column.findIndex(space => space === '.');
      if (foundIndex > -1) {
        winnableSpaces.push({x, y: foundIndex});
      }
    }

    // Check Nagative
    const negSlope = board.reduce((slope, row, i) => {
      //console.log('GETTING SLOPE', x - i + y);
      if (row[x + i - y]) {
        slope.push(row[x + i - y]);
      }
      return slope;
    }, []);

    const posSlope = board.reduce((slope, row, i) => {
      if (row[x - i + y]) {
        slope.push(row[x - i + y]);
      }
      return slope;
    }, []);

    if (negSlope.filter(space => space === char).length === boardSize - 1) {
      const foundIndex = negSlope.findIndex(space => space === '.');
      if (foundIndex > -1) {
        winnableSpaces.push({
          x:
            y !== 0 && y !== boardSize - 1 && x !== y
              ? foundIndex
                ? x + y - foundIndex + x
                : foundIndex
              : foundIndex >= boardSize - 1
              ? foundIndex
              : x - y,
          y: foundIndex,
        });
      }
    }

    if (posSlope.filter(space => space === char).length === boardSize - 1) {
      const foundIndex = posSlope.findIndex(space => space === '.');
      if (foundIndex > -1) {
        winnableSpaces.push({x: x - foundIndex + y, y: foundIndex});
      }
    }

    return winnableSpaces;
  };

  const handleTurn = (x: number, y: number, value: string) => {
    if (value === '.' && !winner) {
      setTurns(turns + 2);

      //console.log('EMPTY SPACE');
      const updatedBoard = [...board];
      updatedBoard[y][x] = 'X';

      setBoard(updatedBoard);

      const winnableSpaceUser = checkForWinnable(x, y, 'X')[0];
      const winnableSpaceCPU = checkForWinnable(x, y, '0')[0];

      console.log('WINNABLE', winnableSpaceUser);

      if (winnableSpaceUser) {
        const updatedBoard = [...board];
        updatedBoard[winnableSpaceUser.y][winnableSpaceUser.x] = 'O';
        setBoard(updatedBoard);
      } else {
      }

      if (turns >= boardSize) {
        const userWin = checkForWin(x, y, 'X');
        const cpuWin = checkForWin(x, y, 'O');
        if (userWin) {
          setWinner('USER');
        } else if (cpuWin) {
          setWinner('CPU');
        } else {
          console.log('WIN:', turns, turns >= boardSize * boardSize - 1);
          if (turns >= boardSize * boardSize - 1) {
            setWinner('TIE');
          }
        }
      }

      if (!winnableSpaceUser) {
        const getAllAdjacentSpaces = (x: number, y: number) => {
          const openSpaces = [];
          const adjacent = {
            l: {val: board[y][x - 1], x: x - 1, y},
            tl: {
              val: board[y - 1] && board[y - 1][x - 1],
              x: x - 1,
              y: y - 1,
            },
            t: {val: board[y - 1] && board[y - 1][x], x, y: y - 1},
            tr: {
              val: board[y - 1] && board[y - 1][x + 1],
              x: x + 1,
              y: y - 1,
            },
            r: {val: board[y][x + 1], x: x + 1, y},
            br: {
              val: board[y + 1] && board[y + 1][x + 1],
              x: x + 1,
              y: y + 1,
            },
            b: {val: board[y + 1] && board[y + 1][x], x, y: y + 1},
            bl: {
              val: board[y + 1] && board[y + 1][x - 1],
              x: x - 1,
              y: y + 1,
            },
          };

          for (const [i, space] of Object.entries(adjacent)) {
            //console.log('SPACEEEE', space);
            if (space.val && space.val !== 'X') {
              openSpaces.push(space);
            }
          }

          for (const [i, space] of Object.entries(adjacent)) {
            //console.log('SPACEEEE', space);
            if (space.val && space.val !== 'X') {
              openSpaces.push(space);
            }
          }
          return openSpaces;
        };

        const spaces = getAllAdjacentSpaces(x, y);
        const adjacentEmptySpaces = spaces.filter(space => space.val === '.');

        let results = [];
        for (const [i, space] of spaces.entries()) {
          const adjacentToOpen = getAllAdjacentSpaces(space.x, space.y);

          const adjacentOs = adjacentToOpen.filter(item => {
            return item.val === 'O';
          });
          // console.log('CHECKING ALL', adjacentOs);
          results = [...results, ...adjacentOs];
        }

        // console.log('ADJACENT', results);

        if (results.length) {
          const adjacentEmptyWithAdjacentO = getAllAdjacentSpaces(
            results[0].x,
            results[0].y,
          ).filter(item => {
            // if (board[y].find(item => item === 'X')) {
            return item.val === '.';
            // }
          });

          //console.log('FOUNDDDDDDD', adjacentEmptyWithAdjacentO);
          if (adjacentEmptyWithAdjacentO.length) {
            const updatedBoard = [...board];
            updatedBoard[adjacentEmptyWithAdjacentO[0].y][
              adjacentEmptyWithAdjacentO[0].x
            ] = 'O';

            setBoard(updatedBoard);
          }
        } else {
          if (adjacentEmptySpaces.length) {
            const rdm =
              adjacentEmptySpaces[Math.floor(Math.random() * spaces.length)];

            console.log('RANDOM SPACE', rdm);
            //handle no adjacent spaces
            if (rdm) {
              const updatedBoard = [...board];
              updatedBoard[rdm.y][rdm.x] = 'O';

              setBoard(updatedBoard);
            }
          } else {
            let nextOpenSpace;
            for (const [i, row] of board.entries()) {
              row.find((space, j) => {
                if (space === '.') {
                  nextOpenSpace = {x: i, y: j};
                }
              });
            }

            if (nextOpenSpace) {
              const updatedBoard = [...board];
              updatedBoard[nextOpenSpace.y][nextOpenSpace.x] = 'O';
              console.log('GETTING NEXT OPEN SPACE', nextOpenSpace);

              setBoard(updatedBoard);
            }
          }
        }
      }
    }
  };

  return (
    <View
      style={{
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 32,
      }}>
      {board.map((row, i) => {
        return <Row handleTurn={handleTurn} y={i} row={row} key={i} />;
      })}
    </View>
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

export default Board;
