import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import React from 'react';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PurpleSmile: require('../assets/fonts/PurpleSmile.ttf'),
    BabyDoll: require('../assets/fonts/BabyDoll.ttf'),
    ...FontAwesome.font,
    

  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Animaux" options={{ presentation: 'modal' }} />
          <Stack.Screen name="animauxprofil" options={{ presentation: 'modal' }} />
          <Stack.Screen name="AnimauxModif" options={{ presentation: 'modal' }} />
          <Stack.Screen name="AnimauxForm" options={{ presentation: 'modal' }} />
          <Stack.Screen name="connexion" options={{ presentation: 'modal' }} />
          <Stack.Screen name="inscription" options={{ presentation: 'modal' }} />
          <Stack.Screen name="historique" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
