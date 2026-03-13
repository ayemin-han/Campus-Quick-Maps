import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
// WebView is only used on native platforms. On web we render a simple iframe instead.
let NativeWebView: typeof import('react-native-webview').WebView | null = null;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  NativeWebView = require('react-native-webview').WebView;
}
const HomeScreen = () => {
 const navigation = useNavigation<HomeScreenNavigationProp>();

  type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;


  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
        </style>
      </head>
      <body>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.1311853978673!2d99.89177127523014!3d20.044947181369587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d700048c69def1%3A0xa20592e502bc20c9!2sMae%20Fah%20Luang%20University!5e0!3m2!1sen!2sth!4v1771480447514!5m2!1sen!2sth"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Header with Profile Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Campus Quick Maps</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileBtn}
        >
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search locations..."
        style={styles.search}
      />

      {/* Map */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            title="map"
            srcDoc={mapHTML}
            style={styles.map as any}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          // @ts-expect-error: NativeWebView guaranteed non-null on native
          <NativeWebView
            originWhitelist={["*"]}
            source={{ html: mapHTML }}
            style={styles.map}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  profileText: {
    color: "#fff",
    fontWeight: "600",
  },
  search: {
    marginHorizontal: 20,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});
