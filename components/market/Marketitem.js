import React from "react";
import styles from "../../assets/styles";

import { Text, View, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Marketitem = ({
  imageitem,
  matches,
  nameitem,
  status,
  variant,
}) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 170 : 350,
      margin: variant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: "#363636",
      fontSize: variant ? 15 : 30,
    },
  ];

  return (
   
      
      <View style={styles.containerCardItem}>
        {/* IMAGE */}
        <Image source={{ uri: imageitem }} style={imageStyle} />

        {/* MATCHES */}
        {matches && (
          <View style={styles.matchesCardItem}>
            <Ionicons name="heart" color="red">
              <Text style={styles.matchesTextCardItem}>{matches} VND</Text>
            </Ionicons>
          </View>
        )}

        {/* NAME */}
        <Text style={nameStyle}> Name: {nameitem}</Text>

        {/* DESCRIPTION */}

        {/* STATUS */}
        {status && (
          <View style={styles.status}>
           
            <Text style={styles.statusText}>Des: {status}</Text>
          </View>
        )}
      </View>
   
  );
};

export default Marketitem;
