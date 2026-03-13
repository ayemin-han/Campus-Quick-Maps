import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert("Logout", "You have been logged out.");
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={
          require("../../assets/images/student.jpg")
        }
        style={styles.avatar}
      />

      {/* Name */}
      <Text style={styles.name}>Mr. Aye Min Han</Text>
      <Text style={styles.id}>Student ID: 6731503048</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>App Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#e74c3c" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  id: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    width: "80%",
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
export default ProfileScreen;

