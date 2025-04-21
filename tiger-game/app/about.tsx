import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎰 Sobre o Tiger Game EEEPE 🐯</Text>

      <Text style={styles.description}>
        Bem-vindo ao <Text style={{ fontWeight: 'bold' }}>Tiger Game!</Text> Aqui vai um resumo das regras e pontuações:
        {"\n\n"}
        👉 Você gira 3 colunas de ícones.{"\n"}
        🏆 Vitória: quando os <Text style={{ fontWeight: 'bold' }}>três ícones do meio</Text> são iguais.{"\n"}
        ❌ Se os ícones do meio não forem iguais, é uma derrota.{"\n\n"}

        📋 Pontuação:
        {"\n"}💎 Diamante: 5 pontos
        {"\n"}🍒 Cereja: 2 pontos
        {"\n"}🍋 Limão: 1 ponto
        {"\n"}⭐ Estrela: 4 pontos
        {"\n"}🐱 Gato: 10 pontos
        {"\n"}🍐 Pera: 3 pontos
        {"\n\n"}
        🏆 = Vitórias{"\n"}
        💔 = Derrotas{"\n"}
        📋 = Pontuação acumulada (ganha pontos apenas quando há vitória com 3 ícones do meio iguais).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA500', // Laranja vibrante
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
  },
});
