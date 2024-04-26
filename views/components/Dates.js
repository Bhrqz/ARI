import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import styles from './styles';



const Dates = (date) =>{
    a = date.toDate()
    const day = a.getDate();
    const month = a.getMonth()+1;
    const year = a.getFullYear()
    
    return(
        <Text style={styles.paragraph}> {day}/{month}/{year}</Text>
        )
  }

  export default Dates