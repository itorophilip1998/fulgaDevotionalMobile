import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import { Alert, Text, View } from "react-native";
import Main from "./screens/main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [network, setNetwork] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setNetwork(true);
      } else {
        setNetwork(false);
        Alert.alert(
          "No Network",
          "You are currently offline. Please check your internet connection"
        );
      }
    });

    const simulateAsyncTask = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    };

    const startAsyncTask = async () => {
      await simulateAsyncTask();
      setAppIsReady(true);
    };

    startAsyncTask();

    return () => {
      unsubscribe();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {network ? (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Main />
        </View>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>You are currently offline.</Text>
          <Text style={{ fontSize: 20 }}>
            Please check your internet connection
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}
