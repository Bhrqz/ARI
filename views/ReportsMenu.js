import { ActivityIndicator, Text, View, Button, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { db } from './components/config';
import { collection, doc, setDoc, getDocs, query, where, getDoc, QuerySnapshot } from "firebase/firestore";
import styles from './components/styles';


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
            console.log(doc.id, " => ", doc.data());
            const object = {id: doc.id, ...doc.data()}
            docs.push(object);
          });
          setReports(docs);

            const docs2 = [];
            const querySnapshot2 = await getDocs(collection(db, "Visitantes"));
            querySnapshot2.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                const object = {id: doc.id, ...doc.data()}
                docs2.push(object);
            });
            setVisitors(docs2);

            const docs3 = [];
            const querySnapshot3 = await getDocs(collection(db, "Membresía"));
            querySnapshot3.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                const object = {id: doc.id, ...doc.data()};
                docs3.push(object);
            });
            setMembers(docs3);

            setLoading(false)
            
        }
        fetchData();
    
      }, []);

    const Renderer = () =>{

        if (active=="visitantes"){
            return(
                <Text>Visitantes</Text>
            )   
        }
        else if (active=="asistencia"){
            return(
                <Text>Asistencia</Text>
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