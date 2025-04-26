import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            title: 'Quiz',
            headerStyle: { backgroundColor: '#007F00' },  // Verde forte
            headerTintColor: '#fff',  // Cor do texto e ícones da barra superior
          }} 
        />
        <Stack.Screen 
          name="result" 
          options={{
            title: 'Result',
            headerStyle: { backgroundColor: '#007F00' },  // Verde forte
            headerTintColor: '#fff',  // Cor do texto e ícones da barra superior
          }} 
        /><Stack.Screen 
        name="quiz" 
        options={{
          title: 'quiz',
          headerStyle: { backgroundColor: '#007F00' },  // Verde forte
          headerTintColor: '#fff',  // Cor do texto e ícones da barra superior
        }} 
      />
      </Stack>
      <Toast /> 
    </>
  );
}
