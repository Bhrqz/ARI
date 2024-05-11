import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

export default function CreateCounter() {

    const [mainHallMen, setMainHallMen] = useState("")
    const [mainHallWomen, setMainHallWomen] = useState("")
    const [salaCunaBoys, setSalaCunaBoys] = useState("")
    const [salaCunaGirls, setSalaCunaGirls] = useState("")
    const [parvulosBoys, setParvulosBoys] = useState("")
    const [parvulosGirls, setParvulosGirls] = useState("")
    const [principiantesBoys, setPrincipiantesBoys] = useState("")
    const [principiantesGirls, setPrincipiantesGirls] = useState("")
    const [primeriosBoys, setPrimariosBoys] = useState("")
    const [primariosGirls, setPrimariosGirls] = useState("")
    const [adolescentesBoys, setAdolescentesBoys] = useState("")
    const [adolescentesGirls, setAdolescentesGirls] = useState("")

    function toggleSwitch(){
      setSolved(previousState => !previousState);

    }

    //Function for sending info
    async function SendingInfo(){
      
      //Code for sending the info to Firebase
      //This code updates the "prueba de la app2" document

      //change "setDoc" and "doc" to "addDoc" and "collection" to
      //  create a new document every time SendingInfo is called
      //setDoc => addDoc
      //doc => collection
      //erase PruebadelaApp2

      await addDoc(collection(db, "Conteos"), {
                Salon_Principal_M:mainHallMen,
                Salon_Principal_F:mainHallWomen,
                Sala_Cuna_M:salaCunaBoys,
                Sala_Cuna_F:salaCunaGirls,
                Parvulos_M:parvulosBoys,
                Parvulos_F:parvulosGirls,
                Principiantes_M:principiantesBoys,
                Principiantes_F:principiantesGirls,
                Primarios_M:primeriosBoys,
                Primarios_F:primariosGirls,
                Adolescentes_M:adolescentesBoys,
                adolescentes_F:adolescentesGirls,
                Fecha_Reporte: serverTimestamp()
          }).then(() => {
                Alert.alert('Conteos enviados')
                console.log("Counters submitted")
                setMainHallMen("")
                setMainHallWomen("")
                setSalaCunaBoys("")
                setSalaCunaGirls("")
                setParvulosBoys("")
                setParvulosGirls("")
                setPrincipiantesBoys("")
                setPrincipiantesGirls("")
                setPrimariosBoys("")
                setPrimariosGirls("")
                setAdolescentesBoys("")
                setAdolescentesGirls("")

          }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
      
           
      
      
    }

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
            <Text style={styles.label} >Salón Principal</Text>
              
              <View style={styles.viewCounter}>
              <View >
                <Text style={styles.labelCounter} >Hombres</Text>
                    <TextInput
                        style={styles.inputCounterM}
                        onChangeText={(value) => setMainHallMen(value)}
                        value={mainHallMen}
                        maxLength={3}
                        placeholder="Número de hombres"
                        keyboardType="numeric"
                    />
                    
               </View>
                <View>
                <Text style={styles.labelCounter} >Mujeres</Text>
                    <TextInput
                        style={styles.inputCounterF}
                        onChangeText={(value) => setMainHallWomen(value)}
                        value={mainHallWomen}
                        maxLength={3}
                        placeholder="Número de mujeres"
                        keyboardType="numeric"
                    />
                    </View>
            </View>
            

            
            <Text style={styles.label} >Sala Cuna</Text>
            <View style={styles.viewCounter}>
              <View>
                    <Text style={styles.labelCounter} >Niños</Text>
                        <TextInput
                            style={styles.inputCounterM}
                            onChangeText={(value) => setSalaCunaBoys(value)}
                            value={salaCunaBoys}
                            maxLength={3}
                            placeholder="Número de niños"
                            keyboardType="numeric"
                    />
              </View>
              <View>      
                    <Text style={styles.labelCounter} >Niñas</Text>
                        <TextInput
                            style={styles.inputCounterF}
                            onChangeText={(value) => setSalaCunaGirls(value)}
                            value={salaCunaGirls}
                            maxLength={3}
                            placeholder="Número de niñas"
                            keyboardType="numeric"
                    />
              </View>
            </View>
            <View>
            </View>

            <Text style={styles.label} >Párvulos</Text>
            <View style={styles.viewCounter}>
              <View>
                <Text style={styles.labelCounter} >Niños</Text>
                    <TextInput
                        style={styles.inputCounterM}
                        onChangeText={(value) => setParvulosBoys(value)}
                        value={parvulosBoys}
                        maxLength={3}
                        placeholder="Número de niños"
                        keyboardType="numeric"
                />
               </View>
               <View> 
                <Text style={styles.labelCounter} >Niñas</Text>
                    <TextInput
                        style={styles.inputCounterF}
                        onChangeText={(value) => setParvulosGirls(value)}
                        value={parvulosGirls}
                        maxLength={3}
                        placeholder="Número de niñas"
                        keyboardType="numeric"
                />
                </View>
            </View>

            <Text style={styles.label} >Principiantes</Text>
            <View style={styles.viewCounter}>
              <View>
              <Text style={styles.labelCounter} >Niños</Text>
                <TextInput
                    style={styles.inputCounterM}
                    onChangeText={(value) => setPrincipiantesBoys(value)}
                    value={principiantesBoys}
                    maxLength={3}
                    placeholder="Número de niños"
                    keyboardType="numeric"
              />
              </View>
              <View>
              <Text style={styles.labelCounter} >Niñas</Text>
                <TextInput
                    style={styles.inputCounterF}
                    onChangeText={(value) => setPrincipiantesGirls(value)}
                    value={principiantesGirls}
                    maxLength={3}
                    placeholder="Número de niñas"
                    keyboardType="numeric"
              />
              </View>
            </View>

              
            <Text style={styles.label} >Primarios</Text>
            <View style={styles.viewCounter}>
              <View>
              <Text style={styles.labelCounter} >Niños</Text>
                  <TextInput
                    style={styles.inputCounterM}
                    onChangeText={(value) => setPrimariosBoys(value)}
                    value={primeriosBoys}
                    maxLength={3}
                    placeholder="Número de niños"
                    keyboardType="numeric"
              />
              </View>
              <View>
              <Text style={styles.labelCounter} >Niñas</Text>
                  <TextInput
                    style={styles.inputCounterF}
                    onChangeText={(value) => setPrimariosGirls(value)}
                    value={primariosGirls}
                    maxLength={3}
                    placeholder="Número de niñas"
                    keyboardType="numeric"
                />
              </View>
            </View>



            <Text style={styles.label} >Adolescentes</Text>
            <View style={styles.viewCounter}>
              <View>
              <Text style={styles.labelCounter} >Niños</Text>
              
                <TextInput
                    style={styles.inputCounterM}
                    onChangeText={(value) => setAdolescentesBoys(value)}
                    value={adolescentesBoys}
                    maxLength={3}
                    placeholder="Número de chicos"
                    keyboardType="numeric"
              />
              </View>
              <View>
              <Text style={styles.labelCounter} >NIñas</Text>
            
                <TextInput
                    style={styles.inputCounterF}
                    onChangeText={(value) => setAdolescentesGirls(value)}
                    value={adolescentesGirls}
                    maxLength={3}
                    placeholder="Número de chicas"
                    keyboardType="numeric"
              />
                </View>
            </View>
            
            <Separator />
            
            
            <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Por favor verifica que los datos estén correctos',
                    "Salon Principal: Hombres: "+mainHallMen+"/ Mujeres: "+mainHallWomen+"\nSala Cuna: Niños: "+salaCunaBoys+"/ Niñas: "+salaCunaGirls+"\nPárvulos: Niños: "+parvulosBoys+"/ Niñas: "+parvulosGirls+"\nPrincipiantes: Niños: "+principiantesBoys+" / Niñas: "+primariosGirls+"\nPrimarios: Niños: "+primeriosBoys+"/ Niñas: "+primariosGirls+"\nAdolescentes: Niños: "+adolescentesBoys+"/ Niñas: "+adolescentesGirls+"\n",
                  [
                    {
                      text: 'Si, guardar',
                      onPress: () => SendingInfo(),
                      style: styles.input,
                    },
                    {
                      text: 'Cancelar',
                      onPress: () => Alert.alert('Accion Cancelada'),
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: false,
                    
                  },
                )}>
                <Text style={styles.buttonText}>Asistencia Registrada</Text>
           
              </Pressable>
            <Separator />
            <Separator />
            <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    )  
  }

