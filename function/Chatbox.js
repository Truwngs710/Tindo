import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import styles from "../assets/styles"
import { GiftedChat } from 'react-native-gifted-chat'

import { Text,View,TouchableOpacity, ImageBackground} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";


const Chatbox = ({route, navigation}) => {
    const [messages, setMessages] = useState([]);
    const [me, setme] = useState([]);

  const uid = firebase.auth().currentUser.uid;
    const {data} = route.params


      useEffect(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((documentSnapshot) => {
            setme(documentSnapshot.data());
          });
      }, []);

    
      // useEffect(() => {
      //   setMessages([
      //     {
      //       _id: 1,
      //       text: 'Hello developer',
      //       createdAt: new Date(),
      //       user: {
      //         _id: 2,
      //         name: 'React Native',
      //         avatar: data.themavt,
      //       },
      //     },
      //   ])
      // }, [])


      useEffect (() => {
        messages.reverse();
      }, [messages])
      useEffect (() => {
        const unsubcribe =  firebase.firestore().collection("users").doc(uid).collection("Messenger")
        .doc(data.key).collection("Onsend").onSnapshot
        (snapshot => setMessages(
          snapshot.docs.map(doc=>({
            _id: doc.data()._id,
            createdAt:doc.data().createdAt.toDate(),
            text:doc.data().text,
            user:doc.data().user,
          }))
          ))
        return unsubcribe;
      }, [])
     
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const   {
          _id,
          createdAt,
          text,
          user,
        } = messages[0]
        firebase.firestore().collection("users").doc(uid).collection("Messenger")
        .doc(data.key).collection("Onsend").doc(Date.now().toString()).set({
          _id,
          createdAt,
          text,
          user
        })
        firebase.firestore().collection("users").doc(data.key).collection("Messenger")
        .doc(uid).collection("Onsend").doc(Date.now().toString()).set({
          _id,
          createdAt,
          text,
          user
        })
      }, [])
 
  return (
    <>
      <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
    <View style={{   flexDirection: "row"}}>
    <TouchableOpacity
            onPress={ async () => {
              await navigation.replace("Home");
              navigation.navigate("Messenges")
            }}
             style={{
              marginTop:50,
              backgroundColor:"#FFFFFF",
              padding: 10,
              borderRadius: 20,
              width: 90,
              shadowOpacity: 0.05,
              shadowRadius: 10,
              shadowColor: "#000000",
              shadowOffset: { height: 0, width: 0 }}}>
      <Ionicons name="arrow-back-outline">
        <Text style={{
          color: "#363636",
          fontSize: 13,
        }}> Back</Text>
      </Ionicons>
    </TouchableOpacity>
    <TouchableOpacity
             style={{
               marginTop:50,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 18,
              height: 33,
              borderRadius: 25,
              backgroundColor: "#5636B8",
              paddingHorizontal: 20,}}>
      
        <Text style={{
          color: "#FFFFFF",
          fontSize: 15,
          justifyContent:"center"
        }}>{data.themname}</Text>
    </TouchableOpacity>
    </View>
    <GiftedChat
      
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: uid,
        name: me.name,
        avatar: me.linkimg,

      }}
    />
    </ImageBackground>
    </>
    
    
  );
};

export default Chatbox;
