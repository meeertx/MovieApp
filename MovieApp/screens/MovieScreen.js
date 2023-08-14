import { View, Text,Platform,Image, ScrollView, StyleSheet,TouchableOpacity,SafeAreaView,Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import {LinearGradient} from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";

var {width,height} =Dimensions.get('window');

const ios = Platform.OS == 'ios';
// const topMargin = ios ? '' : 'marginTop:25';


export default function MovieScreen() {
  let movieName = "Ant-Man and the Wasp : Quantumania";
  const { params: item } = useRoute();
  const [isFavourite,toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast,setCast] = useState([]);
  const [similarMovies,setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie,setMovie] = useState([]);

  useEffect(() => {
    //console.log('itemid:',item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  //movie details
  const getMovieDetails = async id=>{
    const data = await fetchMovieDetails(id);
    //console.log("got movie details:",data);
    if(data) setMovie(data);
    setLoading(false);
  }

  //movie casts
  const getMovieCredits = async id=>{
    const data = await fetchMovieCredits(id);
    //console.log("got movie credits:",data);
    if(data && data.cast) setCast(data.cast);
  }

  //similar movies
  const getSimilarMovies = async id=>{
    const data = await fetchSimilarMovies(id);
    //console.log("got similar movies:",data);
    if(data && data.results) setSimilarMovies(data.results);
  }


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      {/* back button and movie poster */}
      <View style={{ width: "100%",marginTop:20 }}>
        <SafeAreaView style={style.containerSafe}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={[styles.background,{padding:1,borderRadius:12,marginLeft:12}]}>
                <ChevronLeftIcon style={{right:1}} size="28" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight:12}} onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? "red":"white"}/>
            </TouchableOpacity>
        </SafeAreaView>

        {
          loading? (
            <Loading/>
          ):(
            <View>
              <Image 
              //source={require('../assets/images/moviePoster2.png')}
              source={{uri:image500(movie?.poster_path) || fallbackMoviePoster}}
              style={style.imageStyle}
              />
              <LinearGradient
                colors={['transparent','rgba(23,23,23,0.8)','#0a0a0a']}
                style={{width,height:height*0.40,position:'absolute',bottom:0}}
                start={{x:0.5,y:0}}
                end={{x:0.5,y:0.7}}
              />
            </View>
          )
        }


      </View>

      {/* movie details */}
      <View style={{marginTop:-(height*0.18)}} >
        {/*title */}
        <Text style={style.movieTitle}>
            {movie?.title}
        </Text>
        {/* status, relese, runtime*/}
        {
          movie?.id?(
            <Text style={style.movieStatus}>
              {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
            </Text>
          ):null
          
          
        }

        {/* genres*/}
        <View style={style.genresContainer}>
           {
            movie?.genres?.map((genre,index)=>{
              let showDot = index+1 !=movie.genres.length;
              return(
                <Text key={index} style={style.genresText}>
                    {genre?.name} {showDot? "·":null} 
                </Text>
              )
            })
           }
            {/* <Text  style={{color:'#7D7463',fontWeight:'500',textAlign:'center',fontSize:16,paddingHorizontal:5}}>
                Thril · 
            </Text>
            <Text  style={{color:'#7D7463',fontWeight:'500',textAlign:'center',fontSize:16}}>
                Comedy · 
            </Text>   */}
            
        </View>
        {/* description */}
        <Text style={style.movieDescription}>
            {
              movie?.overview
            }
        </Text>
      </View>
      {/* cast */}
      {cast.length>0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies */}
      {similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies}/>}

    </ScrollView>
  );
}

const style = StyleSheet.create({
  containerSafe:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 20,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  imageStyle:{
    width,
    height:height*0.70,
    marginTop:-100
  },
  movieTitle:{
    color:'#fff',
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    letterSpacing:0.8
  },
  movieStatus:{
    color:'#7D7463',
    fontWeight:'500',
    textAlign:'center',
    fontSize:16,
    marginTop:8
  },
  genresContainer:{
    flexDirection:'row',
    justifyContent:'center',
    marginHorizontal:16,
    marginLeft:8,
    marginTop:6
  },
  genresText:{
    color:'#7D7463',
    fontWeight:'500',
    textAlign:'center',
    fontSize:16,
    paddingHorizontal:5
  },
  movieDescription:{
    color:'#7D7463' ,
    fontWeight:'500',
    marginHorizontal:16,
    letterSpacing:0.4,
    marginTop:10
  }
});
