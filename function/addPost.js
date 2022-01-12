import React, { useState, useEffect } from "react";
import styles from "../assets/styles";
import { useNavigation } from "@react-navigation/core";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Constants from "expo-constants";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";

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

const Addpost = () => {
  const uid = firebase.auth().currentUser.uid;

  const [image, setImage] = useState(null);
  const [linkimage, setLinkimage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [visibleNoImg, setVisibleNoImg] = useState(false);
  const [loading, setloading] = useState(false);
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [nameitem, setnameitem] = useState("");
  const [location, setLocation] = useState("null");
  const [imageUp, setImageUp] = useState(false);
  const [pp, setpp] = useState("null");

  const Post = async () => {
    if (image) {
      setloading(true);
       setImageUp(await uploadImage())

      ;
    } else if (!image) {
      setVisibleNoImg(true);
    }
  };
  useEffect(() => {
    if (imageUp) {
      setloading(false);
      handleUpdate();
    }
  }, [imageUp]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setpp(doc.data());
      });
  }, []);

  useEffect(() => {
    setpp(pp);
    console.log(pp);
  }, [pp]);

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
      aspect: [3, 4],
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
      aspect: [3, 4],
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
          setLinkimage(url);
          setImageUp(true);
          
          
          return url;
        });
      }
    );
  };
  useEffect(() => {
    setLinkimage(linkimage);
    console.log(linkimage);
  }, [linkimage]);

  const handleUpdate = async () => {
    firebase.firestore().collection("posts").doc().set({
      randomid: uuid.v4(),
      key: uid,
      nameitem: nameitem,
      description: Description,
      price: Price,
      linkimg: linkimage,
      postTime: new Date().toLocaleString(),
      avt: pp.linkimg,
      username: pp.name,
    });
    await navigation.replace("Home")
    navigation.navigate("Profile")
  };

  const navigation = useNavigation();
  const BackHome = async () => {
    await navigation.replace("Home");
    navigation.navigate("Profile")
  };

  const Closedialog = () => {
    setVisibleNoImg(false);
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
          
          <Dialog.Container visible={loading} contentStyle={{ borderWidth:1, borderRadius:20, borderColor: "#2213BC" }}>
            <View>
              <Text>Post uploading</Text>
              <ActivityIndicator size="large" color="#00ffff" />
            </View>
          </Dialog.Container>
          <Dialog.Container visible={visibleNoImg} contentStyle={{ borderWidth:1, borderRadius:20, borderColor: "#2213BC" }}>
            <Dialog.Title>Dialog waring</Dialog.Title>
            <Dialog.Description>
              U must be have a pickture for thing
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={Closedialog} />
          </Dialog.Container>
        </View>

        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>Add post</Text>
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
              <Image
                source={{ uri: image }}
                style={{ borderWidth: 1, borderColor: "#2213BC",borderRadius: 15, height: 120, width: 90 }}
                imageStyle={{ borderRadius: 15 }}
              ></Image>
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
              value={nameitem}
              onChangeText={(txt) => setnameitem(txt)}
              placeholder={"Name Item"}
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
            <TextInput
              value={Description}
              onChangeText={(txt) => setDescription(txt)}
              placeholder={"Detailed description"}
              placeholderTextColor="#666666"
              style={styles.textInput}
            />
            <TextInput
              value={Price}
              onChangeText={(txt) => setPrice(txt)}
              placeholder={"Price"}
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              style={styles.textInput}
            />
          </View>
          </KeyboardAvoidingView>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.submitbutton} onPress={Post}>
            <Text style={styles.submitbuttonTitle}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitbutton} onPress={BackHome}>
            <Text style={styles.submitbuttonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Addpost;
