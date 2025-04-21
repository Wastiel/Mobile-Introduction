import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const icons = ["🐱", "🍒", "💎", "🍋", "⭐"];
const getRandomIcon = () => icons[Math.floor(Math.random() * icons.length)];

type SlotColumnProps = {
  isSpinning: boolean;
  highlightMiddle?: boolean;
  onIconsChange?: (icons: string[]) => void;
  forcedIcons?: string[];
};

export const SlotColumn = ({
  isSpinning,
  highlightMiddle,
  onIconsChange,
  forcedIcons,
}: SlotColumnProps) => {
  const [currentIcons, setCurrentIcons] = useState(["🍒", "💎", "🍋"]);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isSpinning) {
      const id = setInterval(() => {
        const newIcons = [getRandomIcon(), getRandomIcon(), getRandomIcon()];
        setCurrentIcons(newIcons);
        onIconsChange?.(newIcons);
      }, 100);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      if (forcedIcons) {
        setCurrentIcons(forcedIcons);
        onIconsChange?.(forcedIcons);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSpinning]);

  return (
    <View style={styles.column}>
      {currentIcons.map((icon, index) => (
        <View
          key={index}
          style={[
            styles.slot,
            highlightMiddle && index === 1 && styles.middleSlotHighlight,
          ]}
        >
          <Text style={styles.icon}>{icon}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 12,
  },
  slot: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    marginVertical: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  middleSlotHighlight: {
    borderColor: "#FFD700",
    borderWidth: 3,
  },
  icon: {
    fontSize: 40,
  },
});
