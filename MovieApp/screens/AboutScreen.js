import { View, Text,Dimensions, SafeAreaView, TouchableOpacity,Image, ScrollView,StyleSheet } from 'react-native'
import React,{useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import Loading from '../components/loading';
import { styles } from '../theme';
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import { useRoute } from '@react-navigation/native';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

var {width,height} =Dimensions.get('window');

export default function AboutScreen({navigation}) {
  const { params: item } = useRoute();
  const [loading, setLoading] = useState(false);
  
  let [fontsLoaded] = useFonts({
    'Shrikhand' : require('../assets/fonts/Bricolage_Grotesque/Shrikhand-Regular.ttf'),
    'SourceSerif4' : require('../assets/fonts/Bricolage_Grotesque/SourceSerif4-VariableFont_opsz,wght.ttf'),
    'SourceSans' : require('../assets/fonts/Source_Sans_3/SourceSans3-VariableFont_wght.ttf'),
  })
  useEffect(()=>{
    setLoading(false);
  },[item])
  return (
  
      <ScrollView  style={{backgroundColor:'#0a0a0a',flex:1}}>
        {/* buttons and image  */}
        <View>
          <SafeAreaView style={style.containerSafe}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={[styles.background,{padding:1,borderRadius:12,marginLeft:12}]}>
                <ChevronLeftIcon style={{right:1}} size="28" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
          </SafeAreaView>

          {
            loading? (
              <Loading/>
            ):(
              <View style={{position:'relative',width:'100%',height:'auto'}}>
                <Image 
                
                source={require('../assets/images/aboutimages.png')}
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
          <Text style={style.imageText}>Hi there,</Text>
                  {/* about */}
          <View style={{top:410,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#fff' ,fontSize:35,fontWeight:'bold',textAlign:'center',marginTop:10,fontFamily:'Shrikhand'}}>Let's talk about TMDB</Text>
            <Text style={{color:'#fff',fontSize:18,textAlign:'center',marginVertical:10}}>
              The Movie Database (TMDB) is a community built movie and TV database. 
              Every piece of data has been added by our amazing community dating back to 2008. 
              TMDB's strong international focus and breadth of data is largely unmatched and something we're incredibly proud of. 
              Put simply, we live and breathe community and that's precisely what makes us different.
            </Text>
        </View>

        <View style={{top:430,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#fff' ,fontSize:30,fontWeight:'bold',textAlign:'center',fontFamily:'Shrikhand'}}> The TMDB advantage </Text>

            <View style={{flexDirection:'row',marginVertical:8,width:450}}>
              <Text style={{color:'#d40242',fontSize:40,fontWeight:'bold',marginLeft:20,}}>1</Text>
              <Text style={{color:'#fff',marginLeft:15,textAlign:'left'}}>
                Every year since 2008, the number of contributions
                to our database has increased (check out our last years wrap!) With over 1,000,000 developers and companies using our platform, 
                TMDB has become a premiere source for metadata.
              </Text>
            </View>

            <View style={{flexDirection:'row',marginVertical:8,width:450}}>
              <Text style={{color:'#d40242',fontSize:40,fontWeight:'bold',marginLeft:20,}}>2</Text>
              <Text style={{color:'#fff',marginLeft:15,textAlign:'left'}}>     
                Along with extensive metadata for movies, TV shows and people, 
                we also offer one of the best selections of high resolution posters and fanart. 
                On average, over 1,000 images are added every single day.
              </Text>
            </View>

            <View style={{flexDirection:'row',marginVertical:8,width:450}}>
              <Text style={{color:'#d40242',fontSize:40,fontWeight:'bold',marginLeft:20,}}>3</Text>
              <Text style={{color:'#fff',marginLeft:15,textAlign:'left'}}>          
                We're international. While we officially support 
                39 languages we also have extensive regional data. 
                Every single day TMDB is used in over 180 countries.
              </Text>
            </View>

            <View style={{flexDirection:'row',marginVertical:8,width:450}}>
              <Text style={{color:'#d40242',fontSize:40,fontWeight:'bold',marginLeft:20,}}>4</Text>
              <Text style={{color:'#fff',marginLeft:15,textAlign:'left'}}>
                Our community is second to none. Between our staff and community moderators, we're always here to help. 
                We're passionate about making sure your experience on TMDB is nothing short of amazing.
              </Text>
            </View>

            <View style={{flexDirection:'row',width:450}}>
              <Text style={{color:'#d40242',fontSize:40,fontWeight:'bold',marginLeft:20,}}>5</Text>
              <Text style={{color:'#fff',marginLeft:15,textAlign:'left'}}>            
                Trusted platform. Every single day our service is used by millions of people while we process over 3 billion requests.
                We've proven for years that this is a service that can be trusted and relied on
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    
  )
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
  imageText:{
    fontSize:90,
    fontWeight:'400',
    color:'#fff',
    width:400,
    height:233,
    zIndex:-1,
    position:'absolute',
    top:120,
    left:0,
    fontFamily:'Shrikhand'
  },
  imageStyle:{
    width:width*1.8,
    height:height*0.35,
    marginTop:-100,
    zIndex:1,
    position:'absolute',
    left:0,
    top:200, 
  },
  
})