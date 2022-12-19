import React, {useState, useEffect} from "react";
import styles from "../assets/styles";

import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import Message from "../components/messenger/Message";
import * as firebase from "firebase";



const Messages = ({route, navigation}) => {
  const uid = firebase.auth().currentUser.uid;
  const [infor, setinfor] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const b = "asdaasdsasdas"
  const [ppchat, setppchat] = useState([]);


  const Chatbox = () => {
    navigation.navigate("Chatbox");
    
  }

  const onrefresh = () => {
    setRefreshing(true)
    firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("Messenger")
        .get()
        .then((querySnapshot) => {
          const allchat = [];
          querySnapshot.forEach((doc) => {
            const { themavt, themname } =
              doc.data();
            allchat.push({
              key: doc.id,
             themavt,
             themname
            });
          });
          setppchat(allchat);
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
        .collection("Messenger")
        .get()
        .then((querySnapshot) => {
          const allchat = [];
          querySnapshot.forEach((doc) => {
            const { themavt, themname } =
              doc.data();
            allchat.push({
              key: doc.id,
             themavt,
             themname
            });
          });
          setppchat(allchat);
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
            data={ppchat}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={ async () => { 
                await setinfor(item)
                navigation.replace("Chatbox", {data: item})

                }}>
                <Message
                  image={item.themavt}
                  name={item.themname}
                />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Messages;
