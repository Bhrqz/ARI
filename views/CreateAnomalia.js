import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

export default function CreateAnomalia() {

    const [description, setDescription] = useState("")
    const [titulo, setTitulo] = useState("")
    const [solved, setSolved] = useState(false)
    const [remainingLetters, setRemainingLetters] = useState(MaxLettersDescription)

    let MaxLettersDescription = 150

    function toggleSwitch(){
      setSolved(previousState => !previousState);

    }

    function Describing(value) {
      setDescription(value)
      
      const remaining = MaxLettersDescription - value.length
      setRemainingLetters(remaining)
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

      await addDoc(collection(db, "Reportes"), {
              Descripcion: description,
              Titulo: titulo,
              Solucionado: solved,
              Fecha_Reporte: serverTimestamp()
          }).then(() => {
              Alert.alert('Anomalía registrada correctamente')
              console.log("Data submitted")
              setDescription("")
              setTitulo("")
              setSolved(false)
          }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
      
           
      
      
    }

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.textLogin}>Registro de Anomalía</Text>
              </View>

              <View style={styles.viewCounter}>
                <Text style={styles.text} >Suceso:</Text>
                <TextInput
                    style={styles.input}
                    maxLength={30}
                    placeholder="Mencione lo sucedido"
                    onChangeText ={(value) => setTitulo(value)}
                    value={titulo}
                />
              </View>

              <View style={styles.viewCounter}>
                <Text style={styles.text}>Detalle:</Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={MaxLettersDescription}
                    style={styles.input}
                    placeholder="Descripción de lo sucedido"
                    onChangeText ={(value) => Describing(value)}
                    value={description}
                />
              </View>
              {
                description?
                <Text>Caracteres Faltantes: {remainingLetters}</Text>
                :
                <Text>Maximo de letras: {MaxLettersDescription}</Text>
              }
              
              {
                //Include a Date Picker HHEYEYEYEYEY!!!!!
              }

              <Separator />
              <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Por favor verifica que los datos estén correctos',
                  "Titulo: "+titulo +"\nDescripcion: "+description,
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
                <Text style={styles.buttonText}>Registrar Anomalía</Text>
           
              </Pressable>
            <Separator />
            <Separator />
            <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    )  
  }

