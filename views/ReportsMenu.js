import { ActivityIndicator, Text, View, Button, Pressable, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { db } from './components/config';
import { collection, getDocs, } from "firebase/firestore";
import styles from './components/styles';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";


const Separator = () => <View style={styles.separator} />;
const SeparatorNoLine = () => <View style={styles.separatorNoLine} />;


export default function ReportsMenu ({navigation}){

    const [reports, setReports] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("");
    const [visitantes, setVisitantes] = useState(false);
    const [asistencia, setAsistencia] = useState(false);
    const [consolidado, setConsolidado] = useState(false);
    const [anomalia, setAnomalia] = useState(false);

    
    const HandleTap = (selection) => {
        setActive(selection)

        switch(selection){
            case("visitantes"):{
                setVisitantes(true)
                setAsistencia(false)
                setConsolidado(false)
                setAnomalia(false)
                break
            }
            case("asistencia"):{
                setVisitantes(false)
                setAsistencia(true)
                setConsolidado(false)
                setAnomalia(false)
                break
            }
            case("consolidado"):{
                setVisitantes(false)
                setAsistencia(false)
                setConsolidado(true)
                setAnomalia(false)
                break
            }
            case("anomalia"):{
                setVisitantes(false)
                setAsistencia(false)
                setConsolidado(false)
                setAnomalia(true)
                break
            }
        }
        
    }

    
    useEffect(() => {
        async function fetchData() {
          const docs = [];
          const querySnapshot = await getDocs(collection(db, "Reportes"));
          querySnapshot.forEach((doc) => {
            const object = {id: doc.id, ...doc.data()}
            docs.push(object);
          });
          setReports(docs);

            const docs2 = [];
            const querySnapshot2 = await getDocs(collection(db, "Visitantes"));
            querySnapshot2.forEach((doc) => {
                const object = {id: doc.id, ...doc.data()}
                docs2.push(object);
            });
            setVisitors(docs2);

            const docs3 = [];
            const querySnapshot3 = await getDocs(collection(db, "Membresía"));
            querySnapshot3.forEach((doc) => {
                const object = {id: doc.id, ...doc.data()};
                docs3.push(object);
            });
            setMembers(docs3);

            setLoading(false)
            
        }
        fetchData();
    
    }, []);

    
    //This is the function to get the info and take the relevant data for
    //the visual representation
    //I need to make this more readable in the app. 

    //This is specifically for the label for every bar
    const DateLabel = (date) =>{
            const [day, month, year] = date.split('-');
            const theDate = `${day}-${month}`;
        return theDate
    }

    const BarHeigth = (data) =>{
        const maxValue = data.reduce((max, obj) => {
            return obj.value > max ? obj.value : max;
          }, 0);
        return maxValue
    }

    function groupByDate(array) {
        const grouped = {};
            
        array.forEach(item => {
            const date = item["Fecha_registro"].toDate();  
            const day = date.getDate();
            const month = date.getMonth() + 1; 
            const year = date.getFullYear();
    
            const key = `${day}-${month}-${year}`;
    
            if (!grouped[key]) {
                grouped[key] = 0;
            }
            grouped[key]++;
        });
        const resultarray = []

        //The last four sundays:
        function getLastFourSundays() {
            const lastFourSundays = {};
            const today = new Date();
            let dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
            
            // If today is not Sunday, move back to the last Sunday
            if (dayOfWeek !== 0) {
              today.setDate(today.getDate() - dayOfWeek);
            }
          
            for (let i = 0; i < 4; i++) {
              const year = today.getFullYear();
              const month = today.getMonth() + 1; // getMonth() returns 0-based month
              const day = today.getDate();
              const dateKey = `${day}-${month}-${year}`;
              
              lastFourSundays[dateKey] = true;
              
              // Move to the previous Sunday
              today.setDate(today.getDate() - 7);
            }
            return lastFourSundays;
        }

        console.log(getLastFourSundays())

        for(let[key, visits] of Object.entries(grouped)){
            if(Object.keys(getLastFourSundays()).includes(key)){
                const tempObj= {value:visits, label:DateLabel(key), }
                resultarray.push(tempObj)
            }
        }

        //I need to push the sundays without visits to the resultArray array.
        //THIIIIISSSSS
 

        /**creation of the array of objects 
        //like this: [{"label": "11-4", "value": 1}, {"label": "12-4", "value": 2}]
        for(let[key, visits] of Object.entries(grouped)){
            const tempObj= {value:visits, label:DateLabel(key), }
            resultarray.push(tempObj)
        }
        */
        // Función para convertir label en objeto Date
        // Year is fixed. The graphic bar only admits the Day-Month layout
        const convertToDate = (label) => {
            const [day, month] = label.split('-').map(Number);
            return new Date(2024, month - 1, day); 
        };

        // Ordenar el array basado en las fechas
        const sortedArray = resultarray.sort((a, b) => convertToDate(b.label) - convertToDate(a.label));
        
        // Seleccionar los primeros 4 objetos del array ordenado
        const latestFour = sortedArray.slice(0, 4);
        const reversedArray = latestFour.reverse()
        
        return reversedArray;
    }
    
    const groupedByDate = groupByDate(visitors);
    //End of the function for.... ugh visual representation stuff

    
    //This is the visualizer of the previews
    const Renderer = () =>{

        if (active=="visitantes"){
            return(
                <View style={styles.container}>
                    <Text>Visitantes</Text>
                    <BarChart
                        data = {groupedByDate}
                        frontColor={'#177AD5'}
                        barBorderRadius={5}
                        xAxisThickness={0}
                        dashGap={20}
                        noOfSections={BarHeigth(groupedByDate) + 1}
                        maxValue={BarHeigth(groupedByDate) + 1} 
                          
                    />
                </View>
                
            )   
        }
        else if (active=="asistencia"){
            return(
                <View style={styles.container}>
                <Text>Asistencia</Text>
                </View>
            )
        }
        else if (active=="consolidado"){
            return(
                <Text>Consolidado</Text>
            )
        }
        else if (active=="anomalia"){
            return(
                <Text>Anomalia</Text>
            )
        }
    }
    //End of the preview selector


    //This is for preparing the data downloaded and sending it to an email
    const DownAndSendDataHandle = () => {
        
        const AllData = {visitors, members, reports}

        const today = () =>{ 
            const date = new Date
            const day = date.getDate();
            const month = date.getMonth() + 1; 
            const year = date.getFullYear();
            const key = `${day}-${month}-${year}`;
            return key
        }
        
        const generateJSON = async (fileName) => {

            try {
              const json = JSON.stringify(AllData, null, 2);
              const fileUri = `${FileSystem.documentDirectory}Data hasta ${fileName}.json`;
              await FileSystem.writeAsStringAsync(fileUri, json);
              
              return fileUri;
            } catch (err) {
              console.error('Error creating JSON file:', err);
            }
        };

        const sendEmail = async () => {
            const jsonUri = await generateJSON(today());
          
            const isAvailable = await MailComposer.isAvailableAsync();
            if (isAvailable) {
              const options = {
                recipients: ['josebchrist@hotmail.com'], //This is the EMAIL
                subject: `Data hasta ${today()}`,
                body: `Este archivo contiene toda la base de datos hasta ${today()}.`,
                attachments: [jsonUri],
              };
          
              await MailComposer.composeAsync(options);
            } else {
              alert('Email services are not available');
            }
        };        
        sendEmail()
    }


    return(
        <ScrollView>
            <View style={styles.container}> 
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Reportes</Text>
                </View>

                <View style={styles.viewCounter}>
                    <Pressable
                        style={visitantes?styles.selectorButtonON:styles.selectorButtonOff}
                        onPress={() => HandleTap("visitantes")}>
                            <Text style={styles.littleButtonText}>Visitantes</Text>
                    </Pressable>
                    <Pressable
                        style={asistencia?styles.selectorButtonON:styles.selectorButtonOff}
                        onPress={() => HandleTap("asistencia")}>
                            <Text style={styles.littleButtonText}>Asistencia</Text>
                    </Pressable>
                    <Pressable
                        style={consolidado?styles.selectorButtonON:styles.selectorButtonOff}
                        onPress={() => HandleTap("consolidado")}>
                            <Text style={styles.littleButtonText}>Consolidado</Text>
                    </Pressable>
                    <Pressable
                        style={anomalia?styles.selectorButtonON:styles.selectorButtonOff}
                        onPress={() => HandleTap("anomalia")}>
                            <Text style={styles.littleButtonText}>Anomalías</Text>
                    </Pressable>
                </View>

                <View>
                    <SeparatorNoLine></SeparatorNoLine>
                    <Pressable
                        style={loading?styles.buttonDeactivated:styles.buttonHome3}
                        disabled={loading}
                        onPress={DownAndSendDataHandle}>
                        <Text style={styles.buttonText}>Enviar datos por email</Text>
                    </Pressable>
                    
                    <Separator></Separator>
                </View>

                {
                    loading?
                    <View>
                        <Text>Cargando información...</Text>
                        <ActivityIndicator size="large"/>
                    </View>
                    :
                    <View>
                        {Renderer()}
                    </View>
                }

                
                                

                <StatusBar style="auto" />
            </View>
        </ScrollView>
    )
}