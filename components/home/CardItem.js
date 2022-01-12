import React from "react";
import styles from "../../assets/styles";

import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const CardItem = ({
  actions,
  description,
  image,
  price,
  nameitem,
  onPressLeft,
  onPressRight,
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
      <Image source={{ uri: image }} style={imageStyle} />

      {/* MATCHES */}
      {price && (
        <View style={styles.matchesCardItem}>
          <Ionicons name="heart" color="red">
            <Text style={styles.matchesTextCardItem}>{price} VND</Text>
          </Ionicons>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{nameitem}</Text>

      {/* DESCRIPTION */}
      {description && (
        <Text style={styles.descriptionCardItem}>{description}</Text>
      )}

      {/* STATUS */}
      {status && (
        <View style={styles.status}>
          <View style={status === "Online" ? styles.online : styles.offline} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      )}

      {/* ACTIONS */}
      {actions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Ionicons name="star" style={styles.star}>
              <Text></Text>
            </Ionicons>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onPressLeft()}>
            <Ionicons name="heart" style={styles.like}></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressRight()}
          >
            <Ionicons name="close" style={styles.dislike}></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Ionicons name="flash" style={styles.flash}>
              <Text></Text>
            </Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
