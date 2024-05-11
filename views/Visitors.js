import { ActivityIndicator, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
  const [searchQuery, setSearchQuery] = useState("");
  

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

  const filteredVisitors = visitors
  .filter(visitor => {
      if(searchQuery.trim()=== ""){
        return true // to return all the reports
      } else{
        const FullVisitor = `${visitor.Nombres} ${visitor.Apellidos}`.toLowerCase()
        return FullVisitor.includes(searchQuery.toLowerCase())
      }
  })

  const Dates = (date) =>{
    a = date.toDate()
    const day = a.getDate();
    const month = a.getMonth()+1;
    const year = a.getFullYear()
    
    return(
        <Text style={styles.paragraph}> {day}/{month}/{year}</Text>
        )
  }


  return (
    <ScrollView>
      <View style={styles.container}>
            <Text style={styles.textLogin}>Visitantes</Text>
      </View>
        <View style={styles.container}>
          
            <TextInput
              style={styles.input}
              placeholder='Buscar por Nombre o Apellido'
              value={searchQuery}
              onChangeText={(value) => setSearchQuery(value)}
              >
            </TextInput>
            

        </View>


      <View style={[styles.container, styles.viewCounter, styles.spaceAround]}>
        <Text>Nombres y Apellidos</Text>
        <Text>Primera visita</Text>
      </View>

        <View style={styles.container}>
          {loadingVisitors?
            <View>
              <Text>Cargando lista de Visitantes...</Text>
              <ActivityIndicator size="large"/>
            </View>
            :
            filteredVisitors
              .sort((a,b) => {
                const dateA = a.Fecha_registro.toDate();
                const dateB = b.Fecha_registro.toDate();
                  return dateB - dateA; //dateB - dateA (starts with the most recently registered user)
              })
              .map((visitor, index) => (
                <TouchableOpacity 
                  style={styles.lists} 
                  key={index}
                  onPress={() => {navigation.navigate("Detalle de Visitante", { VisitorDetails: { id: visitor.id, ...visitor}})}}
                  >
                  
                  <View style={[styles.viewCounter, styles.spaceBetween]} >
                    <View>
                      <Text style={styles.textTitleList}>{visitor && visitor.Nombres}</Text>
                      <Text style={styles.textNoTitleList}>{visitor && visitor.Apellidos}</Text>
                    </View>
                    <View>
                      {Dates(visitor.Fecha_registro)}
                    </View>
                  </View>
                  <Separator/>
                </TouchableOpacity>
          ))}
        

        
      </View>
    </ScrollView>
  );
}


export default Visitors