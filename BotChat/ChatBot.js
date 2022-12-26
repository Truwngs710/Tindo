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

  const handelGGRes = (result) => {
   let messend = result.queryResult.fulfillmentMessages[0].text.text[0];
    return messend;

  }

  const onSend = useCallback((messages = []) => {
   console.log(messages[0].text);
   let messend = messages[0].text;
   Dialogflow_V2.requestQuery(messend,(result) => handelGGRes(result,messages), {})
   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

   console.log(messages);
  }, []);
 
  const onQuickReply = useCallback((messages = []) => {
    console.log(messages[0].text);
    let messend = messages[0].text;
    let messendback = {
      _id: messages._id,
      text: messend,
      createdAt: new Date(),
      user: Bot
    }
    // Dialogflow_V2.requestQuery(messend,(result) => handelGGRes(result,messages), {})
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messendback))

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
          onQuickReply={onQuickReply}
        />
      </ImageBackground>
    </>
  );
};

export default Chatbot;
