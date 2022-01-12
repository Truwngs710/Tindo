import React, { useState, useEffect } from "react";
import styles from "../assets/styles";
import * as firebase from "firebase";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/core";


import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import Marketitem from "../components/market/Marketitem";

const Market = () => {
  const [iteminf, setiteminf] = useState();
  const [visibleitem, setvisibleitem] = useState(false);
  const [posts, setPosts] = useState([]);
  const [myinfor, setmyinfor] = useState();
  const [theminfor, settheminfor] = useState();
  const [uidthem, setuidthem] = useState();
  const [refreshing, setRefreshing] = useState(false);


  
  const uid = firebase.auth().currentUser.uid;
  const navigation = useNavigation();
  const db = firebase.firestore();

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


  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("key", "!=", uid)
      .get()
      .then((querySnapshot) => {
        const allpost = [];
        querySnapshot.forEach((doc) => {
          const { key, nameitem, description, linkimg, price, postTime, randomid } =
            doc.data();
          allpost.push({
            iddoc: doc.id,
            key,
            nameitem,
            description,
            linkimg,
            price,
            postTime,
            randomid,
          });
        });

        setPosts(allpost);
      });
  }, []);

  useEffect(() => {
  setPosts(posts);
}, [posts]);
const Closedialog = () => {
    setvisibleitem(false);
    
  };

  const onrefresh = () => {
    setRefreshing(true)
    firebase
      .firestore()
      .collection("posts")
      .where("key", "!=", uid)
      .get()
      .then((querySnapshot) => {
        const allpost = [];
        querySnapshot.forEach((doc) => {
          const { key, nameitem, description, linkimg, price, postTime, randomid } =
            doc.data();
          allpost.push({
            iddoc: doc.id,
            key,
            nameitem,
            description,
            linkimg,
            price,
            postTime,
            randomid,
          });
        });

        setPosts(allpost);
      })
    

    setTimeout(() => {
      setRefreshing(false)
    }, 2000);;

    
  }

  const Movetomes = () => {
    firebase.firestore()
                  .collection("users").doc(uid)
                  .collection("Messenger")
                  .doc(uidthem)
                  .set({
                    themuid: uidthem,
                    themavt: theminfor.linkimg,
                    themname: theminfor.name, 
                  })
      firebase.firestore()
                  .collection("users").doc(uidthem)
                  .collection("Messenger")
                  .doc(uid)
                  .set({
                    themuid: uid,
                    themavt: myinfor.linkimg,
                    themname: myinfor.name, 
                  })

    setvisibleitem(false);
    navigation.navigate("Messenges");
    

    
    ;      //asdasdsdgd
  };
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View>
        <SafeAreaView
        >
          <FlatList
             refreshControl={
              <RefreshControl
              refreshing={refreshing}
                onRefresh={onrefresh}
              />}
            numColumns={1}
            data={posts}
            keyExtractor={(item) => item.randomid}
           
            renderItem={({ item }) => (
              <TouchableOpacity
              style= {{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 15
              }}
              // xử lý card item trong market
              onPress={ async () => {
                 await setiteminf(item);
                 setuidthem(item.key)
                firebase.firestore().collection("users").doc(item.key).get()
                .then((documentSnapshot) => {
                  settheminfor(documentSnapshot.data());
                });
                setvisibleitem(true);
                console.log(item);
                
              }}>
              <Marketitem
                
                imageitem={item.linkimg}
                nameitem={item.nameitem}
                status={item.description}
                matches={item.price}
                variant
              />
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dialog.Container visible={visibleitem} contentStyle={{ borderWidth:1, borderRadius:20, borderColor: "#2213BC" }}>
            <Dialog.Title style={{alignSelf: "center"}}>Item information</Dialog.Title>
            <Dialog.Description style={{alignSelf: "center"}}>Name: {iteminf?.nameitem}</Dialog.Description>
            <Dialog.Description style={{alignSelf: "center", color: "red"}}>Price: {iteminf?.price}</Dialog.Description>
            
            <View >
            <Image
                  source={{ uri:iteminf?.linkimg}}
                  style={{ height: 220, width: 200, alignSelf: "center",borderWidth:1, borderRadius:20  }}
                  imageStyle={{
                    borderRadius: 15 }}
                ></Image>
                <Text>{}</Text>
              <Text style={{alignSelf: "center"}}>Description: {iteminf?.description}</Text>
              <Text style={{alignSelf: "center"}}>Time: {iteminf?.postTime}</Text>

              <Text>{}</Text>
            </View>
            <Dialog.Button label="Inbox to the seller"  onPress={Movetomes}    />
            <Dialog.Button label="Cancel" onPress={Closedialog} />



          </Dialog.Container>
        
        
        </View>
      </View>
    </ImageBackground>
  );
};

export default Market;
