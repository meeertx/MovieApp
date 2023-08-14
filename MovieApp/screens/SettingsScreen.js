import { View, Text, SafeAreaView, TouchableOpacity,Image, Dimensions,Linking } from 'react-native'
import React from 'react';
import { StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import { styles } from '../theme';

var {width,height} =Dimensions.get('window');

export default function SettingsScreen({navigation}) {

  return (
    <SafeAreaView style={{backgroundColor:'#0a0a0a',flex:1}}>
        <View style={style.headerIcon}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={[styles.background,{padding:1,borderRadius:12,marginLeft:7}]}>
                <ChevronLeftIcon style={{right:1}} size="28" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
        </View>
     <View>
        <Image
            style={{width,height:height*0.35, marginTop:10}}
            source={require('../assets/icons/tmdb-logo.png')}
        />
        <LinearGradient
         colors={['transparent','rgba(23,23,23,0.9)','#0a0a0a']}
         style={{width:'100%',height:250,position:'absolute',bottom:0}}
         start={{x:0.5,y:0}}
         end={{x:0.4,y:1.4}}
        />
     </View>
     <TouchableOpacity style={style.button1} onPress={() => navigation.navigate('About')}>
        <Text style={style.buttonText}>ABOUT US</Text>
     </TouchableOpacity>
     <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Rate')}>
        <Text style={style.buttonText}>RATE US</Text>
     </TouchableOpacity>
     <TouchableOpacity style={style.button2} onPress={() => navigation.navigate('Contact')}>
        <Text style={style.buttonText}>CONTACT TMDB</Text>
     </TouchableOpacity>
     <View style={{flexDirection:'row',marginHorizontal:55,marginTop:20,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity style={style.icon1} onPress={()=>{Linking.openURL('https://ca.linkedin.com/company/themoviedb.org')}}>
            <Image style={{width:50,height:50}} source={require('../assets/icons/linkedin-logo.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.icon2} onPress={()=>{Linking.openURL('https://twitter.com/themoviedb')}}>
            <Image style={{width:50,height:50}} source={require('../assets/icons/twitter_logo.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.icon3} onPress={()=>{Linking.openURL('https://www.facebook.com/themoviedb/')}}>
          <Image style={{width:50,height:50}} source={require('../assets/icons/facebook-logo.png')}/>
        </TouchableOpacity>
     </View>
    </SafeAreaView>
  )
};

const style = StyleSheet.create({
    headerIcon:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 20,
        alignItems: "center",
        paddingHorizontal: 8,
        marginVertical:10
    },
    button1:{
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
        marginTop:80
    },
    button2:{
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
    buttonText:{
        textAlign:'center',
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#d40242',
    },
    icon1:{
     shadowColor: "lightgray",
     shadowOffset: {
         width: 0,
         height: 7,
     },
     shadowOpacity: 0.41,
     shadowRadius: 9.11,
     elevation: 14,
     marginHorizontal:20,
     width:50,
     height:50
    },
    icon2:{
        shadowColor: "lightgray",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        marginHorizontal:20,
        width:50,
        height:50
    },
    icon3:{
     shadowColor: "lightgray",
     shadowOffset: {
         width: 0,
         height: 7,
     },
     shadowOpacity: 0.41,
     shadowRadius: 9.11,
     elevation: 14,
     marginHorizontal:20,     
     width:50,
     height:50
    }

})