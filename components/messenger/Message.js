import React from "react";
import styles from "../../assets/styles";

import { Text, View, Image } from "react-native";

const Message = ({ image, name }) => {
  return (
  <View style={{ 
    borderWidth:1, 
    borderRadius:20,
  }}>
    
    <View style={styles.containerMessage}>
      <Image  source={{ uri: image}} style={styles.avatar} />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Text style={styles.message}>Chạm nhẹ để vào màn hình nhắn tin</Text>
      </View>
    </View>
    
  </View>
  );
};

export default Message;
