import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { ReanimatedScreenProvider } from "react-native-screens/reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ReanimatedScreenProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Hello",
              headerTransparent: true,
              headerLargeTitleShadowVisible: false,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
              headerLargeTitle: true,
              // Hide small header shadow for continuous blur
              headerShadowVisible: false,
            }}
          />
        </Stack>
      </ReanimatedScreenProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
