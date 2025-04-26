import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { loadQuestions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function QuizScreen() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { selectedCategory, selectedCount, name  } = useLocalSearchParams();
  

  const category = selectedCategory as string;
  const count = parseInt(selectedCount as string);
  const playerName = name as string;

  console.log('Categoria:', category);
  console.log('Número de perguntas:', count);

  useEffect(() => {
    (async () => {
      const loaded = await loadQuestions(category, count);
      setQuestions(loaded);
      setLoading(false);
    })();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace({
        pathname: '/result',
        params: {
          score: score.toString(),
          total: questions.length.toString(),
          name: playerName,
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.greeting}>Carregando as Perguntas, por favor aguarede, {playerName}!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Boa sorte, {playerName}!</Text>
      <QuestionCard
        question={questions[currentIndex]}
        onNext={handleNext}
        isLast={currentIndex === questions.length - 1}
        onAnswer={handleAnswer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  greeting: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
