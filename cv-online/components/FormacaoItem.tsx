import { View, Text, StyleSheet } from "react-native";

type Props = {
  curso: string;
  instituicao: string;
  ano: string;
};

export default function FormacaoItem({ curso, instituicao, ano }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.curso}>{curso}</Text>
      <Text style={styles.instituicao}>
        {instituicao} • {ano}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  curso: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  instituicao: {
    fontSize: 14,
    color: "#666",
  },
});
