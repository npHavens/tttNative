import {BoardData, RowData, Space} from '../types';
export const checkForWin = (
  board: BoardData,
  x: number,
  y: number,
  char: string,
): boolean => {
  const checkHorizontalPath = (y: number, char: string): boolean => {
    const row = board[y];
    return row.every((space: string) => space === char);
  };

  const checkVerticalPath = (x: number, char: string): boolean => {
    for (const row of board) {
      if (row[x] !== char) {
        return false;
      }
    }
    return true;
  };

  const checkDiagonalPath = (x: number, y: number, char: string): boolean => {
    const checkNegativeSlope = (
      x: number,
      y: number,
      char: string,
    ): boolean => {
      for (const [i, row] of board.entries()) {
        if (row[x + i - y] !== char) {
          return false;
        }
      }
      return true;
    };
    const checkPositiveSlope = (
      x: number,
      y: number,
      char: string,
    ): boolean => {
      for (const [i, row] of board.entries()) {
        if (row[x - i + y] !== char) {
          return false;
        }
      }
      return true;
    };

    return checkNegativeSlope(x, y, char) || checkPositiveSlope(x, y, char);
  };

  return (
    checkHorizontalPath(y, char) ||
    checkVerticalPath(x, char) ||
    checkDiagonalPath(x, y, char)
  );
};

export const checkForWinnable = (
  board: BoardData,
  x: number,
  y: number,
  char: string,
): Space[] => {
  const row = board[y];
  const winnableSpaces = [];
  const column = board.reduce((column: RowData, row: RowData) => {
    column.push(row[x]);
    return column;
  }, []);

  // Check Row
  if (
    row.filter((space: string) => space === char).length ===
    board.length - 1
  ) {
    const foundIndex = row.findIndex((space: string) => space === '.');
    if (foundIndex > -1) {
      winnableSpaces.push({x: foundIndex, y});
    }
  }

  // Check Column
  if (
    column.filter((space: string) => space === char).length ===
    board.length - 1
  ) {
    const foundIndex = column.findIndex((space: string) => space === '.');
    if (foundIndex > -1) {
      winnableSpaces.push({x, y: foundIndex});
    }
  }

  // Check Negative
  const negSlope = board.reduce((slope: string[], row: RowData, i: number) => {
    if (row[x + i - y]) {
      slope.push(row[x + i - y]);
    }
    return slope;
  }, []);

  const posSlope = board.reduce((slope: string[], row: RowData, i: number) => {
    if (row[x - i + y]) {
      slope.push(row[x - i + y]);
    }
    return slope;
  }, []);

  if (
    negSlope.filter((space: string) => space === char).length ===
    board.length - 1
  ) {
    const foundIndex = negSlope.findIndex((space: string) => space === '.');
    if (foundIndex > -1) {
      // Messy workaround to handle edge cases for negative slope(Diagonal win)
      // Would not be submitted to a production app. Ran out of time debugging
      winnableSpaces.push({
        x:
          y !== 0 && y !== board.length - 1 && x !== y
            ? foundIndex
              ? x + y - foundIndex + x
              : foundIndex
            : foundIndex >= board.length - 1
            ? foundIndex
            : x - y,
        y: foundIndex,
      });
    }
  }

  if (
    posSlope.filter((space: string) => space === char).length ===
    board.length - 1
  ) {
    const foundIndex = posSlope.findIndex((space: string) => space === '.');
    if (foundIndex > -1) {
      winnableSpaces.push({x: x - foundIndex + y, y: foundIndex});
    }
  }

  return winnableSpaces;
};

export const getAllAdjacentSpaces = (
  board: BoardData,
  x: number,
  y: number,
): Space[] => {
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

  for (const space of Object.values(adjacent)) {
    if (space.val && space.val !== 'O') {
      openSpaces.push(space);
    }
  }
  return openSpaces;
};
export const getNextSpaceOpenSpace = (board: BoardData): Space | void => {
  let nextOpenSpace;
  for (const [i, row] of board.entries()) {
    row.find((space, j) => {
      if (space === '.') {
        nextOpenSpace = {x: i, y: j};
      }
    });
  }
  return nextOpenSpace;
};
