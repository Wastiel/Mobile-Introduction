// app/index.tsx
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { OptionSelector } from '@/components/OptionSelector';
import RankingModal from '@/components/RankingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

interface Player {
  name: string;
  correct: number;
  wrong: number;
}

const categories = ['História do Brasil', 'Língua Portuguesa', 'Matemática', 'Geografia', 'Naruto', 'Pirata que Estica'];
const questionCounts = [5, 10, 15];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('História do Brasil');
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [playerName, setPlayerName] = useState('');
  const [showRanking, setShowRanking] = useState(false);
  const [ranking, setRanking] = useState<Player[]>([]);

  const startQuiz = () => {
    if (!playerName.trim()) {
      Toast.show({
        type: 'error',
        text1: '⚠️ Nome obrigatório',
        text2: 'Por favor, digite seu nome para começar o quiz.',
        position: 'top',
        visibilityTime: 3000, // milissegundos
        autoHide: true,
        topOffset: 300,
        bottomOffset: 40,
      });
      return;
    }
    router.push({
      pathname: '/quiz',
      params: {
        name: playerName,
        selectedCategory,
        selectedCount: selectedCount.toString(),
      },
    });
  };

  useEffect(() => {
    if (showRanking) {
      (async () => {
        const stored = await AsyncStorage.getItem('ranking');
        const parsed: Player[] = stored ? JSON.parse(stored) : [];
        const sorted = parsed.sort((a, b) => {
          const ratioA = a.correct / (a.wrong || 1);
          const ratioB = b.correct / (b.wrong || 1);
          return ratioB - ratioA;
        });
        setRanking(sorted);
      })();
    }
  }, [showRanking]);

  const resetRanking = async () => {
    await AsyncStorage.removeItem('ranking');
    setRanking([]);
    setShowRanking(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Interativo 🤓</Text>
      <Text style={styles.subtitle}>Escolha o tema e quantidade de perguntas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor="#888"
        value={playerName}
        onChangeText={setPlayerName}
      />

      <View style={styles.separator} />
      <OptionSelector
        title="Tema"
        options={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <View style={styles.separator} />
      <OptionSelector
        title="Número de Perguntas"
        options={questionCounts}
        selected={selectedCount}
        onSelect={setSelectedCount}
        renderLabel={(n) => `${n} questões`}
      />
      <View style={styles.separator} />
      <TouchableOpacity style={styles.button} onPress={startQuiz}>
        <Text style={styles.buttonText}>Começar Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rankingButton} onPress={() => setShowRanking(true)}>
        <Text style={styles.rankingText}>🏆</Text>
      </TouchableOpacity>

      <RankingModal
        visible={showRanking}
        onClose={() => setShowRanking(false)}
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
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#333',
    marginVertical: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
    marginBottom: 24,
  },
  rankingButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 12,
  },
  rankingText: {
    color: '#fff',
    fontSize: 18,
  },
});
