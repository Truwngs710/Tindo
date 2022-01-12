import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeCard from "./screens/Home";
import Messenges from "./screens/Messenges";
import { Ionicons } from "@expo/vector-icons";
import Profile from "./screens/Profile";
import Market from "./screens/Market";
import Notification from "./screens/Notification";

const Tab = createBottomTabNavigator();

export default function Homepage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Lobby") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Messenges") {
            return (
              <Ionicons
                name={focused ? "chatbox-ellipses-outline" : "chatbox-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Notification") {
            return (
              <Ionicons
                name={
                  focused
                    ? "notifications-circle"
                    : "notifications-circle-outline"
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Market") {
            return (
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Lobby" component={HomeCard} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Messenges" component={Messenges} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
