import { View, Text,Dimensions,StyleSheet } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';


const {width,height} = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={style.loadingIcon}>
        <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>
    </View>
  )
}

const style = StyleSheet.create({
  loadingIcon:{
    width,
    height,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
})