// components/OptionSelector.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OptionSelectorProps<T> {
  title: string;
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
  renderLabel?: (item: T) => string; // para personalizar como o texto aparece
}

export function OptionSelector<T extends string | number>({
  title,
  options,
  selected,
  onSelect,
  renderLabel = (item) => String(item),
}: OptionSelectorProps<T>) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonGroup}>
        {options.map((item) => (
          <TouchableOpacity
            key={String(item)}
            style={[
              styles.selectButton,
              selected === item && styles.selectedButton,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.selectButtonText}>{renderLabel(item)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff', // texto branco
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 6,
  },
  selectedButton: {
    backgroundColor: '#4caf50',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
