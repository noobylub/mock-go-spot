import { Stack } from 'expo-router/stack';
import { LogtoProvider, LogtoConfig, UserScope } from '@logto/rn';
// Import the UserHeader component

const config: LogtoConfig = {
  endpoint: 'https://969ymo.logto.app/',
  appId: '3rhs9s1wql5940dy14ab5',
  scopes: [
    UserScope.Email,
    UserScope.Phone,
  ],
};

export default function Layout() {
  return (
    <LogtoProvider config={config}>

      <Stack  >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modals/more-info"
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="modals/preference" options={{ presentation: 'modal' }} />
      </Stack>
    </LogtoProvider>
  );
}
