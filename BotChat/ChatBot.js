import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import styles from "../assets/styles";
import { GiftedChat } from "react-native-gifted-chat";

import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { Dialogflow_V2 } from "react-native-dialogflow";

import { dialogflowConfig } from "../env/env";
import uuid from "react-native-uuid";
import RNKommunicateChat from "react-native-kommunicate-chat";
const Chatbot = ({ route, navigation }) => {

 const Bot = {
  _id: 2,
  name: "React Native",
  avatar: require("../assets/images/bot.jpg"),
}

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hello guy, can i help you something?",
      createdAt: new Date(),
      user: Bot,
    },
  ]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );

    
  }, []);

  const handelGGRes = async (result) => {
   let messend = await result.queryResult.fulfillmentMessages[0].text.text[0];
   let messendback =  {
    _id: uuid.v4(),
    text: messend,
    createdAt: new Date(),
    user: Bot
  }
setMessages(previousMessages => GiftedChat.append(previousMessages, messendback))
  }

  const onSend = useCallback((messages = []) => {
   let messend = messages[0].text;
   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
   Dialogflow_V2.requestQuery(messend,(result) => handelGGRes(result), {})
  }, []);
 
 
  return (
    <>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.bg}
      >
        <GiftedChat
          messages={messages}
          onSend={(mes) => onSend(mes)}
          user={{ _id: 1 }}
        />
      </ImageBackground>
    </>
  );
};

export default Chatbot;
