import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // Ensure you have access to the router

const ProfilePage = () => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("userEmail");
    router.push("/"); // Redirect to the login page
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error("Error retrieving username:", error);
      }
    };
    const fetchUserEmail = async () => {
      try {
        const storedUserEmail = await AsyncStorage.getItem("userEmail");
        if (storedUserEmail) {
          setUserEmail(storedUserEmail);
        }
      } catch (error) {
        console.error("Error retrieving email:", error);
      }
    };

    fetchUserName();
    fetchUserEmail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} // Placeholder image
          style={styles.profileImage}
        />
        <Text style={styles.username}>
          {userName ? userName : "Loading..."}{" "}
        </Text>
        <Text style={styles.email}>
          {userEmail ? userEmail : "Loading..."}{" "}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="edit" size={20} color="#000" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="cog" size={20} color="#000" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={logout} // Call logout function on press
        >
          <FontAwesome name="sign-out" size={20} color="#000" />
          <Text style={styles.actionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Light background color
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Text color
  },
  email: {
    fontSize: 16,
    color: "gray", // Lighter text color
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0", // Light background for action buttons
    marginBottom: 10,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#000", // Text color for buttons
  },
});

export default ProfilePage;
