import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

export default function CreateReport() {

    const [description, setDescription] = useState("")
    const [titulo, setTitulo] = useState("")
    const [solved, setSolved] = useState(false)
    
    function toggleSwitch(){
      setSolved(previousState => !previousState);

    }

    //Function for sending info
    async function SendingInfo(){
      
      //Code for sending the info to Firebase
      //This code updates the "prueba de la app2" document

      //change "setDoc" and "doc" to "addDoc" and "collection" to
      //  create a new collection every time SendingInfo is called
      await setDoc(doc(db, "Reportes", "Prueba de la app2 "), {
              Descripcion: description,
              Titulo: titulo,
              Solucionado: solved
          }).then(() => {
              Alert.alert('Información Guardada')
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
              <Text style={styles.label} >Titulo</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Titulo del report"
                  onChangeText ={(value) => setTitulo(value)}
                  value={titulo}
              />
              
              <Text style={styles.label}>Descripcion</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Descripcion de lo sucedido"
                  onChangeText ={(value) => setDescription(value)}
                  value={description}
              />

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={solved ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={solved}
                
              />

              <Separator />
              <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Revisa la info antes de guardarla ',
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
                <Text style={styles.buttonText}>Crear Reporte</Text>
           
              </Pressable>
            <Separator />
            <Separator />
            <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    )  
  }

