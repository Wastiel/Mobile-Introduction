import { View, Text, StyleSheet } from "react-native";

type Props = {
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
};

export default function ExperienciaItem({
  cargo,
  empresa,
  periodo,
  descricao,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.cargo}>{cargo}</Text>
      <Text style={styles.empresa}>{empresa} • {periodo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  cargo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  empresa: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
