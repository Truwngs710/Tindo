import { StyleSheet, Dimensions } from "react-native";

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";
const ITEMCOLOR = "#DCDCDC";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  // COMPONENT - CARD ITEM
  containerCardItem: {
    borderWidth:2,
    borderColor:"#2213BC",
    backgroundColor: WHITE,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    color: WHITE,
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: "center",
  },
  status: {
    paddingBottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  statusText: {
    color: GRAY,
    fontSize: 12,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  miniButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  star: {
    fontSize: 28,
    color: STAR_ACTIONS,
  },
  like: {
    fontSize: 28,
    color: LIKE_ACTIONS,
  },
  dislike: {
    fontSize: 35,
    color: DISLIKE_ACTIONS,
  },
  flash: {
    fontSize: 26,
    color: FLASH_ACTIONS,
  },

  // COMPONENT - CITY
  city: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  cityText: {
    color: DARK_GRAY,
    fontSize: 13,
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 70,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  filtersText: {
    color: DARK_GRAY,
    fontSize: 13,
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5,
  },

  // COMPONENT - PROFILE ITEM
  containerProfileItem: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -20,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },

  containerItem: {
    borderWidth:1,
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingBottom: 25,
    borderRadius: 8,
    marginTop: -110,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    
    width: 200,
    marginTop: 0,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    alignSelf: "center",
    color: WHITE,
  },
  name: {
    paddingTop: 0,
    paddingBottom: 5,
    color: DARK_GRAY,
    fontSize: 18,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontSize: 12,
    color: DARK_GRAY,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: GRAY,
    fontSize: 13,
  },

  // CONTAINER - GENERAL
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
  },
  bgitem: {
    flex: 1,
    resizeMode: "cover",
    width: 300,
    height: 400,
  },
  top: {
    paddingTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },
  icon: {
    fontSize: 20,
    color: DARK_GRAY,
    paddingRight: 10,
  },

  // CONTAINER - HOME
  containerHome: { marginHorizontal: 10 },

  // CONTAINER - MATCHES
  containerMatches: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
  },
  topIconLeft: {
    borderWidth:1,
    borderColor:WHITE,

    backgroundColor: "#000000",
    fontSize: 29,
    color: WHITE,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: -20,
    borderRadius: 10,
  },
  back: {
    backgroundColor: "#000000",
    fontSize: 29,
    color: BLACK,
    paddingLeft: 0,
    marginTop: -20,
    borderRadius: 10,
  },
  topIconRight: {
    borderWidth:1,
    borderColor:WHITE,
    backgroundColor: "#000000",
    fontSize: 28,
    color: WHITE,
    marginTop: -20,
    paddingLeft: 15,
    paddingRight: 0,
    borderRadius: 10,
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: { fontSize: 20, color: WHITE },
  textButton: {
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    borderWidth:1,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    borderWidth:1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButton: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabButtonText: {
    textTransform: "uppercase",
  },
  iconMenu: {
    height: 20,
    paddingBottom: 7,
  },
  container: {
    
    width: "80%",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    paddingTop: 0,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  submitbutton: {
    borderColor: "#2213BC",
    borderWidth: 1,
    marginLeft: 80,
    padding: 13,
    borderRadius: 13,
    backgroundColor: "#00B2EE",
    marginVertical: 7,
  },
  takepic: {
    borderWidth:1,
    borderColor: "#2213BC",
    marginLeft: 50,
    marginBottom: 1,
    padding: 10,
    borderRadius: 13,
    backgroundColor: "#00B2EE",
    marginVertical: 5,
  },
  checkdata: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 1,
    padding: 10,
    borderRadius: 13,
    backgroundColor: "#00B2EE",
    marginVertical: 5,
  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#8DEEEE",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  submitbuttonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#333333",
    
    borderWidth: 1,
    borderColor:"#2213BC",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    
  },
});
