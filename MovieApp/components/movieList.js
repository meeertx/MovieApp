import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieList({ data, title, hideSeeAll }) {
  let movieName = "Ant-Man and the Wasp : Quantumania";
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 8, marginTop: 16 }}>
      <View style={{marginHorizontal: 8,flexDirection: "row",justifyContent: "space-between",alignItems: "center",}}>
        <Text style={{ color: "#fff", fontSize: 20 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[styles.text, { fontSize: 16 }]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View style={{ marginTop: 4, marginRight: 4 }}>
                <Image
                  //source={require("../assets/images/moviePoster2.png")}
                  source={{uri:image185(item.poster_path) || fallbackMoviePoster}}
                  style={style.imageStyle}
                />
                <Text style={{ color: "#D8D9DA", marginLeft: 1 }}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}


const style = StyleSheet.create({
  imageStyle:{
    borderRadius: 24,
    width: width * 0.33,
    height: height * 0.22,
  }
})