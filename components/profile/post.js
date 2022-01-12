import React from "react";
import styles from "../../assets/styles";

import { Text, View } from "react-native";

const Post = ({ nameitem, description, linkimg, price, postTime }) => {
  return (
    <View style={styles.containerItem}>
      <Text style={styles.name}>{nameitem}</Text>

      <Text style={styles.descriptionProfileItem}>{description}</Text>
    </View>
  );
};

export default Post;
