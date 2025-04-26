import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Regras do Quiz Interativo 🧠</Text>

      <Text style={styles.description}>
  Bem-vindo ao <Text style={{ fontWeight: 'bold' }}>Quiz Interativo!</Text> Aqui estão as regras do jogo:
  {"\n\n"}
  👉 O quiz consiste em uma determinada quantidade de perguntas. {"\n"}
  👉 Cada pergunta tem 4 alternativas de resposta, sendo apenas uma correta.{"\n"}
  👉 A cada resposta correta, você acumula pontos!{"\n"}
  👉 Ao final do quiz, o ranking será baseado no número de <Text style={{ fontWeight: 'bold' }}>respostas corretas</Text> em comparação com as <Text style={{ fontWeight: 'bold' }}>respostas erradas</Text>.{"\n\n"}

  📋 <Text style={{ fontWeight: 'bold' }}>Pontuação:</Text>
  {"\n"}Cada resposta correta vale 10 pontos.{"\n\n"}
  🏆 <Text style={{ fontWeight: 'bold' }}>Ranking:</Text> O ranking será calculado com base no número de respostas corretas. Quem acertar mais ficará no topo!{"\n"}
  ❌ Respostas erradas não somam pontos, mas influenciam no ranking final.{"\n\n"}
  🏆 = Jogador com mais acertos{"\n"}
  💔 = Jogador com mais respostas erradas{"\n"}
  📋 = Pontuação total
</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF', // Laranja vibrante
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
