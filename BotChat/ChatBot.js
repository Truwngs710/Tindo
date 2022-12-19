import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import styles from "../assets/styles"
import { GiftedChat } from 'react-native-gifted-chat'

import { Text,View,TouchableOpacity, ImageBackground} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

const BOT = {
  _id: 2,
  name: 'Mr.Bot',
  avatar: require('../assets/images/bot.jpg')
}

const Chatbot = ({route, navigation}) => {

 
    
  const [messages, setMessages] = useState([{
    messages: [{_id: 1, text: 'Hi', createdAt: new Date(), user: BOT}],
    id: 1,
    name: 'test',
  }])

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
      <GiftedChat
      messages={messages}
      onSend={(mes) => onSend(mes)}
      user={{_id: 1}}
      />
   
    </ImageBackground>
    </>
    
    
  );
};

export default Chatbot;
