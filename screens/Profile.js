import React, { useState, useEffect } from "react";
import styles from "../assets/styles";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import Dialog from "react-native-dialog";


import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,

} from "react-native";
import ProfileItem from "../components/profile/ProfileItem";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";


const Profile = () => {
  const navigation = useNavigation();

  const uid = firebase.auth().currentUser.uid;

  const [people, setPeople] = useState("null");
  const [posts, setPosts] = useState([]);
  const [linkimage, setlinkimage] = useState("null");
  const [visible, setvisible] = useState(false);
  const [iddelete, setiddelete] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [itemshow, setitemshow] = useState();






  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("key", "==", uid)
      .get()
      .then((querySnapshot) => {
        const allpost = [];
        querySnapshot.forEach((doc) => {
          const { key ,randomid ,nameitem, description, linkimg, price, postTime } =
            doc.data();
          allpost.push({
            key,
            postid: doc.id,
            nameitem,
            description,
            linkimg,
            price,
            postTime: postTime,
            randomid,
          });
        });
        setPosts(allpost);
      });
  }, []);

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
    setlinkimage(people.linkimg);

  }, [people]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Signin");
      })
      .catch((error) => alert(error.message));
  };

  const settingprofile = () => {
    navigation.replace("Editprofile");
  };

  const Addpost = () => {
    navigation.replace("Addpost");
  };

  const onrefresh = () => {
    setRefreshing(true)

    firebase
      .firestore()
      .collection("posts")
      .where("key", "==", uid)
      .get()
      .then((querySnapshot) => {
        const allpost = [];
        querySnapshot.forEach((doc) => {
          const { key ,randomid ,nameitem, description, linkimg, price, postTime } =
            doc.data();
          allpost.push({
            key,
            postid: doc.id,
            nameitem,
            description,
            linkimg,
            price,
            postTime: postTime,
            randomid,
          });
        });
        setPosts(allpost);
      })
    

    setTimeout(() => {
      setRefreshing(false)
    }, 2000);;

    
  }

  const Item = ({ nameitem, linkitem, price, des }) => (
   
    <View
      style={{
        marginTop: 180,
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={{ uri: linkitem }}
        style={styles.bgitem}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.containerItem}>
          <View style={styles.matchesProfileItem}>
            <Ionicons name="cash-outline" color="red">
              <Text style={styles.matchesTextProfileItem}>    {price} VND</Text>
            </Ionicons>
          </View>

          <Text style={styles.name}>{nameitem}</Text>

          <View style={styles.info}>
            <Text style={styles.infoContent}>{des}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item 
      nameitem={item.nameitem}
      linkitem={item.linkimg}
      price={item.price}
      des={item.description}
    />
  );

  const Closedialog = () => {
    setvisible(false);
    
  };
  
  const Deletepost = async () => {

    await firebase.firestore().collection("posts").doc(iddelete).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
    setvisible(false);
    
  };
  

  return (
    <>
    
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <FlatList
       refreshControl={
        <RefreshControl
        refreshing={refreshing}
          onRefresh={onrefresh}
        />}
        data={posts}
        renderItem={({ item }) => (
          <>
          <TouchableOpacity
          onPress={ () => {
            setvisible(true)
            setiddelete(item.postid)
            setitemshow(item)
            console.log(item);
          }}>
            <Item
              nameitem={item.nameitem}
              linkitem={item.linkimg}
              price={item.price}
              des={item.description}
            />
          </TouchableOpacity>
          </>
        )}
        keyExtractor={(item) => item.postid}
        ListHeaderComponent={() => (
          <View>
            <ImageBackground
              source={{
                uri: linkimage,
              }}
              style={styles.photo}
            >
              <View style={styles.top}>
                <TouchableOpacity>
                  <Ionicons name="arrow-back" style={styles.topIconLeft}>
                    {" "}
                  </Ionicons>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignOut}>
                  <Ionicons
                    name="log-out-outline"
                    style={styles.topIconRight}
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <ProfileItem name={people.name} age={people.age} />
            <View style={styles.actionsProfile}>
              <TouchableOpacity onPress={Addpost} style={styles.circledButton}>
                <Ionicons
                  style={styles.iconButton}
                  name="add-outline"
                ></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={settingprofile}
                style={styles.roundedButton}
              >
                <Ionicons
                  style={styles.iconButton}
                  name="person-circle-outline"
                >
                  <Text style={styles.textButton}>Setting Profile</Text>
                </Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
    </ImageBackground>
    <Dialog.Container visible={visible} contentStyle={{ borderWidth:1, borderRadius:20, borderColor: "#2213BC" }}>
            <Dialog.Title style={{alignSelf: "center"}}>Item information</Dialog.Title>
            <Dialog.Description style={{alignSelf: "center"}}>Name: {itemshow?.nameitem}</Dialog.Description>
            <Dialog.Description style={{alignSelf: "center", color: "red"}}>Price: {itemshow?.price}</Dialog.Description>

            
            <View>
            <Image
                  source={{ uri: itemshow?.linkimg }}
                  style={{ height: 220, width: 200, alignSelf: "center",borderWidth:1, borderRadius:20  }}
                  imageStyle={{ borderRadius: 15 }}
                ></Image>
                <Text>{}</Text>
              <Text style={{alignSelf: "center"}}>Description: {itemshow?.description} </Text>
              <Text style={{alignSelf: "center"}}>Time: {itemshow?.postTime}</Text>

              <Text>{}</Text>
            </View>
            <Dialog.Button label="Delete post" onPress={Deletepost} />
            <Dialog.Button label="Cancel" onPress={Closedialog} />
          </Dialog.Container>
    </>
  );
};

export default Profile;
