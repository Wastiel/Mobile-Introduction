import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RankingModal from '@/components/RankingModal';


interface Player {
  name: string;
  correct: number;
  wrong: number;
}

export default function ResultScreen() {
  const { score, total, name } = useLocalSearchParams();
  const router = useRouter();
  const [rankingVisible, setRankingVisible] = useState(false);
  const [ranking, setRanking] = useState<Player[]>([]);

  const numericScore = parseInt(score as string);
  const numericTotal = parseInt(total as string);
  const numericWrong = numericTotal - numericScore;
  const playerName = (name as string) || 'Anônimo';

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('ranking');
      const parsed: Player[] = stored ? JSON.parse(stored) : [];

      const updated = updateRanking(parsed, playerName, numericScore, numericWrong);
      await AsyncStorage.setItem('ranking', JSON.stringify(updated));
      setRanking(updated);
    })();
  }, []);

  const updateRanking = (list: Player[], playerName: string, correct: number, wrong: number): Player[] => {
    const existing = list.find(p => p.name === playerName);
    if (existing) {
      existing.correct += correct;
      existing.wrong += wrong;
    } else {
      list.push({ name: playerName, correct, wrong });
    }

    return list.sort((a, b) => (b.correct / (b.wrong || 1)) - (a.correct / (a.wrong || 1)));
  };

  const resetRanking = async () => {
    await AsyncStorage.removeItem('ranking');
    setRanking([]);
    setRankingVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado 🧠</Text>
      <Text style={styles.score}>Você acertou {numericScore} de {numericTotal}</Text>
      <Text style={styles.result}>
        {numericScore > numericTotal / 2 ? 'Parabéns, vitória! 🎉' : 'Boa tentativa! 💪'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Voltar ao Início</Text>
      </TouchableOpacity>      

      <TouchableOpacity style={styles.secondaryButton} onPress={() => setRankingVisible(true)}>
        <Text style={styles.secondaryText}>Ver Ranking</Text>
      </TouchableOpacity>

      <RankingModal
        visible={rankingVisible}
        onClose={() => setRankingVisible(false)}
        onReset={resetRanking}
        ranking={ranking}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
  },
  secondaryText: {
    color: '#fff',
    fontSize: 16,
  },
});
