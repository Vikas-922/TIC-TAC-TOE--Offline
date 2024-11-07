# Tic-Tac-Toe Game with Bot

A classic Tic-Tac-Toe game featuring a bot opponent built using the Minimax Algorithm for medium-hard difficulty. The bot carefully evaluates moves to make optimal choices, creating a challenging experience for players. Designed with a simple, user-friendly interface, this project highlights strategic decision-making in a straightforward game format.

## Features
- **Medium-Hard Difficulty**: Bot uses the Minimax Algorithm to evaluate and make strategic moves.
- **Challenging Gameplay**: Enjoy a more competitive experience with calculated bot responses.
- **User-Friendly Interface**: Clean and intuitive layout for seamless gameplay.

## Minimax Algorithm Performance Analysis

### Without Alpha-Beta Pruning

- **Position [1][1] (5th Position on the Board)**
  - Total Nodes Evaluated: 5,328

- **Position [0][2] (3rd Position on the Board)**
  - Total Nodes Evaluated: 216

### With Alpha-Beta Pruning

- **Position [1][1] (5th Position on the Board)**
  - Total Nodes Evaluated: 2,123

- **Position [0][2] (3rd Position on the Board)**
  - Total Nodes Evaluated: 110

## Summary

The implementation of the alpha-beta pruning optimization significantly reduces the number of nodes evaluated by the minimax algorithm. This results in a more efficient computation, especially noticeable in more complex game scenarios.

---

