import { Stack } from 'expo-router';
import { Image } from 'react-native';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: () => (
            <Image 
              source={require('../assets/images/todo-list.png')} // ajuste o caminho se necessário
              style={{ width: 32, height: 32, resizeMode: 'contain' }}
            />
          ),
        }} 
      />
    </Stack>
  );
}
