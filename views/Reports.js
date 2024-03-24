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


function Reports () {

  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  

  useEffect(() => {
    async function fetchData() {
      const docs = [];
      const querySnapshot = await getDocs(collection(db, "Reportes"));
      setLoadingReports(false);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const object = doc.data();
        docs.push(object);
      });
      setReports(docs);
    }
    fetchData();

  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
            <Text style={styles.textLogin}>Reportes</Text>
        <Separator />

        <View>
          {loadingReports?
            <View>
              <Text>Cargando reportes...</Text>
              <Button title="Cargando Miembros" type="solid" loading/>
            </View>
            :
            reports
              .sort((a,b) =>a.Titulo.localeCompare(b.Titulo))
              .map((report, index) => (
                <TouchableOpacity 
                  style={styles.lists} 
                  key={index}
                  onPress={() => {
                    Alert.alert("Si, si,",
                    "Aun no esta hecha \nla pagina para los \ndetalles del reporte\nRELAX")
                    }}
                  >
                  <View>
                    <Text style={styles.textTitleList}>{report && report.Titulo}</Text>
                    <Text style={styles.textNoTitleList}>{report && report.Descripcion}</Text>
                    
                  </View>
                  <Separator/>
                </TouchableOpacity>
          ))}
        </View>

        
      </View>
    </ScrollView>
  );
}


export default Reports