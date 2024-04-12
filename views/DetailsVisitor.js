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
    

    /**
     * OK just need to transform this, from DetailsAnomalias to
     * DetailsVisitor from here.
     */


    const [incidencia, setIncidencia] = useState("");
    const [remainingLetters, setRemainingLetters] = useState(MaxLettersDescription)
    const [resolved, setResolved] = useState(AnomaliaDetails.Solucionado)
    const [resuelto, setResuelto] = useState("")
    
    const alreadySolved = () => {
        if(AnomaliaDetails.Fecha_Solucion == null){
            return false
        }else{
            return true
        }
            
        

    }

    let MaxLettersDescription = 150

    function toggleResolved(){
        setResolved(previousState => !previousState);
        resolved?setResuelto("Si, solucionado"):setResuelto("No, aun pendiente")        
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
    const TodayDate = () => {
        new_date=new Date()
        const day = new_date.getDate(); 
        const month = new_date.getMonth() + 1; 
        const year = new_date.getFullYear();
        

        return(
            <Text style={styles.paragraph}> {day}/{month}/{year}</Text>
        ) 
    } 

    async function UpdatingInfo(){
        
        const docToUpdate = doc(db, "Reportes", AnomaliaDetails.id)

        await updateDoc(docToUpdate, {
            Incidencia : incidencia,
            Solucionado : resolved,
            Fecha_Solucion: serverTimestamp()
        }).then(() => {
            Alert.alert('Anomalía Actualizada')
            console.log("Data submitted")
            setIncidencia("")
            setResuelto("")
        }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
    }

    return(
        <KeyboardAwareScrollView>
           <View style={styles.container}>
            
                <Text style={styles.labelTitle} >Titulo</Text>
                <Text style={styles.paragraph}>{AnomaliaDetails.Titulo}</Text>
                    
                <Text style={styles.labelTitle}>Descripcion</Text>
                <Text style={styles.paragraph}> {AnomaliaDetails.Descripcion}</Text>

                <Text style={styles.labelTitle}>Fecha de reporte</Text>
                <Text style={styles.paragraph}> {day}/{month}/{year}</Text>
            </View>

            <View style={styles.container}>
            <Separator></Separator>

                <Text style={styles.labelTitle}>Marcar como solucionado</Text>
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
                    <View>
                        <Text>Si, Solucionado</Text>
                    </View>
                :
                    <View>
                        <Text>No, aun pendiente</Text>
                    </View>
                }
                </View>
                
                {
                //I know its better a Date Picker, but... for now, this will do
                //you can only report today as the day 
                }

                <Text style={styles.labelTitle}>Fecha de Solución</Text>
                <Text>
                    {
                        resolved?
                        <View>
                            {TodayDate()}
                        </View>
                    :
                        <View>
                            <Text style={styles.paragraph}>Aun sin fecha</Text>
                        </View>
                    }
                </Text>

                    <Text style={styles.labelTitle}>Incidencias</Text>
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