// components/QuestionCard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type QuestionProps = {
    question: {
      text: string;
      options: string[];
      correctAnswerIndex: number;
    };
    onNext: () => void;
    isLast: boolean;
    onAnswer: (isCorrect: boolean) => void; // nova prop
  };
  
  export default function QuestionCard({ question, onNext, isLast, onAnswer }: QuestionProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
    const handleOptionPress = (index: number) => {
      if (selectedOption === null) {
        setSelectedOption(index);
        const isCorrect = index === question.correctAnswerIndex;
        onAnswer(isCorrect); // dispara se acertou ou não
      }
    };
  
    useEffect(() => {
      setSelectedOption(null);
    }, [question]);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.text}</Text>

      {question.options.map((option, index) => {
        const isSelected = selectedOption === index;
        const isCorrect = question.correctAnswerIndex === index;

        let backgroundColor = '#333';
        if (selectedOption !== null) {
          if (isSelected && isCorrect) backgroundColor = '#388e3c';
          else if (isSelected) backgroundColor = '#d32f2f';
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor }]}
            onPress={() => handleOptionPress(index)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      {selectedOption !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>{isLast ? 'Finalizar Quiz' : 'Próxima Pergunta'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});
