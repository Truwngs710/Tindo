import React, { useState, useEffect } from "react";
import styles from "../assets/styles";
import { useNavigation } from "@react-navigation/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Constants from "expo-constants";
import Dialog from "react-native-dialog";

import {
  TextInput,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

const Editpf = () => {
  const uid = firebase.auth().currentUser.uid;

  const [image, setImage] = useState(null);
  const [imageUp, setImageUp] = useState(false);
  const [linkimage, setLinkimage] = useState("null");
  const [location, setLocation] = useState("null");
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setloading] = useState(false);
  const [people, setPeople] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setPeople(documentSnapshot.data());
        }
      });
  }, []);

  useEffect(() => {
    setPeople(people);
    setLinkimage(people.linkimg);
  }, [people]);

  const Update = async () => {
    if (image) {
      setloading(true);
      setImageUp(await uploadImage());
    }
  };
  useEffect(() => {
    if (imageUp) {
      setloading(false);
      handleUpdate();
    }
  }, [imageUp]);
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const TakeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          blob.close();
          console.log(url);
          setLinkimage(url);
          setImageUp(true);
          return url;
        });
      }
    );
  };

  const handleUpdate = async () => {
    firebase.firestore().collection("users").doc(uid).update({
      name: people.name,
      age: people.age,
      phone: people.phone,
      location: location,
      linkimg: linkimage,
    });
    await navigation.replace("Home");
    navigation.navigate("Profile")

  };

 
  const BackHome = async () => {
    await navigation.replace("Home");
    navigation.navigate("Profile")
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dialog.Container 
          visible={loading}
          contentStyle={{ borderWidth:1, borderRadius:20, borderColor: "#2213BC" }}
           >
            <View style={{ marginBottom: 10}}>
              <ActivityIndicator size="large" color="#00ffff" />
            </View>
          </Dialog.Container>
        </View>

        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Your ID: {uid} </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 30 }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 30 }}>
              <ImageBackground
                source={{ uri: people.linkimg }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderWidth:1, borderColor: "#2213BC", borderRadius: 15 }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                ></Image>
              </ImageBackground>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.takepic} onPress={TakeImage}>
              <Text style={styles.submitbuttonTitle}>Take by Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.takepic} onPress={PickImage}>
              <Text style={styles.submitbuttonTitle}>Take from library</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            }} 
            behavior="padding">
        <View style={styles.container}>
            <TextInput
              value={people.name}
              onChangeText={(txt) => setPeople({ ...people, name: txt })}
              placeholder={"Your Name"}
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
            <TextInput
              value={people.age}
              onChangeText={(txt) => setPeople({ ...people, age: txt })}
              placeholder={"Ages"}
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              style={styles.textInput}
            />

            
            <TextInput
              value={people.phone}
              onChangeText={(txt) => setPeople({ ...people, phone: txt })}
              placeholder={"Phone number"}
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              style={styles.textInput}
            />

            <Text
              placeholder="Location"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
            >
            <MaterialCommunityIcons
              name="map-marker-outline"
              color="#333333"
              size={20}
            />
              {text}
            </Text>
          </View>
          </KeyboardAvoidingView>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.submitbutton} onPress={Update}>
            <Text style={styles.submitbuttonTitle}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitbutton} onPress={BackHome}>
            <Text style={styles.submitbuttonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Editpf;
