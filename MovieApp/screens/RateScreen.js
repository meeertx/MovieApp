import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
// import all the components we are going to use
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

const GOOGLE_PACKAGE_NAME = "agrawal.trial.yourfeedback";
const APPLE_STORE_ID = "id284882215";

const RateScreen = ({ navigation }) => {
  // Data Source for the SearchableDropdown
  const [count, setCount] = useState(5);
  const [isIntervalRunnig, setIsIntervalRunnig] = useState(false);

  useEffect(() => {
    startRatingCounter();
  }, []);

  const startRatingCounter = () => {
    //Initialize count by 5 to start counter for 5 sec
    setCount(5);
    tempcount = 5;
    if (!isIntervalRunnig) {
      setIsIntervalRunnig(true);
      let t = setInterval(() => {
        tempcount = tempcount - 1;
        console.log(tempcount);
        setCount(tempcount);
        if (tempcount == 0) {
          clearInterval(t);
          setIsIntervalRunnig(false);
          //After 5 second ask for the rate this app
          Alert.alert(
            "Rate us",
            "Would you like to share your review with us?This will help and motivate us a lot.",
            [
              { text: "Sure", onPress: () => openStore() },
              {
                text: "No Thanks!",
                onPress: () => console.log("No Thanks Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }
      }, 1000);
    }
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != "ios") {
      Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(
        (err) => alert("Please check for Google Play Store")
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
      ).catch((err) => alert("Please check for the App Store"));
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
          <View style={{right:120,top:8}} >
            <TouchableOpacity onPress={()=> navigation.goBack()} style={[styles.background,{padding:1,borderRadius:12,marginLeft:12}]}>
                  <ChevronLeftIcon style={{right:1}} size="30" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
          </View>
          <Text style={style.header_title}>Rate Us</Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon
            name="chevron-left"
            size={24}
            style={{ position: "absolute", bottom: 13, left: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <Text style={style.titleText}>
          Example to add rate this app feature in React Native
        </Text>
        {isIntervalRunnig ? (
          <Text style={style.textStyle}>
            Rate this App alert will be in {count} second
          </Text>
        ) : null}
        {isIntervalRunnig ? null : (
          <TouchableOpacity
            onPress={startRatingCounter}
            activeOpacity={0.6}
            style={style.buttonStyle}
          >
            <Text style={style.buttonTextStyle}>Restart Rating Counter</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RateScreen;

const style = StyleSheet.create({
  header: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:'row'
  },
  header_title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 20,
    right:30,
  },
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  titleText: {
    color:'#fff',
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    color:'#fff',
    fontSize: 15,
    fontWeight:'bold',
    marginTop: 30,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "lightgray",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    marginTop:20
  },
  buttonTextStyle: {
    textAlign:'center',
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#d40242',
  },
});
