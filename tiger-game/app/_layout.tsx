import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#ff8c00',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#ff8c00',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tiger EEEPE', // Título exibido no header (topo)
          tabBarLabel: 'Home',     // Texto do ícone na tab bar
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre', // Título exibido no header (topo)
          tabBarLabel: 'About',     // Texto do ícone na tab bar
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'information-circle' : 'information-circle-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
