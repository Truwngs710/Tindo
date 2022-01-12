import React from "react";
import styles from "../../assets/styles";

import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileItem = ({ age, matches, name }) => {
  return (
    <View style={{
      borderWidth: 1,
      alignSelf: "center",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 10,
      paddingBottom: 25,
      margin: 20,
      borderRadius: 8,
      marginTop: -20,
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowColor: "#000000",
      shadowOffset: { height: 0, width: 0 }
      }}>
        <TouchableOpacity>
      <View style={{  width: 300,
    marginTop: 0,
    backgroundColor: "#7444C0",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: "center",
    alignSelf: "center",
    }}>
        <Ionicons name="heart" color="red">
          <Text style={styles.matchesTextProfileItem}>{matches}    Slogan or something add in here!</Text>
        </Ionicons>
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>{age}</Text>

      <View style={styles.info}>
        <Ionicons
          style={styles.iconProfile}
          name="person-circle-outline"
        ></Ionicons>
        <Text style={styles.infoContent}>Add data 1</Text>
      </View>

      <View style={styles.info}>
        <Ionicons style={styles.iconProfile} name="star-outline" />

        <Text style={styles.infoContent}>Add data 2</Text>
      </View>

      <View style={styles.info}>
        <Ionicons style={styles.iconProfile} name="earth-outline" />

        <Text style={styles.infoContent}>Add data 3</Text>
      </View>

      <View style={styles.info}>
        <Ionicons
          style={styles.iconProfile}
          name="chatbubble-ellipses-outline"
        />
        <Text style={styles.infoContent}>Add data 4</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default ProfileItem;
