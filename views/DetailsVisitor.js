import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState, useEffect } from 'react';
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
    const [declaracion, setDeclaracion] = useState(VisitorDetails["Declaración de Fe"])
    const [remainingLetters, setRemainingLetters] = useState(MaxLettersDescription)
    const [observ, setObserv] = useState("")
    
    const firstVisit = () =>{
        a = VisitorDetails["Fecha_registro"].toDate()
        const day = a.getDate();
        const month = a.getMonth()+1;
        const year = a.getFullYear()
        
        return(
            <Text style={styles.paragraph}> {day}/{month}/{year}</Text>
            )
    }


    let MaxLettersDescription = 200

    //Today date for Deeclaration day
    const TodayDate = () => {
        new_date=new Date()
        const day = new_date.getDate(); 
        const month = new_date.getMonth() + 1; 
        const year = new_date.getFullYear();
        
        return(
            <Text style={styles.text}> {day}/{month}/{year}</Text>
        ) 
    }



    //For updating the remaining letters in the Observations TextInput
    function Observations(value) {
        setObserv(value)
        const remaining = MaxLettersDescription - value.length
        setRemainingLetters(remaining)
      }

    //Kinda selfexplanatory
    function toggleDeclaracion(){
        setDeclaracion(previousState => !previousState)
        }
    
    //This was created in order to not show TRUE or FALSE in the Alert of the Guardar button
    function Declarado() {
        if(declaracion==true){
            return("Si")
        }else{
            return("No")
        }
    }
    
    //Yeah, the firebase stuff
    async function UpdatingInfo(){
        
        const docToUpdate = doc(db, "Visitantes", VisitorDetails.id)

        await updateDoc(docToUpdate, {
            Nombres:name,
            Apellidos:lastname,
            Contacto: number,
            Direccion: address,
            Invitado: inviter,
            ["Declaración de Fe"]: declaracion,
            Observaciones: observ,
                        
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
                    <Text style={styles.text} >Nombre:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setName(value)}
                        value={name}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Apellidos:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Apellido del visitante"
                        onChangeText ={(value) => setLastname(value)}
                        value={lastname}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text}>¿Ha declarado su Fe?:</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={declaracion ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleDeclaracion}
                        value={declaracion}
                        
                    />
                    <View>
                        {declaracion?
                            <Text style={styles.text}>
                                Si, fe declarada
                            </Text>
                        :
                            <Text style={styles.text}>
                                No, aun no
                            </Text>
                        }
                        <Text>

                        </Text>
                    </View>
                </View>
                    
                {
                //I know its better a Date Picker, but... for now, this will do
                //you can only report today as the day 
                }

                <View style={styles.viewCounter}>
                    <Text style={styles.text}>Fecha de Declaración: </Text>
                    <Text>
                        {
                            declaracion?
                            <View style={styles.text}>
                                {TodayDate()}
                            </View>
                        :
                            <View>
                                <Text style={styles.text}>Aun sin fecha</Text>
                            </View>
                        }
                    </Text>
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text}>Primera Visita: </Text>
                    {firstVisit()}
                </View>
                
                <View style={styles.viewCounter}>

                    <Text style={styles.text}>Observaciones:</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={MaxLettersDescription}
                        style={styles.inputMemberDetail}
                        placeholder="¿Alguna intención de oración o novedad?"
                        onChangeText ={(value) => Observations(value)}
                        value={observ}
                    />

                </View>
                
                {
                    observ?
                    <Text>Caracteres Faltantes: {remainingLetters}</Text>
                    :
                    <Text>Maximo de letras: {MaxLettersDescription}</Text>
                }

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Contacto:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Numero de Telefono"
                        keyboardType="numeric"
                        onChangeText ={(value) => setNumber(value)}
                        value={number}
                    />
                </View>


                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Direccion:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Direccion del visitante"
                        onChangeText ={(value) => setAdress(value)}
                        value={address}
                    />
                </View>

                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Invitado por:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
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
                  'Verifica la info',
                  "Nombre: "+name +"\nApellido: "+lastname +"\nDeclaracion de Fe: "+Declarado()+"\nNúmero: "+number+"\nDireccion: "+address+"\nInvitado por: "+inviter,
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