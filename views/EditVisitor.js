import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import SearchFilter from './components/SearchFilter';
import styles from './components/styles';
import { collection, doc, setDoc, getDocs, query, where, getDoc, QuerySnapshot } from "firebase/firestore";
import { db } from './components/config';
import { Button } from '@rneui/base';
import { useEffect } from 'react';

const Separator = () => <View style={styles.separator} />;



export default function EditVisitor({ navigation }) {

    const [members, setMembers] = useState([]);

    
    const fetchingData = async () =>  {
      const querySnapshot = await getDocs(collection(db, "Membresía"))
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data())

        const object = doc.data()

        members.push(object)
        
    })}
 
      /**
       * It works. After calling fetchinData, I got the whole data in an JSON
       * called members. ITS Working
       * now, we need to render the info already gathered
       */
    console.log(members[0])

    
    return (
      <View style={styles.container}>
          <Separator />
          <Text style={styles.text}> 
            Editar un visitante 
          </Text>
          
          <TextInput
                  style={styles.input}
                  placeholder="Nombre del visitante"
                  onChangeText ={(value) => setMembers(value)}
                  value={members}
              >
          </TextInput>

          
          <Button title="Boton" onPress={()=>{fetchingData()}}></Button>
          <Separator />
          <Button title="Borrar" onPress={()=>{setMembers([])}}></Button>
          {members.map((person)=>{<Text>{person.Apellidos}</Text>})}       
   
      </View>
    )  
  }

