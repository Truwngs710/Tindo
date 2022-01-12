import React from "react";
import styles from "../../assets/styles";

import { Text, TouchableOpacity,View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const Filters = () => {
  const navigation = useNavigation();

  return (
    <View style={{borderWidth:1, borderRadius:20 }}>
    <TouchableOpacity
      style={styles.filters}
      onPress={() => navigation.navigate("Messenges")}
    >
      <Ionicons name="funnel">
        <Text style={styles.filtersText}>Filters</Text>
      </Ionicons>
    </TouchableOpacity>
    </View>
  );
};

export default Filters;
