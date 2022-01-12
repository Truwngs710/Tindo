import React from "react";
import styles from "../../assets/styles";

import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const City = () => {
  return (
    <View style={{borderWidth:1, borderRadius:20 }}>
    <TouchableOpacity style={styles.city}>
      <Ionicons name="location">
        <Text style={styles.cityText}>New York</Text>
      </Ionicons>
    </TouchableOpacity>
    </View>
  );
};

export default City;
