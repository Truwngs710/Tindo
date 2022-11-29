import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./SigninScreens/LoginScreen";
import Homepage from "./Homepage";
import Editpf from "./function/EditProfile";
import Addpost from "./function/addPost";
import Chatbox from "./function/Chatbox";

/*
#################################################################
#                             _`			        #   Ngọc Thương   #
#                          _ooOoo_			                        #
#                         o8888888o			                      	#
#                         88" . "88			                      	#
#                         (| -_- |)			                      	#
#                         O\  =  /O			                       	#
#                      ____/`---'\____		                  		#
#                    .'  \\|     |//  `.		                   	#
#                   /  \\|||  :  |||//  \		                  	#
#                  /  _||||| -:- |||||_  \		                 	#
#                  |   | \\\  -  /'| |   |		                 	#
#                  | \_|  `\`---'//  |_/ |		                	#
#                  \  .-\__ `-. -'__/-.  /		                	#
#                ___`. .'  /--.--\  `. .'___	               		#
#             ."" '<  `.___\_<|>_/___.' _> \"".		            	#
#            | | :  `- \`. ;`. _/; .'/ /  .' ; |	            	#
#            \  \ `-.   \_\_`. _.'_/_/  -' _.' /	            	#
#=============`-.`___`-.__\ \___  /__.-'_.'_.-'=================#
                           `=--=-'                    



          _.-/`)
         // / / )
      .=// / / / )
     //`/ / / / /
    // /     ` /
   ||         /
    \\       /
     ))    .'
    //    /
         / */
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Homepage}
        />

        <Stack.Screen name="Editprofile" component={Editpf} />
        <Stack.Screen name="Addpost" component={Addpost} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Chatbox"
          component={Chatbox}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
