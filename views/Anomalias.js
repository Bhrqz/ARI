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


function Anomalias ({navigation}) {

  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportTitle, setReportTitle] = useState("");
  

  useEffect(() => {
    async function fetchData() {
      const docs = [];
      const querySnapshot = await getDocs(collection(db, "Reportes"));
      setLoadingReports(false);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const object = {id: doc.id, ...doc.data()}
        docs.push(object);
      });
      setReports(docs);
    }
    fetchData();

  }, []);

  const filteredReports = reports
  .filter(report => {
      if(reportTitle.trim()=== ""){
        return true // to return all the reports
      } else{
        const FullReport = `${report.Titulo} ${report.Descripcion}`.toLowerCase()
        return FullReport.includes(reportTitle.toLowerCase())
      }
  })

  return (
    <ScrollView>
        
        <View style={styles.container}>
          <Separator />
            <Text style={styles.text}>Busqueda</Text>
            <TextInput
              style={styles.input}
              placeholder='Filtrar por Titulo'
              value={reportTitle}
              onChangeText={(value) => setReportTitle(value)}
              >
            </TextInput>
            <Separator />

        </View>

        <View style={styles.container}>
          {loadingReports?
            <View>
              <Text>Cargando anomalías...</Text>
              <Button title="Cargando Miembros" type="solid" loading/>
            </View>
            :
            filteredReports
              .sort((a,b) =>a.Titulo.localeCompare(b.Titulo))
              .map((report, index) => (
                <TouchableOpacity 
                  style={styles.lists} 
                  key={index}
                  onPress={() => {navigation.navigate("Detalle de Anomalía", {AnomaliaDetails: { id: report.id, ...report}})}}
                  >
                  <View>
                    <Text style={styles.textTitleList}>{report && report.Titulo}</Text>
                    <Text style={styles.textNoTitleList}>{report && report.Descripcion}</Text>
                    <Text style={styles.textNoTitleList}> {(report && report.Fecha_Solucion)?"Solucionado":"Pendiente"} </Text>
                  </View>
                  <Separator/>
                </TouchableOpacity>
          ))}
        

        
        </View>
    </ScrollView>
  );
}


export default Anomalias