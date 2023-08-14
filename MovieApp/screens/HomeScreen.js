import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Cog6ToothIcon,
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";

const ios = Platform.OS == "ios";

export default function HomeScreen({ data }) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  },[]);



  //trending movies
  const getTrendingMovies = async () => {
    const data= await fetchTrendingMovies();
    //console.log('got trending movies:',data);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }

  //upcoming movies
  const getUpComingMovies = async () => {
    const data= await fetchUpcomingMovies();
    //console.log('got upcoming movies:',data);
    if(data && data.results) setUpcoming(data.results);
    setLoading(false);
  }

  //toprated movies
  const getTopRatedMovies = async () => {
    const data= await fetchTopRatedMovies();
    //console.log('got toprated movies:',data);
    if(data && data.results) setTopRated(data.results);
    setLoading(false);
  }

  return (
    <View style={style.container}>
      {/*search bar and logo */}
      <SafeAreaView style={[ios ? "marginBottom:-2" : "marginBottom:-3"]}>
        <StatusBar style="light" />
        <View style={style.header}>
          <TouchableOpacity onPress={()=> {navigation.navigate('Settings')}} style={{marginLeft:8}}>
            <Cog6ToothIcon style={{}} size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
          <Text style={style.headerText}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity style={{marginRight:8}} onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel*/}
          {trending.length>0 && <TrendingMovies data={trending} />}
          {/* upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />
          {/* top rated movies row */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: "#0a0a0a"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 7,
    marginTop: 30,
  },
  headerText:{
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 30
  }
});
