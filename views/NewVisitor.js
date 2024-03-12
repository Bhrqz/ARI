import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";



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
    function SendingInfo(){
      
      //Code for sending the info to Firebase
      //This code updates the "prueba de la app2" document

      //change "setDoc" and "doc" to "addDoc" and "collection" to
      //  create a new collection every time SendingInfo is called
      setDoc(doc(db, "Membresía", "Prueba de la app2 "), {
          Nombres: name,
          Apellidos: lastname,
          Contacto:  number,
          Dirección: address,
          Invitado:inviter,
          Fecha_registro: serverTimestamp()
          }).then(() => {
          console.log("Data submitted")
          }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
      
      //Saved. Cleaning the fields       
      Alert.alert('Información Guardada')
      setLastname("")
      setName("")
      setAdress("")
      onChangeNumber("")
      setSwitchEnabled(false)
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: "flex-start",
    },
    input: {
        borderColor: "gray",
        width: "75%",
        borderWidth: 1,
        margin:10,
        borderRadius: 10,
        padding: 10,
      },
    label: {
        alignItems:"flex-end",
        padding:10,
        fontSize:23
    },
    separator: {
      marginVertical: 15,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#3a87cc',
    },
    buttonText: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    text:{
      fontSize:16,
      textAlign :"center",
    },
    buttonAlert:{
      borderWidth:10
    }
    }
  )