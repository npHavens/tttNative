export const checkForWin = (board: any, x: number, y: number, char: string) => {
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

  return (
    checkHorizontalPath(y, char) ||
    checkVerticalPath(x, char) ||
    checkDiagonalPath(x, y, char)
  );
};

export const checkForWinnable = (
  board: any,
  x: number,
  y: number,
  char: string,
) => {
  const row = board[y];
  const winnableSpaces = [];
  const column = board.reduce((column: any, row: any, i) => {
    column.push(row[x]);
    return column;
  }, []);

  // Check Row
  if (row.filter(space => space === char).length === board.length - 1) {
    const foundIndex = row.findIndex(space => space === '.');
    if (foundIndex > -1) {
      winnableSpaces.push({x: foundIndex, y});
    }
  }

  // Check Column
  if (column.filter(space => space === char).length === board.length - 1) {
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

  if (negSlope.filter(space => space === char).length === board.length - 1) {
    const foundIndex = negSlope.findIndex(space => space === '.');
    if (foundIndex > -1) {
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

  if (posSlope.filter(space => space === char).length === board.length - 1) {
    const foundIndex = posSlope.findIndex(space => space === '.');
    if (foundIndex > -1) {
      winnableSpaces.push({x: x - foundIndex + y, y: foundIndex});
    }
  }

  return winnableSpaces;
};

export const getAllAdjacentSpaces = (board: any, x: number, y: number) => {
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
    if (space.val && space.val !== 'O') {
      openSpaces.push(space);
    }
  }
  return openSpaces;
};
export const getNextSpaceOpenSpace = board => {
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
