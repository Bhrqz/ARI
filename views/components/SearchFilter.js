import React from 'react';
import { useEffect, useState } from 'react';
import {View, StyleSheet, Text, FlatList, TextInput} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, setDoc, getDoc, query, where } from "firebase/firestore";
import { db } from './config';
import { Button } from '@rneui/base';





const SearchFilter = ({data={}, input, setInput}) => {

    
    const [name, setName] = useState("")
    
    const namesRef = collection(db,"Membresía")



    return (
        <View>
        <TextInput
            styles={styles.input}
            placeholder='nombre'
            onChangeText={()=>{setName(value)}}
            value='name'
        >

        </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SearchFilter;
