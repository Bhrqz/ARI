import { ActivityIndicator, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
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
  const [selector, setSelector] = useState("Pendientes");
  

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

  const Dates = (date) =>{
    a = date.toDate()
    const day = a.getDate();
    const month = a.getMonth()+1;
    const year = a.getFullYear()
    
    return(
        <Text style={styles.paragraph}> {day}/{month}/{year}</Text>
        )
  }



  // This 3 paragraphs are for the filter. These will create the 
  //discriminator between ALL, SOLVED and PENDING

  const options =[
    { label: 'Todas', value: '1' },
    { label: 'Pendientes', value: '2' },
    { label: 'Solucionadas', value: '3' }
  ]

  const renderItem = item => {
    return(
      <View>
        <Text style={styles.textSelector}>{item.label}</Text>
      </View>
    )
  }

  const SelectorViews =(report)=>{
    if (selector=="Todas")
      {return report}
    else if(selector=="Solucionadas")
      {return report.Solucionado == true}
  else {
    return report.Solucionado == false
  }
  }


  return (
    <ScrollView>
        
        <View style={styles.container}>
            <View style={styles.container}>
              <Text style={styles.textTitle}>Lista de Anomalías</Text>
            </View>
            
            <TextInput
              style={styles.input}
              placeholder='Buscar por palabra clave'
              value={reportTitle}
              onChangeText={(value) => setReportTitle(value)}
              >
            </TextInput>
            

        </View>

        <View style={styles.container}>
          <Dropdown
            selectedTextStyle={styles.selectedTextStyle}
            style={styles.dropdown}
            placeholderStyle={styles.textNoTitleList}
            data={options}
            labelField="label"
            valueField="value"
            placeholder={selector}
            value={selector}
            maxHeight={300}
            onChange={ (value) => {setSelector(value.label);
            console.log(selector)}}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.container}>
          {loadingReports?
            <View>
              <Text>Cargando anomalías...</Text>
              <ActivityIndicator size="large"/>
            </View>
            :
            filteredReports
              .filter(report => SelectorViews(report))
              .sort((a,b) =>{
                const dateA = a.Fecha_Reporte.toDate();
                const dateB = b.Fecha_Reporte.toDate();
                  return dateB - dateA; //dateB - dateA (starts with the most recently registered report)
              })
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
                    <Text>Fecha de creación: {Dates(report.Fecha_Reporte)}</Text>
                  </View>
                  <Separator/>
                </TouchableOpacity>
          ))}
        

        
        </View>
    </ScrollView>
  );
}


export default Anomalias