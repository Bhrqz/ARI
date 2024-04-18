import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, Text, TextInput, Pressable, Image, Alert} from 'react-native';
import { db } from './components/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './components/styles';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from "firebase/auth"
import { useNavigation } from '@react-navigation/core';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

/** SOMething that NEEDS to be fixed
 * 
 * The persistence of the user
 * 
  const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
 */

const Separator = () => <View style={styles.separator} />;


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const Cleanfields = () =>{
        setEmail("")
        setPassword("")
    }
    
    
    /**
     Here, I used the solution presented here for the navigation between 
     the Login page and the Home page for the authenticated users
     https://stackoverflow.com/questions/71562840/typeerror-cannot-read-property-navigate-of-undefined-react-native
     
     I did use the UseNavigation Hook directly
     */

    const navigation = useNavigation()

    async function onLoginPress(){

        /**const checkName = () =>{
            if(user){
                console.log(e)
            }
        }*/

        setLoading(true)
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                setLoading(false)
                Alert.alert(
                    "Autenticado", 
                    "Te doy la bienvenida",
                    [
                        // un invento para verificar si tiene nombre y aja
                           { text: 'OK',
                            //onPress: () => checkName(),
                            style: 'cancel',}
                        
                        ],
                        {
                          cancelable: false,
                          
                        } 
                    );
                navigation.navigate("Home")
                console.log("de la linea 41",user.displayName)
                // ...
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert("Oops","Ha habido un error, \npor favor, revisa tu información\ne intenta nuevamente")
                const errorCode = error.code;
                const errorMessage = error.message;
            });    
        }


    return (
        <KeyboardAwareScrollView>
                
                <StatusBar style="auto" />
                <View style={styles.container}>

                    <Separator />
                    <Text style={styles.textLogin}>Valle de Bendición</Text>
                    <Image source={require('../assets/LOGO PASTOR JULIO.png')} style={{width: 300, height: 200}} />
                    
                    <Separator />
                    <Text style={styles.textLogin}>Identificación</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        onChangeText ={(value) => setEmail(value)}
                        value={email}
                    />
                    
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        onChangeText ={(value) => setPassword(value)}
                        value={password}
                    />
                    <Text>{loading? "¡Verificando!":""}</Text>
                    
                    <Pressable
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </Pressable>
                    <Separator />
                    <Pressable
                        style={styles.button}
                        onPress={() => Cleanfields()}>
                        <Text style={styles.buttonText}>Limpiar</Text>
                    </Pressable>
                    <Separator />
                    <Separator />
                    <Separator />
                </View>
        </KeyboardAwareScrollView>
    );
}



export default Login;
