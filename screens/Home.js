import React, { useState, useEffect } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import City from "../components/home/City";
import Filters from "../components/home/Filters";
import CardItem from "../components/home/CardItem";
import styles from "../assets/styles";
import * as firebase from "firebase";

const HomeCard = () => {
  const uid = firebase.auth().currentUser.uid;

  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState("null");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        setPeople(documentSnapshot.data());
      });
  }, []);

  useEffect(() => {
    setPeople(people);
  }, [people]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("key", "!=", uid)
      .get()
      .then((querySnapshot) => {
        let allpost = [];
        querySnapshot.forEach((doc) => {
          const {
            key,
            nameitem,
            description,
            linkimg,
            price,
            postTime,
            randomid, // get data for swiper
            username,
            avt,
          } = doc.data();
          const id = doc.data()[uid];
          allpost.push({
            doc: doc.id,
            key,
            nameitem,
            description,
            linkimg,
            price,
            postTime: postTime,
            randomid,
            uid: id,
            username,
            avt,
          });
        });
        allpost = allpost.filter((p) => p.uid != true);
        setPosts(allpost);
        console.log(posts);
      });
  }, []);
  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
   

        <CardStack
          verticalSwipe={false}
          ref={(swiper) => (this.swiper = swiper)}
          renderNoMoreCards={() => null}
        >
          {posts.map((item, randomid) => (
            <Card
              key={randomid}
              onSwipedLeft={() => {
                firebase
                  .firestore()
                  .collection("posts")
                  .doc(item.doc) //add uid = true in post, don't show anymore
                  .update({
                    [uid]: true,
                  });
                firebase
                  .firestore()
                  .collection("users")
                  .doc(uid) //swip letf,  uid (matched= true)
                  .collection("Matched")
                  .doc(item.key)
                  .set({
                    match: true,
                  });
                firebase
                  .firestore()
                  .collection("users")
                  .doc(item.key) // if 2nd user have uid(matched=true)
                  .collection("Matched")
                  .doc(uid)
                  .get()
                  .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                      console.log(documentSnapshot.data());
                      firebase
                        .firestore()
                        .collection("users")
                        .doc(uid)
                        .collection("Notification") // add notification to 1st user
                        .doc(item.key)
                        .set({
                          avt: item.avt,
                          username: item.username,
                          noti_time: new Date().toLocaleString(),
                        });

                      firebase
                        .firestore()
                        .collection("users")
                        .doc(item.key)
                        .collection("Notification") // add notification to 2nd user
                        .doc(uid)
                        .set({
                          avt: people.linkimg,
                          username: people.name,
                          noti_time: new Date().toLocaleString(),
                        });
                    }
                  });
              }}
              onSwipedRight={() => {
                firebase
                  .firestore()
                  .collection("posts") //add uid = true in post, don't show anymore
                  .doc(item.doc)
                  .update({
                    [uid]: true,
                  });
                firebase
                  .firestore()
                  .collection("users")
                  .doc(uid)
                  .collection("Unmatch") //swip right,  uid(Unmatch= true)
                  .doc(item.randomid)
                  .set({
                    match: false,
                  });
              }}
            >
              <CardItem
                image={item.linkimg}
                nameitem={item.nameitem}
                description={item.description}
                price={item.price}
                actions
                onPressLeft={() => {
                  this.swiper.swipeLeft();
                  firebase
                    .firestore()
                    .collection("posts")
                    .doc(item.doc) //add uid = true in post, don't show anymore
                    .update({
                      [uid]: true,
                    });
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(uid) //swip letf,  uid (matched= true)
                    .collection("Matched")
                    .doc(item.key)
                    .set({
                      match: true,
                    });
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(item.key)
                    .collection("Matched")
                    .doc(uid)
                    .get()
                    .then((documentSnapshot) => {
                      if (documentSnapshot.exists) {
                        console.log(documentSnapshot.data());
                        //mình sẽ add dữ liệu vào thông báo là có match
                      }
                    });
                }}
                onPressRight={() => {
                  this.swiper.swipeRight();
                  firebase
                    .firestore()
                    .collection("posts")
                    .doc(item.doc) //add uid = true in post, don't show anymore
                    .update({
                      [uid]: true,
                    });
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(uid)
                    .collection("Unmatch")
                    .doc(item.randomid)
                    .set({
                      match: false,
                    });
                }}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;
