import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { WebView as NativeWebView } from "react-native-webview";
import { RootStackParamList } from "../types/navigation";

const HomeScreen = () => {
 const navigation = useNavigation<HomeScreenNavigationProp>();

  type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

  const [searchText, setSearchText] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");

  const places = useMemo(
    () => [
      {
        name: "D1 Food Court",
        query: "2VXV+2GF, Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100, Thailand",
      },
      {
        name: "General Education Building C3",
        query: "2VVW+M44, Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100, Thailand",
      },
      {
        name: "General Education Building C1",
        query: "2VWW+266, Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100, Thailand",
      },
      {
        name: "C4",
        query: "2VVV+QW3, Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100, Thailand",
      },
      {
        name: "S1 Building",
        query: "2VWV+8P9, Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100, Thailand",
      },
      {
        name: "Registrar Division",
        query: "2VWV+FC4, Tambon Nang Lae, Amphoe Mueang Chiang Rai, Chang Wat Chiang Rai 57100, Thailand",
      },
      {
        name: "MFU Learning Space",
        query: "Mae Fah Luang University, Thailand",
      },
    ],
    []
  );

  const suggestions = useMemo(() => {
    const lower = searchText.trim().toLowerCase();
    if (!lower) {
      return places;
    }
    return places.filter((place) =>
      place.name.toLowerCase().includes(lower) || place.query.toLowerCase().includes(lower)
    );
  }, [places, searchText]);

  const activePlace = useMemo(() => {
    const lower = searchedQuery.trim().toLowerCase();
    return (
      places.find(
        (place) =>
          place.name.toLowerCase() === lower ||
          place.query.toLowerCase() === lower ||
          place.name.toLowerCase().startsWith(lower) ||
          place.query.toLowerCase().includes(lower)
      ) ?? null
    );
  }, [places, searchedQuery]);

  const mapQuery = activePlace
    ? `${activePlace.name} ${activePlace.query}`
    : searchedQuery.trim() || "Mae Fah Luang University";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`;

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
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrapper}>
          <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search locations..."
            style={styles.search}
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="words"
            returnKeyType="search"
            onSubmitEditing={() => setSearchedQuery(searchText)}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSearchText("");
                setSearchedQuery("");
              }}
            >
              <MaterialIcons name="close" size={18} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setSearchedQuery(searchText)}
        >
          <MaterialIcons name="arrow-forward-ios" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.slice(0, 5).map((place) => (
            <TouchableOpacity
              key={place.name}
              style={styles.suggestionButton}
              onPress={() => {
                setSearchText(place.name);
                setSearchedQuery(place.name);
              }}
            >
              <Text style={styles.suggestionText}>{place.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Map */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <iframe
            title="map"
            src={mapSrc}
            style={styles.map as any}
          />
        ) : (
          // @ts-expect-error: NativeWebView guaranteed non-null on native
          <NativeWebView
            originWhitelist={["*"]}
            source={{ uri: mapSrc }}
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  search: {
    flex: 1,
    height: "100%",
    padding: 0,
    color: "#000",
  },
  clearButton: {
    padding: 6,
    marginLeft: 6,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionsContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionButton: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    color: "#333",
    fontWeight: "600",
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
