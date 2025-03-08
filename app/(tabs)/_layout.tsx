import { Tabs } from 'expo-router';
import { Map, Navigation } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Bản đồ',
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='navigation'
        options={{
          title: 'Tìm đường',
          tabBarIcon: ({ color }) => <Navigation size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    height: 60,
  },
});
