import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/images/LOGO3.png";
import { getPermitsById } from "../../services/api";

const PermitHistoryScreen = () => {
  const [permitHistory, setPermitHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    const fetchUserIdAndPermits = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await getPermitsById(userId);
          setPermitHistory(response);
        } else {
          console.warn("No userId found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching permits for userId:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchUserIdAndPermits();

    // Set interval to refetch every 20 seconds
    interval = setInterval(() => {
      fetchUserIdAndPermits();
    }, 20000); // 20000 ms

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.permitItem}>
      <Text style={styles.permitText}>Permit Number: {item.permit_number}</Text>
      <Text style={styles.permitDate}>Issue Date: {item.issue_date}</Text>
      <Text style={styles.permitDate}>
        Status:{" "}
        <Text
          style={{
            color:
              item.status === "approved"
                ? "green"
                : item.status === "pending"
                ? "orange"
                : "red",
          }}
        >
          {item.status}
        </Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#003366" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>KENYA POWER</Text>
            <Text style={styles.headerSubtitle}>and LIGHTING COMPANY</Text>
          </View>
          <View style={styles.headerDecoration} />
        </View>
        <Text style={styles.header1}>Permit History</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#003366" />
        ) : (
          <FlatList
            data={permitHistory}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.permit_number || index.toString()
            }
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No permit history available.
              </Text>
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PermitHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header1: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#003366",
  },
  permitItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  permitText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  permitDate: {
    fontSize: 14,
    color: "#555",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#003366",
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    position: "relative",
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#ffc107",
    marginTop: 2,
  },
  headerDecoration: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "30%",
    backgroundColor: "#ffc107",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    zIndex: -1,
  },
  scrollView: {
    flex: 1,
  },
});
