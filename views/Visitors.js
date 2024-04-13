import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import SearchFilter from './components/SearchFilter';
import styles from './components/styles';
import { collection, doc, setDoc, getDocs, query, where, getDoc, QuerySnapshot } from "firebase/firestore";
import { db } from './components/config';
import { Button, Icon } from '@rneui/base';
import { useEffect } from 'react';

const Separator = () => <View style={styles.separator} />;


function Visitors ({navigation}) {

  const [visitors, setVisitors] = useState([]);
  const [loadingVisitors, setLoadingVisitors] = useState(true);
  

  useEffect(() => {
    async function fetchData() {
      const docs = [];
      const querySnapshot = await getDocs(collection(db, "Visitantes"));
      setLoadingVisitors(false);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const object = {id: doc.id, ...doc.data()}
        docs.push(object);
      });
      setVisitors(docs);
    }
    fetchData();

  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
            <Text style={styles.textLogin}>Visitantes</Text>
        </View>

        <View style={styles.container}>
          {loadingVisitors?
            <View>
              <Text>Cargando lista visitantes...</Text>
              <Button title="Cargando Visitantes" type="solid" loading/>
            </View>
            :
            visitors
              .map((visitor, index) => (
                <TouchableOpacity 
                  style={styles.lists} 
                  key={index}
                  onPress={() => {navigation.navigate("Detalle de Visitante", { VisitorDetails: { id: visitor.id, ...visitor}})}}
                  >
                  <View>
                    {console.log(visitor)}
                    <Text style={styles.textTitleList}>{visitor && visitor.Nombres}</Text>
                    <Text style={styles.textNoTitleList}>{visitor && visitor.Apellidos}</Text>
                    </View>
                  <Separator/>
                </TouchableOpacity>
          ))}
        

        
      </View>
    </ScrollView>
  );
}


export default Visitors