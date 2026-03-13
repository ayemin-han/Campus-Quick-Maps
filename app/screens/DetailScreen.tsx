import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { location } = route.params;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#2E86DE",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

  return (
    <View style={styles.container}>
      <Image source={location.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{location.name}</Text>
        <Text style={styles.desc}>{location.description}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Navigate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#aaa" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
