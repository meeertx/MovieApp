import { View, Text,TouchableOpacity,ScrollView,Image,StyleSheet } from 'react-native'
import React from 'react'
import { fallbackMoviePoster, fallbackPersonImage, image185 } from '../api/moviedb';


export default function Cast({cast,navigation}) {
    let personName = 'Keanu Reeves';
    let characterName = 'John Wick';
  return (
    <View style={{marginVertical:24}}>
      <Text style={{color:'#fff',fontSize:16,marginHorizontal:16,marginBottom:20}}>Top Cast</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            cast && cast.map((person,index) => {
                return(
                    <TouchableOpacity
                        key={index}
                        style={{marginRight:16,alignItems:'center'}}
                        onPress={()=>navigation.navigate('Person',person)}
                    >
                        <Image
                            style={style.imageStyle}
                            source={{uri:image185(person?.profile_path)|| fallbackPersonImage}}
                            //source={require('../assets/images/castImage1.png')}
                        />
                        <Text style={{color:'#fff',marginTop:4,fontSize:12}}>
                            {
                                person?.character.length>10 ? person?.character.slice(0,10)+'...' : person?.character
                            }
                        </Text>
                        <Text style={{color:'#7D7463',marginTop:4,fontSize:12}}>
                            {
                                person?.original_name.length>10 ? person?.original_name.slice(0,10)+'...' : person?.original_name
                            }
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
    imageStyle:{
        borderRadius:32,
        width:64,
        height:64,
        borderColor:'#7D7463',
        borderWidth:2
    }
})