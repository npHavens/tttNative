# Tic Tac Toe Native

![tttNative](https://github.com/npHavens/tttNative)

## Pre-requisites

- yarn
- xcode
- node

## Building the project

`yarn install`
`yarn ios`

## Playing the game
- Select any open space and try to beat the CPU
- CPU plays defensively trying to prevent user from winning
- Adjust the board size and update

## Performance/Complexity
- Only checking paths based on user input instead of checking entire board on every turn to reduce complexity
- Complexity should be O(n) where n is number of rows for most cases. Since it's a grid, we don't have to check every space on every turn. We just track the x coordinate and check each row. The only util that runs in O(n*n) is `getNextSpaceOpenSpace` which only runs at the end of the game when there are very few spaces left.
- Complexity and performance could be improved. There are a lot of array methods in use.

## Didn't have time for..
- There are a few small bugs. One is preventing the CPU from being shown as winner. Ran out of time unfortunately.
- The CPU/AI could be a lot smarter. I tried to prevent the user from winning as much as possible. If I had more time, I would do a recursive algorithm that finds the most likely path to winning based on how many spaces have been played, instead of just reacting to the user's moves.
- Unit tests. I would cover the board behavior as much as possible
- Constants extraction
- Better style
- Load testing with large board size