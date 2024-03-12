import React from 'react';
import { useEffect, useState } from 'react';
import {View, StyleSheet, Text, FlatList, TextInput} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc } from "firebase/firestore";
import { db } from './config';
import { Button } from '@rneui/base';




const SearchFilter = ({data={}, input, setInput}) => {

    
    const [name, setName] = useState("")
    
   



    return (
        <View>

        </View>
    );
}

const styles = StyleSheet.create({})

export default SearchFilter;
