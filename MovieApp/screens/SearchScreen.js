import { View, Text,Dimensions,SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback,Image,StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import {debounce} from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';

const {width,height} = Dimensions.get('window');

export default function SearchScreen() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [results,setResults] = useState([]);
    let movieName = "Ant-Man and the Wasp : Quantumania";
    
    const handleSearch = value=>{
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query:value,
                include_adult:'false',
                language:'en-US',
                page:'1'
            }).then(data=>{
                setLoading(false);
                //console.log('got movies:',data);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch,400),[]);

    return (
    <SafeAreaView style={{backgroundColor:'#0a0a0a',flex:1,}}>
      <View style={style.Container}>
            <TextInput 
                onChangeText={handleTextDebounce}
                placeholder='Search Movie'
                placeholderTextColor={'lightgray'}
                style={style.input}
            />
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={style.inputIcon}>
                <XMarkIcon size="25" color="white"/>
            </TouchableOpacity>
      </View>
      {/* results */}

      {
        loading? (
            <Loading/>
        ): 
            results.length>0 ? (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}} style={{marginVertical:12}}>
                  <Text style={style.resultTitle}>Results ({results.length})</Text>
                  <View style={style.imageContainer}>
                      {
                          results.map((item,index) => {
                              return(
                                  <TouchableWithoutFeedback key={index} onPress={()=>{navigation.navigate('Movie',item)}}>
                                      <View style={{marginTop:8,marginBottom:12}}>
                                          <Image 
                                          style={style.imageStyle}
                                          source={{uri:image185(item?.poster_path)|| fallbackMoviePoster}}
                                          //source={require('../assets/images/moviePoster2.png')}
                                          />   
                                          <Text style={style.imageTitle}>
                                              {
                                                  item.title.length>22 ? item.title.slice(0,22)+'...':item.title
                                              }
                                          </Text>
                                      </View> 
                                  </TouchableWithoutFeedback>
                              )
                          })
                      }
                  </View>
                </ScrollView>
            ) :(
                <View style={{flexDirection:'row',justifyContent:'center',}}>
                    <Image
                        source={require('../assets/images/movieTime.png')}
                        style={{width:384,height:384}}
                    />
                </View>
            )
      }

      

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    Container:{
        marginHorizontal:16,
        marginBottom:12,
        marginTop:30,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#737373',
        borderRadius:50
    },
    input:{
        paddingBottom:4,
        paddingLeft:24,
        flex:1,
        fontSize:16,
        fontWeight:'500',
        color:'#fff',
        letterSpacing:0.8
    },
    inputIcon:{
        borderRadius:50,
        padding:12,
        margin:4,
        backgroundColor:'#737373'
    },
    resultTitle:{
        color:'#fff',
        fontWeight:'500',
        marginLeft:4
    },
    imageContainer:{
     flexDirection:'row',
     justifyContent:'space-between',
     flexWrap:'wrap'
    },
    imageStyle:{
        borderRadius:24,
        width:width*0.44,
        height:height*0.3
    },
    imageTitle:{
        color:'#d4d4d4',
        marginLeft:4
    }
})