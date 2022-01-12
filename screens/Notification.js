import React, { useState, useEffect } from "react";
import styles from "../assets/styles";
import { useNavigation } from "@react-navigation/core";

import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import Noti from "../components/Notification/Noti";
import * as firebase from "firebase";

const Notificaton = () => {
  const uid = firebase.auth().currentUser.uid;
  const [allnoti, setallnoti] = useState([]);
  const [myinfor, setmyinfor] = useState();
  const [refreshing, setRefreshing] = useState(false);


  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        setmyinfor(documentSnapshot.data());
      });
  }, []);

  const onrefresh = () => {
    setRefreshing(true)
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("Notification")
      .get()
      .then((querySnapshot) => {
        const getallnoti = [];
        querySnapshot.forEach((doc) => {
          const { avt, username, noti_time } = doc.data();
          getallnoti.push({
            id: doc.id,
            avt,
            username,
            noti_time,
          });
        });
        setallnoti(getallnoti);
      });

    setTimeout(() => {
      setRefreshing(false)
    }, 2000);;

    
  }


  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("Notification")
      .get()
      .then((querySnapshot) => {
        const getallnoti = [];
        querySnapshot.forEach((doc) => {
          const { avt, username, noti_time } = doc.data();
          getallnoti.push({
            id: doc.id,
            avt,
            username,
            noti_time,
          });
        });
        setallnoti(getallnoti);
      });
  }, []);

  

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <SafeAreaView>
          <FlatList
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
              onRefresh={onrefresh}
            />}
            data={allnoti}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  firebase.firestore()
                  .collection("users").doc(uid)
                  .collection("Messenger")
                  .doc(item.id)
                  .set({
                    themuid: item.id,
                    themavt: item.avt,
                    themname: item.username, 
                  })
                  firebase.firestore()
                  .collection("users").doc(item.id)
                  .collection("Messenger")
                  .doc(uid)
                  .set({
                    themuid: uid,
                    themavt: myinfor.linkimg,
                    themname: myinfor.name, 
                  })
                  navigation.navigate("Messenges")
                }}
              >
                <Noti
                  image={item.avt}
                  name={item.username}
                  Notif={item.noti_time}
                />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Notificaton;
