import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';





export default function NewVisitor() {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [number, onChangeNumber] = useState('')

    return (
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

            <Text style={styles.label} >¿Quién lo invitó?</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del hermano o hermana"
                
                
            />

            <Button
            title="Editar visitante"
            onPress={() => Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  )}
          />


          <StatusBar style="auto" />
      </View>
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
    }
    }
  )