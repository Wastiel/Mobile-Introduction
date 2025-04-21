import { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SlotColumn } from "../components/SlotColumn";
import ConfettiCannon from 'react-native-confetti-cannon';

const icons = ["🐱", "🍒", "💎", "🍋", "⭐"];
const getRandomIcon = () => icons[Math.floor(Math.random() * icons.length)];

const iconValues: Record<string, number> = {
  "💎": 5,
  "🍒": 2,
  "🍋": 1,
  "🐱": 10,
  "⭐": 4,  
};

export default function HomeScreen() {
  const [spinningCols, setSpinningCols] = useState([false, false, false]);
  const [forcedIcons, setForcedIcons] = useState<(string[] | null)[]>([null, null, null]);
  const [message, setMessage] = useState<string | null>(null);
  const iconsRef = useRef<string[][]>([[], [], []]);
  const lossCounter = useRef(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [score, setScore] = useState(0);

  const shouldForceWin = () => {
    const r = Math.random();
    if (lossCounter.current >= 7) return true;
    if (lossCounter.current >= 4 && r < 0.7) return true;
    if (lossCounter.current >= 2 && r < 0.3) return true;
    if (r < 0.1) return true;
    return false;
  };

  const handleSpin = () => {
    if (spinningCols.some(Boolean)) return;

    setMessage(null);

    const isWin = shouldForceWin();
    const winningIcon = getRandomIcon();

    if (isWin) {
      const forced = [0, 1, 2].map(() => [
        getRandomIcon(),
        winningIcon,
        getRandomIcon(),
      ]);
      setForcedIcons(forced);
    } else {
      setForcedIcons([null, null, null]);
    }

    setSpinningCols([true, true, true]);

    setTimeout(() => setSpinningCols([false, true, true]), 2000);
    setTimeout(() => setSpinningCols([false, false, true]), 2500);
    setTimeout(() => {
      setSpinningCols([false, false, false]);

      // Checa vitória
      setTimeout(() => {
        const middleIcons = iconsRef.current.map((col) => col[1]);
        const allEqual = middleIcons.every((i) => i === middleIcons[0]);
        if (allEqual && middleIcons[0]) {
          setMessage(`Você ganhou com ${middleIcons[0]}! 🎉`);
          lossCounter.current = 0;
          setWins((prev) => prev + 1);
          const icon = middleIcons[0];
          setScore((prev) => prev + (iconValues[icon] || 0));
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        } else {
          setMessage(null);
          lossCounter.current += 1;
          setLosses((prev) => prev + 1);
          setScore((prev) => prev - 1);
        }
      }, 100);
    }, 3000);
  };

  const isSpinning = spinningCols.some(Boolean);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎰 Tiger Game EEEPE 🎰</Text>
      <View style={styles.scoreBoard}>
        <Text style={styles.score}>🏆 {wins}  |  💔 {losses}  |  📋 {score}</Text>
      </View>

      <View style={styles.slotWrapper}>
        {[0, 1, 2].map((index) => (
          <SlotColumn
            key={index}
            isSpinning={spinningCols[index]}
            highlightMiddle
            forcedIcons={forcedIcons[index] ?? undefined}
            onIconsChange={(icons) => {
              iconsRef.current[index] = icons;
            }}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.spinButton,
            isSpinning && styles.spinButtonSpinning,
          ]}
          onPress={handleSpin}
          disabled={isSpinning}
        >
          <Text style={[styles.spinButtonText, isSpinning && styles.spinButtonTextSpinning]}>
            {isSpinning ? "🐯" : "🕹️"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.victoryText}>{message ?? " "}</Text>
      {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{ x: -10, y: 0 }}
          explosionSpeed={400}
          fallSpeed={3000}
          fadeOut
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  slotWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  buttonContainer: {
    marginTop: 20,
  },
  victoryText: {
    marginTop: 20,
    fontSize: 20,
    color: "#00FF99",
    fontWeight: "bold",
    textAlign: "center",
    minHeight: 30,
  },
  scoreBoard: {
    alignItems: 'center',
    marginVertical: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  spinButton: {
    backgroundColor: "#444",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
  },
  spinButtonSpinning: {
    backgroundColor: "#FFA500",
  },
  spinButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  spinButtonTextSpinning: {
    color: "#222",
  },
});
