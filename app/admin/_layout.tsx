import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="home"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name='make_post'
      options={{ headerTitle:'post', headerStyle: {backgroundColor: "#D2C699"}}}
      />
      <Stack.Screen 
      name='tutorial_vids'
      options={{ headerTitle:'Tutorials', headerStyle: {backgroundColor: "#D2C699"}}}
      />
    </Stack>
  );
};