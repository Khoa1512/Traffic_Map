import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(modals)/camera'
          options={{ presentation: 'modal', headerShown: true }}
        />
      </Stack>
  );
}
