import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<null | 'X' | 'O'>(null);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2], // linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonais
    [2, 4, 6],
  ];

  const checkWinner = (newBoard: string[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a] as 'X' | 'O'; // 'X' ou 'O'
      }
    }
    return null;
  };

  const handleCellPress = (index: number) => {
    if (board[index] !== '' || winner || isDraw) return;
  
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
  
    const foundWinner = checkWinner(newBoard);
  
    if (foundWinner) {
      setWinner(foundWinner);
    } else if (!newBoard.includes('')) {
      // Não tem vencedor e todas as casas estão preenchidas
      setIsDraw(true);
    } else {
      // Continua o jogo
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  const getSymbolStyle = (value: string) => {
    if (value === 'X') return { color: '#1976D2' }; // azul
    if (value === 'O') return { color: '#D32F2F' }; // vermelho
    return {};
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      {winner ? (
      <Text style={styles.winnerText}>🏆 {winner} venceu!</Text>
      ) : isDraw ? (
      <Text style={styles.drawText}>😐 Empate!</Text>
      ) : (
      <Text style={styles.subtitle}>Jogador atual: {currentPlayer}</Text>
      )}

      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handleCellPress(index)}
          >
            <Text style={[styles.cellText, getSymbolStyle(value)]}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {(winner || isDraw) && (
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  drawText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 24,
  },  
  subtitle: {
    fontSize: 20,
    marginBottom: 24,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 24,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#333',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
