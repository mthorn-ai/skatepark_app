import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{ headerTitle: 'Login', headerStyle: {backgroundColor: "#D2C699"}}}
      />
      <Stack.Screen 
        name="home"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
