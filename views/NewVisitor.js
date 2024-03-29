import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

export default function NewVisitor() {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [number, onChangeNumber] = useState('')
    const [address, setAdress] = useState('')
    const [inviter, setInviter] = useState("")
    const [switchEnabled, setSwitchEnabled] = useState(false);
    
    function toggleSwitch(){
      setSwitchEnabled(previousState => !previousState);
      switchEnabled? setInviter(""):setInviter("Nadie. Iniciativa propia")
    }

    //Function for sending info
    async function SendingInfo(){
      
      //Code for sending the info to Firebase
      //This code updates the "prueba de la app2" document

      //  create a new document every time SendingInfo is called
      //setDoc => addDoc
      //doc => collection
      //erase PruebadelaApp2
      await setDoc(doc(db, "Membresía", "Prueba de la app2 "), {
              Nombres: name,
              Apellidos: lastname,
              Contacto:  number,
              Dirección: address,
              Invitado:inviter,
              Fecha_registro: serverTimestamp()
          }).then(() => {
              Alert.alert('Información Guardada')
              console.log("Data submitted")
              setLastname("")
              setName("")
              setAdress("")
              onChangeNumber("")
              setInviter("")
              setSwitchEnabled(false)
          }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
      
           
      
      
    }

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
              <Text style={styles.label} >Nombre</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Nombre del visitante"
                  onChangeText ={(value) => setName(value)}
                  value={name}
              />
              
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Apellido del visitante"
                  onChangeText ={(value) => setLastname(value)}
                  value={lastname}
              />

              <Text style={styles.label} >Número telefónico</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={(value) => onChangeNumber(value)}
                  value={number}
                  maxLength={10}
                  placeholder="Número Celular"
                  keyboardType="numeric"
                  label="hey"
              />
              
              <Text style={styles.label} >Dirección</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Dirección del visitante"
                  onChangeText ={(value) => setAdress(value)}
                  value={address}
              />

              <Text style={styles.label} >¿Quién le invitó?</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Nombre del hermano o hermana"
                  onChangeText ={(value) => setInviter(value)}
                  value={inviter}
              />

              


              <Separator input={inviter} setInput={setInviter}/>
              <Text style={styles.text}>
                Si el visitante vino solo,
                {"\n"}
                sólo marque este switch 
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={switchEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={switchEnabled}
                
              />

              <Separator />
              <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Revisa la info antes de guardarla ',
                  "Nombre: "+name +"\nApellido: "+lastname +"\nNúmero: "+number+"\nDireccion: "+address+"\nInvitado por: "+inviter,
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
                <Text style={styles.buttonText}>Guardar visitante nuevo</Text>
           
              </Pressable>
            <Separator />
            <Separator />
            <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    )  
  }

