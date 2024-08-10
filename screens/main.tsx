
import { View, Text } from "react-native";
import { StyleSheet, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

const Main = () => {
  const { top } = useSafeAreaInsets();
  const [url] = React.useState("https://devotional-beta.netlify.app");
  const [webKey] = React.useState(1);
  return (
    <View style={[styles.safeArea, { paddingTop: top }]}>
      <StatusBar backgroundColor="#3f51b5" barStyle="light-content" />
      <WebView key={webKey} style={styles.webview} source={{ uri: url }} />
    </View>
  );
};

export default Main;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor:"#3f51b5",
  },

  page: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },

  // webview
  webview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}); 