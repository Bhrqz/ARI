import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import SearchFilter from './components/SearchFilter';
import styles from './components/styles';
import { collection, doc, setDoc, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from './components/config';
import { Button } from '@rneui/base';

const Separator = () => <View style={styles.separator} />;



export default function EditVisitor({ navigation }) {

    const [search, setSearch] = useState("");
    const [data, setData] = useState("")

    //Getting just ONE document... The one with document: LGi2w2OG8d7XCZHnuCqW
    const fetchingData = async () =>  {
      
      const querySnapshot = await getDocs(collection(db, "Membresía"))
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data())
      })

    }

    return (
      <View style={styles.container}>
          <Separator />
          <Text style={styles.text}> 
            Editar un visitante 
          </Text>
          
          <TextInput
                  style={styles.input}
                  placeholder="Nombre del visitante"
                  onChangeText ={(value) => setSearch(value)}
                  value={search}
              >
          </TextInput>

          
          <Button title="Boton" onPress={()=>{fetchingData()}}></Button>
          <Separator />

          <Text>
          {
            
          }
          </Text>

      </View>
    )  
  }

