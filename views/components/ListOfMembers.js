import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { collection, doc, setDoc, getDocs, query, where, getDoc, QuerySnapshot } from "firebase/firestore";
import { db } from './config';
import { Button, Icon } from '@rneui/base';
import { useEffect } from 'react';

const Separator = () => <View style={styles.separator} />;


const ListOfMembers = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const docs = [];
          const querySnapshot = await getDocs(collection(db, "Membresía"));
          querySnapshot.forEach((doc) => {
            const object = {id: doc.id, ...doc.data()};
            docs.push(object);
          });
          setMembers(docs);
        }
        fetchData();
    
      }, []);

    return(
        {members}
    )
}

//Maybe this file is doing nothing..... 