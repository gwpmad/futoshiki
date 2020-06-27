# Futoshiki

A [Futoshiki](https://en.wikipedia.org/wiki/Futoshiki) game built using modern React/Redux/Styled Components techniques.

Play it [here](https://gwpmad.github.io/futoshiki/).

![Game gif](https://user-images.githubusercontent.com/14062617/85919086-3132b780-b860-11ea-80c5-bab9294df3cf.gif)
### Features

- Puzzles are guaranteed to have only one solution
- Automatically detects when player correctly solves grid
- Notes mode included for keeping track of possible numbers for each block
- Game state is remembered (via browser's local storage) even when tab is closed - player can come back later to continue

### Technologies

- React, with Hooks (Create React App)
- Redux
- Styled Components for CSS
- Redux Persist for remembering game state
- Mousetrap for handling keyboard events
- Game logic written in pure Javascript without libraries
- Logic is fully tested

### Game logic

The application generates a Futoshiki board with numbers distributed randomly, along with a random-within-bounds quota of number clues and inequality clues, then feeds it through a brute force algorithm that looks for solutions. Once a solution is found it is stored and the algorithm runs again looking for another. If there is more than one solution, some more clues are added and the algorithm runs once more - this continues until there is only one solution and the board is presented to the user.

### To run locally

```
npm start
```

### To run tests

```
npm test
```
