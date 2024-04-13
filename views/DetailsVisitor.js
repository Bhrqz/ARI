import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

const DetailsVisitor = ( {route} ) => {

    const { VisitorDetails } = route.params;
    
    
    const [name, setName] = useState(VisitorDetails.Nombres)
    const [lastname, setLastname] = useState(VisitorDetails.Apellidos)
    const [number, setNumber] = useState(VisitorDetails.Contacto)
    const [address, setAdress] = useState(VisitorDetails.Dirección)
    const [inviter, setInviter] = useState(VisitorDetails.Invitado)
    const [declaracion, setDeclaracion] = useState(false)
    const [declarado, setDeclarado] = useState("");
    
       
       
      
    function toggleResolved(){
        setDeclaracion(previousState => !previousState);
        declaracion?setDeclarado("Si, solucionado"):setDeclarado("No, aun pendiente")        
      }
    
     

    async function UpdatingInfo(){
        
        const docToUpdate = doc(db, "Visitantes", VisitorDetails.id)

        await updateDoc(docToUpdate, {
            Nombres:name,
            Apellidos:lastname,
            Contacto: number,
            Direccion: address,
            Invitado: inviter,
            ["Declaración de Fe"]: declaracion
        }).then(() => {
            Alert.alert('Información Actualizada')
            console.log("Data submitted")
            
        }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.container}>
            <Separator></Separator>
                <View style={styles.viewCounter}>
                    <Text>¿Ha declarado su Fe?:</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={declaracion ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleResolved}
                        value={declaracion}
                        
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setName(value)}
                        value={name}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Apellidos:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apellido del visitante"
                        onChangeText ={(value) => setLastname(value)}
                        value={lastname}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Numero de Telefono"
                        keyboardType="numeric"
                        onChangeText ={(value) => setNumber(value)}
                        value={number}
                    />
                </View>


                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Direccion:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Direccion del visitante"
                        onChangeText ={(value) => setAdress(value)}
                        value={address}
                    />
                </View>

                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Invitado por:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setInviter(value)}
                        value={inviter}
                    />
                </View>
                

            </View>

            <View style={styles.container}>
            <Separator></Separator>

            

                <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  '¿Estás seguro?',
                  "Luego de marcada como Solucionada,\nla anomalìa no podrá ser editada",
                  [
                    {
                      text: 'Si, guardar',
                      onPress: () => UpdatingInfo(),
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
                <Text style={styles.buttonText}>Actualizar</Text>
           
              </Pressable>
              
              <Separator/>
              <Separator/>
              <Separator/>
                
           </View> 
        </KeyboardAwareScrollView>
    )

 
}

export default DetailsVisitor