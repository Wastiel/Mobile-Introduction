import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface Player {
  name: string;
  correct: number;
  wrong: number;
}

interface RankingModalProps {
  visible: boolean;
  onClose: () => void;
  onReset: () => void;
  ranking: Player[];
}

export default function RankingModal({
  visible,
  onClose,
  onReset,
  ranking,
}: RankingModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>🏆 Ranking</Text>
          <FlatList
            data={ranking}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const total = item.correct + item.wrong;
              const accuracy = total > 0 ? ((item.correct / total) * 100).toFixed(1) : '0';
              return (
                <Text style={styles.player}>
                  {index + 1}. {item.name} - {item.correct} ✅ / {item.wrong} ❌ ({accuracy}%)
                </Text>
              );
            }}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Text style={styles.buttonText}>Resetar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    maxHeight: '70%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  player: {
    fontSize: 16,
    marginVertical: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
