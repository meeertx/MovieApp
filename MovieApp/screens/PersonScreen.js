import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const android = Platform.OS === "android";
const verticalMargin = android ? "" : "marginVertical:12";

export default function PersonScreen() {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [personMovies, setPersonMovies] = useState([]);
  const [person,setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // console.log('person',item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  },[item])

  //person details 
  const getPersonDetails = async id=>{
    const data = await fetchPersonDetails(id);
    // console.log('got person detail:',data);
    if(data) setPerson(data);
    setLoading(false);
  }

  //person movies
  const getPersonMovies = async id=>{
    const data = await fetchPersonMovies(id);
    // console.log('got person detail:',data);
    if(data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0a0a0a" }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/*back button */}
      <SafeAreaView
        style={[verticalMargin,style.buttonStyle]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.background, { padding: 1, borderRadius: 12,marginLeft:12 }]}
        >
          <ChevronLeftIcon style={{right:1}} size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginRight:12}} onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* person details */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={ style.imageContainer }>
                <Image
                  //source={require("../assets/images/castImage2.png")}
                  source={{uri:image342(person?.profile_path) || fallbackPersonImage}}
                  style={style.imageStyle}
                />
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={style.personName}>
                {person?.name}
              </Text>
              <Text style={style.birth_place}>
                {person?.place_of_birth}
              </Text>
            </View>

            <View style={style.personInfo_container}>
              <View style={style.personInfo_detail}>
                <Text style={style.personTitle1}>
                  Gender
                </Text>
                <Text style={style.personTitle2}>
                  {person?.gender==1?'Female':'Male'}
                </Text>
              </View>
              <View style={style.personInfo_detail}>
                <Text style={style.personTitle1}>
                  Birthday
                </Text>
                <Text style={style.personTitle2}>
                  {person?.birthday}
                </Text>
              </View>
              <View style={style.personInfo_detail}>
                <Text style={style.personTitle1}>
                  Known for
                </Text>
                <Text style={style.personTitle2}>
                  {person?.known_for_department}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
                <Text style={style.personTitle1}>
                  Popularity
                </Text>
                <Text style={style.personTitle2}>
                  {person?.popularity?.toFixed(2)} %
                </Text>
              </View>
            </View>
          </View>
          <View style={style.biographyContainer}>
            <Text style={style.biographyTitle1}>Biography</Text>
            <Text style={style.biographyTitle2}>
              {person?.biography || 'N/A'}
            </Text>
          </View>
          {/*movies */}
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}



const style = StyleSheet.create({
  buttonStyle:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 20,
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 25,
  },
  imageContainer:{
    shadowColor: "gray",
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    alignItems: "center",
    borderRadius: Platform.OS === 'android' ? 135 : 135.5, 
    width: Platform.OS === 'android' ? 270 : 271,
    height: Platform.OS === 'android' ? 270 : 271,
    borderWidth: 2,
    borderColor: "#7D7463",
  },
  imageStyle:{
    height: Platform.OS ==='android'? height * 0.43 : height * 0.30,
    width: Platform.OS ==='android'? width * 0.74 : width * 0.635,
    borderRadius: Platform.OS === 'android' ? 135 : 270,
  },
  personName:{
    fontSize: 24, 
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  birth_place:{
    fontSize: 12, 
    color: "#a3a3a3", 
    textAlign: "center" 
  },
  personInfo_container:{
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#404040",
    borderRadius: 24,
  },
  personInfo_detail:{
    borderRightWidth: 2,
    borderRightColor: "#a3a3a3",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  personTitle1:{
    color: "white", 
    fontWeight: "500"
  },
  personTitle2:{
    color: "#d4d4d4", 
    textAlign: "center"
  },
  biographyContainer:{
    marginVertical: 24,
    marginHorizontal: 16, 
    marginTop: 8
  },
  biographyTitle1:{
    color: "#fff", 
    fontSize: 18
  },
  biographyTitle2:{
    color: "#a3a3a3", 
    fontSize: 18, 
    letterSpacing: 0.4
  }
})
