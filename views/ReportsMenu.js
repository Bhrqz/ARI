import { ActivityIndicator, Text, View, FlatList, Pressable, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { db } from './components/config';
import { collection, getDocs, } from "firebase/firestore";
import styles from './components/styles';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import colorPicker from './components/AsistenciaColorpicker';
import CounterTable from './components/CounterTable';
import Consolidadocompo from './components/Consolidadocompo';

const Separator = () => <View style={styles.separator} />;
const SeparatorNoLine = () => <View style={styles.separatorNoLine} />;


export default function ReportsMenu ({navigation}){

    const [reports, setReports] = useState([]);
    const [conteo, setConteo] = useState([]);
    const [visitors, setVisitors] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("");
    const [visitantes, setVisitantes] = useState(false);
    const [asistencia, setAsistencia] = useState(false);
    const [consolidado, setConsolidado] = useState(false);
    const [anomalia, setAnomalia] = useState(false);
    
    const MaxNumberofDays = 4
    let totalVisitorsMonth = 0
    let totalReportsMonth = 0
    let totalSolvedReportsMonth = 0
    let wasCounted = true

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

            const docs4 = [];
            const querySnapshot4 = await getDocs(collection(db, "Conteos"));
            querySnapshot4.forEach((doc) => {
                const object = {id: doc.id, ...doc.data()};
                docs4.push(object);
            });
            setConteo(docs4);

            setLoading(false)
            
        }
        fetchData();
    
    }, []);

    
    //This is the function to get the info and take the relevant data for
    //the VISITORS visual representation
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

    //The last Max sundays:
    function getLastXSundays(Max) {
        const lastFourSundays = {};
        const today = new Date();
        let dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        
        // If today is not Sunday, move back to the last Sunday
        if (dayOfWeek !== 0) {
          today.setDate(today.getDate() - dayOfWeek);
        }
      
        for (let i = 0; i < Max; i++) {
          const year = today.getFullYear();
          const month = today.getMonth() + 1; // getMonth() returns 0-based month
          const day = today.getDate();
          const dateKey = `${day}-${month}-${year}`;
          
          lastFourSundays[dateKey] = "";
          
          // Move to the previous Sunday
          today.setDate(today.getDate() - 7);
        }
        return lastFourSundays;
    }

    function dateCreation (date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
    
        const key = `${day}-${month}-${year}`;

        return key
    }

    // Función para convertir label en objeto Date
    // Year is fixed. The graphic bar only admits the Day-Month layout
    const convertToDate = (label) => {
        const [day, month] = label.split('-').map(Number);
        return new Date(2024, month - 1, day); 
    };
    
    function groupByDate(array) {
        const grouped = {};
            
        array.forEach(item => {
            const key = dateCreation(item["Fecha_registro"].toDate())
    
            if (!grouped[key]) {
                grouped[key] = 0;
            }
            grouped[key]++;
        });
        const resultarray = []
        

        //creation of the array of Sundays with number of visits
        //like this: [{"label": "11-4", "value": 1}, {"label": "12-4", "value": 2}]
        const lastFourSundays = Object.keys(getLastXSundays(MaxNumberofDays));
            lastFourSundays.forEach(sunday => {
                if (grouped[sunday]) {
                    resultarray.push({ label: DateLabel(sunday), value: grouped[sunday] });
                    totalVisitorsMonth = totalVisitorsMonth + grouped[sunday]
                } else {
                    resultarray.push({ label: DateLabel(sunday), value: 0 });
            }
        });
        

        /**This code was meant to show only the dates that register any visitors
         * regardless the day
            for(let[key, visits] of Object.entries(grouped)){
                const tempObj= {value:visits, label:DateLabel(key), }
                resultarray.push(tempObj)
            }
        */
        
        // Ordenar el array basado en las fechas
        const sortedArray = resultarray.sort((a, b) => convertToDate(b.label) - convertToDate(a.label));
        
        // Seleccionar los primeros MAxNumberofDays objetos del array ordenado
        const latestFour = sortedArray.slice(0, MaxNumberofDays);
        const reversedArray = latestFour.reverse()
        
        return reversedArray;
    }
    
    const wasThereACount =()=>{
        const theDaytoShow = 
            conteo.filter((cnt) =>{
                const key = dateCreation(cnt.Fecha_Reporte.toDate())

                if(key == Object.keys(getLastXSundays(1))){
                    return({cnt})
                }
        })
        
        if (theDaytoShow.length==0){
            return false
        } else{
            return true
        }
    }
    
    wasCounted = wasThereACount()
    

    //this is for the Attendance (Asistencia)
    const AsistenciaVisual = () => {
        const lastSunday = getLastXSundays(1)
        const theDaytoShow = 
            conteo.filter((cnt) =>{
                const key = dateCreation(cnt.Fecha_Reporte.toDate())

                if(key == Object.keys(lastSunday)){
                    return({cnt})
                }
        })

        function transformData(theDaytoShow) {
            const data = theDaytoShow[0];
            const pieData = [];
            for (const key in data) {
                if (key !== "id" && key !== "Fecha_Reporte" && key != "Hour") {
                    pieData.push({
                        value: parseInt(data[key], 10), 
                        label: key,
                        color: colorPicker(key)
                    });
                }
            }
            return pieData;
        }
        
        //This is just to sort the elements for the pie
        const sorted = transformData(theDaytoShow)
            .sort(function (a, b) {
                if (a.label > b.label) {
                return -1;
                }
                if (a.label < b.label) {
                return 1;
                }
                // a must be equal to b
                return 0;
            });
            
        return sorted
    }
    

    //This is for the Report(Anomalías)
    const reportbyDate =(array)=>{
        const grouped = {};
        
        array.forEach(item => {
            const key = dateCreation(item["Fecha_Reporte"].toDate())
            
            if (!grouped[key]) {
                grouped[key] = 0;
            }
            grouped[key]++;

        });

        const resultarray = []
        const lastFourSundays = Object.keys(getLastXSundays(MaxNumberofDays));
            lastFourSundays.forEach(sunday => {
                if (grouped[sunday]) {
                    resultarray.push({ label: DateLabel(sunday), value: grouped[sunday] });
                    totalReportsMonth = totalReportsMonth + grouped[sunday] 
                    
                    // Contar los solucionados para los últimos cuatro domingos
                    array.forEach(item => {
                        const key = dateCreation(item["Fecha_Reporte"].toDate());
                        if (key === sunday && item["Fecha_Solucion"]) {
                            totalSolvedReportsMonth++;
                        }
                    });

                } else {
                    resultarray.push({ label: DateLabel(sunday), value: 0 });
                }
        });

        const sortedArray = resultarray.sort((a, b) => convertToDate(b.label) - convertToDate(a.label));
        // Seleccionar los primeros MAxNumberofDays objetos del array ordenado
        const latestFour = sortedArray.slice(0, MaxNumberofDays);
        const reversedArray = latestFour.reverse()

        return reversedArray;
    }

    const reportedByDate = reportbyDate(reports)
    const groupedByDate = groupByDate(visitors);
    const asistenciavisual = AsistenciaVisual()
    
    //End of the function for.... ugh visual representation stuff

    
    //This is the visualizerSelector of the previews
    const Renderer = () =>{

        if (active=="visitantes"){
            return(
                <View style={styles.container}>
                    <Text style={styles.textTitleList}>Visitantes</Text>
                    <BarChart
                        data = {groupedByDate}
                        frontColor={'#177AD5'}
                        barBorderRadius={5}
                        xAxisThickness={0}
                        dashGap={20}
                        noOfSections={BarHeigth(groupedByDate) + 1}
                        maxValue={BarHeigth(groupedByDate) + 1} 
                          
                    />
                    <Separator></Separator>
                    <Text 
                        style={styles.textSmall}
                        >
                        Se muestra el número de visitantes de los últimos {MaxNumberofDays} Domingos
                    </Text>
                    <Text 
                        style={styles.textSmall}
                        >
                        En total hubo {totalVisitorsMonth} visitantes.
                    </Text>
                    <Separator></Separator>
                </View>
                
            )   
        }
        else if (active=="asistencia" && wasCounted==true){
            return(
                <View style={styles.container}>
                    <Text style={styles.textTitleList}>Asistencia</Text>
                    
                        <View>
                            <PieChart
                                data={asistenciavisual}
                                radius={150}
                                textSize={20}
                                strokeWidth={3}
                                strokeColor="#333"
                                focusOnPress
                                showValuesAsLabels
                                showTextBackground
                                textBackgroundRadius={26}
                            />
                            
                            <CounterTable 
                                label1={asistenciavisual[0].label} color1={asistenciavisual[0].color} value1={asistenciavisual[0].value}
                                label2={asistenciavisual[1].label} color2={asistenciavisual[1].color} value2={asistenciavisual[1].value}
                                label3={asistenciavisual[2].label} color3={asistenciavisual[2].color} value3={asistenciavisual[2].value}
                                label4={asistenciavisual[3].label} color4={asistenciavisual[3].color} value4={asistenciavisual[3].value}
                                label5={asistenciavisual[4].label} color5={asistenciavisual[4].color} value5={asistenciavisual[4].value}
                                label6={asistenciavisual[5].label} color6={asistenciavisual[5].color} value6={asistenciavisual[5].value}
                                label7={asistenciavisual[6].label} color7={asistenciavisual[6].color} value7={asistenciavisual[6].value}
                                label8={asistenciavisual[7].label} color8={asistenciavisual[7].color} value8={asistenciavisual[7].value}
                                label9={asistenciavisual[8].label} color9={asistenciavisual[8].color} value9={asistenciavisual[8].value}
                                label10={asistenciavisual[9].label} color10={asistenciavisual[9].color} value10={asistenciavisual[9].value}
                                label11={asistenciavisual[10].label} color11={asistenciavisual[10].color} value11={asistenciavisual[10].value}
                                label12={asistenciavisual[11].label} color12={asistenciavisual[11].color} value12={asistenciavisual[11].value} 
                            />
                        </View>
                        
                    
                </View>
            )
        }
        else if (active=="asistencia" && wasCounted==false){
            return(
                <View style={styles.container}>
                    <Text style={styles.textTitleList}>Asistencia</Text>
                    <SeparatorNoLine/>
                    <Text>No se registra conteo de asistencia</Text>
                    <Text>para el ùltimo domingo</Text>
                </View>
            )
        }
        else if (active=="consolidado"){
            return(
                <View style={styles.container}>
                    <Text style={styles.textTitleList}>Consolidado</Text>
                    <SeparatorNoLine/>
                    
                    {/**
                        Componente para mostrar el total de visitantes
                        discriminados por genero y salon 
                        de la ultima fecha registrada
                    */}
                    
                    <Consolidadocompo 
                        count={conteo}
                        visitors={visitors}
                    />

                </View>
            )
        }
        else if (active=="anomalia"){
            return(
                <View style={styles.container}>
                    <Text style={styles.textTitleList}>Anomalías</Text>
                    <BarChart
                        data = {reportedByDate}
                        frontColor={'#14b5de'}
                        barBorderRadius={5}
                        xAxisThickness={0}
                        dashGap={20}
                        noOfSections={BarHeigth(reportedByDate) + 1}
                        maxValue={BarHeigth(reportedByDate) + 1} 
                          
                    />
                    <Separator></Separator>
                    <Text 
                        style={styles.textSmall}
                        >
                        En total hubo {totalReportsMonth} anomalias los últimos cuatro domingos.
                    </Text>
                    <Text 
                        style={styles.textSmall}
                        >
                        De los cuales {totalSolvedReportsMonth} han sido solucionadas.
                    </Text>
                </View>
            )
        }
    }
    //End of the preview selector


    //This is for preparing the data downloaded and sending it to an email
    const DownAndSendDataHandle = () => {
        
        const AllData = {visitors, members, reports}

        const today = () =>{ 
            
            const key = dateCreation(new Date())
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
              alert('El servicio de email no está disponible.');
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