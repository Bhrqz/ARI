import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

const DetailsAnomalia = ( {route} ) => {

    const { AnomaliaDetails } = route.params;

    const [titulo, setTitulo] = useState(AnomaliaDetails.Titulo);
    const [description, setDescription] = useState(AnomaliaDetails.Descripcion);
    const [incidencia, setIncidencia] = useState("");
    const [remainingLetters, setRemainingLetters] = useState(MaxLettersDescription)
    const [resolved, setResolved] = useState(AnomaliaDetails.Solucionado)

    let MaxLettersDescription = 150

    function toggleResolved(){
        setResolved(previousState => !previousState);        
      }
    
    function Updating(value) {
        setIncidencia(value)
        
        const remaining = MaxLettersDescription - value.length
        setRemainingLetters(remaining)
      }

    return(
        <KeyboardAwareScrollView>
           <View style={styles.container}>
            <Text style={styles.label} >Titulo</Text>
                <TextInput
                    editable={false}
                    style={styles.input}
                    maxLength={30}
                    value={titulo}
                />
                
                <Text style={styles.label}>Descripcion</Text>
                <TextInput
                    editable={false}
                    multiline
                    numberOfLines={2}
                    maxLength={MaxLettersDescription}
                    style={styles.input}
                    value={description}
                />
                <Separator></Separator>

                <Text style={styles.label}>Marcar como solucionado</Text>
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
                <Text>Si, Solucionado</Text>
                :
                <Text>No, aun pendiente</Text>
                }
                </View>
                <Text style={styles.label}>Incidencias</Text>
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
              
                {
                //Include a Date Picker HHEYEYEYEYEY!!!!!
                }
           </View> 
        </KeyboardAwareScrollView>
    )


}

export default DetailsAnomalia