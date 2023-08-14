import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, TextInput, ScrollView,Keyboard } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeftIcon,PhoneIcon,ChevronRightIcon,XMarkIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';

export default function ContactScreen({navigation}) {
    const [email,setEmail] = useState('');
    const [subject,setSubject] = useState('');
    const [emailContent,setEmailContent] = useState('');

    const SendMessage = () => {
        if( !email == '' && !subject== '' && !emailContent == ''){
            alert('Your message is sent!');
        }
        else{
            alert('Please do not leave a blank space!!');
        }
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#0a0a0a"}}>
        <View style={style.headerContainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={[styles.background,{padding:1,borderRadius:12,marginLeft:12}]}>
                <ChevronLeftIcon style={{right:1}} size="30" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
            <Text style={style.headerTitle}>Contact Us</Text>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={{padding:1,borderRadius:12,marginLeft:12}}>
                <PhoneIcon size="30" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={{marginVertical:20}}>
                <Text style={style.inputText}>Contact Email</Text>  
                <TextInput value={email} onChangeText={(email) => setEmail(email)} style={style.input1} />
            </View>
            <View style={{marginVertical:20}}>
             <Text style={style.inputText}>Subject</Text>   
             <TextInput onChangeText={(subject) => setSubject(subject)} style={style.input1}/>
            </View>
            <View style={{marginVertical:20}}>
             <Text style={style.inputText}>Email Content</Text>   
             <TextInput onChangeText={(emailContent) => setEmailContent(emailContent)} style={style.input2} />
            </View>
        </ScrollView>
        <View style={{bottom:'30%'}}>
            <TouchableOpacity onPress={() => SendMessage()} style={style.sendButton}>
                <Text style={style.sendText}>SEND</Text>
                <ChevronRightIcon size="25" strokeWidth={3.5} color="#d40242"/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    headerContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 7,
        marginTop: 30,
    },
    headerTitle:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
    },
    inputIcon:{
        borderRadius:30,
        padding:12,
        margin:4,
        backgroundColor:'#737373',
        width:30,
        height:30,
        position:'absolute',
        right:15,
        alignItems:'center',
        justifyContent:'center'
    },
    input1:{
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:5,
        height:50,
        marginHorizontal:5,
        color:'#fff',
        paddingHorizontal:8,
    },
    input2:{
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:5,
        height:100,
        marginHorizontal:5,
        color:'#fff',
        paddingHorizontal:8,
        alignItems:'flex-start',
    },
    inputText:{
        fontSize:20,
        color:'#fff',
        paddingHorizontal:5,
        marginBottom:10,
        fontWeight:'bold'
    },
    sendButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
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
        marginTop:20,
        width:150,
        height:50,
        marginLeft:15
        
    },
    sendText:{
        textAlign:'center',
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#d40242',
        top:2.5
    },

})