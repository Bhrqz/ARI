import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

const DetailsAnomalia = ( {route, navigation} ) => {

    const { AnomaliaDetails } = route.params;
    
    const [titulo, setTitulo] = useState(AnomaliaDetails.Titulo);
    const [description, setDescription] = useState(AnomaliaDetails.Descripcion);
    const [incidencia, setIncidencia] = useState(AnomaliaDetails.Incidencia? AnomaliaDetails.Incidencia:"");
    const [remainingLetters, setRemainingLetters] = useState(MaxLettersDescription)
    const [resolved, setResolved] = useState(AnomaliaDetails.Solucionado)
    const [solvedDate, setSolvedDate] = useState(AnomaliaDetails.Fecha_Solucion)
    
    const alreadySolved = () => {
        if(AnomaliaDetails.Solucionado == false){
            return false
        }else{
            return true
        }
    }

    let MaxLettersDescription = 150

    function toggleResolved(){
        setResolved(previousState => !previousState);       
      }
    
    function Updating(value) {
        setIncidencia(value)
        
        const remaining = MaxLettersDescription - value.length
        setRemainingLetters(remaining)
      }
    
    //With this, we get a readable Date from Firebase
    const date = AnomaliaDetails.Fecha_Reporte.toDate()
    const day = date.getDate(); 
    const month = date.getMonth() + 1; 
    const year = date.getFullYear(); 
    
    //Today date for SOlVED report
    //TODAY is not quite the day of the report... bad name, I know
    const TodayDate = () => {
        a = AnomaliaDetails.Fecha_Solucion? AnomaliaDetails.Fecha_Solucion.toDate() : new Date
        const day = a.getDate(); 
        const month = a.getMonth() + 1; 
        const year = a.getFullYear();
        
        return(
            <Text style={styles.text}> {day}/{month}/{year}</Text>
        ) 
    } 

    async function UpdatingInfo(){
        
        const docToUpdate = doc(db, "Reportes", AnomaliaDetails.id)

        await updateDoc(docToUpdate, {
            Incidencia : incidencia,
            Solucionado : resolved,
            Fecha_Solucion: resolved? serverTimestamp():""
        }).then(() => {
            Alert.alert('Anomalía Actualizada')
            console.log("Data submitted")
            setIncidencia("")
            navigation.navigate("Home")
        }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
    }

    //to avoid the Undefined response in the confirmation alert
    const Filler = (a) =>{
        if(a)
            {return(a)}
        else {return("Vacío")}
    }

    //Confirmation if the solved switch is marked
    const FinalConfirmation = () => {
        if(resolved){
            Alert.alert(
                "Se está marcando esta anomalía como solucionada",
                "Una vez marcada como solucionada, no podrá editarse",
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
                    
                }
                )
        }
        else{UpdatingInfo()}
    }

    return(
        <KeyboardAwareScrollView>
           <View style={styles.container}>
                
                <View style={styles.container}>
                    <Text style={styles.textLogin}>Detalle de Anomalía</Text>
                </View> 

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Suceso:</Text>
                    <Text style={styles.inputMemberDetail}>{AnomaliaDetails.Titulo}</Text>
                </View>
                <View style={styles.viewCounter}>
                    <Text style={styles.text}>Detalle:</Text>
                    <Text style={styles.inputMemberDetail}> {AnomaliaDetails.Descripcion}</Text>
                </View>  
                <View style={styles.viewCounter}>
                    <Text style={styles.text}>Fecha de reporte:</Text>
                    <Text style={styles.text}> {day}/{month}/{year}</Text>
                </View> 
            <Separator></Separator>
                {solvedDate?"":
                <View >
                    <Text style={styles.text}>Cambiar Estado actual de la Anomalía</Text>
                    <View style={styles.viewCounter}>

                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={resolved ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleResolved}
                            value={resolved}
                        />
                        {
                        resolved?
                            <View style={styles.viewCounter}>
                                <Text style={styles.text}>Solucionado</Text>
                            </View>
                        :
                            <View style={styles.viewCounter}>
                                <Text style={styles.text}>Pendiente</Text>
                            </View>
                        }
                    </View>
                </View>}
                

                
                <Text>
                    {
                        resolved?
                        
                        <View style={styles.viewCounter}>
                            <Text style={styles.text}>Fecha de Solución</Text>
                            {TodayDate()}
                        </View>
                    :
                    null
                    }
                </Text>
                    <Separator></Separator>
                    <Text style={styles.text}>Novedades:</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={MaxLettersDescription}
                        style={styles.input}
                        placeholder="¿Alguna novedad durante la resolucion?"
                        onChangeText ={(value) => Updating(value)}
                        value={incidencia}
                    />
                {
                incidencia?
                <Text>Caracteres Faltantes: {remainingLetters}</Text>
                :
                <Text>Maximo de letras: {MaxLettersDescription}</Text>
                }

                <Separator/>
                
                {
                //the disabled property in the Pressable needs more
                //visual feedback sign to let the user know that once solved the issue
                //no more editting 
                }

                <Pressable
                    style={styles.button}
                    disabled={alreadySolved()}
                    onPress={() => Alert.alert(
                    '¿Estás seguro?',
                    "Suceso: "+titulo+"\nDetalle: "+description+"\nNovedades: "+Filler(incidencia),
                    [
                        {
                        text: 'Guardar',
                        onPress: () => FinalConfirmation(),
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

export default DetailsAnomalia