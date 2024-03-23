import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';



function DetailsVisitor ( { route }) {

    const { memberDetails } = route.params;


    return(
        <KeyboardAwareScrollView>
            <View>
                <Text>Detalles del visitante</Text>
                <Text>Nombre: {memberDetails.Nombres}</Text>
                <Text>Apellido: {memberDetails.Apellidos}</Text>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default DetailsVisitor